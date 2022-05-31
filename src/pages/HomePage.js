import React, {useState, useEffect, useContext} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes, Routes } from "../routes";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import {Context} from "../index";
import {
    fetchAdmin, fetchBranch, fetchGender,
    fetchGroup,
    fetchRegularClass, fetchRoom, fetchStStatus,
    fetchStudent,
    fetchSubscription,
    fetchTeacher
} from "../http/boardAPI";


const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={!loaded} /> <Component {...props} /> </>)} />
    );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') !== 'false'
    }

    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }

    return (
        <Route {...rest} render={props => (
            <>
                <Sidebar />

                <main className="content">
                    <Navbar />
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
                </main>
            </>
        )}
        />
    );
};

export default function HomePage() {
    const {user, board} = useContext(Context);

    useEffect(() => {
        fetchStudent().then(data => board.setStudents(data));
        fetchRegularClass().then(data => board.setRegularClass(data));
        fetchAdmin().then(data => board.setAdmins(data));
        fetchTeacher().then(data => board.setTeachers(data));
        fetchGroup().then(data => board.setGroups(data));
        fetchSubscription().then(data => board.setSubscriptions(data));
        fetchGender().then(data => board.setGender(data));
        fetchStStatus().then(data => board.setStudentStatus(data));
        fetchRoom().then(data => board.setRooms(data));
        fetchBranch().then(data => board.setBranches(data));
    },[]);

    console.log(board)
    console.log(user.isAuth)

    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <RouteWithLoader key={path} path={path} component={Component} exact/>
            )};
            {user?.isAuth && authRoutes.map(({path, Component}) =>
                <RouteWithSidebar key={path} path={path} component={Component} exact/>
            )};

            <Redirect to={Routes.NotFound.path}/>
        </Switch>
    );
}