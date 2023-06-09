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
import CircularProgress from "@mui/material/CircularProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import WrongLocationRoundedIcon from "@mui/icons-material/WrongLocationRounded";
import "./../../App.css";
import "./parks.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LocationActions } from "../state/locations/location-reducer";
import { LocationContext } from "../state/locations/location-context";
import bryceCanyon from "./../../bryce-canyon1.jpg";
import glacier from "./../../glacier.jpg";
import grandCanyon from "./../../grandcanyon.jpg";
import saguaro from "./../../saguaro.jpg";
import { ImageCarousel } from "../carousel/carousel";
import { useEffect } from "react";

export const Parks = (props) => {
  const images = [bryceCanyon, saguaro, glacier, grandCanyon];

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
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locationState, locationDispatch } = useContext(LocationContext);
  const handleChange = (event, value) => {
    locationDispatch({ type: LocationActions.SET, state: value });
  };

  useEffect(() => {
    if (locationState.searchState) {
      setLoading(true);
      callParkAPI();
    }
  }, [locationState.searchState]);

  const callParkAPI = () => {
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${locationState.searchState?.code}&limit=100&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setParks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(true);
      });
  };

  console.log(locationState.searchState);
  const navigate = useNavigate();

  function goToParkPage(parkCode) {
    navigate(`/park/${parkCode}`);
  }

  function addLocation(
    parkCode,
    parkName,
    longitude,
    latitude,
    line1,
    line2,
    city,
    stateCode,
    postalCode
  ) {
    const existingLocation = locationState.locations.find(
      (location) => location.code === parkCode
    );

    if (!existingLocation) {
      const newLocation = {
        code: parkCode,
        name: parkName,
        long: longitude,
        lat: latitude,
        address: {
          line1,
          line2,
          city,
          stateCode,
          postalCode,
        },
        isComplete: false,
      };

      locationDispatch({ type: LocationActions.ADD, location: newLocation });
      locationDispatch({ type: LocationActions.TOGGLE, location: newLocation });
    } else {
      const updatedLocation = { ...existingLocation };
      updatedLocation.isComplete = !updatedLocation.isComplete; // toggle the isComplete property

      locationDispatch({
        type: LocationActions.TOGGLE,
        location: updatedLocation,
      });
    }
  }

  console.log(locationState);

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
          value={locationState.searchState}
          onChange={handleChange}
          onSelect={callParkAPI}
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
                    onClick={callParkAPI}
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

      {locationState.searchState && (
        <Box className="background" sx={{ minHeight: "12px" }}>
          <Box className="searchResult" width="90%" sx={{ minHeight: "12px" }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  paddingTop="12px"
                  paddingBottom="12px"
                  color="success"
                />
              </Box>
            ) : (
              <Box>
                <Box
                  className="parksList"
                  width="75%"
                  sx={{ minHeight: "12px" }}
                >
                  <List>
                    {parks.map((park) => {
                      return (
                        <Box className="listItem" sx={{ height: "200px" }}>
                          <ListItem key={park.id} sx={{ padding: "0 0 0 0" }}>
                            <Box
                              width="30%"
                              overflow="hidden"
                              minWidth="20%"
                              maxWidth="20%"
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
                                primaryTypographyProps={{
                                  style: textTitleStyle,
                                }}
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

                                  ":hover": {
                                    bgcolor: "rgba(107, 70, 12, .2)",
                                  },
                                }}
                              >
                                View More
                              </Button>

                              <IconButton
                                size="large"
                                className="addLoc"
                                onClick={() =>
                                  addLocation(
                                    park.parkCode,
                                    park.fullName,
                                    park.longitude,
                                    park.latitude,
                                    park.addresses[0].line1,
                                    park.addresses[0].line2,
                                    park.addresses[0].city,
                                    park.addresses[0].stateCode,
                                    park.addresses[0].postalCode
                                  )
                                }
                                sx={{
                                  marginLeft: "20px",
                                  border: "1.5px solid #6b460c ",
                                  bgcolor: "white",

                                  ":hover": {
                                    bgcolor: "rgba(107, 70, 12, .2)",
                                  },
                                }}
                              >
                                {locationState.locations.find(
                                  (location) => location.code === park.parkCode
                                )?.isComplete ? (
                                  <WrongLocationRoundedIcon
                                    fontSize="3rem"
                                    sx={{
                                      color: "#6b460c",
                                    }}
                                  />
                                ) : (
                                  <AddLocationAltRoundedIcon
                                    fontSize="3rem"
                                    sx={{
                                      color: "#6b460c",
                                    }}
                                  />
                                )}
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
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
