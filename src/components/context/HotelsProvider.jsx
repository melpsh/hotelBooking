import React, { Children, createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";


const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
const HotelsProvider = ({children}) => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room;
    const {data:hotels, isLoading} = useFetch(BASE_URL, `q=${destination || ""} && accommodates_gte = ${room || 1}`);
    const [currentHotel, setCurrentHotel] = useState(null);
    const [currentHotelLoading, setCurrentHotelLoading] = useState(false);

    async function getHotel(id){
      setCurrentHotelLoading(true);
      setCurrentHotel(null);
      try {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        setCurrentHotel(data);
        setCurrentHotelLoading(false);
      } catch (error) {
        toast.error(error.message);
        setCurrentHotelLoading(false);
      }
    }

  return (
    <HotelContext.Provider value={{hotels, isLoading, getHotel, currentHotel, currentHotelLoading}}>
      {children}
    </HotelContext.Provider>
  )
};

export default HotelsProvider;


export function useHotels(){
  return useContext(HotelContext);
}