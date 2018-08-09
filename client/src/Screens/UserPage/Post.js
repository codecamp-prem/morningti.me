import React, { Component } from 'react';
import axios from 'axios'
import draftToHtml from 'draftjs-to-html';
import { EditorState , convertToRaw , convertFromRaw} from 'draft-js';

import config from '../../config'
import PostContainer from '../../components/Posts/PostContainer/PostContainer'
import Swal from 'sweetalert2';
import '../../Main.css'


let editorState = {};
let contentState = {};

let Personal = {
  date: {},
  totalVisirots: {},
  uniqeVisitors: {}
}

let AnalyticSchema = {
  visitorsToday: {},
  visitorsWeek: {},
  visitorsMonth: {},
  visitorsYear: {},
  visitorsAllTime: {},
}

let whichUser;
let whichPost;

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post:{},
      visitorLocation:{},
      text:''
    }
  }

  componentWillMount() {
    let userPath = this.props.location.pathname.split('/') // array with the publisher username and the post id
    config.alertD('this userPath', userPath)
    this.setState({visitorGotIn:new Date().getTime()})
    whichUser = userPath[1] // the username whom we want to read his post
    whichPost = userPath[2] // the post id of the post we want to read
    this.fetchPost(whichUser, whichPost) // fetching the data
    // this.countVisitor(whichUser, whichPost)

  }

  // componentDidMount() {
  //   window.addEventListener('beforeunload', this.countVisitor)
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', this.countVisitor)
  // }

  fetchPost = (whichUser, whichPost) => {
    axios.get(`${config.backEndServer}/fetchpost/${whichUser}/${whichPost}`)
    .then((res) => {
      if (res.data != 'post wasnt found' && res.data != 'no user found' && res.data != 'error fetching post') {
        this.setState({ // assigning all meta data to the state
          post:res.data.post,
          date:res.data.date,
          title:res.data.title,
          subtitle:res.data.subtitle,
          background:res.data.background,
          socialLink:res.data.socialLink,
          writer:res.data.fullName,
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

        } , () => {
          // docs - https://draftjs.org/docs/api-reference-data-conversion.html#content
          contentState = convertFromRaw(this.state.post); // initialize content to state from raw object we saved
          editorState = EditorState.createWithContent(contentState); // creating editor state object using the raw content we generated 
          this.setState({editorState}, () => { // setting the object content in state
            document.getElementById('content').innerHTML = draftToHtml(convertToRaw(editorState.getCurrentContent())) // converting the draft object to html and inserting it in the DOM 
          })
          config.alertD('this this.state.post', contentState)
          config.alertD('this editorState', editorState)
          config.alertD('this state in <Post/>' , this.state)
        })
      } else {
        Swal('oops', 'there isnt such post here', 'error')
        .then((result) => {
            if (result.value) {
                window.open(`${config.frontEndServer}`,);
            }
        }) 
      }
    })
  }


  // function to count visitor in the page
  // countVisitor = (whichUser, whichPost) => {
  //   axios.get('https://ip.seeip.org/json') // get user ip
  //   .then((ip) => {
  //     // the response retirn JSON with data prop which contain <ip> prop with n ip String
  //     axios.get(`http://ip-api.com/json/${ip.data.ip}`) // get user location by his ip
  //     .then((res) => { // response returned with the user location 
  //       const { visitorLocation } = this.state; // get the location object from state
  //       visitorLocation.ip = ip.data.ip; // assign the ip
  //       visitorLocation.country = res.data.country; // assign the country
  //       visitorLocation.city = res.data.city; // assign the city
  //       this.setState({visitorLocation}, () => {
  //         axios.post(`${config.backEndServer}/fetchpost/${whichUser}/${whichPost}`, { // posting it to the route so it can be assigned in the db
  //           visitor: {
  //             writer: whichUser,
  //             post: this.state.title,
  //             date: new Date(), // todays date
  //             timeSpent: new Date().getTime() - this.state.visitorGotIn, // time spent 
  //             location:this.state.visitorLocation, // location object
  //             }
  //           })
  //         })
  //       })
  //     }
  //   )
  // }


  twitterShare = () => {
    var url = `https://www.morningti.me/${whichUser}/${whichPost}`;
    var text = `Check this awesome post ${this.state.title} - ${this.state.subtitle} by ${whichUser} `;
    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
  }

      

  render() {
    return (
      <div>
        {
          this.state.editorState ? // if the data is returned render the screen
            <PostContainer
              twitterShare={this.twitterShare}
              username={whichUser}
              title={this.state.title}
              subtitle={this.state.subtitle}
              background={this.state.background}
              date={this.state.date}
              socialLink={this.state.socialLink}
              writer={this.state.writer}

              // social
              facebook={this.state.facebook}
              instagram={this.state.instagram}
              whatsapp={this.state.whatsapp}
              github={this.state.github}
              dribbble={this.state.dribbble}
              linkedin={this.state.linkedin}
              youtube={this.state.youtube}
              etsy={this.state.etsy}
              twitter={this.state.twitter}

              fbUrl={this.state.fbUrl}
              igUrl={this.state.igUrl}
              waUrl={this.state.waUrl}
              inUrl={this.state.inUrl}
              dbUrl={this.state.dbUrl}
              ytUrl={this.state.ytUrl}
              ghUrl={this.state.ghUrl}
              esUrl={this.state.esUrl}
              twUrl={this.state.twUrl}
            /> :
          null
        }
      </div> 
    );
  }
}

export default Post;
