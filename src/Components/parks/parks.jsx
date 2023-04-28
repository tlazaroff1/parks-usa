import * as React from "react";
import { Box } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import "./../../App.css";
import "./parks.css";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@mui/material";

import { Autocomplete, TextField, IconButton } from "@mui/material";

export function Parks() {
  const us_states = [
    { code: "AL", label: "Alabama" },
    { code: "AK", label: "Alaska" },
    { code: "AZ", label: "Arizona" },
    { code: "AR", label: "Arkansas" },
    { code: "CA", label: "California" },
    { code: "CO", label: "Colorado" },
    { code: "CT", label: "Connecticut" },
    { code: "DE", label: "Delaware" },
    { code: "FL", label: "Florida" },
    { code: "GA", label: "Georgia" },
    { code: "HI", label: "Hawaii" },
    { code: "ID", label: "Idaho" },
    { code: "IL", label: "Illinois" },
    { code: "IN", label: "Indiana" },
    { code: "IA", label: "Iowa" },
    { code: "KS", label: "Kansas" },
    { code: "KY", label: "Kentucky" },
    { code: "LA", label: "Louisiana" },
    { code: "ME", label: "Maine" },
    { code: "MD", label: "Maryland" },
    { code: "MA", label: "Massachusetts" },
    { code: "MI", label: "Michigan" },
    { code: "MN", label: "Minnesota" },
    { code: "MS", label: "Mississippi" },
    { code: "MO", label: "Missouri" },
    { code: "MT", label: "Montana" },
    { code: "NE", label: "Nebraska" },
    { code: "NV", label: "Nevada" },
    { code: "NH", label: "New Hampshire" },
    { code: "NJ", label: "New Jersey" },
    { code: "NM", label: "New Mexico" },
    { code: "NY", label: "New York" },
    { code: "NC", label: "North Carolina" },
    { code: "ND", label: "North Dakota" },
    { code: "OH", label: "Ohio" },
    { code: "OK", label: "Oklahoma" },
    { code: "OR", label: "Oregon" },
    { code: "PA", label: "Pennsylvania" },
    { code: "RI", label: "Rhode Island" },
    { code: "SC", label: "South Carolina" },
    { code: "SD", label: "South Dakota" },
    { code: "TN", label: "Tennessee" },
    { code: "TX", label: "Texas" },
    { code: "UT", label: "Utah" },
    { code: "VT", label: "Vermont" },
    { code: "VA", label: "Virginia" },
    { code: "WA", label: "Washington" },
    { code: "WV", label: "West Virginia" },
    { code: "WI", label: "Wisconsin" },
    { code: "WY", label: "Wyoming" },
  ];
  const [stateCode, setStateCode] = useState(null); // default stateCode is "NY"
  const [parks, setParks] = useState([]);

  const handleChange = (event, value) => {
    setStateCode(value);
  };

  const handleSearch = () => {
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode?.code}&limit=100&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setParks(data.data))
      .catch((error) => console.error(error));
  };
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  /* const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page) {
      navigate(page.path);
    }
  };*/

  return (
    <Box classlabel="backgroound">
      <Box classlabel="info">
        <Autocomplete
          className="searchBar"
          disablePortal
          id="combo-box-demo"
          options={us_states}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.label}
          value={stateCode}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Enter A State: " />
          )}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>

        <Box className="parksList" width="75%">
          <List>
            {parks.map((park) => (
              <ListItem key={park.id}>
                <Box
                  width="30%"
                  overflow="hidden"
                  minWidth="20%"
                  marginRight="8px"
                >
                  <img
                    alt={park.fullName}
                    src={park.images[0]?.url}
                    height="150px"
                    width="100%"
                  />
                </Box>
                <Box>
                  <ListItemText
                    className="parkDesc"
                    primary={park.fullName}
                    secondary={park.description}
                  />
                  <Link to={`/park/${park.parkCode}`}>
                    <Button
                      variant="contained"
                      //onClick={() => handleCloseNavMenu(page)}
                    >
                      View More
                    </Button>
                  </Link>

                  <IconButton aria-label="delete" size="large">
                    <AddLocationIcon fontSize="inherit" />
                  </IconButton>
                </Box>
                <Divider />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
