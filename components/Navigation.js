import React from 'react';
import Logo from '../assets/img/logo.svg';

export default class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <div className="container-inner navigation-inner">
          <div className="left">
            <a className="nav-item-a logo" href="#">
              <img src={Logo} className="logo" />
            </a>
          </div>
          <div className="right">
            <ul className="nav-items">
              <li className="nav-item">
                <a className="nav-item-a" href="#">Extension</a>
              </li>
              <li className="nav-item">
                <a className="nav-item-a" href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}