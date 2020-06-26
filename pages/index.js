import React from 'react';
import Navigation from '../components/Navigation';
import BodyItems from '../components/BodyItems';
import Head from 'next/head';

import '../assets/css/app.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="app">
        <Head>
          <title>Save Video - Youtube Video Downloader</title>
          <meta property="og:title" content="Save Video - Youtube Video Downloader" key="title" />
          <meta property="description" content="Save Video offers the fastest way to save YouTube videos in mp3, mp4, etc. Download videos without any hassel." key="description" />
        </Head>
        <div className="container-wrapper">
          <Navigation />
          <BodyItems />
        </div>
      </div>
    )
  }
}