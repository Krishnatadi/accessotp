class OTPGenerator {
    constructor() {
        this.otpStore = {};
    }

    // Generate a random OTP of given length
    generateOTP(length = 6, ttl = 300000, alphanumeric = false) {
        const characters = alphanumeric
            ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            : '0123456789';
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        const expiryTime = Date.now() + ttl; // OTP expires after ttl milliseconds
        return { otp, expiryTime };
    }

    storeOTP(identifier, otp, expiryTime) {
        this.otpStore[identifier] = { otp, expiryTime };
    }

    getOTP(identifier) {
        return this.otpStore[identifier];
    }
}

module.exports = OTPGenerator;
