import { useParams } from "react-router";
import {
  Box,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import "./../../App.css";
import "./parkInfo.css";
import { ImageCarousel } from "../carousel/carousel";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { useContext } from "react";
import { LocationActions } from "../state/locations/location-reducer";
import { LocationContext } from "../state/locations/location-context";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AmenitiesIcons from "../parkAmenities/amenities";
import ActivitiesIcons from "../activities/activities";

export function ParkInfo() {
  const [park, setPark] = useState("");
  const [activities, setActivities] = useState([]);
  const [expanded, setExpanded] = React.useState("panel1");

  const { id } = useParams();
  console.log("id");
  console.log(id);
  console.log("park");
  console.log(park);

  //const page = useSelector((state) => state.something[id]); //returns state of the page
  useEffect(() => {
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${id}&limit=50&start=0&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPark(data.data[0]))
      .catch((error) => console.error(error));
  }, [id]);

  if (!park) {
    return <div>Loading...</div>;
  }

  const images = park.images.map((image) => image.url);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1.5px solid #1c3c23`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(28, 60, 35, .2)",

    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const activitiesList =
    park?.activities?.map((activity) => activity.name) || [];
  console.log(activitiesList, "hi");
  return (
    <Box className="background">
      <Box className="searchResult" width="90%" margin="auto auto auto auto">
        <Typography
          className="titles"
          sx={{ paddingTop: "15px", paddingBottom: "15px" }}
        >
          {park.fullName}
        </Typography>
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
        <Box>
          <Box className="locButton">
            <IconButton
              aria-label="delete"
              size="large"
              className="addLocButton"
              sx={{
                backgroundColor: "white",
                border: "2px solid #6b460c",
                radius: "50%",
              }}
              //OnClick={() => addLocation(park.parkCode)}
            >
              <AddLocationAltRoundedIcon
                sx={{ color: "#6b460c", fontSize: "2.5rem" }}
              />
            </IconButton>
          </Box>
          <Box className="displayInfo">
            <Typography className="text">{park.description}</Typography>
          </Box>
          <Box className="displayInfo">
            <Typography className="InfoTitle">Amenities</Typography>
            <AmenitiesIcons parkCode={park.parkCode} />
          </Box>
          <Box className="displayInfo">
            <Typography className="InfoTitle">Activities</Typography>
            <ActivitiesIcons activities={activitiesList} />
          </Box>
          {/*<Box className="displayInfo">
            <Typography className="InfoTitle">Hours:</Typography>
            {park.operatingHours.map((hours, index) => (
              <Box key={index}>
                <Typography className="secondaryTitle">{hours.name}</Typography>
                {Object.keys(hours.standardHours).map((day, index) => (
                  <Typography key={index}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                    {hours.standardHours[day] === "All Day"
                      ? "24 hours"
                      : hours.standardHours[day]}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
          <Divider />*/}

          {/* <Box className="displayInfo">
            <ListItem>
              <ListItemIcon>
                <LocalPhoneRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={park.contacts.phoneNumbers[0].phoneNumber}
              />
            </ListItem>
            {park.contacts.emailAddresses.map((emailAddress, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <EmailRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={emailAddress.emailAddress} />
              </ListItem>
            ))}
          </Box>
          <Divider /> 
          <Box className="displayInfo">
            <Typography className="InfoTitle">Entrance Fees:</Typography>
            {park.entranceFees.map((fee, index) => (
              <Typography key={index}>
                {fee.title}: {fee.cost === "0.00" ? "No Fee" : `$${fee.cost}`}
              </Typography>
            ))}
          </Box>
          <Divider />
          <Box className="displayInfo">
            <Typography className="InfoTitle">Addresses:</Typography>
            {park.addresses.map((address, index) => (
              <Box key={index}>
                <Typography>
                  {address.type} Address: {address.line1}, {address.city},{" "}
                  {address.stateCode} {address.postalCode}
                </Typography>
              </Box>
            ))}
            </Box>*/}
          <div className="accordian">
            <Accordion
              className="topAccordian"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography className="InfoTitle">Hours</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ display: "flex" }}>
                  {park.operatingHours.map((hours, index) => (
                    <Box key={index} sx={{ width: "33%", textAlign: "center" }}>
                      <Typography className="secondaryTitle">
                        {hours.name}
                      </Typography>
                      {Object.keys(hours.standardHours).map((day, index) => (
                        <Typography key={index}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                          {hours.standardHours[day] === "All Day"
                            ? "24 hours"
                            : hours.standardHours[day]}
                        </Typography>
                      ))}
                    </Box>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography className="InfoTitle">Contact Info:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box>
                    <ListItem>
                      <ListItemIcon>
                        <LocalPhoneRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={park.contacts.phoneNumbers[0].phoneNumber}
                      />
                    </ListItem>
                    {park.contacts.emailAddresses.map((emailAddress, index) => (
                      <ListItem key={index} textAlign="center">
                        <ListItemIcon>
                          <EmailRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={emailAddress.emailAddress} />
                      </ListItem>
                    ))}
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography className="InfoTitle">Entrance Fees:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box>
                    {park.entranceFees.map((fee, index) => (
                      <Typography
                        key={index}
                        sx={{
                          paddingRight: "16px",
                          paddingLeft: "16px",
                          paddingBottom: "5px",
                        }}
                      >
                        {fee.title}:{" "}
                        {fee.cost === "0.00" ? "No Fee" : `$${fee.cost}`}
                      </Typography>
                    ))}
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="bottomAccordian"
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography className="InfoTitle">Address</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {park.addresses.map((address, index) => (
                    <Box key={index} textAlign="center">
                      <Typography
                        display="flex"
                        textAlign="center"
                        sx={{
                          paddingRight: "16px",
                          paddingLeft: "16px",
                          paddingBottom: "12px",
                        }}
                      >
                        <Typography
                          sx={{
                            textDecoration: "underline",
                            paddingRight: "10px",
                          }}
                        >
                          {address.type} Address:
                        </Typography>
                        {address.line1}, {address.city}, {address.stateCode}{" "}
                        {address.postalCode}
                      </Typography>
                    </Box>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <Box className="displayInfo">
            {park.url && (
              <Box>
                <Typography className="website">
                  For More Information Visit: <a href={park.url}>{park.url}</a>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
