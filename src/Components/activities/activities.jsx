import { useState, useEffect } from "react";
import "./../parkAmenities/amenities.css";
import "./../parkInfo/parkInfo.css";
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
import { Box, List, ListItem, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

export default function ActivitiesIcons({ activities }) {
  const [icons, setActivityIcons] = useState([]);
  console.log(activities, "list2");
  useEffect(() => {
    console.log(activities, "list");
    if (activities.length > 0) {
      const uniqueIcons = activities
        .map((activity) => {
          if (activity.includes("Shopping")) {
            return (
              <Tooltip title={activity}>
                <StoreRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity.includes("Birdwatching")) {
            return (
              <Tooltip title={activity}>
                <FlutterDashRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity.includes("Food")) {
            return (
              <Tooltip title={activity}>
                <LunchDiningRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Hiking") {
            return (
              <Tooltip title={activity}>
                <HikingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Camping") {
            return (
              <Tooltip title={activity}>
                <CabinRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (
            activity == "Canoeing" ||
            (activity.includes("Kayak") && activity != "Canoe or Kayak Camping")
          ) {
            return (
              <Tooltip title={activity}>
                <KayakingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Fishing") {
            return (
              <Tooltip title={activity}>
                <PhishingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Snowshoeing") {
            return (
              <Tooltip title={activity}>
                <SnowshoeingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Guided Tours") {
            return (
              <Tooltip title={activity}>
                <TourRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Boating") {
            return (
              <Tooltip title={activity}>
                <SailingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Park Film") {
            return (
              <Tooltip title={activity}>
                <TheatersRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Swimming") {
            return (
              <Tooltip title={activity}>
                <PoolRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "SCUBA Diving") {
            return (
              <Tooltip title={activity}>
                <ScubaDivingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Museum Exhibits") {
            return (
              <Tooltip title={activity}>
                <MuseumRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Biking") {
            return (
              <Tooltip title={activity}>
                <PedalBikeRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity.includes("ATV")) {
            return (
              <Tooltip title={activity}>
                <DirectionsCarFilledRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Picnicking") {
            return (
              <Tooltip title={activity}>
                <TableRestaurantRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Surfing") {
            return (
              <Tooltip title={activity}>
                <SurfingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Skiing") {
            return (
              <Tooltip title={activity}>
                <DownhillSkiingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Living History") {
            return (
              <Tooltip title={activity}>
                <HistoryEduRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Theater") {
            return (
              <Tooltip title={activity}>
                <TheaterComedyRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Live Music") {
            return (
              <Tooltip title={activity}>
                <MusicNoteRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Snowmobiling") {
            return (
              <Tooltip title={activity}>
                <SnowmobileRoundedIcon className="icon" />
              </Tooltip>
            );
          } else if (activity == "Paddling") {
            return (
              <Tooltip title={activity}>
                <KitesurfingRoundedIcon className="icon" />
              </Tooltip>
            );
          } else {
            return null;
          }
        })
        .filter((icon) => icon !== null);

      setActivityIcons(uniqueIcons);
    }
  }, [activities]);

  return (
    <Box margin="auto auto auto auto">
      {icons.length > 0 && (
        <List
          sx={{
            background: "rgba(28, 60, 35, .2)",
            borderRadius: "10pt",
            margin: "auto auto auto auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography className="InfoTitle">Activities</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
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
          </Box>
        </List>
      )}
    </Box>
  );
}
