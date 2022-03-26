import React, {memo} from "react";

const Banner = React.forwardRef(({ data }, ref) => {

  return (
    <div className="banner swiper-container" ref={ref}>
      <div className="swiper-wrapper">
        {data.map((item) => (
          <div className="swiper-slide" key={item.get('id')}>
            <img src={item.get('picUrl')} alt="" />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
});

Banner.displayName = "Banner";

export default memo(Banner);
