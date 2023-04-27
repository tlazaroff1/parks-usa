import "./App.css";
import { Map } from "./Components/map/map";
import { Parks } from "./Components/parks/parks";
import * as React from "react";

import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/header/header";

/*export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyByo_ZcTT1MrLsO6EeWflKqlV-PMvgp8Vo", // Add your API key
  });

  return isLoaded ? <Map /> : null;
}*/
function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        {/* http://localhost:3000/#/ */}
        <Route path="/" element={<Parks />} />
        {/* http://localhost:3000/#/todo */}
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
