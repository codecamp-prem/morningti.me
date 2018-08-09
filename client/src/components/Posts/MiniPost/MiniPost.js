import React, { Component } from 'react';
import axios from 'axios'
import { Card, Image } from 'semantic-ui-react'
import { EditorState, convertToRaw, ContentState , convertFromRaw } from 'draft-js';
import ButtonMU from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import config from '../../../config'

// cccs - new component
let editorState = {};
let contentState = {};
class MiniPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardWidth:'0rem',
            nickname:  JSON.parse(localStorage.getItem('user')) ?  JSON.parse(localStorage.getItem('user')).nickname : ''
        }
    }



    addWidth = () => {
        this.setState({cardWidth:'1rem'})
    }

    removeWidth = () => {
        this.setState({cardWidth:'0rem'})
    }





    
    render() {
        return (
        <div style={{margin:'0.5rem'}}>
        {
            // <Card className='mini-post' onMouseOut={this.removeWidth} onMouseOver={this.addWidth} style={{marginTop:this.state.cardWidth , transition:'0.5s'}}>
        }
            <Card className='mini-post'  style={{marginTop:this.state.cardWidth , transition:'0.5s'}}>
                <Image className='mini-post-img' src={this.props.background} />
                <Card.Content className='mini-post-content'>
                <Card.Header>{this.props.title.slice(0,20) + '...'}</Card.Header>
                <Card.Meta>
                    <span className='date'>{this.props.date}</span>
                </Card.Meta>
                <Card.Description>{this.props.subtitle.slice(0,20) + '...'}</Card.Description>
                </Card.Content>

                <div style={{marginTop:'-0.2rem',marginBottom:'1.2rem', marginLeft: 'auto', marginRight:'auto', display: 'flex', alignItems:'center', alignContent:'center'}}>
                    <ButtonMU className='mini-post-btn btn-signup sidebar-item'  variant="outlined" color="primary" onClick={this.props.goToEdit}>edit</ButtonMU>
                    {
                    // <Link style={{textDecoration: 'none'}} to={{pathname:`/${this.state.nickname}/${this.props.id}`}}>
                    //     <ButtonMU className='btn-signup sidebar-item' variant="outlined" color="primary" >show</ButtonMU>
                    // </Link>
                    }
                    <a style={{textDecoration: 'none'}} href={`/${this.state.nickname}/${this.props.id}`} target='_blank'>
                        <ButtonMU className='mini-post-btn btn-signup sidebar-item'  variant="outlined" color="primary" >show</ButtonMU>
                    </a>
                    <ButtonMU className='mini-post-btn btn-signup sidebar-item'  variant="outlined" color="primary" onClick={this.props.deletePost}>delete</ButtonMU>
                </div>
            </Card>
        </div>
        )
    }

}

export default MiniPost

