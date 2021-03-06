import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import ButtonMU from '@material-ui/core/Button';
import axios from 'axios'
import Swal from 'sweetalert2'
import config from '../../config'
import '../../Main.css'

const Style = {
    container: {
        width:'80%',
        flex: 1,
        textAlign: 'center',
        marginLeft:'auto',
        marginRight:'auto',
    }
}

class AskResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:''
        }

    }



    // get query params - this.props.match.params.redirectParam


        // simple login
        sendResetEmail = (e) => {
            e.preventDefault()
            axios.post(`${config.backEndServer}/resetpasswordemail`, {
                email:this.state.email,
            })
            .then((res) => {
                if (res.data != 'no user found') {
                    Swal ('Thanks','check email for link to reset your passwrod(:', 'success')
                    localStorage.setItem('user', JSON.stringify({
                        isHaveAccount:false, 
                        isLogin:false
                    }));
                } else {
                    Swal ('oop', 'no user with tham email was found', 'error')
                }
            })
            .catch(e => console.log('couldnt login', e))
            this.setState({email:''})
        }

        handleInputChange = (e) => {
            //e.preventDefault()
            
            const target = e.target;
            const value = target.value;
            const name = target.name;
            // updating the state with the target name as key and the value var as value
            this.setState({
              [name]: value
            }, () => {
                if(config.__DEBUGGING__) {
                    console.log(this.state[name])
                }
            });
        }
    


    render() {
        
        const Style = {
            formInput : {
              backgroundColor:this.state.nightMode ? '#243447' : 'white' , 
              color: this.state.nightMode ? '#d3d3d3' : 'black'
          }
        }


        return(
            <div style={{backgroundColor:'#F9FBFD', height:'100vh', justifyContent:'center', textAlign:'center'}}>
                <div className='reset-pw-section'>
                
                    <h3 className='forgot-pass'>enter email</h3>
                    <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.email} name="email" type="text" placeholder="email"/>
                    <br/>
                    <ButtonMU className='btn-signup' style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} variant="contained" color="primary" onClick={this.sendResetEmail}>reset</ButtonMU>
                    
                </div>
            </div>

        )
    }
}

export default AskResetPassword