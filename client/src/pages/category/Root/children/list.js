import React, {memo} from "react";
import AppScroll from "../../../../components/app-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const List = React.forwardRef(({ data, onPullDown }, ref) => {
  return (
    <AppScroll ref={ref} pulldown onPullDown={onPullDown} className="list">
      {data.map((eachData) => {
        const category = eachData.get('category');
        const itemList = eachData.get('itemList');
        return (
        <div className="list-wrap" key={eachData.getIn(['category', 'id'])}>
          <h3 className="list-title">{category.get('name')}</h3>
          <h5 className="list-sub-title">{category.get('frontName')}</h5>
          <ul className="list-content">
            {itemList.map((item) => (
              <li className="item" key={item.get('id')}>
                <div>
                  <LazyLoadImage src={item.get('listPicUrl')} alt="" />
                  {/* <img src={item.listPicUrl} alt=""/> */}

                  {item.get('listPromBanner') ? (
                    <div>
                      <div>
                        <h4>{item.getIn(['listPromBanner', 'promoTitle'])}</h4>
                        <h5>{item.getIn(['listPromBanner', 'promoSubTitle'])}</h5>
                      </div>
                      <p>{item.getIn(['listPromBanner', 'content'])}</p>
                    </div>
                  ) : (
                    <p>{item.get('simpleDesc')}</p>
                  )}
                </div>
                <Link
                  className="item-title"
                  to={{
                    pathname: "/detail/" + item.get('id'),
                    state: { modal: true },
                  }}
                >
                  {item.get('name')}
                </Link>
                <p>
                  <span>¥{item.get('retailPrice')}</span>
                  {item.get('counterPrice') && <span>¥{item.get('counterPrice')}</span>}
                </p>
                <p>
                  {item.get('itemTagList') &&
                    item.get('itemTagList').map((tag) => (
                      <span key={tag.get('tagId')}>{tag.get('name')}</span>
                    ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )
      })}
    </AppScroll>
  );
});



export default memo(List);