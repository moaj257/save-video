import React from 'react';
import Logo from '../assets/img/logo.svg';

export default class Footer extends React.Component{
  render() {
    return (
      <div className="footer">
        <div className="container-inner footer-inner">
          <div class="left">
            <div class="subscribe-container">
              <div class="subscribe-tos">
                Subscribe us for more updates.
              </div>
              <div class="subscribe-box">
                <div class="subscribe">
                  <input type="text" class="subscribe-input" placeholder="johndoe@gmail.com" name="url" value=""/>
                </div>
                <div class="subscribe-button">
                  <button class="subscribe-btn">Sudbscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <a class="nav-item-a logo" href="#">
              <img src={Logo} class="logo" />
            </a>
            <p className="copyrights">&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    )
  }
}