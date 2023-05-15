import { useParams } from "react-router";
//import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import "./../../App.css";
import "./parkInfo.css";
import AmenitiesIcons from "../parkAmenities/amenities";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { useContext } from "react";
import { LocationActions } from "../state/locations/location-reducer";
import { LocationContext } from "../state/locations/location-context";

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

  /* const { locationDispatch } = useContext(LocationContext);
  function addLocation(parkCode) {
    locationDispatch({
      type: LocationActions.ADD,
      code: parkCode,
    });
    console.log(parkCode);
    console.log("in function");
  }*/

  return (
    <Box className="background">
      <Box className="searchResult" width="90%" margin="auto auto auto auto">
        <Typography className="titles">
          {park.fullName}
          <IconButton
            aria-label="delete"
            size="large"
            className="addLocButton"
            sx={{ backgroundColor: "#6b460c", radius: "50%", edge: "end" }}
            //OnClick={() => addLocation(park.parkCode)}
          >
            <AddLocationAltRoundedIcon
              fontSize="3rem"
              sx={{ color: "white" }}
            />
          </IconButton>
        </Typography>
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

        <Box className="displayInfo">{park.description}</Box>
        <Divider />
        <Box className="displayInfo">
          <Typography>Amenities</Typography>
          <AmenitiesIcons parkCode={park.parkCode} />
        </Box>
        <Divider />
        <Box className="displayInfo">
          <Typography>Hours:</Typography>
          {park.operatingHours.map((hours, index) => (
            <Box key={index}>
              <Typography>{hours.name}</Typography>
              {Object.keys(hours.standardHours).map((day, index) => (
                <Typography key={index}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                  {hours.standardHours[day] === "All Day"
                    ? "24 hours"
                    : hours.standardHours[day]}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
        <Divider />
        <Box className="displayInfo">
          {park.url && (
            <Box>
              <Typography>Website:</Typography>
              <a href={park.url}>{park.url}</a>
            </Box>
          )}
        </Box>
        <Divider />
        <Box className="displayInfo">
          <ListItem>
            <ListItemIcon>
              <LocalPhoneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={park.contacts.phoneNumbers[0].phoneNumber} />
          </ListItem>
          {park.contacts.emailAddresses.map((emailAddress, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <EmailRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={emailAddress.emailAddress} />
            </ListItem>
          ))}
        </Box>
        <Divider />
        <Box className="displayInfo">
          <Typography>Entrance Fees:</Typography>
          {park.entranceFees.map((fee, index) => (
            <Typography key={index}>
              {fee.title}: {fee.cost === "0.00" ? "No Fee" : `$${fee.cost}`}
            </Typography>
          ))}
        </Box>
        <Divider />
        <Box className="displayInfo">
          <Typography>Addresses:</Typography>
          {park.addresses.map((address, index) => (
            <Box key={index}>
              <Typography>
                {address.type} Address: {address.line1}, {address.city},{" "}
                {address.stateCode} {address.postalCode}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />
      </Box>
    </Box>
  );
}
