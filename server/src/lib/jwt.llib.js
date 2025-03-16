import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {

    const token = jwt.sign({
        userId
    }, process.env.SECRET_CODE, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.CURRENT_MODE !== "developer"
    });

    return token;
}

export default generateToken;
