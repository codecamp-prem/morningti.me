import React, { Component } from 'react'
import { Card , Transition} from 'semantic-ui-react'
import MiniPost from './MiniPost'
import axios from 'axios'
import config from '../../../config'
import Editor from '../../Editor/EditorToHTML'
import Swal from 'sweetalert2'


class MiniPostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            posts: [],
            nickname:  JSON.parse(localStorage.getItem('user')) ?  JSON.parse(localStorage.getItem('user')).nickname : ''
         };
    }

    componentDidMount() {
        this.fetchAllPosts()
    }

    // simple call to the server to fetch all posts of the user
    fetchAllPosts = () => {
        axios.get(`${config.backEndServer}/fetchallposts/${this.state.nickname}`)
        .then((res) => {
            this.setState({posts:res.data.posts} , () => config.alertD('this is posts', this.state.posts))
        })
    }

    // setting the goToEdit flag back to false to re render the posts
    goBackToPosts = () => {
        config.alertD('going back')
        this.setState({goToEdit:false}, () =>  config.alertD('remove edit mode', this.state.goToEdit))
    }

    deletePost = (id) => {
        Swal({
            title: 'Are you sure you want to delte it?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                axios.post(`${config.backEndServer}/deletepost`, {
                    token:JSON.parse(localStorage.getItem('user')).token, // token access
                    nickname:this.state.nickname, // user nickname
                    postId:id // post id 
                })
                .then(() => {
                    this.fetchAllPosts() // refresh the posts
                })
                .catch((e) => console.log('couldnt delete post'))
            }
        })

    }




    render() {

        
        return (
            <div className='mini-posts-main-container container' style={{width:'100%',marginLeft:'auto', marginRight:'auto', margin:0, padding:0, backgroundColor:this.props.nightMode ? '#141d26' : '#F9FBFD'}}>
            {   
                !this.state.goToEdit ? 
                <Card.Group style={{marginLeft:'auto', marginRight:'auto'}}  as={Card.Group} duration={300} divided size='huge'>
                {
                    this.state.posts ? 
                    this.state.posts.map((post) => {
                        return (
                            <div className='mini-posts-container'  key={post.id}>
                                <MiniPost 
                                    deletePost={() => this.deletePost(post.id)}
                                    id={post.id}
                                    title={post.title}
                                    subtitle={post.subtitle}
                                    background={post.background}
                                    goToEdit={() => this.setState({
                                        goToEdit:true, // here we set goToEdit flag to render the editor with the post data
                                        id:post.id, 
                                        title:post.title,
                                        subtitle:post.subtitle,
                                        background:post.background
                                    })}
                                />
                            </div>
                        )
                    }) 
                    : 
                    <div style={{justifyContent:'center', margin:'auto', marginTop:'10rem'}}>
                        <h1 style={{textAlign:'center', color:'#d3d3d3'}} >Nothing here yet! :(</h1>
                    </div>
                }
                </Card.Group> : 
                // fetching the editor with the specific post data to render editor with specific post
                <Editor
                    nightMode={this.props.nightMode}
                    goBack={this.goBackToPosts} // passing the goback to post function
                    editMode={true} // flag to tell the editor we on editMode to fetch there the content from this data we passed
                    id={this.state.id ? this.state.id : null}
                    title={this.state.title ? this.state.title : null}
                    subtitle={this.state.subtitle ? this.state.subtitle : null}
                    background={this.state.background ? this.state.background : null}
                    date={this.state.date ? this.state.date : null}
                    nickname={JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).nickname : null}
                />

            }

            </div>
        );
    }
}

export default MiniPostsContainer;