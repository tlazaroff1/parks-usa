import { useState, useEffect } from "react";
import "./amenities.css";
import "./../parkInfo/parkInfo.css";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded"; //accessible
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded"; //restroom
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded"; //information
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded"; //cellular signal
import ChairAltRoundedIcon from "@mui/icons-material/ChairAltRounded"; //benches
import MapRoundedIcon from "@mui/icons-material/MapRounded"; //information/map
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded"; //Water - Bottle-Filling Station
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded"; //first aid / AED
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded"; // food/drink
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded"; //picnic
import BabyChangingStationRoundedIcon from "@mui/icons-material/BabyChangingStationRounded"; // Baby Changing Station
import WifiRoundedIcon from "@mui/icons-material/WifiRounded"; //WiFi
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded"; // Telephone
import AirportShuttleRoundedIcon from "@mui/icons-material/AirportShuttleRounded"; //Bus
import DirectionsBoatRoundedIcon from "@mui/icons-material/DirectionsBoatRounded"; //ferry
import DirectionsTransitFilledRoundedIcon from "@mui/icons-material/DirectionsTransitFilledRounded"; // public transit
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"; //Trash
import RecyclingRoundedIcon from "@mui/icons-material/RecyclingRounded"; //Recycling
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded"; //parking
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded"; //elevator
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded"; //atm
import FoodBankRoundedIcon from "@mui/icons-material/FoodBankRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import Tooltip from "@mui/material/Tooltip";

import { Box, List, ListItem, Typography } from "@mui/material";

export default function AmenitiesIcons({ parkCode }) {
  const [amenities, setAmenities] = useState([]);
  const [amenitiesIcons, setAmenitiesIcons] = useState([]);
  const defaultIcon = { amenities };

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/amenities/parksplaces?parkCode=${parkCode}&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const amenitiesArray = data?.data?.map((amenity) => amenity[0].name);
        setAmenities(amenitiesArray || []);
      })
      .catch((error) => console.error(error));
  }, [parkCode]);

  useEffect(() => {
    console.log(amenities, "list");
    if (amenities.length > 0) {
      const uniqueIcons = amenities
        .map((amenity) => {
          if (amenity == "Parking - Auto") {
            return (
              <Tooltip title={amenity}>
                <LocalParkingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Restroom") {
            return (
              <Tooltip title={amenity}>
                <WcRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Information") {
            return (
              <Tooltip title={amenity}>
                <HelpCenterRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Cellular")) {
            return (
              <Tooltip title={amenity}>
                <SignalCellularAltRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Benches")) {
            return (
              <Tooltip title={amenity}>
                <ChairAltRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Map")) {
            return (
              <Tooltip title={amenity}>
                <MapRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Water - Bottle-Filling Station") {
            return (
              <Tooltip title={amenity}>
                <LocalDrinkRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("AED")) {
            return (
              <Tooltip title={amenity}>
                <MonitorHeartRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("First Aid/Medical Care Available")) {
            return (
              <Tooltip title={amenity}>
                <MedicalServicesRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Food/Drink")) {
            return (
              <Tooltip title={amenity}>
                <FastfoodRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Picnic Table") {
            return (
              <Tooltip title={amenity}>
                <TableRestaurantRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Baby Changing Station")) {
            return (
              <Tooltip title={amenity}>
                <BabyChangingStationRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("WiFi")) {
            return (
              <Tooltip title={amenity}>
                <WifiRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Telephone")) {
            return (
              <Tooltip title={amenity}>
                <LocalPhoneRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Bus")) {
            return (
              <Tooltip title={amenity}>
                <AirportShuttleRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Ferry")) {
            return (
              <Tooltip title={amenity}>
                <DirectionsBoatRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Public Transit")) {
            return (
              <Tooltip title={amenity}>
                <DirectionsTransitFilledRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Trash")) {
            return (
              <Tooltip title={amenity}>
                <DeleteRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Recycling")) {
            return (
              <Tooltip title={amenity}>
                <RecyclingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Wheelchair Accessible") {
            return (
              <Tooltip title={amenity}>
                <AccessibleRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity.includes("Beach")) {
            return (
              <Tooltip title={amenity}>
                <BeachAccessRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Elevator") {
            return (
              <Tooltip title={amenity}>
                <ElevatorRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "ATM/Cash Machine") {
            return (
              <Tooltip title={amenity}>
                <LocalAtmRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (amenity == "Food/Drink - Restaurant/Table Service") {
            return (
              <Tooltip title={amenity}>
                <FoodBankRoundedIcon className="icon" />
              </Tooltip>
            );
          } else {
            return null;
          }
        })
        .filter((icon) => icon !== null); // Filter out the null values

      setAmenitiesIcons(uniqueIcons);
    }
  }, [amenities]);

  return (
    <Box>
      {amenitiesIcons.length > 0 && (
        <List sx={{ background: "rgba(28, 60, 35, .2)", borderRadius: "10pt" }}>
          <Typography className="InfoTitle">Amenities</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              margin: "auto auto auto auto",
            }}
          >
            {amenitiesIcons.map((icon, index) => (
              <ListItem
                key={index}
                sx={{ paddingLeft: "6px", paddingRight: "6px", width: "80px" }}
              >
                {icon}
              </ListItem>
            ))}
          </Box>
        </List>
      )}
    </Box>
  );
}
