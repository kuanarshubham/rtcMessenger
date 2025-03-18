import { create } from "zustand";
import toast from "react-hot-toast";

import Axios from '../lib/axios.lib.js';

const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,

    isUsersLoading: false,
    isMessagesLoading: false,

    getAllUsers: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await Axios.get("/message/getallusers");
            set({ users: res.data.object.allUsersExceptMe });
        }
        catch(err){
            toast.error(err.response.data.message);
        }
        finally{
            set({ isUsersLoading: false });
        }
    },

    getMessages: async(userId) => {
        const res = await Axios.get(`/message/allmessages/${userId}`);
        set({messages: res.data.})
    } 
}))