const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.handleLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error ('کاربری با این ایمیل یافت نشد.');
            error.statusCode = 404;
            throw error;
        }
        const isEqual = bcrypt.compare(password, user.password);
        if (isEqual) {
            const token = jwt.sign({
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    fullname: user.fullname,
                },
            },
            process.env.JWT_SECRET);
            res.status(200).json({token, userId: user._id.soString()});
        }
        else {
            const error = new Error('نام کاربری یا رمز عبور اشتباه است.');
            error.statusCode = 422;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};