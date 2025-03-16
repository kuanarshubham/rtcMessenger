import { create } from 'zustand';

import Axios from '../lib/axios.lib.js';
import asyncHandler from '../../../server/src/lib/asyncHandler.lib.js';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,

    checkAuth: async () => {
        try {
            const res = await Axios.get("/auth/check");
            set({ authUser: res.data.id });
        }
        catch(err){
            console.log("Error in CheckAuth: ", err);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signUp: async(formData) => {
        set({isSigningUp: true});
        try{
            const res = await Axios.post("/auth/signup", {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName
            });

            set({authUser: res.data.object._id});
            toast.success("Sign-up sucessfull");
        }
        catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
        finally{
            set({isSigningUp: false});
        }
    },

    login: async(formData) => {
        set({isLoggingIn: true});

        try{
            const res = await Axios.post("/auth/login", {
                email: formData.email,
                password: formData.password
            });

            set({authUser: res.data.object._id});
            toast.success("Logged In sucessfully");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({isLoggingIn: false});
        }
    },

    logout: async() => {
        try{
            Axios.post("/auth/logout");
            set({authUser: null});
            toast.success("Sucessfully logged-out");
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    }
}))

export default useAuthStore;