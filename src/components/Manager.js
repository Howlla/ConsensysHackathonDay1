import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import web3 from '../ethereum/web3';
import Authority from '../ethereum/Authority';

let accounts;
class UnwrappedManager extends Component {
 
	state = {
		doc: '',
		pharmacy: '',
		deletedoc: '',
		deletePharma: '',
		loading: true,
	};
	componentDidMount = async () => {
		accounts = await web3.eth.getAccounts();

	}
	deletedocChange = (e) =>{
		e.preventDefault();
		this.setState({deletedoc:e.target.value});
	}
	deletePharmaChange = (e) =>{
		e.preventDefault();
		this.setState({deletePharma:e.target.value});
	}
	docChange = (e) => {
		e.preventDefault();
		this.setState({ doc: e.target.value })
	};

	pharmaChange = (e) => {
		e.preventDefault();
		this.setState({ pharmacy: e.target.value })
	}

	handleDocSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.doc);
		let c;
		try{
			c = await Authority.methods.addDoctor(this.state.doc).send({
				from: accounts[0],
				gas:'1000000'
			}
		)}
		catch(err) {
			window.alert('please enter proper Address')
		}
		console.log(c);
		
	}

	handleDocDeleteSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.deletedoc);
		let c;
		try{
			c = await Authority.methods.deleteDoctor(this.state.deletedoc).send({
				from: accounts[0],
				gas:'1000000'
			}
		)}
		catch(err) {
			window.alert('please enter proper Address')
		}
		console.log(c);
	}

	handlePharmaSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.pharmacy);
		let c;
		try{
			c = await Authority.methods.addPharmacy(this.state.pharmacy).send({
				from: accounts[0],
				gas:'1000000'
			}
		)}
		catch(err) {
			window.alert('please enter proper Address')
		}
		console.log(c);
	}

	handlePharmaDeleteSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.deletePharma);
		let c;
		try{
			c = await Authority.methods.deleteDoctor(this.state.deletePharma).send({
				from: accounts[0],
				gas:'1000000'
			}
		)}
		catch(err) {
			window.alert('please enter proper Address')
		}
		console.log(c);
	}

	render() {

		return (
			
		<div style={{ width: '80%', margin: 'auto' }}>
		{/* <Spin spinning={true} /> */}
			<h1> Indian Authority </h1>
			<hr width="200px"/>

			<br/>


				<h2>Add a doctor</h2>

				<form onSubmit={this.handleDocSubmit} >
					<label>
						{/* Add a doc: */}
						<Input 
							type="text" 
							name="doc"
							value={this.state.doc}
							onChange={this.docChange}
						/>
					</label>
					
					<Button htmlType="submit" value="Submit" >Submit</Button>
					
				</form>

					<br/><br/>

				<h2>Delete a doctor</h2>

				<form onSubmit={this.handleDocDeleteSubmit} >
					<label>
						{/* Add a doc: */}
						<Input 
							type="text" 
							name="doc"
							value={this.state.deletedoc}
							onChange={this.deletedocChange}
						/>
					</label>
					
					<Button htmlType="submit" value="Submit" >Submit</Button>
					
				</form>

				<br/><br/>

				<hr width="400px"/>
					
					<br/><br/>


				<h2>Add a Pharmacy</h2>

				<form onSubmit={this.handlePharmaSubmit} >
					<label>
						{/* Add a Pharmacy: */}
						<Input 
							type="text" 
							name="pharma"
							value={this.state.pharmacy}
							onChange={this.pharmaChange}
						/>
					</label>
					
					<Button htmlType="submit" value="Submit" >Submit </Button>
					
				</form>

				<br/><br/>

				<h2>Delete a pharmacy</h2>

				<form onSubmit={this.handlePharmaDeleteSubmit} >
					<label>
						{/* Add a Pharmacy: */}
						<Input 
							type="text" 
							name="pharma"
							value={this.state.deletePharma}
							onChange={this.deletePharmaChange}
						/>
					</label>
					
					<Button htmlType="submit" value="Submit" >Submit</Button>
					
				</form>
			
			
		</div>
		
		)
	}
}


const Manager = Form.create()(UnwrappedManager);

export default Manager;