import React, { useContext } from 'react'
import  { UserContext } from '../context/UserContext'

function SelectUser() {
    const {userId,setUserId} = useContext(UserContext);
    const changeUserId = (e) =>{
        setUserId(Number(e.target.value));
    }
  return (
    <>
      <select value={userId} onChange={changeUserId}>
        <option value="1">Meder Shanykov</option>
        <option value="2">Uciha Madara</option>
      </select>
    </>
  );
}

export default SelectUser
