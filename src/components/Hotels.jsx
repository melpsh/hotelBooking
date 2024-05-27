import React from "react";
import useFetch from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "./context/HotelsProvider";

const Hotels = () => {
    const {hotels, isLoading} = useHotels();
    if(isLoading){
        <Loader />
    }
  return (
    <div className="searchList">
        <h2>search result ({hotels.length})</h2>
        {hotels.map(item => {
            return(
                <Link to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                    <div className="searchItem">
                    <img src={item.thumbnail_url} alt={item.name}/>
                        <div className="locationItemDesc">
                            <p className="location">{item.smart_location}</p>
                            <p className="name">{item.name}</p>
                            <p className="price"> {item.price}</p>
                            <span>night</span>
                        </div>
                    </div>
                </Link>
            )
        })}
    </div>
  )
};

export default Hotels;
