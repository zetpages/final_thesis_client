import {makeAutoObservable} from "mobx";

export default class UserAuth {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._details = "";
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    getDetails(details) {
        this._details = details;
    }

    get details() {
        return this._details;
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}