import React, { Children, createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";


const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";
const BookmarkProvider = ({children}) => {
    
    const [currentBookmark, setCurrentBookmark] = useState(null);
    const [currentBookmarkLoading, setCurrentBookmarkLoading] = useState(false);
    const {data: bookmark, isLoading} = useFetch(BASE_URL);

    async function getBookmark(id){
      setCurrentBookmarkLoading(true);
      setCurrentBookmark(null);
      try {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        setCurrentBookmark(data);
      } catch (error) {
        toast.error(error.message);
      } finally{
        setCurrentBookmarkLoading(false);
      }
    }

  return (
    <BookmarkContext.Provider value={{ currentBookmarkLoading, getBookmark, currentBookmark, bookmark, isLoading}}>
      {children}
    </BookmarkContext.Provider>
  )
};

export default BookmarkProvider;


export function useBookmarks(){
  return useContext(BookmarkContext);
}