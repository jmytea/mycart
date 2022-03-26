import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import loadingIMG from '../../assets/timg.gif'
import "./style.scss"

export default class AppLoading extends PureComponent {
  constructor(){
    super();
    this.el = document.createElement('div');
    this.el.className = 'modal';
  }
  render() {
    return ReactDOM.createPortal(
      <div className="loading-panel">
        <img src={loadingIMG} alt=""/>
      </div>,
      this.el
    )
  }

  componentDidMount(){
    document.querySelector('body').appendChild(this.el);
  }
  componentWillUnmount(){
    document.querySelector('body').removeChild(this.el);
  }
}
