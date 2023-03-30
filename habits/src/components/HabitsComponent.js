import React from "react";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HabitsComponent() {
  //state for habit properties
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");
  const [isVisibleId, setIsVisibleId] = useState("");
  const addHabitBtn = useRef();
  //using useDispatch hook for dispatching action
  const dispatch = useDispatch();
  //adding function to add habit
  const addHabit = () => {
    //to handle empty input
    if (habit === "") {
      alert("please fill name of habit input field");
      return;
    }
    //function is used for formatting date
    function showDate(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear().toString().substring(2);
      date = d + "/" + m + "/" + y;
      return date;
    }
    //get todays date
    const today = new Date();
    let Array21 = [];
    let dates = [];
    //loop through the next 21 days and print dates
  };
}
