import React from "react";
import { useState } from "react";
const SearchBar = ({onSearch}) =>{
    const [searchTerm,setSearchTerm] = useState("");
    
    const handleInputChange=(e)=>{
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e)=>{
        e.preventDefault();
        onSearch(searchTerm);
    }

;  return(
        <form onSubmit={handleSearch} className="d-flex ">
            <input type="text" value={searchTerm}
            onChange={handleInputChange} placeholder="Type to search" className="form-control me-2"/>
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );

};
export default SearchBar;