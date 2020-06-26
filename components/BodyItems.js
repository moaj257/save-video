import React from 'react';
import api from '../utils/api';
import {itags} from '../utils/constants';

export default class BodyItems extends React.Component {
  state = {
    url: '',
    isFetching: false,
    vData: null,
    info: null,
  };

  secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? `${h}: ` : "";
    var mDisplay = m > 0 ? `${m}: ` : "";
    var sDisplay = s > 0 ? `${s}` : "";
    return hDisplay + mDisplay + sDisplay;
  }

  bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  handleFetch = async () => {
    this.setState({ isFetching: true, info: null });
    const {url} = this.state;
    const video = await api.get(`/info?url=${url}`);
    const {data} = video;
    const {info} = data;
    const {description, title, length_seconds, related_videos, video_id, video_url, formats} = info;
    let vFormats = [];
    formats.map(format => {
      const {itag, url, contentLength} = format;
      const cInfo = itags[itag];
      const size = contentLength && this.bytesToSize(contentLength) || 0;
      cInfo && vFormats.push({...cInfo, url, size, itag});
    });
    const img = `https://i.ytimg.com/vi/${video_id}/hqdefault.jpg`;
    this.setState({ isFetching: false, vData: `${vFormats[0].itag}_${vFormats[0].format}`, info: {description, title, time: this.secondsToHms(length_seconds), related_videos, video_id, video_url, img, formats: vFormats} });
  }

  handleDownload = () => {
    const {download} = this.refs;
    download.click();
  }

  handleChange = ({target}) => this.setState({[target.name]: target.value});

  render() {
    const {url, isFetching, info, vData} = this.state;

    return (
      <div className="body-items">
        <div className="container-inner">
          <div className="body-heading">
            Online Video Downloader
          </div>
          <div className="search-container">
            <div className="search-box">
              <div className="search">
                <input type="text" className="search-input" name="url" placeholder="https://www.youtube.com/watch?v=vZqzVoFU0QY" value={url} onChange={this.handleChange} />
              </div>
              <div className="search-button">
                <button className="search-btn" onClick={this.handleFetch} disabled={isFetching}>{isFetching ? `Loading` : `Fetch`}</button>
              </div>
            </div>
            <div className="search-tos">
              By using our service you accept our <a href="#" className="inner-a">Terms of service</a> and <a href="#" className="inner-a">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="body-heading">
            How to download?
          </div>
          {info && (
            <div className="download-item">
              <div className="video-thumbnail">
                <img className="video-thumb" src={info.img} />
              </div>
              <div className="video-desc">
                <div className="video-data">
                  <div className="video-title single-line">{info.title}</div>
                  <div className="video-timing">{info.time}</div>
                </div>
                <div className="download-button">
                  <div className="formats">
                    <a target="_blank" href={`/api/download?url=${info.video_url}&vname=${info.title}&itag=${vData && vData.split('_')[0]}&format=${vData && vData.split('_')[1]}`} style={{display: 'none'}} ref={'download'}>Download Url</a>
                    <select className="formats-selector" name="vData" value={vData} onChange={this.handleChange}>
                    {info.formats.map((format, i) => (
                      <option className="format" value={`${format.itag}_${format.format}`} key={`format-${i}`}>{`${format.type}${format.quality !== '-' ? `_${format.quality}` : ''}.${format.format} ${format.disp ? `(${format.disp})` : ''} ${format.size ? `(${format.size})` : ''}`}</option>
                      /* selected={vData === `${format.itag}_${format.format}`} */
                    ))}
                    </select>
                  </div>
                  <button className="download-btn" onClick={this.handleDownload}>Download</button>
                </div>
              </div>
            </div>
          )}
          <div className="recomendations">
            We recomend you to install our <a href="#" className="inner-a">SaveVideo Downloader</a> to download from <a href="#" className="inner-a">Youtube</a> in 1 click!
          </div>
        </div>
      </div>
    )
  }
}