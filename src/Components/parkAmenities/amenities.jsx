import { useState, useEffect } from "react";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded";
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import DirectionsBikeRoundedIcon from "@mui/icons-material/DirectionsBikeRounded";
import DownhillSkiingRoundedIcon from "@mui/icons-material/DownhillSkiingRounded";
import GarageRoundedIcon from "@mui/icons-material/GarageRounded";
import KayakingRoundedIcon from "@mui/icons-material/KayakingRounded";
import OutdoorGrillRoundedIcon from "@mui/icons-material/OutdoorGrillRounded";
import PedalBikeRoundedIcon from "@mui/icons-material/PedalBikeRounded";
import SkateboardingRoundedIcon from "@mui/icons-material/SkateboardingRounded";
import SnowboardingRoundedIcon from "@mui/icons-material/SnowboardingRounded";
import SnowshoeingRoundedIcon from "@mui/icons-material/SnowshoeingRounded";
import SportsTennisRoundedIcon from "@mui/icons-material/SportsTennisRounded";
import SurfingRoundedIcon from "@mui/icons-material/SurfingRounded";
import AttractionsRoundedIcon from "@mui/icons-material/AttractionsRounded";
import CabinRoundedIcon from "@mui/icons-material/CabinRounded";
import { Box } from "@mui/material";

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
      const icons = amenities.map((amenity) => {
        if (amenity.includes("Parking")) {
          return <GarageRoundedIcon />;
        } else if (amenity.includes("Picnic") || amenity.includes("Grill")) {
          return <OutdoorGrillRoundedIcon />;
        } else if (amenity.includes("Camping")) {
          return <CabinRoundedIcon />;
        } else if (amenity.includes("Bicycle")) {
          return <PedalBikeRoundedIcon />;
        } else {
          return amenity;
        }
      });
      setAmenitiesIcons(icons);
    }
  }, [amenities]);

  return (
    <Box>
      {amenitiesIcons.length > 0 && (
        <ul>
          {amenitiesIcons.map((icon, index) => (
            <li key={index}>{icon}</li>
          ))}
        </ul>
      )}
    </Box>
  );
}
