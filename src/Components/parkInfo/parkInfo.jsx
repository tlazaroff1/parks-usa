import { useParams } from "react-router";
//import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

/*const Component = () => {
const { id } = useParams();                              //returns the :id
const page = useSelector((state) => state.something[id]); //returns state of the page*/

export function ParkInfo() {
  const [parks, setPark] = useState(null);
  const { id } = useParams();

  //const page = useSelector((state) => state.something[id]); //returns state of the page
  useEffect(() => {
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${id}&limit=100&api_key=BIzjqaC2rxnaliC9gGbP3inDJPUBjnU5oooydXuP`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPark(data.data))
      .catch((error) => console.error(error));
  }, [id]);
  if (!parks) {
    return <div>Loading...</div>;
  }
  return (
    <Box>
      <Typography>Park {parks.fullName}</Typography>
      <img
        src={parks.images[0].url}
        alt={parks.fullName}
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <Box>{parks.description}</Box>
    </Box>
  );
}
