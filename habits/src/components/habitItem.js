import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  });
}
