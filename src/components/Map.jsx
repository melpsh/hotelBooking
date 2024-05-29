import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "./context/HotelsProvider";
import { useSearchParams } from "react-router-dom";


const Map = () => {
    const [mapCenter, setMapCenter] = useState([50,4]);
    const {hotels, isLoading} = useHotels();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(()=>{
        if(lat && lng)
            setMapCenter([lat,lng])
    },[lat,lng])

  return (
    <div className="mapContainer">
        <MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom='true'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
            {hotels.map(item=>(
            <Marker position={[item.latitude, item.longitude]} key={item.id}>
                <Popup>
                    {item.host_location}
                </Popup>
             </Marker>
            ) 
            )}
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
