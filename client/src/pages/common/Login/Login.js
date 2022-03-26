import React, { PureComponent } from "react";
import "./style.scss";
import { connect } from "react-redux";
import loadingImg from "../../../assets/timg.gif";

class Login extends PureComponent {
  state = {
    tel: "",
    code: "",
  };
  render() {
    const { tel, code } = this.state;
    const { showInfo, status, loginStatus } = this.props;
    return (
      <div className="page subpage" id="login">
        <h1>登录</h1>
        <input
          className="tel"
          value={tel}
          onChange={this.handleChange.bind(this, "tel")}
          type="tel"
          placeholder="请输入手机号码"
        />
        <input
          className="code"
          value={code}
          onChange={this.handleChange.bind(this, "code")}
          type="number"
          placeholder="请输入短信验证码"
        />
        <button className={`send ${(status!==0 && status!==3) ? 'disable':''}`} onClick={this.sendCodeAction}>
          {status === 1 && <img src={loadingImg} alt="" />}
          <span>{showInfo}</span>
        </button>
        <button className={`confirm ${loginStatus === 1 ? 'disable' : ''}`} onClick={this.loginAction}>{loginStatus}登录</button>
      </div>
    );
  }

  componentDidUpdate(oldProps){
    if(oldProps.status !== this.props.status && this.props.status === 3){
      //提醒用户发送失败，需要重新发送
      alert('发送失败，请重试');
    }

    if(oldProps.loginStatus !== this.props.loginStatus){
      switch (this.props.loginStatus) {
        case 2://登录成功，切换页面
          this.props.history.goBack();
          break;
        case 3://登录失败，提醒用户
          alert('验证失败，请重新发送验证码');
          break;
        default:
          break;
      }
    }
  }

  // 输入框的修改事件
  handleChange = (key, ev) => {
    this.setState({ [key]: ev.target.value });
  };

  // 发送验证码事件
  sendCodeAction = () => {
    if(this.props.status === 0 || this.props.status === 3){
      // 验证手机号码格式是否正确
      this.props.sendCode(this.state.tel);
    }
  };

  // 登录的事件
  loginAction = ()=>{
    if(this.props.loginStatus === 1){
      return;//正在登录
    }
    if(this.props.showInfo === '获取验证码'){
      alert('请先发送验证码');
    }else{
      const {tel, code} = this.state;
      //验证手机号码格式，code格式是否为6个数字
      this.props.checkCode(tel, code);
    }
  }
}

export default connect(
  (state) => ({
    showInfo: state.getIn(["login", "showInfo"]),
    status: state.getIn(["login", "status"]),
    loginStatus: state.getIn(["login", "loginStatus"]),
  }),
  (dispatch) => ({
    // 发送短信验证
    sendCode(tel) {
      dispatch({ type: "login/send_code", tel });
    },
    checkCode(tel, code){
      dispatch({ type: 'login/check_code', tel, code});
    }
  })
)(Login);
