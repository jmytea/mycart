import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { FETCH_DETAIL_BY_ID } from "./effect";
import AppLoading from "../../../components/app-loading";
import AppScroll from "../../../components/app-scroll";
import Banner from "./children/banner";
import Player from "./children/player";
import Tab from "./children/tab";
import Panel from './children/panel'
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.css";
import "./style.scss";

class Detail extends PureComponent {
  bannerRef = React.createRef();

  state = {
    activeIndex: 1,
    play: false,
    showPanel: false
  };

  render() {
    const { activeIndex, play, showPanel } = this.state;
    const {
      loading,
      bannerData,
      videoInfo,
      name,
      history,
      detailHtml,
      isLogin,
    } = this.props;
    // 是否要显示playicon
    const videoUrl =
      videoInfo &&
      (videoInfo.get("webmVideoUrl") || videoInfo.get("mp4VideoUrl"));
    return (
      <div className="page subpage" id="detail">
        {/* loading */}
        {loading && <AppLoading />}
        {/* 返回按钮 */}
        <button className="back-btn" onClick={() => history.goBack()}>
          返回
        </button>

        {/* 内容 */}
        <AppScroll className="detail-scroll">
          {/* 视频的播放结构 */}
          {play && (
            <Player
              url={videoUrl}
              onClose={this.handlePlay.bind(this, false)}
            />
          )}

          {/* 轮播图 */}
          {bannerData && (
            <Banner
              index={activeIndex}
              data={bannerData}
              ref={this.bannerRef}
              showPlayIcon={videoUrl}
              onPlay={this.handlePlay.bind(this, true)}
            />
          )}

          {/* 标题 */}
          <h1>{name}</h1>

          {/* 内容 */}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: detailHtml }}
          ></div>
        </AppScroll>

        {/* 底栏 */}
        <div className="tab-wrap">
          <Tab onAddCart={this.togglePanelAction} onBuy={this.togglePanelAction}/>
          {isLogin || (
            <div className="login-cover" onClick={this.handleLogin}></div>
          )}
        </div>
        {/* 选择尺寸和规格还是商品数量的面板。 */}
        {showPanel && <Panel onClose={this.togglePanelAction}/>}
      </div>
    );
  }

  // 未显示商品尺寸和规格面板时，加入购物车或者立即购买的点击事件
  togglePanelAction = ()=>{
    this.setState({showPanel: !this.state.showPanel});
  }

  // 处理播放的事件
  handlePlay = (value) => {
    this.setState({ play: value });
  };

  // 处理登录
  handleLogin = () => {
    this.props.history.push({
      pathname: "/login",
      state: { hideAppTab: true },
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    // 请求数据
    this.props.requestDetailData(id);
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldProps.bannerData !== this.props.bannerData) {
      //轮播图变化了
      new Swiper(this.bannerRef.current, {
        on: {
          slideChange: (swiper) => {
            this.setState({ activeIndex: swiper.realIndex + 1 });
          },
        },
      });
    }
  }
}

export default connect(
  (state) => ({
    bannerData: state.getIn(["detail", "data", "bannerData"]),
    videoInfo: state.getIn(["detail", "data", "videoInfo"]),
    name: state.getIn(["detail", "data", "name"]),
    detailHtml: state.getIn(["detail", "data", "detailHtml"]),
    loading: state.getIn(["detail", "loading"]),
    isLogin: state.getIn(["login", "loginStatus"]) === 2,
  }),
  (dispatch) => ({
    requestDetailData(id) {
      dispatch({ type: FETCH_DETAIL_BY_ID, id });
    },
  })
)(Detail);
