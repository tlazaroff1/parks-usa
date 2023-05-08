import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { Box, Drawer, Typography, Toolbar, Divider } from "@mui/material";
import "./../../App.css";
import "./map.css";
import { useContext } from "react";
import { LocationContext } from "../state/locations/location-context";
import { List, ListItem, ListItemText } from "@mui/material";
const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 },
  },
];

export function Map() {
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

  const { locationState, locationDispatch } = useContext(LocationContext);

  return isLoaded ? (
    <Box className="background" backgroundImage="./../../map2.jpg">
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
              {/* {locationState.locations.map((location, index) => (
            <ListItem key={index}>
              <ListItemText primary={location.name} />
            </ListItem>
         ))}*/}
            </List>
          </Drawer>
        </Box>
        <Box width="70%">
          <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "500px" }}
          >
            {markers.map(({ id, name, position }) => (
              <MarkerF
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{name}</div>
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
