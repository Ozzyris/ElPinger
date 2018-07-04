// PACKAGES
const express = require('express'),
	  router = express.Router(),
	  fs = require('fs');

// TEST
const admin = require('../tests/admin');

// HELPERS
const littlebirds = require('../helpers/littlebirds');

router.use(express.static(__dirname + '/node_modules'));
router.get('/', function (req, res) {

	fs.readFile('templates/views/home.html', 'utf8', (err, html) => {
		if( admin.status_login_api.status ){
			html = html.replace('The aggregation just started, please take a sit and relax.', 'The login api is ' + admin.status_login_api.status + ' | Last call at ' + admin.status_login_api.date);
		}
		res.send( html );

		littlebirds.dashboard_connecter( req, res );
	});
})

module.exports = {
    "dashboardRouter" : router
};