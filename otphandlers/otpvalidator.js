class OTPValidator {
    constructor(otpStore) {
        this.otpStore = otpStore;
    }

    validateOTP(identifier, enteredOTP) {
        const storedOTPData = this.otpStore[identifier];
        if (!storedOTPData) return { valid: false, reason: 'OTP not found' };

        const { otp, expiryTime } = storedOTPData;

        if (Date.now() > expiryTime) {
            return { valid: false, reason: 'OTP expired' };
        }

        if (enteredOTP === otp) {
            return { valid: true, reason: 'OTP validated successfully' };
        } else {
            return { valid: false, reason: 'OTP mismatch' };
        }
    }
}

module.exports = OTPValidator;
