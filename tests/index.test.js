import Axios from "axios";

const axios = {
    post: async (...args) => {
        try {
            const res = await Axios.post(...args);
            return res;
        } catch (e) {
            return e.response;
        }
    },

    get: async (...args) => {
        try {
            const res = await Axios.get(...args);
            return res;
        } catch (e) {
            return e.response;
        }
    },

    put: async (...args) => {
        try {
            const res = await Axios.put(...args);
            return res;
        } catch (e) {
            return e.response;
        }
    },

    delete: async (...args) => {
        try {
            const res = await Axios.delete(...args);
            return res;
        } catch (e) {
            return e.response;
        }
    }
}

const BACKEND_URL = "http://localhost:5001/api/v1"

describe("Auth endpoints", () => {
    test("User is able to sign-up using correct credentials", async() => {
        const signupOp = await axios.post(`${BACKEND_URL}/signup`, {
            fullName: "Shubham Kuanar",
            email: "sk21@gmail.com",
            password: "Gunu@1234"
        });
        
        
    })
})