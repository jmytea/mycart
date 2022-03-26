import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { requestHomeData } from "./reducer";
import Banner from "./children/banner";
import Cate from "./children/cate";
import NewGoods from "./children/new-goods";
import AppScroll from "../../../components/app-scroll";
import AppSearchBar from "../../../components/app-search-bar";
import AppLoading from "../../../components/app-loading";

import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.css";
import "./style.scss";

class Root extends PureComponent {
  bannerRef = React.createRef();

  render() {
    const { banner, cate, newGoods, loading } = this.props;
    return (
      <div className="page" id="home-root">
        <AppSearchBar />
        <AppScroll className="content">
          {loading && <AppLoading />}
          <Banner data={banner} ref={this.bannerRef} />
          <Cate data={cate} />
          <NewGoods data={newGoods} />
        </AppScroll>
      </div>
    );
  }
  componentDidMount() {
    // console.log('home did mount....');
    // 请求数据
    this.props.requestData();
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldProps.banner !== this.props.banner) {
      //轮播图数据有更新
      // 构建轮播图的dom结构
      new Swiper(this.bannerRef.current, {
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }
  }
}

export default connect(
  (state) => ({
    banner: state.getIn(['home', 'banner']),
    cate: state.getIn(['home', 'cate']),
    newGoods: state.getIn(['home', 'newGoods']),
    loading: state.getIn(['home', 'loading']),
  }),
  (dispatch) => ({
    requestData() {
      dispatch(requestHomeData());
    },
  })
)(Root);
