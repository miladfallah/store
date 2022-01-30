const Yup = require('yup');
require("yup-password")(Yup);

exports.schema = Yup.object().shape({

    fullname: Yup.string()
    .required("نام و نام خانوادگی الزامی میباشد."),

    email: Yup.string()
    .required("ایمیل الزامی میباشد.")
    .email("ایمیل معتبر نمیباشد."),

    password: Yup.string()
    .required("رمز عبور الزامی میباشد.")
    .minLowercase(1, "رمز عبور باید حداقل دارای یک حرف کوچک باشد.")
    .minUppercase(1, "رمز عبور باید حداقل دارای یک حرف بزرگ باشد.")
    .min(6, "رمز عبور باید حداقل دارای شش کاراکتر باشد.")
    .minNumbers(1, "رمز عبور باید حداقل دارای یک عدد باشد."),

    confirmPassword: Yup.string()
    .required("تکرار رمز عبور الزامی میباشد.")
    .oneOf([Yup.ref("password"), null], "رمز عبور و تکرار ان همخوانی ندارند."),
});