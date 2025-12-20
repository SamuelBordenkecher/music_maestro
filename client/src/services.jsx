import axios from "axios"

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",  //Add endpoint when making request.
})


export const signUp = async(userObj) => {
    let response = await api.post("users/signup/", userObj)
    if (response.status === 201) {
        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Token ${user.token}`
        return user;
    }
    alert(response.data)
}

export const logIn = async (userCred) => {
    let response = await api.post("users/login/", userCred);
    if (response.status === 200) {
        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Token ${user.token}`;
        return user;
    }
    alert(response.data)
    return null
}

export const logOut = async () => {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
        localStorage.removeItem("user");
        delete api.defaults.headers.common["Authorization"];
        return null;
    }
    alert("Unable to logout")
}