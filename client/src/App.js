import React, { Suspense, PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import { renderCacheRoutes } from "./utils/renderRoutes";
import Loading from "./pages/common/Loading/Loading";
import routes from "./routes";
import { TabBar, TabItem } from "./components/app-tab-bar";
import Detail from "./pages/common/Detail/Detail";
import { connect } from "react-redux";

const tabData = [
  {
    id: 1,
    name: "首页",
    path: "/home",
    icon: "https://i.52112.com/icon/jpg/256/20200731/86059/3741131.jpg",
    selectedIcon: "https://i.52112.com/icon/jpg/256/20200429/76313/3222021.jpg",
  },
  {
    id: 2,
    name: "分类",
    path: "/category",
    icon: "https://i.52112.com/icon/jpg/256/20200731/86059/3741131.jpg",
    selectedIcon: "https://i.52112.com/icon/jpg/256/20200429/76313/3222021.jpg",
  },
  {
    id: 3,
    name: "购物车",
    path: "/cart",
    icon: "https://i.52112.com/icon/jpg/256/20200731/86059/3741131.jpg",
    selectedIcon: "https://i.52112.com/icon/jpg/256/20200429/76313/3222021.jpg",
  },
  {
    id: 4,
    name: "我的",
    path: "/mine",
    icon: "https://i.52112.com/icon/jpg/256/20200731/86059/3741131.jpg",
    selectedIcon: "https://i.52112.com/icon/jpg/256/20200429/76313/3222021.jpg",
  },
];

class App extends PureComponent {
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    const showAppTab = !(location.state && location.state.hideAppTab);
    // console.log(isModal);
    // console.log(this.previousLocation);

    return (
      <Suspense fallback={<Loading />}>
        {/* 根页面 */}
        <Switch location={isModal ? this.previousLocation : location}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) =>
                route.render ? (
                  route.render({...props, route: route })
                ) : (
                  <route.component {...props} route={route} />
                )
              }
            />
          ))}
        </Switch>
        {isModal ? <Route path="/detail/:id" component={Detail} /> : null}

        {/* 底栏 */}
        {showAppTab && (
          <TabBar>
            {tabData.map((item) => (
              <TabItem key={item.id} {...item} />
            ))}
          </TabBar>
        )}
      </Suspense>
    );
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.props.checkLogin();
    }
  }
}

export default withRouter(
  connect(
    (state) => ({
      isLogin: state.getIn(["login", "loginStatus"]) === 2,
    }),
    (dispatch) => ({
      checkLogin() {
        dispatch({ type: "login/check_login" });
      },
    })
  )(App)
);
