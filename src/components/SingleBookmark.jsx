import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "./context/BookmarkProvider";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
    const {id} = useParams();
    const {getBookmark, currentBookmark, currentBookmarkLoading} = useBookmarks();
    const navigate = useNavigate();
    useEffect(()=>{
        getBookmark(id);
    },[id])
    if(!currentBookmark || currentBookmarkLoading){
        return <Loader />
    }

  return (
    <div className="currentBookmark">
        <button className="btn btn--back" onClick={()=> navigate(-1)}>&larr; Back</button>
        <h2>{currentBookmark.cityName}</h2>
            <div className="bookmarkItem">
                <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                &nbsp;
                <strong>{currentBookmark.cityName}</strong>
                &nbsp;
                <strong>{currentBookmark.country}</strong>
         </div>
    </div>
  )
};

export default SingleBookmark;
