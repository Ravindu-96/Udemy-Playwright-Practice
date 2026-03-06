// Read mail from mailosaur.com via API and extract OTP code for user registration confirmation.

const apiKey = 'HZ4h3TsbYpYFvwqYUqW4wAuVQvAZTZcR';
const MailosaurClient = require('mailosaur');
const mailosaur = new MailosaurClient(apiKey);

async function getOtpFromEmail(emailAddress) {
    const serverId = 'bivou0qb'; // This should probably be an environment variable or passed in.
    const searchCriteria = {
        sentTo: emailAddress
    };

    console.log(`Attempting to retrieve email for ${emailAddress}...`);
    const email = await mailosaur.messages.get(serverId, searchCriteria);

    const otpMatch = email.html.body.match(/\d{6}/)[0];
    if (!otpMatch) {
        throw new Error('OTP not found in email');
    }
    return otpMatch;
}

module.exports = { getOtpFromEmail };