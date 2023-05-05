import { useParams } from "react-router";
//import { useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import "./../../App.css";
export function ParkInfo() {
  const [park, setPark] = useState("");
  const { id } = useParams();
  console.log("id");
  console.log(id);
  console.log("park");
  console.log(park);

  //const page = useSelector((state) => state.something[id]); //returns state of the page
  useEffect(() => {
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${id}&limit=50&start=0&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPark(data.data[0]))
      .catch((error) => console.error(error));
  }, [id]);

  if (!park) {
    return <div>Loading...</div>;
  }
  const images = park.images.map((image) => image.url);
  const ImageCarouselRoot = styled("div")(({ theme }) => ({
    width: "100%",
    height: "450px",
    margin: "auto",
    "& img": {
      width: "100%",
      height: "400px",
      display: "block",
      objectFit: "cover",
    },
  }));

  return (
    <Box width="85%" margin="auto auto auto auto">
      <Typography className="titles">{park.fullName}</Typography>
      <ImageCarouselRoot>
        <Carousel
          showArrows
          showThumbs={true}
          showStatus={true}
          infiniteLoop
          autoPlay
          interval={9000}
        >
          {images.map((src) => (
            <img src={src} key={src} alt="Carousel item" />
          ))}
        </Carousel>
      </ImageCarouselRoot>
      <Box>{park.description}</Box>
      <Box>
        <Typography>Location:</Typography>
        <Divider />
        <Typography>{park.address}</Typography>
      </Box>

      <Box>
        <Typography>Hours:</Typography>
        {park.operatingHours.map((hours, index) => (
          <Box key={index}>
            <Typography>{hours.name}</Typography>
            <Typography>{hours.description}</Typography>
          </Box>
        ))}
      </Box>

      {park.url && (
        <Box>
          <Typography>Website:</Typography>
          <a href={park.url}>{park.url}</a>
        </Box>
      )}
    </Box>
  );
}
