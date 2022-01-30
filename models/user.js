const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema, schema} = require("../models/secure/userValidation");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "نام و نام خانوادگی الزامی میباشد."],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique:  true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "رمز عبور باید حداقل دارای 6 حرف باشد."],
        maxlength: 255
    },
    cart: {
        items: [ 
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            }
        ]
    }
});

//Statics
userSchema.statics.userValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

//middlewares

userSchema.pre("save", function (next) {

    let user = this;
    if(!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err);

        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);