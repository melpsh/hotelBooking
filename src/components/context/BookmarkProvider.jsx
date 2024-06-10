import React, { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";


const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";
const BookmarkProvider = ({children}) => {
    
    const [currentBookmark, setCurrentBookmark] = useState(null);
    // const [currentBookmarkLoading, setCurrentBookmarkLoading] = useState(false);
    // const {data: bookmark, isLoading} = useFetch(BASE_URL);
    const [isLoading, setIsLoading] = useState(false);
    const [bookmark, setBookmark] = useState([]);

    useEffect(()=>{
      async function fetchBookmarkList(){
          try{
              setIsLoading(true);
              const {data} = await axios.get(`${BASE_URL}`);
              setBookmark(data);
          }catch(error){
              toast.error(error.message)
          }finally{
              setIsLoading(false);
          }
      }       
      fetchBookmarkList();
    },[])

    async function getBookmark(id){
      setIsLoading(true);
      setCurrentBookmark(null);
      try {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        setCurrentBookmark(data);
      } catch (error) {
        toast.error(error.message);
      } finally{
        setIsLoading(false);
      }
    }

    async function createBookmark(newBookmark){
      setIsLoading(true);
       try{
          const {data} = await axios.post(`${BASE_URL}/`,newBookmark);
          setBookmark((pre)=> [...pre,newBookmark])
       }catch{
        toast.error(error.message);
       }finally{
        setIsLoading(false);
       }
    }

  return (
    <BookmarkContext.Provider value={{ getBookmark, currentBookmark, bookmark, isLoading, createBookmark}}>
      {children}
    </BookmarkContext.Provider>
  )
};

export default BookmarkProvider;


export function useBookmarks(){
  return useContext(BookmarkContext);
}