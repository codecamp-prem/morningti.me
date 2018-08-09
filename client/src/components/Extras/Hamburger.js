import React from "react";
import config from '../../config'

class Hamburger extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        active:this.props.active
    }
   
}

  Style = {
    hamburger: {
        backgroundColor:'red'  

    }
  }

  componentDidMount() {
    this.setState({hamburger:document.getElementById('hamburger-btn')})
  }

//   active = false;
//   hamburgerHandler = () => {
//     config.alertD('clock')  
//     this.props.handleSidebar()
//     if (this.state.hamburger) {
//         if (!this.state.active) {
//             this.setState({active:true}, () => this.state.hamburger.classList.add('is-active'))
            
//         } else if (this.state.active) {
//             this.setState({active:false}, () => this.state.hamburger.classList.remove('is-active'))
            
//         }
//     }

//   }

  render() {
    return (
      <button
        className='hamburger-position'
        onClick={this.props.handleSidebar}
        id="hamburger-btn"
        className="hamburger hamburger--collapse  navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{
          color: "white",
          borderWidth:0
        }}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" style={{color: this.props.color}}/>
        </span>
      </button>
    );
  }
}

export default Hamburger;
