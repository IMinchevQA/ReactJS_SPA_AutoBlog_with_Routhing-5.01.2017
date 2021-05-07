import * as requester from './requester';
import observer from './observer';import { useHistory } from "react-router-dom";
const history = useHistory;

function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', userInfo.roles);

    observer.onSessionUpdate();
}

// user/login
function login(username, password, callback) {
    let userData = {
        username,
        password
    };

    requester.post('user', 'login', userData, 'basic')
        .then(loginSuccess);

    function loginSuccess(userInfo) {
        if(userInfo.isDeleted === "false") {
            saveSession(userInfo);
            callback(true);
        } else {
            alert("User is deleted please contact with the administrator!")
            callback(false);
        }
    }
}

// user/register
function register(username, fullname, password, repeat, roles, isDeleted, callback) {
    let userData = {
        username,
        fullname,
        password,
        repeat,
        roles, isDeleted
    };

    requester.post('user', '', userData, 'basic')
        .then(registerSuccess);

    function registerSuccess(userInfo) {
        observer.showSuccess('Successful registration.');
        saveSession(userInfo);
        callback(true);
    }
}

// user/logout
function logout(callback) {
    requester.post('user', '_logout', null, 'kinvey')
        .then(logoutSuccess);


    function logoutSuccess(response) {
        sessionStorage.clear();
        observer.onSessionUpdate();
        callback(true);
    }
}

function loadAllUsers(callback){    
    requester.get('user', '', 'kinvey')
        .then(callback)

}

function loadUserDetails(userId, callback){
    requester.get('user', userId, 'kinvey')
        .then(callback)

}

function editUser(userId, username, fullname, roles, password, repeat, isDeleted, callback, that){
    let userData ={ username, fullname, roles, password, repeat, isDeleted };

    requester.update('user', userId, userData, 'kinvey')
        .then(function(response){
            callback(response, that)
        })
}


export {login, register, logout, loadAllUsers, loadUserDetails, editUser};