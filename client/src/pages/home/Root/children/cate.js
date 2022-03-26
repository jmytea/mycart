import React, {memo} from "react";
import { withRouter } from "react-router-dom";

function Cate({ data, history }) {
  return (
    <div className="cate">
      {data.map((item) => (
        <div
          className="cate-item"
          key={item.get('id')}
          onClick={() => {
            history.push({
              pathname: "/category",
              state: { id: item.get('id') },
            });
          }}
        >
          <img src={item.get('picUrl')} alt="" />
          <span>{item.get('text')}</span>
        </div>
      ))}
    </div>
  );
}

export default withRouter(memo(Cate));
