import * as React from "react";
import {
  Box,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import "./../../App.css";
import "./parks.css";
import { styled } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LocationActions } from "../state/locations/location-reducer";
import { LocationContext } from "../state/locations/location-context";
import bryceCanyon from "./../../bryce-canyon1.jpg";
import glacier from "./../../glacier.jpg";
import grandCanyon from "./../../grandcanyon.jpg";
import saguaro from "./../../saguaro.jpg";
import { ImageCarousel } from "../carousel/carousel";

export function Parks() {
  const images = [bryceCanyon, saguaro, glacier, grandCanyon];
  const ImageCarouselRoot = styled("div")(({ theme }) => ({
    width: "100%",
    height: "500px",
    margin: "auto",
    "& img": {
      width: "100%",
      height: "450px",
      display: "block",
      objectFit: "cover",
    },
  }));

  const us_states = [
    { code: "AL", label: "Alabama" },
    { code: "AK", label: "Alaska" },
    { code: "AZ", label: "Arizona" },
    { code: "AR", label: "Arkansas" },
    { code: "CA", label: "California" },
    { code: "CO", label: "Colorado" },
    { code: "CT", label: "Connecticut" },
    { code: "DE", label: "Delaware" },
    { code: "FL", label: "Florida" },
    { code: "GA", label: "Georgia" },
    { code: "HI", label: "Hawaii" },
    { code: "ID", label: "Idaho" },
    { code: "IL", label: "Illinois" },
    { code: "IN", label: "Indiana" },
    { code: "IA", label: "Iowa" },
    { code: "KS", label: "Kansas" },
    { code: "KY", label: "Kentucky" },
    { code: "LA", label: "Louisiana" },
    { code: "ME", label: "Maine" },
    { code: "MD", label: "Maryland" },
    { code: "MA", label: "Massachusetts" },
    { code: "MI", label: "Michigan" },
    { code: "MN", label: "Minnesota" },
    { code: "MS", label: "Mississippi" },
    { code: "MO", label: "Missouri" },
    { code: "MT", label: "Montana" },
    { code: "NE", label: "Nebraska" },
    { code: "NV", label: "Nevada" },
    { code: "NH", label: "New Hampshire" },
    { code: "NJ", label: "New Jersey" },
    { code: "NM", label: "New Mexico" },
    { code: "NY", label: "New York" },
    { code: "NC", label: "North Carolina" },
    { code: "ND", label: "North Dakota" },
    { code: "OH", label: "Ohio" },
    { code: "OK", label: "Oklahoma" },
    { code: "OR", label: "Oregon" },
    { code: "PA", label: "Pennsylvania" },
    { code: "RI", label: "Rhode Island" },
    { code: "SC", label: "South Carolina" },
    { code: "SD", label: "South Dakota" },
    { code: "TN", label: "Tennessee" },
    { code: "TX", label: "Texas" },
    { code: "UT", label: "Utah" },
    { code: "VT", label: "Vermont" },
    { code: "VA", label: "Virginia" },
    { code: "WA", label: "Washington" },
    { code: "WV", label: "West Virginia" },
    { code: "WI", label: "Wisconsin" },
    { code: "WY", label: "Wyoming" },
  ];
  const [stateCode, setStateCode] = useState(null); // default stateCode is "NY"
  const [parks, setParks] = useState([]);

  const handleChange = (event, value) => {
    setStateCode(value);
  };

  const handleSearch = () => {
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode?.code}&limit=100&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setParks(data.data))
      .catch((error) => console.error(error));
  };
  const navigate = useNavigate();
  const [parkId, setParkId] = useState("");

  function goToParkPage(parkCode) {
    navigate(`/park/${parkCode}`);
  }
  const [buttonClicked, setButtonClicked] = useState(false);

  const { locationDispatch } = useContext(LocationContext);
  function addLocation(parkCode, parkName, longitude, latitude) {
    const newLocation = {
      code: parkCode,
      name: parkName,
      long: longitude,
      lat: latitude,
      isComplete: false,
    };
    locationDispatch({ type: LocationActions.ADD, ...newLocation });
    console.log(parkCode);
    console.log(parkName);
    //console.log(parkAddress);
    console.log(longitude);
    console.log(latitude);

    console.log("in function");
  }

  const textTitleStyle = {
    color: "#6b460c",
    fontFamily: "'Economica', sans-serif",
    fontSize: "1.5rem",
  };

  return (
    <Box position="relative">
      <Box
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: "0",
        }}
      >
        <ImageCarousel images={images} />
      </Box>
      <Box
        className="searchBox"
        display="flex"
        width="70%"
        padding="10px"
        margin="auto auto auto auto"
        sx={{
          position: "absolute",
          zIndex: "2",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography
          className="banner"
          sx={{
            textOutline: "1px solid #6b460c",
            WebkitTextStroke: "1px #6b460c",
          }}
        >
          Start Planning Here
        </Typography>
        <Autocomplete
          className="searchBar"
          disablePortal
          id="combo-box-demo"
          options={us_states}
          sx={{ width: "60%" }}
          getOptionLabel={(option) => option.label}
          value={stateCode}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              sx={{
                fieldset: {
                  borderColor: "#6b460c",
                  background: "white",
                  zIndex: "-1",
                  borderRadius: "10px",
                },
              }}
              id="outlined-basic"
              className="searchTextField"
              {...params}
              placeholder="Enter A State: "
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <IconButton
                    position="start"
                    aria-label="delete"
                    size="large"
                    onClick={handleSearch}
                  >
                    <SearchRoundedIcon
                      fontSize="large"
                      sx={{ color: "#1c3c23" }}
                    />
                  </IconButton>
                ),
                disableUnderline: true,
              }}
            ></TextField>
          )}
        ></Autocomplete>
      </Box>
      <Box className="background">
        <Box className="searchResult" width="90%">
          <Box>
            <Box className="parksList" width="75%">
              <List>
                {parks.map((park) => {
                  return (
                    <Box className="listItem" sx={{ height: "200px" }}>
                      <ListItem key={park.id} sx={{ padding: "0 0 0 0" }}>
                        <Box
                          width="30%"
                          overflow="hidden"
                          minWidth="20%"
                          marginRight="8px"
                        >
                          <img
                            height="200px"
                            alt={park.fullName}
                            src={park.images[0]?.url}
                            width="100%"
                            className="img"
                          />
                        </Box>
                        <Box sx={{ padding: "5px 5px 5px 5px" }}>
                          <ListItemText
                            className="parkDesc"
                            primaryTypographyProps={{ style: textTitleStyle }}
                            primary={park.fullName}
                            secondary={park.description}
                          />
                          <Button
                            variant="contained"
                            onClick={() => goToParkPage(park.parkCode)}
                            sx={{
                              border: "1.5px solid #6b460c ",
                              background: "white",
                              color: "#6b460c ",
                            }}
                          >
                            View More
                          </Button>

                          <IconButton
                            aria-label="delete"
                            size="large"
                            className="addLoc"
                            onClick={() =>
                              addLocation(
                                park.parkCode,
                                park.fullName,
                                park.longitude,
                                park.latitude
                              )
                            }
                            style={{
                              backgroundColor: buttonClicked
                                ? "white"
                                : "white",
                            }} // conditionally render button color based on buttonClicked state
                          >
                            <AddLocationAltRoundedIcon
                              fontSize="3rem"
                              sx={{
                                color: "#6b460c  ",
                              }}
                            />
                          </IconButton>
                        </Box>

                        <Divider />
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
