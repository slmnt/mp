import React, { Component } from 'react';   

class pyNav extends Component {

    constructor(props){
      super(props)
      props.set('python')
    }

    render() {
      return (
        <div>
          pyNav
        </div>
        );
  	}
}

export default pyNav;