import React from "react";
import { Switch, Route } from "react-router";
import { CacheRoute, CacheSwitch } from 'react-router-cache-route'

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;
}

export function renderCacheRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <CacheSwitch {...switchProps}>
      {routes.map((route, i) => (
        <CacheRoute
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </CacheSwitch>
  ) : null;
}