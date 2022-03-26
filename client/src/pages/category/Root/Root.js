import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { requestHomeData } from "../../home/Root/reducer";
import { requestListDataById } from "./reducer";
import Menu from "./children/menu";
import List from "./children/list";
import AppSearchBar from "../../../components/app-search-bar";
import AppLoading from "../../../components/app-loading";
import "./style.scss";

class Root extends PureComponent {
  state = {};
  listRef = React.createRef();

  render() {
    const { menuID, showData } = this.state;
    const { menu, history, loading } = this.props;
    return (
      <div className="page" id="category-root">
        <AppSearchBar />
        <div className="content">
          {loading && <AppLoading/>}
          <Menu
            data={menu}
            selected={menuID}
            onChange={(value) => {
              history.replace({ pathname: "/category", state: { id: value } });
            }}
          />
          <List ref={this.listRef} data={showData} onPullDown={this.requestListData.bind(this, this.state.menuID, true)} />
        </div>
      </div>
    );
  }

  // 请求菜单列表数据
  requestListData = (id, reload = false) => {
    if (!this.props.listMap.get(this.state.menuID) || reload) {
      //该菜单项还没有请求过数据
      this.props.requestListData(id);
    }
  };

  static getDerivedStateFromProps(props) {
    // 计算选中的分类菜单
    let menuID = null;
    // 取首页选中的菜单
    if (props.location.state && props.location.state.id) {
      menuID = props.location.state.id;
    }
    //取第一个菜单
    else if (props.menu.size > 0) {
      menuID = props.menu.getIn([0, 'id']);
    }

    // 根据listMap和menuID计算列表组件要展示的数据
    let showData = [];
    if (menuID && props.listMap.get(menuID)) {
      showData = props.listMap.get(menuID);
    }

    return {
      menuID,
      showData,
    };
  }

  componentDidMount() {
    // console.log('category did mount....');
    // 如果分类还没有数据，触发home模块请求数据
    if (this.props.menu.size <= 0) {
      this.props.requestMenuData();
    }
    // 判断是否有menuID，请求列表数据
    if (this.state.menuID) {
      this.requestListData(this.state.menuID);
    }
  }
  componentDidUpdate(oldProps, oldState) {
    if (oldState.menuID !== this.state.menuID) {
      // id变化了,请求列表数据
      this.requestListData(this.state.menuID);
    }
    else if(oldProps.listMap !== this.props.listMap){
      // listMap请求回来了，关闭下拉刷新
      this.listRef.current.closePullDown();
    }
  }
}

export default connect(
  (state) => ({
    menu: state.getIn(['home', 'cate']),
    listMap: state.getIn(['cate', 'menuListData']),
    loading: state.getIn(['cate', 'loading']),
  }),
  (dispatch) => ({
    requestMenuData() {
      // 请求菜单
      dispatch(requestHomeData());
    },
    requestListData(id) {
      // 请求菜单的列表数据
      dispatch(requestListDataById(id));
    },
  })
)(Root);
