import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";
import { useHotels } from "./context/HotelsProvider";

const SingleHotel = () => {
    const {id} = useParams();
    console.log("hotel iddddddddd",id);
    const {getHotel, currentHotel, currentHotelLoading} =useHotels();
    useEffect(()=>{
        getHotel(id);
    },[id])

    if(currentHotelLoading || !currentHotel){
        return <Loader />
    }
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  )
};

export default SingleHotel;



