import React, { useState, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import {
  Box,
  Drawer,
  Typography,
  Toolbar,
  Divider,
  Button,
  IconButton,
  CardActions,
  Card,
  CardContent,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./../../App.css";
import "./map.css";
//import { LocationContext } from "../state/locations/location-context";
import { LocationActions } from "../state/locations/location-reducer";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../state/locations/location-context";

export function Map() {
  const { locationState, locationDispatch } = useContext(LocationContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyByo_ZcTT1MrLsO6EeWflKqlV-PMvgp8Vo",
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  console.log(locationState.locations);
  const markers = locationState.locations.map((location, index) => ({
    id: index,
    code: location.code,
    name: location.name,
    position: { lat: parseFloat(location.lat), lng: parseFloat(location.long) },
  }));
  function removePark(id) {
    const location = locationState.locations[id];
    locationDispatch({
      type: LocationActions.DELETE,
      location,
    });
  }
  const navigate = useNavigate();

  function goToParkPage(id, code) {
    const parkCode = locationState.locations[id].code;

    navigate(`/park/${parkCode}`);
  }
  return isLoaded ? (
    <Box className="background">
      <Box className="info" display="flex">
        <Box className="selectedParks" width="30%" height="500px">
          <Drawer
            sx={{
              width: "100%",
              flexShrink: 1,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                position: "relative",
              },
            }}
            variant="permanent"
            anchor="left"
            position="relative"
          >
            <Toolbar>
              <Typography
                className="titles"
                variant="h6"
                align="center"
                marginLeft="6px"
              >
                Selected Parks:
              </Typography>
            </Toolbar>
            <Divider className="divider"></Divider>
            <List>
              {markers.map(({ id, name }) => (
                <Button onClick={() => handleActiveMarker(id)} color="#6b460c">
                  <ListItem
                    sx={{
                      color: "black",
                      fontWeight: "400",
                      textTransform: "inherit",
                      fontSize: "1rem",
                    }}
                  >
                    {name}
                  </ListItem>
                </Button>
              ))}
            </List>
          </Drawer>
        </Box>
        <Box width="70%">
          <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "500px" }}
          >
            {markers.map(({ id, name, address, position }) => (
              <MarkerF
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <Box sx={{ minWidth: 200, maxWidth: 220 }}>
                      <Card>
                        <CardContent sx={{ padding: "3px" }}>
                          <Typography sx={{ fontSize: 14 }}>{name}</Typography>
                          {address && (
                            <Typography
                              sx={{ mb: 1.5, fontSize: 12 }}
                              color="text.secondary"
                            >
                              {address}
                            </Typography>
                          )}
                        </CardContent>
                        <CardActions sx={{ padding: "3px" }}>
                          <Button size="small" onClick={() => goToParkPage(id)}>
                            View More
                          </Button>
                          <IconButton onClick={() => removePark(id)}>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Box>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            ))}
          </GoogleMap>
        </Box>
      </Box>
    </Box>
  ) : null;
}
