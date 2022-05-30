import React, {createContext, useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, getUser} from "./http/userAPI";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import Preloader from "./components/Preloader";


export let CenterContext = createContext(null);
const App = observer(() => {
    const {user, board} = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        getUser().then(data => {
            user.getDetails(data)
        }).finally(() => setLoading(false))
    }, []);

    // console.log(user)
    // console.log(board)
    let userArray = [];
    let centerEd = {};
    let currentUser = {};

    board.admins?.map((el) => {
        userArray.push(el);
    });

    board.students?.map((el) => {
        userArray.push(el);
    });

    let startTime = performance.now()

    userArray.map((el) => {
        if (user.details.email === el.email) {
            currentUser = Object.assign({}, el)
        }
    });

    let endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    let startTime1 = performance.now()
    board.admins.map((el) => {
        if (user.details.email === el.email) {
            centerEd = Object.assign({}, el.center);
        }
    })
    let endTime1 = performance.now()
    console.log(`1111 Call to doSomething took ${endTime1 - startTime1} milliseconds`)


    if (loading) {
        return <Preloader show={true} />
    }

    return (
        <CenterContext.Provider value={{
            center: centerEd,
            loggedUser: currentUser
        }}>
            <BrowserRouter>
                <ScrollToTop />
                <HomePage />
            </BrowserRouter>
        </CenterContext.Provider>
    );
});

export default App;