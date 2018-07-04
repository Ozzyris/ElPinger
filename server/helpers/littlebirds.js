// VARIABLE
var client;

// TESTS
const admin = require('../tests/admin');

function dashboard_connecter( io ){
	io.on('connection', function(get_client) {  
		console.log('Client connected...');
		client = get_client;
		dashboard_emmiter( admin.status_login_api );
	});
}

function dashboard_emmiter( value ){
	if(client){
		client.emit('login_api', value);
	}
}

module.exports={
    dashboard_connecter: dashboard_connecter,
    dashboard_emmiter: dashboard_emmiter
};