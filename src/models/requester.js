import $ from 'jquery';


const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_SkjtoqOfg";
const kinveyAppSecret = "6c9bdb78676f46c1a2f18a0a7aa056d0";

function makeAuth(type) {
    switch (type) {
        case 'basic':
            return { 'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret) };
        case 'kinvey':
            return { 'Authorization': "Kinvey " + sessionStorage.getItem('authToken') };
        case 'guestUser':
            return { 'Authorization': "Kinvey ea334f5e-5719-4d63-bf93-9d9cbcd83fa9.WEiFXXETAvIVSfWQ9A/Il9v/7FC1ZSZmnBZDYG3A9qQ=" }
        default: break;
    }
}

function get(module, uri, auth) {
    const kinveyLoginUrl = kinveyBaseUrl + module + "/" + kinveyAppKey + "/" + uri;
    const kinveyAuthHeaders = makeAuth(auth);

    return $.ajax({
        method: "GET",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders
    });
}

function post(module, uri, data, auth) {
    const kinveyLoginUrl = kinveyBaseUrl + module + "/" + kinveyAppKey + "/" + uri;
    const kinveyAuthHeaders = makeAuth(auth);

    let request = {
        method: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders
    };

    if (data !== null) {
        request.data = data;
    }
    
    return $.ajax(request);
}

function update(module, uri, data, auth) {
    const kinveyLoginUrl = kinveyBaseUrl + module + "/" + kinveyAppKey + "/" + uri;
    const kinveyAuthHeaders = makeAuth(auth);

    let request = {
        method: "PUT",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: data
    };

    return $.ajax(request);
}

function del(module, uri, auth){
    const kinveyDeleteUrl = kinveyBaseUrl + module + "/" + kinveyAppKey + "/" + uri;
    const kinveyAuthHeaders = makeAuth(auth);

    let request = {
        method: "DELETE",
        url: kinveyDeleteUrl,
        headers: kinveyAuthHeaders,
    };
    return $.ajax(request);
}



export {get, post, update, del};