import React, { useState } from "react";

export default function useGeoLocation() {
  const [position, setPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosition = () =>{
    if(!navigator.geolocation){
        return setError('Your browser does not support geo location.')
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
    (pos)=>{
        setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude});
        setLoading(false);
    },
    (err)=>{
        setError(err.message);
        setLoading(false);
    })
  }
  return {getPosition, position, loading}
};
