import React, { Children, useRef } from "react";
import { useState } from "react";
import {MdLocationOn, MdLogout} from 'react-icons/md'
import {HiCalendar, HiSearch , HiMinus, HiPlus} from 'react-icons/hi'
import useOutsideClick from "../hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { NavLink, createSearchParams, json, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthProviders";


const Header = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [destination,setDestination] = useState("" || searchParams.get("destination"));
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ 
        adult: 1,
        children: 0,
        room: 1
    });
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }])

    const hanleOptions = (name, operator)=> {
        setOptions((prev)=>{
            return {
                ...prev, 
                [name]: operator === 'inc' ? options[name]+1 : options[name] -1
            }
        })
    }

    const navigate = useNavigate()

    const hanleSearch = ()=> {
        // navigate("/hotels");
        // setSearchParams({destination, options, date});
        const encoded = createSearchParams(
            {destination, 
            options: JSON.stringify(options), 
            date: JSON.stringify(date)
        })
        navigate({
            search: encoded.toString(),
            pathname: "/hotels"
        })
    }

  return (
    <div className="header">
    <div className="headerSearch">
    <div className="headerSearchItem">
        <MdLocationOn className="headerIcon locationIcon"/>
        <input id="destination" value={destination} type="text" placeholder="Where do you want to go?" className="headerSearchInput" onChange={(e)=> setDestination(e.target.value)}/>
        <span className="seperator"></span>
    </div>
    <div className="headerSearchItem">
        <HiCalendar className="headerIcon dateIcon"/>
        <div className="dateDropDown" onClick={()=>setOpenDate(!openDate)}>
            {`${format(date[0].startDate , 'MM/dd/yyyy')} to ${format(date[0].endDate , 'MM/dd/yyyy')}` }  
        </div>
        {openDate && (
            <DateRange className="date"
            ranges={date}
            onChange={(item)=> setDate([item.selection])}/>
        )}
        <span className="seperator"></span>
    </div>
    <div className="headerSearchItem">
    <div id="optionDropDown" className="optionDropDown" onClick={()=> setOpenOptions(!openOptions)}>
        {options.adult} Adult. {options.children} Children . {options.room} Room
    </div>
    {openOptions &&
        <GuestOptionList options={options} hanleOptions={hanleOptions} setOpenOptions= {setOpenOptions}/>
    }
    <span className="seperator"></span>
    </div>
    <div className="headerSearchItem">
        <button className="headerSearchBtn" onClick={hanleSearch}>
            <HiSearch className="headerIcon"/>
        </button>
    </div>

    </div>
    {}
    {/* <NavLink to={"/login"}>Login</NavLink> */}
    <User />
  </div>
  )

};

export default Header;



function User(){
    const {user, isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/");
    }

        return (
            <div>
                {isAuthenticated ? 
                (<div>{user.name} &nbsp;
                <button onClick={handleLogout}><MdLogout className="logout icon"/></button>
                </div>)
                : <NavLink to={"/login"}>Login</NavLink>}
            </div>
    )
}


const GuestOptionList = ({options, hanleOptions, setOpenOptions}) => {
    const optionRef = useRef();
    useOutsideClick(optionRef, 'optionDropDown',()=> setOpenOptions(false));
    console.log(optionRef.current);

    return (
    <div className="guestOptions" ref={optionRef}>
        <OptionItem options= {options} type='adult' hanleOptions={hanleOptions} minLimit={1}/>
        <OptionItem options= {options} type='children' hanleOptions={hanleOptions} minLimit={0}/>
        <OptionItem options= {options} type='room' hanleOptions={hanleOptions} minLimit={1}/>
    </div>
    )
}

const OptionItem = ({options, type, hanleOptions, minLimit}) =>{
 return (
    <div className="guestOptionItem">
        <div className="optionText">{type}</div>
        <div className="optionCounter">
            <button className="optionCounterBtn" onClick={()=> hanleOptions(type, 'dec')} disabled={options[type]<= minLimit}>
                <HiMinus className="headerIcon"/>
            </button>
            <span className="optionCounterNumber">{options[type]}</span>
            <button className="optionCounterBtn" onClick={()=> hanleOptions(type, 'inc')}>
                <HiPlus className="headerIcon"/>
            </button>
        </div>
    </div>
 )
}