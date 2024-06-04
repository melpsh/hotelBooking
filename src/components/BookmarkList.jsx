import React from "react";
import { useBookmarks } from "./context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const BookmarkList = () => {
    const {currentBookmark, bookmark, isLoading} = useBookmarks();
    if(isLoading){
        return <Loader />
    }
  return (
    <div>
        {bookmark.map(item=>{
            return (
                <Link key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className="bookmarkItem">
                        <ReactCountryFlag svg countryCode={item.countryCode} />
                        &nbsp;
                        <strong>{item.cityName}</strong>
                        &nbsp;
                        <strong>{item.country}</strong>
                    </div>
                </Link>
            )
        })}
    </div>
  )
};

export default BookmarkList;
