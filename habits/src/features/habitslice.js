import { createSlice } from "@reduxjs/toolkit";

//fetching data from local storage
let habbitsArray = localStorage.getItem("habits");
if (habbitsArray === null) {
  habbitsArray = [];
} else {
  habbitsArray = JSON.parse(localStorage.getItem("habits"));
}

//setting initial state as habit array in local storage
const initialState = {};
