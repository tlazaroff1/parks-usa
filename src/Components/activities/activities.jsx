import { useState, useEffect } from "react";
import "./../parkAmenities/amenities.css";
import KayakingRoundedIcon from "@mui/icons-material/KayakingRounded"; //kayak
import PedalBikeRoundedIcon from "@mui/icons-material/PedalBikeRounded";
import SnowshoeingRoundedIcon from "@mui/icons-material/SnowshoeingRounded";
import SurfingRoundedIcon from "@mui/icons-material/SurfingRounded";
import PhishingRoundedIcon from "@mui/icons-material/PhishingRounded"; // fishing
import HikingRoundedIcon from "@mui/icons-material/HikingRounded"; //hiking
import StoreRoundedIcon from "@mui/icons-material/StoreRounded"; //Shopping
import FlutterDashRoundedIcon from "@mui/icons-material/FlutterDashRounded"; //birdwatcing
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDiningRounded"; //food
import CabinRoundedIcon from "@mui/icons-material/CabinRounded"; //camping
import SailingRoundedIcon from "@mui/icons-material/SailingRounded"; //baoting
import TheatersRoundedIcon from "@mui/icons-material/TheatersRounded"; //park film
import TourRoundedIcon from "@mui/icons-material/TourRounded"; // guilded / self giuded tours
import PoolRoundedIcon from "@mui/icons-material/PoolRounded"; //swimming
import ScubaDivingRoundedIcon from "@mui/icons-material/ScubaDivingRounded"; //scuba diving
import MuseumRoundedIcon from "@mui/icons-material/MuseumRounded"; //museum
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded"; //ATV / auto
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded"; //picnicking
import DownhillSkiingRoundedIcon from "@mui/icons-material/DownhillSkiingRounded"; //Skiing
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded"; //History
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded"; //Theater
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded"; //Live music
import SnowmobileRoundedIcon from "@mui/icons-material/SnowmobileRounded"; // snowmobiling
import KitesurfingRoundedIcon from "@mui/icons-material/KitesurfingRounded"; //paddeling
import { Box, List, ListItem } from "@mui/material";
import { Margin } from "@mui/icons-material";

export default function ActivitiesIcons({ activities }) {
  const [icons, setActivityIcons] = useState([]);
  console.log(activities, "list2");
  useEffect(() => {
    console.log(activities, "list");
    if (activities.length > 0) {
      const uniqueIcons = activities
        .map((activity) => {
          if (activity.includes("Shopping")) {
            return <StoreRoundedIcon className="icon" />;
          } else if (activity.includes("Birdwatching")) {
            return <FlutterDashRoundedIcon className="icon" />;
          } else if (activity.includes("Food")) {
            return <LunchDiningRoundedIcon className="icon" />;
          } else if (activity == "Hiking") {
            return <HikingRoundedIcon className="icon" />;
          } else if (activity == "Camping") {
            return <CabinRoundedIcon className="icon" />;
          } else if (activity == "Canoeing" || activity.includes("Kayak")) {
            return <KayakingRoundedIcon className="icon" />;
          } else if (activity == "Fishing") {
            return <PhishingRoundedIcon className="icon" />;
          } else if (activity == "Snowshoeing") {
            return <SnowshoeingRoundedIcon className="icon" />;
          } else if (activity == "Guided Tours") {
            return <TourRoundedIcon className="icon" />;
          } else if (activity == "Boating") {
            return <SailingRoundedIcon className="icon" />;
          } else if (activity == "Park Film") {
            return <TheatersRoundedIcon className="icon" />;
          } else if (activity == "Swimming") {
            return <PoolRoundedIcon className="icon" />;
          } else if (activity == "SCUBA Diving") {
            return <ScubaDivingRoundedIcon className="icon" />;
          } else if (activity == "Museum Exhibits") {
            return <MuseumRoundedIcon className="icon" />;
          } else if (activity == "Biking") {
            return <PedalBikeRoundedIcon className="icon" />;
          } else if (activity.includes("ATV")) {
            return <DirectionsCarFilledRoundedIcon className="icon" />;
          } else if (activity == "Picnicking") {
            return <TableRestaurantRoundedIcon className="icon" />;
          } else if (activity == "Surfing") {
            return <SurfingRoundedIcon className="icon" />;
          } else if (activity == "Skiing") {
            return <DownhillSkiingRoundedIcon className="icon" />;
          } else if (activity == "Living History") {
            return <HistoryEduRoundedIcon className="icon" />;
          } else if (activity == "Theater") {
            return <TheaterComedyRoundedIcon className="icon" />;
          } else if (activity == "Live Music") {
            return <MusicNoteRoundedIcon className="icon" />;
          } else if (activity == "Snowmobiling") {
            return <SnowmobileRoundedIcon className="icon" />;
          } else if (activity == "Paddling") {
            return <KitesurfingRoundedIcon className="icon" />;
          } else {
            return null;
          }
        })
        .filter((icon) => icon !== null); // Filter out the null values

      setActivityIcons(uniqueIcons);
    }
  }, [activities]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {icons.length > 0 && (
        <List
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            margin: "auto auto auto auto",
          }}
        >
          {icons.map((icon, index) => (
            <ListItem
              key={index}
              sx={{
                paddingLeft: "6px",
                paddingRight: "6px",
                width: "80px",
              }}
            >
              {icon}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
