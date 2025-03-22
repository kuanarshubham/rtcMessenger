

import ApiError from "../lib/apiError.lib.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import asyncHandler from "../lib/asyncHandler.lib.js";
import ApiResponse from "../lib/apiResponse.lib.js";
import generateToken from '../lib/jwt.llib.js';
import uploadPictureToCloudinary from '../lib/cloudinary.lib.js';

export const getAllUsersExpectMe = asyncHandler(async(req, res) => {
    const myId = req.userId;

    if(!myId) throw  new ApiError(400, "No userId found -> Validation failed");

    const allUsersExceptMe = await User.find({
        _id: {$ne: myId}
    }).select("-password");

    if(!allUsersExceptMe) throw new ApiError(400, "No users available");

    return res.status(200).json(new ApiResponse(200, "Got all the users except me", {allUsersExceptMe}))
});

export const getAllPrvMessages = asyncHandler(async(req, res) => {
    const myId = req.userId;
    const otherPersonId = req.params.id;

    if([myId, otherPersonId].some(e => !e)) throw new ApiError(400, "Ids are inaccesible");

    const allMessages = await Message.find({
        $or: [
            {senderId: myId, receiverId: otherPersonId},
            {senderId: otherPersonId, receiverId: myId}
        ]
    });

    if(!allMessages) throw new ApiError(400, "Message unavaliable");

    return res.status(200).json(new ApiResponse(200, "Message available", {allMessages}));
});

export const sendMsg = asyncHandler(async(req, res) => {
    const myId = req.userId;
    const otherPersonId = req.params.id;

    if([myId, otherPersonId].some(e => !e)) throw new ApiError(400, "Ids are inaccesible"); 

    const {text} = req.body;

    const image = req.file?.image[0]?.path;

    if(!text && !image) throw new ApiError("No text or image");
    
    let imageUrl;
    if(image){
        const results = await uploadPictureToCloudinary(image);
        imageUrl = results.secure_url;
    }

    const newMessageCreated = await Message.create({
        senderId: myId,
        receiverId: otherPersonId,
        text,
        image: image? imageUrl: ""
    });

    if(!newMessageCreated) throw new ApiError(400, "No new message created");

    return res.status(200).json(new ApiResponse(200, "Sucessfull message creation", {newMessageCreated}));
});