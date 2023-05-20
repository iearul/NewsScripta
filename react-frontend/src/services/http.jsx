import axios from "axios";

let Api = axios.create({
    baseURL: "http://localhost:8080/api",

    headers: {
        "Content-type": "application/json",
        accept: "application/json",
    },
    transformResponse: function (data) {
        let response = JSON.parse(data);
        return response;
    },

    validateStatus: function (status) {
        if (status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/";
        }

        return status >= 200 && status < 300; // default
    },
});

Api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user"))?.token
        }`;
    return config;
});

export default Api;