const OTPGenerator = require('./otphandlers/otpgenerator');
const OTPValidator = require('./otphandlers/otpvalidator');

const otpGenerator = new OTPGenerator();

module.exports = {
    generateOTP: (identifier, length = 6, ttl = 300000, alphanumeric = false) => {
        const { otp, expiryTime } = otpGenerator.generateOTP(length, ttl, alphanumeric);
        otpGenerator.storeOTP(identifier, otp, expiryTime);
        return otp;
    },

    validateOTP: (identifier, enteredOTP) => {
        const otpValidator = new OTPValidator(otpGenerator.otpStore);
        return otpValidator.validateOTP(identifier, enteredOTP);
    }
};
