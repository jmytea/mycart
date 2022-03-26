import React, { memo } from "react";
import playIcon from '../../../../assets/play.webp'

const Banner = React.forwardRef( ({ data, index, showPlayIcon, onPlay }, ref) => {
  return (
    <div className="swiper-container banner" ref={ref}>
      <div className="swiper-wrapper">
        {data.map((item, index) => (
          <div className="swiper-slide" key={index}>
            <img src={item} alt="" />
          </div>
        ))}
      </div>
      <div className="info">
        <span>{index}</span>
        <b>/</b>
        <span>{data.size}</span>
      </div>
      <div className="play-icon" onClick={onPlay}>
        {showPlayIcon && <img src={playIcon} alt=""/>}
      </div>
    </div>
  );
})

export default memo(Banner);
