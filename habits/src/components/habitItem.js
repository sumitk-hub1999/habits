import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteHabitHandler, updateHabitHandler } from "../features/habitslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function habitItem({
  habitName,
  habitDescription,
  habitStatus,
  habitId,
  isVisibleId,
  setisVisibleId,
}) {
  //properties of habit as props from parent habit component
  //
  const dispatch = useDispatch();

  useEffect(() => {
    //code for highlighting the current date and its status
    const dates = document.getElementsByClassName("dates");
    const dateArray = Object.values(dates).map((date) => {
      Number(date.innerHTML.split("/")[0]);
    });
    const today = new Date();
    const td = today.getDate();
  });
}

export default habitItem;
