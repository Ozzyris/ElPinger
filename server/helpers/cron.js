// PACKAGES
const CronJob = require('cron').CronJob;

// TEST
const admin = require('../tests/admin');

function admin_cron(){
	console.log( 'Cron Started' );
	new CronJob('0 */5 * * * *', function() {
		admin.login_api();
	}, null, true, 'Australia/Sydney');
}

module.exports={
    admin_cron: admin_cron
};