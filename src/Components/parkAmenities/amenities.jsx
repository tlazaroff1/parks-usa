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

function AmenitiesIcons({ parkCode }) {
  const [amenitiesIcons, setAmenitiesIcons] = useState([]);

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/amenities/parksplaces?parkCode=${parkCode}&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const amenities = data.amenities;
        const defaultIcon = "default-icon.png";
        const amenitiesIcons = amenities.map((amenity) => {
          let icon = defaultIcon;
          if (amenity.name.includes("Parking")) {
            icon = GarageRoundedIcon;
          } else if (
            amenity.name.includes("Picnic Area") ||
            amenity.name.includes("Grill")
          ) {
            icon = OutdoorGrillRoundedIcon;
          } else if (amenity.name.includes("Camping")) {
            icon = CabinRoundedIcon;
          } else if (amenity.name.includes("Bicycle")) {
            icon = PedalBikeRoundedIcon;
          }
          return {
            name: amenity.name,
            icon,
          };
        });
        setAmenitiesIcons(amenitiesIcons);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [parkCode]);

  return (
    <div>
      {amenitiesIcons.map((amenity, index) => (
        <img src={amenity.icon} alt={amenity.name} key={index} />
      ))}
    </div>
  );
}

export default AmenitiesIcons;
