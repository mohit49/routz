import React, { useState } from "react";
import "./SearchBar.scss";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Select } from "antd";
import { Checkbox } from "antd";
function SearchBar() {
    const [checkedList , setCheckedList] = useState();
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ["Bikers", "Show Rooms", "Events", 'Posts'];
  const onChange = list => {
 setCheckedList(list);
  };
  return (
    <div className='main-search-container'>
      <div className='type-area-search'>
        <input placeholder='Search Here'></input>
      </div>
      <div className='searchtypeSelector'><CheckboxGroup
          options={plainOptions}
          
          onChange={onChange}
        /></div>
      <div className='search-submit-button'>

        <LinkContainer to='/login'>
          <Button variant='primary'>Search Now</Button>
        </LinkContainer>
      </div>
    </div>
  );
}

export default SearchBar;
