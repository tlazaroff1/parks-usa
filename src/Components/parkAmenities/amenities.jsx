import { useState, useEffect } from "react";
import "./amenities.css";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded"; //accessible
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import DownhillSkiingRoundedIcon from "@mui/icons-material/DownhillSkiingRounded";
import GarageRoundedIcon from "@mui/icons-material/GarageRounded";
import KayakingRoundedIcon from "@mui/icons-material/KayakingRounded"; //kayak
import OutdoorGrillRoundedIcon from "@mui/icons-material/OutdoorGrillRounded";
import PedalBikeRoundedIcon from "@mui/icons-material/PedalBikeRounded";
import SkateboardingRoundedIcon from "@mui/icons-material/SkateboardingRounded";
import SnowboardingRoundedIcon from "@mui/icons-material/SnowboardingRounded";
import SnowshoeingRoundedIcon from "@mui/icons-material/SnowshoeingRounded";
import SportsTennisRoundedIcon from "@mui/icons-material/SportsTennisRounded";
import SurfingRoundedIcon from "@mui/icons-material/SurfingRounded";
import AttractionsRoundedIcon from "@mui/icons-material/AttractionsRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded"; //restroom
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded"; //information
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded"; //cellular signal
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded"; //gifts/souviners
import ChairAltRoundedIcon from "@mui/icons-material/ChairAltRounded"; //benches
import MapRoundedIcon from "@mui/icons-material/MapRounded"; //information/map
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded"; //Water - Bottle-Filling Station
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded"; //first aid / AED
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded"; // food/drink
import HikingRoundedIcon from "@mui/icons-material/HikingRounded"; // hiking - trail
import StadiumRoundedIcon from "@mui/icons-material/StadiumRounded"; // Amphitheater / Theater
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded"; //picnic
import BabyChangingStationRoundedIcon from "@mui/icons-material/BabyChangingStationRounded"; // Baby Changing Station
import WifiRoundedIcon from "@mui/icons-material/WifiRounded"; //WiFi
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded"; // Telephone
import AirportShuttleRoundedIcon from "@mui/icons-material/AirportShuttleRounded"; //Bus
import DirectionsBoatRoundedIcon from "@mui/icons-material/DirectionsBoatRounded"; //ferry
import DirectionsTransitFilledRoundedIcon from "@mui/icons-material/DirectionsTransitFilledRounded"; // public transit
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"; //Trash
import RecyclingRoundedIcon from "@mui/icons-material/RecyclingRounded"; //Recycling
import CabinRoundedIcon from "@mui/icons-material/CabinRounded"; //cabin
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded"; //parking
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded"; //elevator
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded"; //atm

import { Box, List, ListItem } from "@mui/material";

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
              <LocalParkingRoundedIcon className="icon" onHover={amenity} />
            );
          } else if (amenity == "Restroom") {
            return <WcRoundedIcon className="icon" />;
          } else if (amenity == "Information") {
            return <HelpCenterRoundedIcon className="icon" />;
          } else if (amenity.includes("Cellular")) {
            return <SignalCellularAltRoundedIcon className="icon" />;
          } else if (amenity.includes("Benches")) {
            return <ChairAltRoundedIcon className="icon" />;
          } else if (amenity.includes("Map")) {
            return <MapRoundedIcon className="icon" />;
          } else if (amenity == "Water - Bottle-Filling Station") {
            return <LocalDrinkRoundedIcon className="icon" />;
          } else if (amenity.includes("First Aid") || amenity.includes("AED")) {
            return <MedicalServicesRoundedIcon className="icon" />;
          } else if (amenity.includes("Food/Drink")) {
            return <FastfoodRoundedIcon className="icon" />;
          } else if (amenity.includes("Picnic")) {
            return <TableRestaurantRoundedIcon className="icon" />;
          } else if (amenity.includes("Baby Changing Station")) {
            return <BabyChangingStationRoundedIcon className="icon" />;
          } else if (amenity.includes("WiFi")) {
            return <WifiRoundedIcon className="icon" />;
          } else if (amenity.includes("Telephone")) {
            return <LocalPhoneRoundedIcon className="icon" />;
          } else if (amenity.includes("Bus")) {
            return <AirportShuttleRoundedIcon className="icon" />;
          } else if (amenity.includes("Ferry")) {
            return <DirectionsBoatRoundedIcon className="icon" />;
          } else if (amenity.includes("Public Transit")) {
            return <DirectionsTransitFilledRoundedIcon className="icon" />;
          } else if (amenity.includes("Trash")) {
            return <DeleteRoundedIcon className="icon" />;
          } else if (amenity.includes("Recycling")) {
            return <RecyclingRoundedIcon className="icon" />;
          } else if (amenity == "Wheelchair Accessible") {
            return <AccessibleRoundedIcon className="icon" />;
          } else if (amenity.includes("Beach")) {
            return <BeachAccessRoundedIcon className="icon" />;
          } else if (amenity == "Elevator") {
            return <ElevatorRoundedIcon className="icon" />;
          } else if (amenity == "ATM/Cash Machine") {
            return <LocalAtmRoundedIcon className="icon" />;
          } else {
            return null;
          }
        })
        .filter((icon) => icon !== null); // Filter out the null values

      setAmenitiesIcons(uniqueIcons);
    }
  }, [amenities]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {amenitiesIcons.length > 0 && (
        <List
          sx={{
            display: "flex",
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
        </List>
      )}
    </Box>
  );
}
