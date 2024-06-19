// context + Reducer
import React, { Children, createContext, useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";



const initialState = {
  currentBookmark: null,
  isLoading: false,
  bookmark: [],
  error: null
}

function bookmarkReducer(state, action){
 switch (action.type){
  case "loading":
  return{
    ...state,
    isLoading: true
  };
  case "bookmarks/loaded":
  return{
    ...state,
    isLoading: false,
    bookmark: action.payload
  };
  case "bookmark/loaded":
  return{
    ...state,
    isLoading: false,
    currentBookmark: action.payload
  }
  case "bookmark/created":
  return{
    ...state,
    isLoading: false,
    bookmark : [...state.bookmark, action.payload],
    currentBookmark: action.payload
  }
  case "bookmark/delete":
  return{
    ...state,
    isLoading: false,
    bookmark: state.bookmark.filter((item)=> item.id !== action.payload),
    currentBookmark: null
  }
  case "rejected":
  return{
    ...state,
    isLoading: false,
    error: action.payload
  }
  default:
    throw new Error("Unknown Action");
 }
}

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000/bookmarks";

const BookmarkProvider = ({children}) => {
    
    // const [currentBookmark, setCurrentBookmark] = useState(null);
    // const [currentBookmarkLoading, setCurrentBookmarkLoading] = useState(false);
    // const {data: bookmark, isLoading} = useFetch(BASE_URL);
    // const [isLoading, setIsLoading] = useState(false);
    // const [bookmark, setBookmark] = useState([]);

    const [{currentBookmark, isLoading, bookmark, error}, dispatch] = useReducer(bookmarkReducer, initialState);

    useEffect(()=>{
      async function fetchBookmarkList(){
          try{
              dispatch({type: "loading"});
              const {data} = await axios.get(`${BASE_URL}`);
              dispatch({type: "bookmarks/loaded", payload: data})
          }catch(error){
              toast.error(error.message)
              dispatch({type: "rejected", payload: "Error in Bookmark List"});
          }
      }       
      fetchBookmarkList();
    },[])

    async function getBookmark(id){
      dispatch({type: "loading"});
      try {
        const {data} = await axios.get(`${BASE_URL}/${id}`);
        dispatch({type: "bookmark/loaded", payload: data})
      } catch (error) {
        toast.error(error.message);
        dispatch({type: "rejected", payload: "Error in single Bookmark"});
      } 
    }

    async function createBookmark(newBookmark){
      dispatch({type: "loading"});
       try{
          const {data} = await axios.post(`${BASE_URL}/`,newBookmark);
          dispatch({type: "bookmark/created", payload: data});
       }catch(error){
        toast.error(error.message);
        dispatch({type: "rejected", payload: error.message});
       }
    }

    async function deleteBookmark(id){
      dispatch({type: "loading"});
      try{
        await axios.delete(`${BASE_URL}/${id}`);
        dispatch({type: "bookmark/delete", payload: id})
      }catch(error){
        toast.error(error.message);
        dispatch({type: "rejected", payload: error.message});
       }
    }

  return (
    <BookmarkContext.Provider value={{ getBookmark, currentBookmark, bookmark, isLoading, createBookmark, deleteBookmark}}>
      {children}
    </BookmarkContext.Provider>
  )
};

export default BookmarkProvider;


export function useBookmarks(){
  return useContext(BookmarkContext);
}



// without Use Reducer just context

// import React, { Children, createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import useFetch from "../../hooks/useFetch";


// const BookmarkContext = createContext();
// const BASE_URL = "http://localhost:5000/bookmarks";
// const BookmarkProvider = ({children}) => {
    
//     const [currentBookmark, setCurrentBookmark] = useState(null);
//     // const [currentBookmarkLoading, setCurrentBookmarkLoading] = useState(false);
//     // const {data: bookmark, isLoading} = useFetch(BASE_URL);
//     const [isLoading, setIsLoading] = useState(false);
//     const [bookmark, setBookmark] = useState([]);

//     useEffect(()=>{
//       async function fetchBookmarkList(){
//           try{
//               setIsLoading(true);
//               const {data} = await axios.get(`${BASE_URL}`);
//               setBookmark(data);
//           }catch(error){
//               toast.error(error.message)
//           }finally{
//               setIsLoading(false);
//           }
//       }       
//       fetchBookmarkList();
//     },[])

//     async function getBookmark(id){
//       setIsLoading(true);
//       setCurrentBookmark(null);
//       try {
//         const {data} = await axios.get(`${BASE_URL}/${id}`);
//         setCurrentBookmark(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally{
//         setIsLoading(false);
//       }
//     }

//     async function createBookmark(newBookmark){
//       setIsLoading(true);
//        try{
//           const {data} = await axios.post(`${BASE_URL}/`,newBookmark);
//           setBookmark((pre)=> [...pre,newBookmark])
//        }catch(error){
//         toast.error(error.message);
//        }finally{
//         setIsLoading(false);
//        }
//     }

//     async function deleteBookmark(id){
//       setIsLoading(true);
//       try{
//         await axios.delete(`${BASE_URL}/${id}`);
//         setBookmark((pre)=> pre.filter((item)=> item.id !== id));
//       }catch(error){
//         toast.error(error.message);
//        }finally{
//         setIsLoading(false);
//        }
//     }

//   return (
//     <BookmarkContext.Provider value={{ getBookmark, currentBookmark, bookmark, isLoading, createBookmark, deleteBookmark}}>
//       {children}
//     </BookmarkContext.Provider>
//   )
// };

// export default BookmarkProvider;


// export function useBookmarks(){
//   return useContext(BookmarkContext);
// }



