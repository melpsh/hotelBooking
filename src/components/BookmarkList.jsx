import React from "react";
import { useBookmarks } from "./context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import {HiTrash} from "react-icons/hi"

const BookmarkList = () => {
    const { bookmark, isLoading, deleteBookmark} = useBookmarks();
    if(isLoading){
        return <Loader />
    }
    if(!bookmark.length){
        return <div>
            <strong>
            There is no bookmarks yet
            </strong>
            
        </div>
    }

    const handleRemoveBookmark = async(id, e)=>{
        e.preventDefault();
        await deleteBookmark(id);
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
                        <button onClick={(e)=> handleRemoveBookmark(item.id, e)}>
                            <HiTrash className="trash"/>
                        </button>
                    </div>
                </Link>
            )
        })}
    </div>
  )
};

export default BookmarkList;
