import React, { Component } from 'react';
import { Input, Button } from 'antd';

export default class Pharmacy extends Component {
  render() {
    return (
      <div>
        <h2> Dispense for -  </h2>

        <br/><br/>

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
      </div>
    )
  }
}
