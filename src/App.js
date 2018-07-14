import React, { Component } from 'react';
import Authority from './ethereum/Authority';
import web3 from './ethereum/web3';

import Manager from './components/Manager';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Pharmacy from './components/Pharmacy';
import './App.css';

class App extends Component {

	state = {
		user: '',
		factory: '',
	};

	componentDidMount = async () => {
		// const hello = await Authority.methods.manager().call();
		// const accounts = await web3.eth.getAccounts();
		// console.log(accounts[0], hello);
		// console.log(String(hello) === String(accounts));
		// eslint-disable-next-line
		// console.log(hello == accounts);
		// const factory = await Authority.methods.registered_doctors(accounts[0]).call()
		// console.log(factory);

		try {
			const accounts = await web3.eth.getAccounts();
			const user = await Authority.methods.manager().call();
			console.log(accounts[0], user);
			
			// eslint-disable-next-line
			if ( accounts[0] == user) {
				this.setState({ user: 'manager' })
			} else if ( this.state.user === '' ) {
				const factory = await Authority.methods.registered_doctors(accounts[0]).call()
				// console.log('asdasd',factory);
				if ( Number(factory) !== 0 ) {
					this.setState({user:'doctor', factory:factory})
				}
			} else if ( this.state.user === '' ) {
				if ( Authority.methods.getPharmacy(accounts[0].call) ) {
					this.setState({user:'pharmacy'})
				}
			}
		} catch ( err ) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className="App">

				{ 
					this.state.user === 'manager' 
						?
						<Manager />
						:
						null
				}

				{ 
					this.state.user === 'doctor' 
						?
						<Doctor />
						:
						null
				}

				{ 
					this.state.user === '' 
						?
						<Patient />
						:
						null
				}

				{ 
					this.state.user === 'pharmacy' 
						?
						<Pharmacy />
						:
						null
				}

				
				
			</div>
		);
	}
}

export default App;
