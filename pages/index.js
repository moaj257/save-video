import React from 'react';
import Navigation from '../components/Navigation';
import BodyItems from '../components/BodyItems';

import '../assets/css/app.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="container-wrapper">
          <Navigation />
          <BodyItems />
        </div>
      </div>
    )
  }
}