import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CampaignSlider = ({ campaigns }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite
        swipeable
        draggable={false}
        showDots={false}
        arrows
        renderButtonGroupOutside
      >
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-2" >
            <div className=" rounded-lg  p-4 h-[300px]">
              <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
              <p>{campaign.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};



export default CampaignSlider;
