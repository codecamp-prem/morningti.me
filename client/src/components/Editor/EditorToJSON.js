import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import config from '../../config'


// object to save content in it
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }


  // function to save content on state
  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    }, () => {
        if (config.__DEGUGGING__) {
            console.log(this.state.contentState)
        }
     });
  };

  render() {
    const { contentState } = this.state;
    return (
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={this.onContentStateChange}
      />
    );
  }
}

export default EditorConvertToJSON