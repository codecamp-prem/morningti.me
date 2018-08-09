import React, { Component } from 'react';
import Swal from 'sweetalert2'
import ButtonMU from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from 'react-sidebar';
import config from '../../config'
import EditorToHTML from '../../components/Editor/EditorToHTML'
import MiniPostsContainer from '../../components/Posts/MiniPost/MiniPostsContainer'
import Hamburger from '../../components/Extras/Hamburger'
import '../../Main.css'

// icons

import fbGreySVG from '../../img/icons/fb/fb_grey.svg'
import fbColorSVG from '../../img/icons/fb/fb_blue.svg'

import igColorSVG from '../../img/icons/ig/ig_color.svg'
import igGreySVG from '../../img/icons/ig/ig_grey.svg'

import waColorSVG from '../../img/icons/wa/wa_color.svg'
import waGreySVG from '../../img/icons/wa/wa_grey.svg'

import dbColorSVG from '../../img/icons/db/db_color.svg'
import dbGreySVG from '../../img/icons/db/db_grey.svg'

import inColorSVG from '../../img/icons/in/in_color.svg'
import inGreySVG from '../../img/icons/in/in_grey.svg'

import ytColorSVG from '../../img/icons/yt/yt_color.svg'
import ytGreySVG from '../../img/icons/yt/yt_grey.svg'

import emailColorSVG from '../../img/icons/email/email_color.svg'
import emailGreySVG from '../../img/icons/email/email_grey.svg'

import phoneColorSVG from '../../img/icons/phone/phone_color.svg'
import phoneGreySVG from '../../img/icons/phone/phone_grey.svg'

import ghGreySVG from '../../img/icons/gh/gh_grey.svg'
import ghColorSVG from '../../img/icons/gh/gh_color.svg'

import esGreySVG from '../../img/icons/es/es_grey.svg'
import esColorSVG from '../../img/icons/es/es_color.svg'

import twGreySVG from '../../img/icons/tw/tw_grey.svg'
import twColorSVG from '../../img/icons/tw/tw_color.svg'


// import '../../css/Main.css'

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            email:'',
            nickname: '',
            fullName:'',
            nickname: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).nickname : '',
            token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '',
            sidebarOpen: false,
            screens: {
                showNewPostScreen: false,
                showMyPostScreen:false
            },


            // social
            facebook:false,
            github:false,
            instagram:false,
            whatsapp:false,
            driblll:false,
            youtube:false,
            linkedin:false,
            etsy:false,
            twitter:false,

            fbUrl: '',
            igUrl: '',
            waUrl: '',
            dbUrl: '',
            inUrl: '',
            ytUrl: '',
            ghUrl: '',
            esUrl:'',
            twUrl:'',

            nightMode: false,
            darkBg:'#141d26',
            lightBg:'#F9FBFD',

            adminTitle:'Notebook'
        }
        config.alertD('this nickname', this.state.nickname)
        this.state.nightMode ? document.body.style.backgroundColor = '#141d26' : document.body.style.backgroundColor = '#F9FBFD'
        // this.props.location.state ? config.alertD(this.props.location.state.showMyPostScreen) : config.alertD('no location.state')
    }



    componentDidMount() {
        if (this.state.nickname) { // fetch userdata if user logged in
            this.fetchUserData(this.state.nickname, this.state.token)
        }
    }

    // @@@@@@@@@@@@@@@@@@@@ SIDEBAR @@@@@@@@@@@@@@@@@@@@@@@@
    // open and close sidebar
    onSetSidebarOpen = () => {
        config.alertD('opensidebar')
        this.setState({
            sidebarOpen:!this.state.sidebarOpen,
        })
    }

    // open new post screen witout opening the sidebar //
    goToEditPost = () => {
        let { screens } = this.state;
        config.alertD(screens)
        screens.showNewPostScreen = true;
        screens.showMyPostScreen = false;
        this.setState({
            screens,
            adminTitle:'Pen & Paper'
        } , () => config.alertD(this.state.screens))
    }

    // show the new post screen
    showNewPostScreenHandler = () => {
        let { screens } = this.state;
        config.alertD(screens)
        screens.showNewPostScreen = true;
        screens.showMyPostScreen = false;
        this.setState({
            screens,
            adminTitle:'Pen & Paper'
        } , () => config.alertD(this.state.screens))
        this.onSetSidebarOpen() // close sidebar
    }

    // show my previews posts
    showMyPostScreenHandler = () => {
        config.alertD('this goToEdit', this.state)
        if (this.state.goToEditPost) {this.setState({goToEditPost:!this.state.goToEdit})}
        const { screens } = this.state
        screens.showNewPostScreen = false;
        screens.showMyPostScreen = true;
        this.setState({
            screens,
            adminTitle:'Chapters'
        })
        this.onSetSidebarOpen() // close sidebar
    }

    backToMainAdmin = () => {
        let { screens } = this.state;
        config.alertD(screens)
        screens.showNewPostScreen = false;
        screens.showMyPostScreen = false;
        this.setState({
            screens,
            adminTitle:'Notebook'
        } , () => config.alertD(this.state.screens))
        this.fetchUserData(this.state.nickname, this.state.token)
    }


    sideBarContent = () => {
        return (
            <div style={{padding:'1rem'}}>
                <ButtonMU style={{width:'10rem'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick={this.showNewPostScreenHandler}>New Post</ButtonMU>
                <ButtonMU style={{width:'10rem'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick={this.showMyPostScreenHandler}>Edit Posts</ButtonMU>
                <a style={{textDecoration: 'none'}} href={`/${this.state.nickname}`} target='_blank'>
                    <ButtonMU style={{width:'10rem'}} className='btn-signup sidebar-item ' variant="contained" color="primary" >My page</ButtonMU>
                </a>
                <ButtonMU style={{width:'10rem'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick={this.Logout}>Logout</ButtonMU>
            </div>
        )
    }
    // @@@@@@@@@@@@@@@@@@@@ SIDEBAR @@@@@@@@@@@@@@@@@@@@@@@@


    handleCheckbox = e => {
        
        let target = e.target; // getting the clicked element object
        let targetName = !target.type ? e.target.getAttribute('name') : e.target.getAttribute('value') // if the element has no 'type' attr means its the image (the checkbox) and if it has the name is the value (the radio button value)


        this.setState({
            [targetName]:!this.state[targetName] // setting new prop in the state with the targetName
        }, () => {


            if (this.state[targetName] && (targetName == 'fbBtn')) { // if the this.state[targetName] is true and the name is the name was clicked
                target.src = fbColorSVG //setting the colored icon       
                //console.log('targetName ', targetName )        
            } 
            if (!this.state[targetName] && (targetName == 'fbBtn'))  { // if the this.state[targetName] is false set the grey photo
                target.src = fbGreySVG
            }


            if (this.state[targetName] && (targetName == 'ghBtn')) {
                target.src = ghColorSVG //setting the colored icon               
            } 
            if (!this.state[targetName] && (targetName == 'ghBtn'))  {
                target.src =ghGreySVG
            }


            if (this.state[targetName] && (targetName == 'igBtn')) {
                target.src = igColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'igBtn'))  {
                target.src =igGreySVG
            }


            if (this.state[targetName] && (targetName == 'waBtn')) {
                target.src = waColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'waBtn'))  {
                target.src = waGreySVG
            }


            if (this.state[targetName] && (targetName == 'dbBtn')) {
                target.src = dbColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'dbBtn'))  {
                target.src = dbGreySVG
            }


            if (this.state[targetName] && (targetName == 'inBtn')) {
                target.src = inColorSVG
            }                 
            if (!this.state[targetName] && (targetName == 'inBtn'))  {
                target.src = inGreySVG
            }


            if (this.state[targetName] && (targetName == 'ytBtn')) {
                target.src = ytColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'ytBtn'))  {
                target.src = ytGreySVG
            }


            if (this.state[targetName] && (targetName == 'esBtn')) {
                target.src = esColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'esBtn'))  {
                target.src = esGreySVG
            }


            if (this.state[targetName] && (targetName == 'twBtn')) {
                target.src = twColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'twBtn'))  {
                target.src = twGreySVG
            }


            if (this.state[targetName] && (targetName == 'emailBtn')) {
                target.src = emailColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'emailBtn'))  {
                target.src = emailGreySVG
            }


            if (this.state[targetName] && (targetName == 'phoneBtn')) {
                target.src = phoneColorSVG
            } 
            if (!this.state[targetName] && (targetName == 'phoneBtn'))  {
                target.src = phoneGreySVG
            }

        })

    }

    // function to handle input change 

    // handleInputChange = (e) => {
    //     const target = e.target;
    //     const value = target.value; // if this is checkbox the value is thr checked attr , else the value is the value attr
    //     const name = target.name;

    //     // updating the state with the target name as key and the value var as value
    //     this.setState({
    //       [name]: value
    //     });
    // }

    // advenced function to handle change

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value; // if this is checkbox the value is thr checked attr , else the value is the value attr
        const name = target.name;
        //console.log('this is isIcon' , value)
        if (target.type === 'radio') {
            this.handleCheckbox(e)
        }
    
        // updating the state with the target name as key and the value var as value
        this.setState({
          [name]: value
        });
    }


    addNightMode = () => {
        this.setState({nightMode:!this.state.nightMode}, () => {
            this.state.nightMode ? document.body.style.backgroundColor = '#141d26' : document.body.style.backgroundColor = '#F9FBFD'
            axios.post(`${config.backEndServer}/nightmode`, {
                nightMode:this.state.nightMode,
                token:this.state.token,
                nickname:this.state.nickname,
            })
        })
    }

    


    // updating the meta data for the user
    updateUserPage = () => {
        
        axios.post(`${config.backEndServer}/updateuserpage`, {
            nickname:this.state.nickname, // the nickname of user
            socialLink:this.state.socialLink, // the main user social media link
            mainBackground:this.state.mainBackground , // the main bg for the user blog
            mainTitle:this.state.mainTitle, // the main title for user blog
            mainSubtitle:this.state.mainSubtitle, // the main subtitle for user blog

            // social
            facebook:this.state.fbBtn,           // user facebook 
            github:this.state.ghBtn,             // user github link 
            instagram:this.state.igBtn,          // user ig
            whatsapp:this.state.waBtn,           // user wa
            dribbble:this.state.dbBtn,           // uerd dribbble
            linkedin:this.state.inBtn,           // user linkedin
            youtube:this.state.ytBtn,            // user youtube
            etsy:this.state.esBtn,               // user etsy
            twitter:this.state.twBtn,              

            fbUrl:this.state.fbUrl,
            igUrl:this.state.igUrl,
            waUrl:this.state.waUrl,
            inUrl:this.state.inUrl,
            dbUrl:this.state.dbUrl,
            ytUrl:this.state.ytUrl,
            ghUrl:this.state.ghUrl,
            esUrl:this.state.esUrl,
            twUrl:this.state.twUrl,

            // token
            token:this.state.token
        })
        .then((res) => {

            Swal('yey', 'your update submited', 'success')

            this.setState({
                mainBackground:res.data.mainBackground,
                socialLink:res.data.socialLink
            })
        })
        .catch(e => console.log('couldnt update page', e))
    }



    // fetching meta data for the user
    fetchUserData = (nickname, token) => {
        config.alertD('backend server', config.backEndServer)
        axios.get(`${config.backEndServer}/updateuserpage/${nickname}/${token}`) 
        .then((res) => {
            config.alertD('res.data', res.data)
            this.setState({
                mainBackground:res.data.mainBackground,
                socialLink:res.data.socialLink,
                mainTitle:res.data.mainTitle, // the main title for user blog
                mainSubtitle:res.data.mainSubtitle, // the main subtitle for user blog

                nightMode: res.data.nightMode,

                // social
                fbBtn:res.data.facebook,
                igBtn:res.data.instagram,
                waBtn:res.data.whatsapp,
                dbBtn:res.data.dribbble,
                ytBtn:res.data.youtube,
                ghBtn:res.data.github,
                inBtn:res.data.linkedin,
                esBtn:res.data.etsy,
                twBtn:res.data.twitter,

                fbUrl:res.data.fbUrl,
                igUrl:res.data.igUrl,
                waUrl:res.data.waUrl,
                inUrl:res.data.inUrl,
                dbUrl:res.data.dbUrl,
                ytUrl:res.data.ytUrl,
                ghUrl:res.data.ghUrl,
                esUrl:res.data.esUrl,
                twUrl:res.data.twUrl,
            }, () => {
                config.alertD('state', this.state)

                // coloring the user social buttons based on the response
                if (this.state.fbBtn) {
                    document.getElementById('fbEl').src = fbColorSVG
                }
                if (this.state.igBtn) {
                    document.getElementById('igEl').src = igColorSVG
                }
                if (this.state.waBtn) {
                    document.getElementById('waEl').src = waColorSVG
                }
                if (this.state.dbBtn) {
                    document.getElementById('dbEl').src = dbColorSVG
                }
                if (this.state.ytBtn) {
                    document.getElementById('ytEl').src = ytColorSVG
                }
                if (this.state.ghBtn) {
                    document.getElementById('ghEl').src = ghColorSVG
                }
                if (this.state.inBtn) {
                    document.getElementById('inEl').src = inColorSVG
                }
                if (this.state.esBtn) {
                    document.getElementById('esEl').src = esColorSVG
                }
                if (this.state.twBtn) {
                    document.getElementById('twEl').src = twColorSVG
                }


                // update body background color
                if (res.data.nightMode) {
                    document.body.style.backgroundColor = '#141d26'
                } 
                if (!res.data.nightMode) {
                    document.body.style.backgroundColor = '#F9FBFD'
                }
            })
        })
        .catch(e => console.log('couldnt update page', e))
    }



    // @@@@@@@@@@@@@@@@@@@@@@@ AUTH @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@ AUTH @@@@@@@@@@@@@@@@@@@@@@@@@


    // removing isHaveAccount flag to show the signup
    moveToSignup = (e) => {
        this.setState({isHaveAccount:!this.state.isHaveAccount})
    }


    // simple signup
    Signup = (e) => {
        e.preventDefault()
        if (!this.state.email) {Swal('oops', 'please add email', 'error')}
        else if (!this.state.nickname) {Swal('oops', 'please add username', 'error')}
        else if (!this.state.password) {Swal('oops', 'please add password', 'error')}
        else if (!this.state.fullName) {Swal('oops', 'please add your full name', 'error')}
        else {
            axios.post(`${config.backEndServer}/signup`, {
                email:this.state.email,
                password:this.state.password,
                nickname:this.state.nickname.toLowerCase(),
                fullName:this.state.fullName,
                dateOfRegistration: new Date()
            })
            .then((res) => {
                config.alertD('res' , res.data)
                if (res.data.errors) { // check for errors
                    if (res.data.errors.email) { // check for email exist error
                        Swal('oops', 'this email already axist', 'error')
                    }
                    else if (res.data.errors.nickname) {
                        Swal('oops', 'this username already axist', 'error')
                    }
                } else if (res.data.name == 'UserExistsError') {
                    Swal('oops', 'this email already axist', 'error')
                } else if (res.data == 'illegal_name') {
                    Swal('oops', 'this username already axist', 'error')
                }
                else {
                    this.setState({isHaveAccount:true}, () => {
                        Swal('hey!', 'thank you! please check your email for activating your account', 'success')
                    })
                }
            })
            .catch(e => console.log('couldnt signup', e))
        }
    }

    // simple login
    Login = (e) => {
        e.preventDefault()
        if (!this.state.email) {Swal('oops', 'please add email', 'error')}
        else if (!this.state.password) {Swal('oops', 'please add password', 'error')}
        else {
            axios.post(`${config.backEndServer}/login`, {
                username:this.state.email,
                password:this.state.password,
            })
            .then((res) => {
                if (res.data.user) {
                    const user = res.data.user
                    this.fetchUserData(user.nickname, res.data.token)
                        this.setState({
                            nickname:user.nickname,
                            token:res.data.token
                        } , () => {
                            localStorage.setItem('user', JSON.stringify({
                                nickname:user.nickname,
                                token:res.data.token
                            }));
                            config.alertD('token', JSON.parse(localStorage.getItem('user')).token )
                        })
                    }
                })
            .catch(e => {
                console.log('couldnt login', e)
                if (e == 'Error: Request failed with status code 401') {
                    Swal('oops','nickname or passworg is wrong', 'error')
                }
            })
        }
    }

    // simple logout call
    Logout = (e) => {
        e.preventDefault()
        axios.post(`${config.backEndServer}/logout`, {
            nickname:JSON.parse(localStorage.getItem('user')).nickname,
            token: JSON.parse(localStorage.getItem('user')).token 
        })
        .then((res) => {
            this.setState({nickname:''}, () => {
                localStorage.clear();
                window.location.reload();
            })
            
        })
        .catch(e => console.log('logout', e))
    }

    // @@@@@@@@@@@@@@@@@@@@@@@ AUTH @@@@@@@@@@@@@@@@@@@@@@@@@
    // @@@@@@@@@@@@@@@@@@@@@@@ AUTH @@@@@@@@@@@@@@@@@@@@@@@@@


  render() {
      const nickname = this.state.nickname // the nickname of user
      const token = this.state.token
      const screens = this.state.screens // screens state
      const showMyPostScreen  = this.props.location.stateshowMyPostScreen || null

      const Style = {
          formInput : {
            backgroundColor:this.state.nightMode ? '#243447' : 'white' , 
            color: this.state.nightMode ? '#d3d3d3' : 'black'
        }
      }

    return (
        <div style={{backgroundColor:this.state.nightMode ? '#141d26' : '#F9FBFD', height: '100%'}}>
            {
                token ? 
                <div className='admin-signup-section container-signup container'>
                <h1 style={{color:this.state.nightMode ? '#243447' : '#161616'}} >{this.state.adminTitle}</h1> 
                {
                    // show back button if user in one of the sections
                    screens.showNewPostScreen || screens.showMyPostScreen ? 
                    <div className='hamburger-position'>
                        <ButtonMU style={{width:'10rem', backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick=  {this.backToMainAdmin}>Back</ButtonMU>
                    </div> : null
                }
                {
                    // <Sidebar 
                    //     sidebar={
                    //         <div style={{backgroundColor:'white', height:'100%'}}>
                    //             {this.sideBarContent()}
                    //         </div>
                    //     }
                    //     open={this.state.sidebarOpen}
                    //     onSetOpen={this.onSetSidebarOpen}>
                    //     <h1>Admin</h1> 
                    //     <div className='hamburger-position'>
                    //     <Hamburger 
                    //         handleSidebar={this.onSetSidebarOpen}
                    //     />
                    //     </div>
                }


                        {
                            !screens.showNewPostScreen && !screens.showMyPostScreen ? 
                            <div className='admin-panel' >     
                            <div className='admin-content'>  
                            <div className=" admin-panel-btn admin-block">
                                <input className='admin-title-input' style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.mainTitle ? this.state.mainTitle : ''} maxLength='50' name="mainTitle"  type="text" placeholder="your blog Title..."/> 
                                <input className='admin-title-input' style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.mainSubtitle ? this.state.mainSubtitle : ''} maxLength='100' name="mainSubtitle"  type="text" placeholder="your blog Subtitle..."/> 

                                <div className='editor-meta-inputs-container'>
                                    <input className='editor-meta-input inline bg-input' style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.mainBackground ? this.state.mainBackground : ''} name="mainBackground"  type="text" placeholder="add main background"/> 
                                    <a href='https://pexels.com' target='_blank'><i className="fas fa-search inline search-icon"/></a> 
                                </div> 

                                <img style={{borderRadius:5, width:'20rem', height:'auto', marginBottom:'1rem'}} src={this.state.mainBackground}/>

                            </div>

                            <div className='admin-block'>  
                                <div className='block-panel'>
                                    <div className=" admin-panel-btn">
                                        <a style={{textDecoration: 'none'}} href={`/${this.state.nickname}`} target='_blank'>
                                            <ButtonMU style={{width:'9rem', backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item ' variant="contained" color="primary" >My page</ButtonMU>
                                        </a>
                                    </div>
                                
                                    <div className=" admin-panel-btn">
                                        <ButtonMU style={{width:'9rem', backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick={this.showMyPostScreenHandler}>Edit Posts</ButtonMU>
                                    </div>
                                </div>
                            
                                <div className=" admin-panel-btn">
                                    <ButtonMU style={{width:'19rem' , backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item' variant="contained" color="primary" onClick={this.showNewPostScreenHandler}>New Post</ButtonMU>
                                </div>

                                <div className=" admin-panel-btn">
                                    <ButtonMU style={{width:'9rem', position:'absolute', top:'1rem', left:'1rem', border:'none', backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item' variant="outlined" color="primary" onClick={this.Logout}>Logout</ButtonMU>
                                </div>

                                <div className=" admin-panel-btn">
                                    <ButtonMU style={{width:'9rem', position:'absolute', top:'1rem', right:'1rem', border:'none', backgroundColor:this.state.nightMode ? '#141d26' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} className='btn-signup sidebar-item' variant="outlined" color="primary" onClick={this.addNightMode}> {this.state.nightMode ? <i style={{fontSize:'2rem'}} className="fas fa-sun"></i> : <i style={{fontSize:'2rem'}} className="fas fa-moon"></i> }</ButtonMU>
                                </div>

                                {
                                    // social icons picker
                                    <div className='social-section'>
                                        <div style={{flex:1, marginBottom:'2.5rem'}}> {/* all the icons that represent the user social media*/}                      
                                            <img id='fbEl' src={fbGreySVG} className='social-picker-icon'  name="fbBtn" onClick={e => this.handleCheckbox(e)}/>
                                            <img id='igEl' src={igGreySVG} className='social-picker-icon' name="igBtn" onClick={e => this.handleCheckbox(e)}/>
                                            {
                                                // <img id='waEl' src={waGreySVG} className='social-picker-icon'  name="waBtn" onClick={e => this.handleCheckbox(e)}/>
                                            }
                                            <img id='dbEl' src={dbGreySVG} className='social-picker-icon' name="dbBtn" onClick={e => this.handleCheckbox(e)}/>
                                            <img id='inEl' src={inGreySVG} className='social-picker-icon' name="inBtn" onClick={e => this.handleCheckbox(e)}/>
                                            <img id='ytEl' src={ytGreySVG} className='social-picker-icon' name="ytBtn" onClick={e => this.handleCheckbox(e)}/>
                                            <img id='ghEl' src={ghGreySVG} className='social-picker-icon' name="ghBtn" onClick={e => this.handleCheckbox(e)}/>   
                                            <img id='esEl' src={esGreySVG} className='social-picker-icon' name="esBtn" onClick={e => this.handleCheckbox(e)}/> 
                                            <img id='twEl' src={twGreySVG} className='social-picker-icon' name="twBtn" onClick={e => this.handleCheckbox(e)}/>          
                                        </div>
        
                                        <div>
                                            {
                                                this.state.fbBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.fbUrl ? this.state.fbUrl : ''} name="fbUrl"  type="text" placeholder="enter facebook url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.igBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.igUrl ? this.state.igUrl : ''} name="igUrl"  type="text" placeholder="enter instagram url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.waBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.waUrl ? this.state.waUrl : ''} name="waUrl"  type="text" placeholder="enter whatsapp url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.dbBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.dbUrl ? this.state.dbUrl : ''} name="dbUrl"  type="text" placeholder="enter dribbble url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.inBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.inUrl ? this.state.inUrl : ''} name="inUrl"  type="text" placeholder="enter linkedin url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.ytBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.ytUrl ? this.state.ytUrl : ''} name="ytUrl"  type="text" placeholder="enter youtube url" /> 
                                                : null
                                            }
                                            
                                            {
                                                this.state.ghBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.ghUrl ? this.state.ghUrl : ''} name="ghUrl"  type="text" placeholder="enter github url" /> 
                                                : null
                                            }
        
                                            {
                                                this.state.esBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.esUrl ? this.state.esUrl : ''} name="esUrl"  type="text" placeholder="enter etsy url" /> 
                                                : null
                                            }

                                            {
                                                this.state.twBtn ? 
                                                <input className='admin-form'  style={Style.formInput} onChange={e => this.handleInputChange(e)} value={this.state.twUrl ? this.state.twUrl : ''} name="twUrl"  type="text" placeholder="enter twitter url" /> 
                                                : null
                                            }
                                        </div>
                                    </div>   
                                    }

                                </div>   
                            </div>
                           
                            <div style={{marginTop:'5px' , width:'100%' }}>
                                <ButtonMU className='btn-signup' style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#d3d3d3' : 'black'}} variant="contained" color="primary" onClick={this.updateUserPage}>update</ButtonMU>
                            </div>
                            
                        </div>      
                            : null
                        }
                        
                        { 
                            // render post editor
                            screens.showNewPostScreen ? 
                            <div>
                                <EditorToHTML
                                    nightMode={this.state.nightMode}
                                />
                            </div> : 
                            null
                        }

                        {
                            // render my posts
                            screens.showMyPostScreen ? 
                            <div>
                                <MiniPostsContainer
                                    goToEditPost={this.goToEditPost}
                                    nightMode={this.state.nightMode}
                                />
                            </div>
                             : null
                        }

                   {
                   // </Sidebar>
                   } 
                </div>

                :

                <div style={{height:'100vh', justifyContent:'center', textAlign:'center'}}>
                {
                    this.state.isHaveAccount ? 
                    <div className='signup-section'>
                        <h3>Login</h3>
                        <div>
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.email} name="email"  type="text" placeholder="email"/>
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.password} name="password"  type="password"  placeholder="password" />
                                <br/>
                            <ButtonMU style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} className='btn-signup' variant="contained" color="primary" onClick={this.Login}>Login</ButtonMU>
                            <ButtonMU style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} className='btn-signup' variant="contained" color="primary" onClick={(e) => this.moveToSignup(e)}>I dont have account</ButtonMU>
                                <br/>
                            <Link 
                                style={{textDecoration: 'none'}} 
                                to={{
                                    pathname:'/resetpassword'
                                }}
                                >
                                <ButtonMU style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} className='btn-signup forgot-pw-btn' variant="outlined" color="primary" >forgot password?</ButtonMU>
                            </Link>
                        </div> 
                    </div>              
                    :   
                    <div className='signup-section' style={{height:'100vh', textAlign:'center'}} >
                        <h3>Signup</h3>
                        <div>
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.email} name="email"  type="text" placeholder="email" />
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.fullName} name="fullName"  type="text" placeholder="full name" />
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.nickname} name="nickname"  type="text" placeholder="nickname" />
                            <input style={Style.formInput} className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.password} name="password"  type="password"  placeholder="password" />
                            <br/>
                            <div style={{display:'inline-block'}}>
                                <ButtonMU style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} className='btn-signup' variant="contained" color="primary" onClick={this.Signup}>Signup</ButtonMU>
                                <ButtonMU style={{backgroundColor:this.state.nightMode ? '#243447' : '#F9FBFD' , color: this.state.nightMode ? '#F9FBFD' : 'black'}} className='btn-signup' variant="contained" color="primary" onClick={() => this.moveToSignup()}>I have account</ButtonMU>
                            </div>
                        </div>  
                    </div>
                }                  
            </div>
            }
        </div> 
    );
  }
}

export default Admin;
