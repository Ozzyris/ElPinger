import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
	admin_login: any = {
		status: 'WAITING',
		date: 'updating',
		responseTime: 'updating',
		upTime: 'updating'
	};
  	private socket;

	constructor(){}
	ngOnInit(){
		this.get_login_api_socket().subscribe();
	}

	get_login_api_socket() {
		let observable = new Observable(observer => {
			this.socket = io.connect('http://192.168.1.145:1607');
			this.socket.on('login_api', (data) => {
				observer.next(data);
				if( data != null ){
					this.admin_login.status = data.status;
					this.admin_login.date = data.date;
					this.admin_login.responseTime = data.responseTime + ' ms';
					this.admin_login.upTime = '100 %';
				}
			});
			return () => {
				this.socket.disconnect();
			};  
		})     
		return observable;
	}
}
