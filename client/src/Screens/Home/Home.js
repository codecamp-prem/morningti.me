import React, { Component } from 'react';


import './bootstrap-reboot.css'
import './one-page-wonder.css'
import './bootstrap.css'
import './bootstrap-grid.css'


class Home extends Component {
  render() {
    return (
      <div>
      <header className="masthead text-center text-white">
        <div className="masthead-content">
          <div className="container">
            <h1 className="masthead-heading mb-0">Write your story</h1>
            <h2 className="masthead-subheading mb-0">
              it's time to share what you know
            </h2>
            <a href="/admin" className="write-blog-btn btn btn-primary btn-xl rounded-pill mt-5">
              Post!
            </a>

          </div>
        </div>

        {
          // <div className="bg-circle-1 bg-circle" />
          // <div className="bg-circle-2 bg-circle" />
          // <div className="bg-circle-3 bg-circle" />
          // <div className="bg-circle-4 bg-circle" />
        }

      </header>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-xl-last">
              <div className="p-5">
                <img
                  className="img-fluid"
                  src="https://images.pexels.com/photos/450279/pexels-photo-450279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt
                />
              </div>
            </div>
            <div className="col-lg-6 order-xl-first">
              <div className="p-5">
                <h2 className="display-4">For those with ideas...</h2>
                <p>
                  I know you have tons of ideas in your head. Why not share them and get some recognition? You can never know who might see it and what path it can take you! Content is everything those days, Don't stay behind. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid"
                  src="https://images.pexels.com/photos/914931/pexels-photo-914931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h2 className="display-4">For creators...</h2>
                <p>
                  If you among us, a creator. It's time the world will know about your process. No matter what is your domain expertise, it's so important to add to it some content, a written word. Not only it will make a HUGE difference with search engines, but more importantly, when someone finds you, he will know your value right away.   
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br/>
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="order-xl-last col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid"
                  src="https://images.pexels.com/photos/891674/pexels-photo-891674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt
                />
              </div>
            </div>
            <div className="order-xl-first col-lg-6">
              <div className="p-5">
                <h2 className="display-4">For dreamers...</h2>
                <p>
                  Cheers to you, the dreamers you are the best! How many times have you heard the importance of writing your dreams? Well, it's not by mistake. Writing your dreams has been proven to be an amazing "hack" to materialize your goals and make them come true, try it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <footer className="main-footer">
        <div>built with <i style={{color:'red'}} className="fas fa-heart" /> by <a className='obiwan-link' href='https://github.com/obiwankenoobi' target='_blank'>@obiwankenoobi</a><p>  &copy; {new Date().getFullYear()}</p> </div>
       </footer>
      {}
    </div>
    );
  }
}

export default Home;
