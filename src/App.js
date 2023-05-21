import "./App.css";
import { Map } from "./Components/map/map";
import { Parks } from "./Components/parks/parks";
import * as React from "react";
import { ParkInfo } from "./Components/parkInfo/parkInfo";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";
import { Header } from "./Components/header/header";
import { LocationContext } from "./Components/state/locations/location-context";
import { useReducer } from "react";
import { locationReducer } from "./Components/state/locations/location-reducer";

function App() {
  const [locationState, locationDispatch] = useReducer(locationReducer, {
    locations: [],
  });
  return (
    <HashRouter>
      <Header />
      <LocationContext.Provider value={{ locationState, locationDispatch }}>
        <Routes>
          {/* http://localhost:3000/#/ */}
          <Route path="/" element={<Parks />} />
          {/* http://localhost:3000/#/Map */}
          <Route path="/map" element={<Map />} />
          {/* http://localhost:3000/#/Parm/{id} */}
          <Route path="/park/:id" element={<ParkInfo />} />
        </Routes>
      </LocationContext.Provider>
    </HashRouter>
  );
}
export default App;
