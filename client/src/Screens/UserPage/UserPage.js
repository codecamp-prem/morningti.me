import React, { Component } from 'react';
import config from '../../config'
import axios from 'axios'
import ButtonMU from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import '../../Main.css'

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state={
      nickname: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).nickname : '',
      posts:[],
      mainBackground:'',
      socialLink:''
    }
  }
  

  componentWillMount() {
    document.body.style.backgroundColor = 'white'
    let userPath = this.props.location.pathname.split('/') // array with the publisher username and the post id
    config.alertD('this userPath', userPath)
    let whichUser = userPath[1].replace(',','') // the username whom we want to read his post
    this.fetchAllPosts(whichUser) // fetching the data
  }

  componentDidMount() {
    this.setState({screenWidth:window.innerWidth}) // assign the screen width to the state
    window.addEventListener("resize", () => this.resize())
  }
  
  // check and assign the user screen width
  resize = () => {
    this.setState({
      screenWidth:window.innerWidth
    }, () => {
      config.alertD('size', this.state.screenWidth)
    })
  }


  // simple call to the server to fetch all posts of the user
  fetchAllPosts = (user) => {
    config.alertD('this username', this.state.nickname)
      axios.get(`${config.backEndServer}/fetchallposts/${user}`)
      .then((res) => {
        config.alertD('data', res.data)
        if (res.data.posts) {
          this.setState({
            posts:res.data.posts,
            mainBackground:res.data.mainBackground,
            socialLink:res.data.socialLink,
            writer:res.data.fullName,
            mainTitle:res.data.mainTitle,
            mainSubtitle:res.data.mainSubtitle,

            // social
            facebook:res.data.facebook,
            instagram:res.data.instagram,
            whatsapp:res.data.whatsapp,
            github:res.data.github,
            dribbble:res.data.dribbble,
            linkedin:res.data.linkedin,
            youtube:res.data.youtube,
            etsy:res.data.etsy,
            twitter:res.data.twitter,

            fbUrl:res.data.fbUrl,
            igUrl:res.data.igUrl,
            waUrl:res.data.waUrl,
            inUrl:res.data.inUrl,
            dbUrl:res.data.dbUrl,
            ytUrl:res.data.ytUrl,
            ghUrl:res.data.ghUrl,
            esUrl:res.data.esUrl,
            twUrl:res.data.twUrl

          } , () => config.alertD('this is state', this.state))
        } else {
          this.setState({
            writer:res.data.writer,
            mainTitle:res.data.mainTitle,
            nothingHereSubTitle:res.data.mainSubtitle,
            nothingHere:true
          })
        }
      })
  }



  render() {
    return (
      <div>
      <header
        className='masthead'
        style={{
          fontFamily: 'Lora',
          backgroundImage: this.state.mainBackground ? `url( `+ this.state.mainBackground + ` )` : ``,
          position: 'relative',
          width: '100%',
          height: '100vh',
          padding: 0,
          minHeight: 105,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          backgroundSize: 'cover',
          marginBottom: this.state.nothingHere ? 0 : '5rem'
        }}
        >
          <div className="post-heading content">
            <h1>
            {this.state.mainTitle}
            </h1>
            <h2 className="subheading">
            {this.state.mainSubtitle || <a className='tell-story' href={`${config.frontEndServer}`}>{this.state.nothingHereSubTitle}</a>}
            </h2>
            <span className="meta">
            {this.state.posts.length > 0 ? 'by' : null}
            {this.state.posts.length > 0 ? <a target='_blank' href={this.state.socialLink}> {this.state.writer}</a> : null }
            </span>
          </div>
      </header>



        <div>
          <div className="ui celled list posts-list">
          {
            this.state.posts ? 
              this.state.posts.map((post) => (
                <div key={post.id} className="posts-list-iten">
                  <div className='posts-list-item-content'>
                    <div style={{fontWeight:'bold'}}>
                      <a class='user-page-post-title' href={`/${this.state.writer}/${post.id}`}>{post.title}</a>
                    </div>
                    <a className='user-page-post-subtitle' >{post.subtitle}</a>
                  </div>

                  {
                    this.state.screenWidth > 768 ? // show image with screen width above 650px
                    <div className='posts-list-img-container' ><img className="posts-list-img" src={post.background}/></div>
                    : null
                  }
                </div>
 
            )) : null
          }
          </div>


        {
          !this.state.nothingHere ? 
          <footer>
            <div style={{alignContent:'center' , marginLeft:'auto', marginRight:'auto', textAlign:'center'}} className="social-icons">

              {
                this.state.twitter ? 
                <a target='_blank' href={`https://${this.state.twUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.facebook ? 
                <a target='_blank' href={`https://${this.state.fbUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.github ? 
                <a target='_blank' href={`https://${this.state.ghUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-github fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.dribbble ? 
                <a target='_blank' href={`https://${this.state.dbUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-dribbble fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.youtube ? 
                <a target='_blank' href={`https://${this.state.ytUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-youtube fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.instagram ? 
                <a target='_blank' href={`https://${this.state.igUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-instagram fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.whatsapp ? 
                <a target='_blank' href={`https://${this.state.waUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-whatsapp fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.etsy ? 
                <a target='_blank' href={`https://${this.state.esUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-etsy fa-stack-1x fa-inverse" />
                </a> : null
              }
              {
                this.state.linkedin ? 
                <a target='_blank' href={`https://${this.state.inUrl}`} className="fa-stack fa-lg">
                  <i className="fab fa-linkedin fa-stack-1x fa-inverse" />
                </a> : null
              }

              <p className="copyright text-muted">
                built with <i style={{color:'red'}} className="fas fa-heart" /> by <a className='obiwan-link text-muted' href='https://github.com/obiwankenoobi' target='_blank'>@obiwankenoobi</a><p>  &copy; {new Date().getFullYear()}</p>
              </p>
              </div>
          </footer> : null
        }
        </div>
    </div> 
    );
  }
}

export default UserPage;
