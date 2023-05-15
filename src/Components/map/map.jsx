import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./../../App.css";
import "./map.css";
import { useContext } from "react";
import { LocationContext } from "../state/locations/location-context";
import { LocationActions } from "../state/locations/location-reducer";
import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*const markers = [
  {
    id: 1,
    name: "Trail Of Tears National Historic Trail",
    address: "National Trails Office Regions 6|7|8, Santa Fe, NM 87505",
    position: { lat: 36.0530021046, lng: -89.6761041963 },
  },
  {
    id: 2,
    name: "Shiloh National Military Park",
    address: "1055 Pittsburg Landing Road, Shiloh, TN 38376",
    position: { lat: 35.13850907, lng: -88.3421072 },
  },
];*/

export function Map() {
  const { locations } = useContext(LocationContext);

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
              {markers.map(({ id, name }) => (
                <Button onClick={() => handleActiveMarker(id)}>
                  <ListItem>{name}</ListItem>
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
                          <Typography
                            sx={{ mb: 1.5, fontSize: 12 }}
                            color="text.secondary"
                          >
                            {address}
                          </Typography>
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
