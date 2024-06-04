import React from "react";
import Map from "./Map";
import { Outlet } from "react-router-dom";

const BookmarkLayout = () => {

  return (
    <div className="appLayout">
    <div className="sidebar">
      <Outlet />
    </div>
    <Map markerLocation={[]}/>
  </div>
  )
};

export default BookmarkLayout;
