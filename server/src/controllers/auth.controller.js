import bcrypt from 'bcryptjs'


import ApiError from "../lib/apiError.lib.js";
import User from "../models/user.model.js";
import asyncHandler from "../lib/asyncHandler.lib.js";
import ApiResponse from "../lib/apiResponse.lib.js";
import generateToken from '../lib/jwt.llib.js';
import uploadPictureToCloudinary from '../lib/cloudinary.lib.js';

export const signup = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some(e => !e)) return res.status(400).json(new ApiError(400, "Required feild is not given"));

    if (password.length < 6) return res.status(400).json(new ApiError(400, "Passowrd length must be >=6"));

    const user = await User.findOne({
        email
    });

    if (user) return res.status(400).json(new ApiError(400, "Unique email required"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
        email,
        password: hashedPassword,
        fullName
    });

    if (!createdUser) return res.status(400).json(new ApiError("Error in making the user"));

    generateToken(createdUser._id, res);
    await createdUser.save()

    return res.status(200).json(new ApiResponse(200, "Sucessful creation of User", {
        _id: createdUser._id,
        fullName: createdUser.fullName,
        password: createdUser.password,
        profilePic: createdUser.profilePic
    }));

});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some(e => !e)) return res.status(400).json(new ApiError(400, "Validattion failed"));

    const userFound = await User.findOne({
        email
    });

    if (!userFound) return res.status(400).json(new ApiError(400, "No such user found"));

    const isPasswordCorrect = await bcrypt.compare(password, userFound.password);

    if (!isPasswordCorrect) return res.status(400).json(new ApiError(400, "Wrong password"));

    generateToken(userFound._id, res);

    return res.status(200).json(new ApiResponse(200, "Login sucessfull", {
        _id: userFound._id,
        fullName: userFound.fullName,
        email: userFound.email,
        profilePic: userFound.profilePic
    }));
});

export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json(new ApiResponse(200, "Logout sucessfull", {
        message: "Logged out successfully"
    }));
});

export const updateProfilePic = asyncHandler(async (req, res) => {

    const profilePic  = req.body.profilePic

    if (!profilePic) throw new ApiError(400, "No profile pic uploaded");

    //cloudinary
    const results = await uploadPictureToCloudinary(profilePic);

    if(!results) throw new ApiError(400, "Failed at uploading to cloudinary");

    const uploadedPicString = results.secure_url;

    if (!req.userId) throw new ApiError(400, "No userId found");

    const userId = req.userId;

    await User.findByIdAndUpdate(
        userId,
        {
            profilePic: uploadedPicString
        },

        {
            new: true
        });

    return res.status(200).json(new ApiResponse(200, "Updation sucessfull"));
});

export const checkAuth = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select("-password");
    return res.status(200).json({user});
});