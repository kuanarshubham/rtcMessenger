import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import asyncHandler from '../lib/asyncHandler.lib.js';
import ApiError from '../lib/apiError.lib.js';

const tokenVerifier =  asyncHandler(async(req, _, next) => {
    const token = req.cookies.jwt;

    if(!token) throw new ApiError(400, "Authentication failed");

    const userId = jwt.verify(token, process.env.SECRET_CODE);

    if(!userId) throw new ApiError(400, "Invalid Token");

    req.userId = userId.userId;
    next();
});


export default tokenVerifier;