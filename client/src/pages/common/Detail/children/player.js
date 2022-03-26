import React, { Component } from "react";
import ReactDOM from "react-dom";
import closeIcon from '../../../../assets/close.webp'
import flvjs from 'flv.js'

class Player extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = "modal play-wrap";
  }

  contentRef = React.createRef();

  render() {
    const {url, onClose} = this.props;
    return ReactDOM.createPortal(<div className="player">
      <div className="close" onClick={onClose}>
        <img src={closeIcon} alt=""/>
      </div>
      <video className="player-content" ref={this.contentRef}></video>
    </div>, this.el);
  }

  componentDidMount() {
    document.querySelector("body").appendChild(this.el);

    // 创建播放器
    if (flvjs.isSupported()) {
      console.log(this.props.url);
          var videoElement = this.contentRef.current;
          var flvPlayer = flvjs.createPlayer({
              type: this.props.url.endsWith('mp4')?'mp4':'webp',
              url: this.props.url
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();

          videoElement.addEventListener('ended', ()=>{
            console.log('ended');
          }, false);

      }
  }
  componentWillUnmount() {
    document.querySelector("body").removeChild(this.el);
  }
}

export default Player;


