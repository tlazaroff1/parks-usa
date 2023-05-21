import React from "react";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import "./carousel.css";

const ImageCarouselRoot = styled("div")(({ theme }) => ({
  width: "100%",
  height: "470px",
  margin: "auto",
  "& img": {
    width: "100%",
    height: "420px",
    display: "block",
    objectFit: "cover",
  },
}));
export const ImageCarousel = React.memo(({ images }) => (
  <ImageCarouselRoot>
    <Carousel
      className="carousel"
      showArrows
      showThumbs="false"
      showStatus="false"
      infiniteLoop
      autoPlay
      interval={9000}
    >
      {images.map((src) => (
        <img src={src} key={src} alt="Carousel item" />
      ))}
    </Carousel>
  </ImageCarouselRoot>
));
