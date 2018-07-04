// PACKAGES
const request = require('request'),
	  fs = require('fs');

// HELPERS
const mailer = require('../helpers/mailer'),
	  littlebirds = require('../helpers/littlebirds');

// VARIABLE
var status_login_api = {};

function login_api(){
	const options = {
		method: 'POST',
		url: 'https://app.carrottslc.com/admin/login',
		time: true,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email: 'christian@carrottslc.com', password: 'testing'})
	}

	function callback(error, response, body) {
		let login_api_status = {};

		if ( !error ) {
			let json_body =  JSON.parse(body);
			date_login_api = response.headers.date;
			if( json_body[0].message == "Login credentials incorrect" ){
				status_login_api.status = 'ON';
				status_login_api.date = response.headers.date;
				status_login_api.responseTime = response.elapsedTime;
				littlebirds.dashboard_emmiter(status_login_api);
			}else{
				status_login_api.status = 'OFF';
				status_login_api.date = response.headers.date;
				status_login_api.responseTime = response.elapsedTime;
				littlebirds.dashboard_emmiter(status_login_api);
				fs.readFile('../templates/emails/ping_alert.html', 'utf8', (err, html) => {
					mailer.send_email( 'Sense Super Backend is OFF', html );
				});
				
			}
		}else{
			console.log(error);
		}
	}
	request( options, callback );
}

module.exports={
    login_api: login_api,
    status_login_api: status_login_api
};