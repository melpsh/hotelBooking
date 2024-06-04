import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotels } from "./context/HotelsProvider";

const AppLayout = () => {
  const {hotels, isLoading} = useHotels();
  return (
    <div className="appLayout">
    <div className="sidebar">
      <Outlet />
    </div>
    <Map markerLocation={hotels}/>
  </div>
  )
};

export default AppLayout;
