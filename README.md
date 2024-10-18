# AccessOTP

**AccessOTP** is a secure, scalable, and easy-to-use OTP (One-Time Password) generator and validator. It supports both numeric and alphanumeric OTPs, customizable OTP lengths, and expiration times, making it ideal for applications requiring authentication, verification, or security checks.


## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Examples](#examples)


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

To install `saltyhash`, use npm:
```console
$ npm install accessotp
```


## Features & Functionalities

- **OTP Generation**: Generate secure one-time passwords (OTP) for authentication and verification.
- **OTP Validation**: Validate OTPs with a single-use mechanism to ensure security.
- **Customizable OTP Length**: Choose the desired length for generated OTPs.
- **Configurable Expiry Time**: Set a custom time-to-live (TTL) for OTP expiration.
- **Alphanumeric OTP Option**: Generate either numeric or alphanumeric OTPs.
- **Multiple User Support**: Handle OTP generation and validation for thousands of users concurrently.
- **Flexible Usage**: Can be used for user authentication, verification, or two-factor authentication (2FA).



## Examples
### 1. Generate a Numeric OTP with Default Expiry
This example generates a 6-digit numeric OTP for the user identified as **user123**, which is automatically stored with a default expiry time of 5 minutes, allowing the user to authenticate within that timeframe.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate a 6-digit OTP with default expiry (5 minutes)
const generatedOTP = otp.generateOTP(identifier); 
console.log('Generated OTP:', generatedOTP); // Output the generated OTP
/*
Output:
Generated OTP: 123456 // Example output (actual OTP will vary)
*/

```

### 2. Validate a Correct OTP
In this scenario, we generate an OTP for user123 and immediately validate it against the stored OTP; since they match, the output confirms successful validation, enabling user authentication.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate OTP for the user
const generatedOTP = otp.generateOTP(identifier); 

// Validate the generated OTP
const validationResult = otp.validateOTP(identifier, generatedOTP.otp); 
console.log('Validation Result:', validationResult); // Output the validation result
/*
Output:
Validation Result: { valid: true, reason: 'OTP validated successfully' }
*/

```

### 3. Validate an Incorrect OTP
Here, after generating a valid OTP for user123, we attempt to validate it using an incorrect hardcoded value (000000); the output indicates that validation fails due to an OTP mismatch, enhancing security.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate OTP for the user
const generatedOTP = otp.generateOTP(identifier); 

const wrongOTP = '000000'; // Example of an incorrect OTP

// Attempt to validate incorrect OTP
const validationResult = otp.validateOTP(identifier, wrongOTP); 
console.log('Validation Result (invalid):', validationResult); // Output the validation result
/*
Output:
Validation Result (invalid): { valid: false, reason: 'OTP mismatch' }
*/

```

### 4. Generate an OTP with a Custom Expiry (30 Seconds)
This example generates a 6-digit OTP for user456 that expires after 30 seconds. It demonstrates how to customize the OTP expiry time.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user456'; // Define another user identifier

// Generate a 6-digit OTP with 30 seconds expiry
const generatedOTP = otp.generateOTP(identifier, 6, 30000); 
console.log('Generated OTP:', generatedOTP); // Output the generated OTP
/*
Output:
Generated OTP: 654321 // Example output (actual OTP will vary)
*/

```

### 5. Generate an Alphanumeric OTP
This example shows how to generate a 6-character alphanumeric OTP for user789. The alphanumeric parameter allows for a broader range of characters in the OTP.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user789'; // Define another user identifier

// Generate a 6-character alphanumeric OTP
const generatedOTP = otp.generateOTP(identifier, 6, 300000, true); 
console.log('Generated Alphanumeric OTP:', generatedOTP); // Output the generated OTP
/*
Output:
Generated Alphanumeric OTP: A1B2C3 // Example output (actual OTP will vary)
*/

```

### 6. Validate an OTP After Expiry
In this example, we generate an OTP that expires after just 1 second. After waiting for 2 seconds, we attempt to validate it. The validation fails because the OTP has expired.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate OTP with 1 second expiry
const generatedOTP = otp.generateOTP(identifier, 6, 1000); 

setTimeout(() => { // Wait for 2 seconds to validate
    const validationResult = otp.validateOTP(identifier, generatedOTP); 
    console.log('Validation Result (after expiry):', validationResult); // Output the validation result
}, 2000);
/*
Output:
Validation Result (after expiry): { valid: false, reason: 'OTP not found or expired' }
*/

```

### 7. Multiple Users OTP Handling
This example demonstrates generating OTPs for two different users (user1 and user2). The package can handle multiple users simultaneously.
```javascript
const otp = require('accessotp'); // Import the accessotp package

// Generate OTP for user1 and user2
const user1OTP = otp.generateOTP('user1'); 
const user2OTP = otp.generateOTP('user2'); 
console.log('User 1 OTP:', user1OTP); // Output OTP for user1
console.log('User 2 OTP:', user2OTP); // Output OTP for user2
/*
Output:
User 1 OTP: 789012 // Example output (actual OTP will vary)
User 2 OTP: 345678 // Example output (actual OTP will vary)
*/

```


### 8. Resend OTP for the Same User
Here, we generate an OTP for user123 and then immediately generate a second OTP. This simulates the process of resending an OTP.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate the first OTP
const firstOTP = otp.generateOTP(identifier); 
// Generate and resend a new OTP
const secondOTP = otp.generateOTP(identifier); 
console.log('First OTP:', firstOTP); // Output the first OTP
console.log('Resent OTP:', secondOTP); // Output the resent OTP
/*
Output:
First OTP: 123456 // Example output (actual OTP will vary)
Resent OTP: 654321 // Example output (actual OTP will vary)
*/

```


### 9. Validate with Correct OTP After Resending
This example validates the second OTP after it has been resent. The validation is expected to succeed since we validate the most recently generated OTP.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate the first OTP
const firstOTP = otp.generateOTP(identifier); 
// Generate a new OTP
const secondOTP = otp.generateOTP(identifier); 

// Validate the resent OTP
const validationResult = otp.validateOTP(identifier, secondOTP.otp); 
console.log('Validation Result (resent OTP):', validationResult); // Output the validation result
/*
Output:
Validation Result (resent OTP): { valid: true, reason: 'OTP validated successfully' }
*/

```

### 10. Handle Expired OTP Gracefully
In this example, we generate an OTP that expires in 1 second. After waiting for 2 seconds, we validate it and correctly receive a response indicating that the OTP is no longer valid.
```javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

// Generate OTP with 1 second expiry
const generatedOTP = otp.generateOTP(identifier, 6, 1000); 

setTimeout(() => { // Wait for 2 seconds to validate
    const validationResult = otp.validateOTP(identifier, generatedOTP); 
    console.log('Validation Result (after expiry):', validationResult); // Output the validation result
}, 2000);
/*
Output:
Validation Result (after expiry): { valid: false, reason: 'OTP not found or expired' }
*/

```

### 11. Rate Limiting
This example demonstrates the rate limiting feature, where generating more than 5 OTPs in a minute for the same identifier results in an error.
``` javascript
// Import the accessotp package
const otp = require('accessotp'); // Ensure that 'accessotp' is installed and the path is correct

const identifier = 'user123'; // Define the user identifier

// Function to test OTP generation and validation with rate limiting
async function testaccessotp() {
    console.log(`Testing OTP generation and validation for identifier: ${identifier}`);

    // Generate multiple OTPs to test rate limiting
    for (let i = 0; i < 7; i++) { // Attempt to generate 7 OTPs
        try {
            // Generate an OTP for the user (default 6 digits, 5 minutes expiry)
            const generatedOTP = otp.generateOTP(identifier);
            console.log(`Generated OTP #${i + 1}:`, generatedOTP);

            // Validate the generated OTP
            const validationResult = otp.validateOTP(identifier, generatedOTP.otp);
            console.log(`Validation Result for OTP #${i + 1}:`, validationResult); // Output the validation result
        } catch (error) {
            console.error(`Error on attempt ${i + 1}:`, error.message); // Output error message for rate limiting
        }

        // Wait for a short period to simulate real-world usage
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500 milliseconds
    }
}

// Run the test function
testaccessotp();

```


### 12. Generating OTP with a Custom TTL
This example demonstrates how to generate an OTP with a custom time-to-live (TTL), allowing the developer to control how long the OTP remains valid.
``` javascript
const otp = require('accessotp'); // Import the accessotp package
const identifier = 'user123'; // Define the user identifier

const otpWithCustomTTL = otp.generateOTP(identifier, 6, 10000); // 10 seconds TTL
console.log('Generated OTP with Custom TTL:', otpWithCustomTTL);
/*
Output:
Generated OTP with Custom TTL: 987654 // Example output
*/

```
