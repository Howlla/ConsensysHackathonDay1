import React, { Component } from 'react';
import axios from 'axios';
import {Card, Input, Table } from 'antd';
import Prescription from '../ethereum/Prescription';
import web3 from '../ethereum/web3';

const {Column } = Table;
const data = [{
  key: '1',
  Description: 'Show me im your doc',
}, {
  key: '2',
  Description:'Show me im your friend',
}, {
  key: '3',
  Description:'Show me im a data thief',
}];

const columns = [{
  title: 'Id',
  dataIndex: 'key',
  key: 'key',
}, {
  title: 'Description',
  dataIndex: 'Description',
  key: 'Description',
}];

export default class Patient extends Component {

  state = {
    data : [],
  };
  
  componentDidMount = async () => {
    axios.get('https://prescription-eth-backend.herokuapp.com/patients/1.json')
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data,
        })
      })
      // let c;
      // try {
      //  c = await  Prescription(this.state.data.prescriptions[0].address);

      // }  
  }

  render() {
    return (
      <div style = {{width:'80%', margin:'auto'}}>
        <Card style = {{width:300, margin:'auto'}}>
          <h1>Patient</h1>
          <div>
          <h5>User Address</h5>
          <Input value={this.state.data.address} style={{width:'300'}} />
          </div>
          <div>
          <h5>Prescription Address</h5>
          <Input value={this.state.data.length!=0?this.state.data.prescriptions[0].address:null} style={{width:'300'}} />
          </div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
          />
          
        </Card>
      </div>
    )
  }
}
