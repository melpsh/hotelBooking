import React, { useEffect, useState } from "react";
import useUrlLocation from "../hooks/useUrlLocation";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "./context/BookmarkProvider";

const baseGeoCondingURL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {
    const [lat,lng] = useUrlLocation();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
    const [geoCodingError, setGeoCodingError] = useState(null);
    const [countryCode, setCountryCode] = useState("");
    const {createBookmark} = useBookmarks();
    
    useEffect(()=>{
        if(!lat || !lng) return
        async function fetchLocationData(){
            setIsLoadingGeoCoding(true);
            setGeoCodingError(null);
            try{
                const {data} = await axios.get(`${baseGeoCondingURL}?latitude=${lat}&longitude=${lng}`);
                console.log(data);
                setCityName(data.city || data.locality || "");
                setCountryName(data.countryName);
                if(!data.countryCode){
                    throw new Error("there is no country code");
                }
                setCountryCode(data.countryCode);
            }
            catch(error){
                setGeoCodingError(error.message);
            }
            finally{
                setIsLoadingGeoCoding(false);
            }
        }
        fetchLocationData();
    },[lat,lng])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newBookmark = {
            cityName,
            country: countryName,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + countryName 
        }
        console.log(newBookmark);
        await createBookmark(newBookmark);
        navigate("/bookmarks");
    }


    if(isLoadingGeoCoding)
        return <Loader />
  return (
    <div>
        <h2>Bookmark new Location</h2>
        <form className="form" onSubmit={handleSubmit}>
            <div className="formControl">
                <lable htmlFor="cityName">
                    City Name:
                </lable>
                <input type="text" name="cityName" value={cityName} onChange={(e) => setCityName(e.target.value)}/>
            </div>
            <div className="formControl">
                <lable htmlFor="countryName">
                    Country Name:
                </lable>
                <input type="text" name="countryName" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
                <ReactCountryFlag className="flag" svg countryCode={countryCode}/>
            </div>
            
                <div className="buttons">
                <button className="btn btn--primary">
                    Add
                </button>
                <button className="btn btn--back" onClick={(e)=> {e.preventDefault(); navigate(-1); }}>
                    Back
                </button>
                </div>

        </form>
    </div>
  )
};

export default AddNewBookmark;
