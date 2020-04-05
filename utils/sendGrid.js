const sgMail = require('@sendgrid/mail');
const keys = require('../keys');

sgMail.setApiKey(keys.sendGrid);


const sendPasswordResetLink = function(email, userLink) {
    const msg = {
      to: email,
      from: keys.supportEmail,
      subject: 'Quizler Password Reset link',
      html: `<p><p>Hello,</p>please use the link below to reset your Quizler account password</p><a href="${userLink}" target="_blank">Reset Password Link</a>`,
    };
    sgMail.send(msg);
}

module.exports = {
    sendPasswordResetLink
}


