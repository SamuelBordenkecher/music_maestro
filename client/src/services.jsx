import axios from "axios"

export const test_connection = async() => {
    let response = await axios.get("http://127.0.0.1:8000/test/")
    console.log(response)
}

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",  //Add endpoint when making request.
})