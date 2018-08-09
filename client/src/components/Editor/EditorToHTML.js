import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState , convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // eslint-disable-line no-unused-vars
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ButtonMU from '@material-ui/core/Button';
import axios from 'axios'
import { Link , Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import config from '../../config'
// import '../../css/Main.css'



class EditorToHTML extends Component {

    constructor(props) {
        super(props);

        // content holder as shown in the example on - https://jpuri.github.io/react-draft-wysiwyg/#/docs
        // populating the content state with an empty object modeled as the docs suggests thats how row js content object looks like 
        const content = {
            "entityMap":{},
            "blocks":[
                {
                    "key":"637gr",
                    "text":"",
                    "type":"unstyled",
                    "depth":0,
                    "inlineStyleRanges":[],
                    "entityRanges":[],
                    "data":{}
                }
            ]
        };
        let contentState = convertFromRaw(content); // initialize content object from raw object
        let editorState = EditorState.createWithContent(contentState); // creating EditorState object using the raw content we generated  
        config.alertD('this is contentState', contentState)
        config.alertD('this is editorState', editorState)
        this.state = {
            nickname: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).nickname : '',
            token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
            editorState, // updating the state with the EditorState object that we generated 
            title:'',
            subtitle:'',
            id: new Date().getTime().toString()
        }
    }

    componentDidMount() {
        this.populateContentState()
    }

    // if the user comes from clicking on a post this.props.editMode is passed then fetch and populate the aditor with the data from the post that has being clicked
    populateContentState = () => {
       if (this.props.editMode) {
        this.fetchDataToEditPost(this.props.nickname, this.props.id)
       }
    }


    // fetching data and converting to edito format to edit
    fetchDataToEditPost = (
        whichUser, // the nickname of whom we want to fetch data from
        whichPost // the if of the post we want to fetch
    ) => {
        config.alertD('this whichUser', whichUser)
        config.alertD('this whichPost', whichPost)
        axios.get(`${config.backEndServer}/fetchpost/${whichUser}/${whichPost}`)
        .then((res) => {
            config.alertD('this data on edit mode', res.data.post)
            let contentState = convertFromRaw(res.data.post); // initialize content to state from raw js content object we saved in the db
            let editorState = EditorState.createWithContent(contentState); // creating EditorState object using the raw content we generated 
            this.setState({
                editorState,
                title:this.props.title,
                subtitle:this.props.subtitle,
                background:this.props.background
            } , () => { // setting the EditorState object in state
                // docs - https://draftjs.org/docs/api-reference-data-conversion.html#content
                config.alertD('this this.state.post', contentState)
                config.alertD('this editorState', editorState)
            })
        })
    }

    componentWillMount() {
        // updaing the state with the user nickname
        if ( JSON.parse(localStorage.getItem('user'))) {
            this.setState({nickname:JSON.parse(localStorage.getItem('user')).nickname} , () => {
                config.alertD('this is this.state.nickname on componentWillMount' , this.state.nickname)
            })
        }
    }

    // simple handl change input function
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value; // if this is checkbox the value is thr checked attr , else the value is the value attr
        const name = target.name;

        // updating the state with the target name as key and the value var as value
        this.setState({
          [name]: value
        }, config.alertD('this state', this.state[name]));
    }



    post = () => {
        config.alertD('this nickname in localstorage', JSON.parse(localStorage.getItem('user')).nickname)
        config.alertD('this nickname state', this.state.nickname)

        let {editorState} = this.state; // getting the post from state
        let id = this.props.id || this.state.id // add new id or use the id passed from the editpost call if the user wants to edit post
        config.alertD('this is id' , id)
        axios.post(`${config.backEndServer}/uploadpost`, {
            nickname: JSON.parse(localStorage.getItem('user')).nickname, // need to see why this works and this.state.nickname == undefined
            token: JSON.parse(localStorage.getItem('user')).token, // need to see why this works and this.state.token == undefined
            post:convertToRaw(editorState.getCurrentContent()), // saving raw JS object of the content
            id: id, // post id
            title:this.state.title, // post title
            subtitle:this.state.subtitle, // post subtitle
            background:this.state.background, // post bg
            date: new Date().toDateString() // post date
        })
        .then(() => {
            Swal('yey', 'your post has been uploaded', 'success')
            .then((result) => {
                if (result.value) {
                    window.open(
                        `${config.frontEndServer}/${this.props.nickname || this.state.nickname}/${this.props.id || this.state.id}`,
                        '_blank' // <- This is what makes it open in a new window.
                      );
                }
            }) 
        })
        .catch(e => {
            console.log('couldnt post', e)
            Swal('oops', 'something went wrong, try again and if the problem continue please contact support', 'error')
        })
    }

    // set content from editor to state
    onEditorStateChange = (editorState) => {
        config.alertD(this.state.editorState)
        this.setState({
        editorState,
        });
    };


    render() {
        const { editorState } = this.state;

        const Style = {
            formInput : {
                backgroundColor:this.props.nightMode ? '#243447' : 'white' , 
                color: this.props.nightMode ? '#d3d3d3' : 'black'
            }
          }

        config.alertD('this editorState on render', editorState)
        return (
            <div>
                <div className='editor-meta-container'>
                    {
                        // < this.state.title ? this.state.title : '' > instead of  < this.state.title > fix the warning about uncontrolled component
                    }
                    <div className='editor-meta-inputs-container'>
                        <input style={Style.formInput} className='editor-meta-input editor-post-title' onChange={e => this.handleInputChange(e)} value={this.state.title ? this.state.title : ''} name="title"  type="text" placeholder="Title..." maxLength='50'/> 
                        <input style={Style.formInput} className='editor-meta-input editor-post-title' onChange={e => this.handleInputChange(e)} value={this.state.subtitle ? this.state.subtitle : ''} name="subtitle"  type="text" placeholder="Subtitle..." maxLength='100'/>    
                        <div className='editor-meta-bg-container'>
                            <input style={Style.formInput} className='editor-meta-input inline bg-input' onChange={e => this.handleInputChange(e)} value={this.state.background ? this.state.background : ''} name="background"  type="text" placeholder="background url..."/> 
                            <a href='https://pexels.com' target='_blank'><i className="fas fa-search inline search-icon"/></a> 
                        </div>    
                    </div>



                </div>

                <div className='editor-container'>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    editorStyle={{
                        border: '1px solid #d3d3d3',
                        padding: '5px',
                        borderRadius: '2px',
                        backgroundColor: this.props.nightMode ? '#d3d3d3' : '#F9FBFD'
                    }}
                    toolbarStyle={{
                        backgroundColor:this.props.nightMode ? '#243447' : '#F9FBFD' ,
                        borderWidth:0
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
                </div>       
                
                {
                    // <textarea
                    // style={{width:'50rem', height: '20rem'}}
                    // disabled
                    // value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} // show the content in HTML format 
                    // />
                }

            
                <div>
                    <ButtonMU style={{backgroundColor:this.props.nightMode ? '#243447' : '#F9FBFD' , color: this.props.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup' variant="contained" color="primary" onClick={this.post}>Post</ButtonMU>          
                </div>
            </div>
        );
    }
}

export default EditorToHTML