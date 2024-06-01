import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useHotels } from "./context/HotelsProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";


const Map = () => {
    const [mapCenter, setMapCenter] = useState([50,4]);
    const {hotels, isLoading} = useHotels();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const {getPosition, position: geoLocationPosition, loading: loadingGeoPosition} = useGeoLocation();

    useEffect(()=>{
        if(lat && lng)
            setMapCenter([lat,lng])
    },[lat,lng])

    useEffect(()=>{
      if(geoLocationPosition.lat && geoLocationPosition.lng){
        setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng])
      }
    },[geoLocationPosition])

  return (
    <div className="mapContainer">
        <MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom='true'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        <DetectClick />
            {hotels.map(item=>(
            <Marker position={[item.latitude, item.longitude]} key={item.id}>
                <Popup>
                    {item.host_location}
                </Popup>
             </Marker>
            ) 
            )}
          <button className="getLocation" onClick={getPosition} >
            {loadingGeoPosition? "Loading...":"Take me to my location"}
          </button>
        </MapContainer>
    </div>
  )
};

export default Map;

function ChangeCenter({position}){
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: (e)=> console.log(e)    
  });
  return null;
}

