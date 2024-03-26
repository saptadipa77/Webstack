import React,{useState} from 'react' //useState hook is for managing states . It is a way for react to remember the things.
import {DatePicker,Space} from "antd"; // space is for the margin and padding

import { UseDispatch, useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';


const Search = () => {
    const {RangePicker}=DatePicker;
    const [keyword,setKeyword]=useState({}); // keyword is the name of state given in search bar and set keyword is for showing the properties for that state
    // storing the data range value
    const [value,setValue]=useState([]);

    const dispatch = useDispatch();
    function searchHandler(e){
      e.preventDefault(); // to prevent the default behaviour of form submission
      dispatch(propertyAction.updateSearchParams(keyword));
      dispatch(getAllProperties());
      setKeyword({
        city:"",
        guests:"",
        dateIn:"",
        dateOut:"",
      });
      setValue([]) // clears the search result value
    }

    function returnDates(date,dateString){
      //setting the date range value in a state
      setValue([date[0],date[1]]);
      //updating keyword object with date range.
      updateKeyword("dateIn",dateString[0]); //checkin
      updateKeyword("dateOut",dateString[1]); //checkout
    }
// function to update a specific field in the keyword state object
    const updateKeyword=(field,value)=>{
      setKeyword((prevKeyword)=> ({
        ...prevKeyword,
            [field]:value,
      }));
    };
  return(
    <>   
    <div className='searchbar'>
        <input
        className='search'
        id='search_destination'
        placeholder='Search destination'
        type='text'
        value={keyword.city}
        onChange={(e)=>updateKeyword("city",e.target.value)}
        />
        
        {/* Date Range Picker */}
        <Space direction="vertical" size={12} className='search'>
            <RangePicker
            format="YYYY-MM-DD"
            picker="date"
            className='date_picker'
            disabledDate={(current)=>{
              return current && current.isBefore(Date.now(),"day");
            }}
            onChange={returnDates}
            />
        </Space>

        {/* input field for adding guests */}
        <input
        className='search'
        id='addguest'
        placeholder='Add guest'
        type='number'
        value={keyword.guests} // guest is the object
        onChange={(e)=>updateKeyword("guests",e.target.value)}
        />

        {/*Search icon */}
        <span class="material-symbols-outlined searchicon" onClick={searchHandler}>
        search
        </span>

    </div>
    </>
  );
};

export default Search