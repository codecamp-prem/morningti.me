import React , { Component } from "react";
import MiniPostsContainer from '../MiniPost/MiniPostsContainer'
import ButtonMU from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './PostContainer.css'
import config from "../../../config";





class PostContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    config.alertD('this props', this.props)
  }
  

  Style = {
    masthead: { 
      fontFamily: 'Lora',
      backgroundImage: `url( `+ this.props.background + ` )`,
      position: 'relative',
      width: '100%',
      height: '100vh',
      padding: 0,
      minHeight: 105,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
      backgroundSize: 'cover',
  
    },
  
  }


  // not working - function to show thw twitter share btn when element is in view port
  // isInViewport = (element) => {
  //   var rect = element.getBoundingClientRect();
  //   var html = document.documentElement;
  //   console.log(window.innerHeight)
  //   if (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || html.clientHeight) &&
  //     rect.right <= (window.innerWidth || html.clientWidth)
  //   ) {
  //     console.log(window.innerHeight)
  //     this.setState({
  //       showShareBtn:true
  //     })
  //   } else {
  //     console.log(window.innerHeight)
  //     this.setState({
  //       showShareBtn:false
  //     })
  //   }
  // }


  render() {
    return (
      <div>
      <header
        className='masthead'
        style={this.Style.masthead}
        >
          <div className="post-heading content">
            <h1 className='post-title'>
              {this.props.title}
            </h1>
            <h2 className="subheading">
              {this.props.subtitle}
            </h2>
            <span className="meta">
              by
              <a target='_blank' href={this.props.socialLink}> {this.props.writer}</a>
              <div style={{marginTop:'5px'}}>
                {this.props.date} 
              </div>
            </span>
          </div>
      </header>
      
        <div className='content' id='content'/>
        
        <footer>
          <div style={{alignContent:'center' , marginLeft:'auto', marginRight:'auto', textAlign:'center'}} className="social-icons">

          {
            this.props.twitter ? 
            <a target='_blank' href={`https://${this.props.twUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-twitter fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.facebook ? 
            <a target='_blank' href={`https://${this.props.fbUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.github ? 
            <a target='_blank' href={`https://${this.props.ghUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-github fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.dribbble ? 
            <a target='_blank' href={`https://${this.props.dbUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-dribbble fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.youtube ? 
            <a target='_blank' href={`https://${this.props.ytUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-youtube fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.instagram ? 
            <a target='_blank' href={`https://${this.props.igUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-instagram fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.whatsapp ? 
            <a target='_blank' href={`https://${this.props.waUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-whatsapp fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.etsy ? 
            <a target='_blank' href={`https://${this.props.esUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-etsy fa-stack-1x fa-inverse" />
            </a> : null
          }
          {
            this.props.linkedin ? 
            <a target='_blank' href={`https://${this.props.inUrl}`} className="fa-stack fa-lg">
              <i className="fab fa-linkedin fa-stack-1x fa-inverse" />
            </a> : null
          }

          <p className="copyright text-muted">
            built with <i style={{color:'red'}} className="fas fa-heart" /> by <a className='obiwan-link text-muted' href='https://github.com/obiwankenoobi' target='_blank'>@obiwankenoobi</a><p>  &copy; {new Date().getFullYear()}</p>
          </p>
          </div>
      </footer>
      </div>
    );
  }
}

export default PostContainer;
