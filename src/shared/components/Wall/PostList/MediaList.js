import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Auxiliary from '@kongd/components/Auxiliary';
import { Modal } from 'antd';
import React, { useState } from 'react';
import Slider from 'react-slick';

import GreedImage from './GridImage';

const MediaList = (props) => {
  const [previewVisible, setPreviewVisible] = useState();

  const handleToggle = () => {
    setPreviewVisible((previousState) => ({
      previewVisible: !previousState.previewVisible,
    }));
  };

  return (
    <Auxiliary>
      <GreedImage mediaList={props.mediaList} handleToggle={handleToggle} />
      <Modal visible={previewVisible} footer={null} onCancel={handleToggle}>
        <Carousel mediaList={props.mediaList} />
      </Modal>
    </Auxiliary>
  );
};

function Carousel(props) {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides',
  };
  return (
    <Auxiliary>
      <h4>Slide Show</h4>
      <Slider {...settings}>
        {props.mediaList.map((media, index) => (
          <div key={index}>
            <img alt="example" style={{ width: '100%' }} src={media.image} />
          </div>
        ))}
      </Slider>
    </Auxiliary>
  );
}

export default MediaList;
