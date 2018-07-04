// PACKAGES
const nodemailer = require('nodemailer'),
	  CronJob = require('cron').CronJob;

// VARIABLE
var email_already_send = false;

function send_email( subject, body ){
	if( email_already_send == true ){
		return;
	}
	var transporter = nodemailer.createTransport(
		{
			service: 'gmail',
			secureConnection: false,
			auth: {
				user: 'atworkalfred@gmail.com',
				pass: 'Pptml2zuO9'
			}
		}
	);
	let mailOptions = {
		from: '"Ping Master 🔥" <noreply@pingmaster.com>',
		to: 'alex@experience.digital',
		subject: subject,
		html: body
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);

		email_already_send = true;
		new CronJob('0 0 1 * * *', function() {
			email_already_send = false;
		}, null, true, 'Australia/Sydney');
	});
}

module.exports={
    send_email: send_email
};