import React from "react";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Habititem from "./Habititem.js";
import { addHabitHandler } from "../features/habitslice.js";
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
      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }
      date = d + "/" + m + "/" + y;
      return date;
    }
    //get todays date
    const today = new Date();
    let next21daysArray = [];
    let dates = [];
    //loop through the next 21 days and print dates
    for (let i = 0; i < 21; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      let formattedDate = showDate(nextDate);
      next21daysArray.push(formattedDate);
      let currentDate = { date: next21daysArray[i], status: "none" };
      dates.push(currentDate);
    }
    //create habit object with all info
    let habitToBeAdded = {
      id: Date.now(),
      title: habit,
      description: description,
      dates: dates,
    };
    //setting state empty so that input box empty
    setHabit("");
    setDescription("");
    //dispatching newhabit object data to addHabitHandler reducer from habitslice
    dispatch(addHabitHandler(habitToBeAdded));
  };
  //the function helps adding habit on clicking enter
  const addHabitOnEnter = (e) => {
    //13 is keycode of enter button
    if (e.keyCode === 13) {
      addHabitBtn.current.click();
    }
  };

  //useSElector hook is used to get the data from redux store which is array of objects containing properties of hobit
  const data = useSelector((h) => {
    console.log(h.habit.habits);
    return h.habit.habits;
  });

  return (
    <div className="container">
      <div className="bar-container">
        <section className="habitAdder">
          <div className="input">
            <span className="icon">
              <i className="fa-solid fa-repeat"></i>
            </span>
            <input
              onChange={(e) => setHabit(e.target.value)}
              value={habit}
              type="text"
              placeholder="enter the name of the habit"
              onKeyDown={addHabitOnEnter}
            />
          </div>
          <div className="input">
            <span className="icon">
              <i className="fa-solid fa-circle-info"></i>
            </span>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="write description (optional)"
              onKeyDown={addHabitOnEnter}
            />
          </div>
          <button onClick={addHabit} ref={addHabitBtn} className="addbtn">
            Add Habit
          </button>
        </section>
        <div className="habit-container">
          <div className="habits-list">
            {data.length === 0 && (
              <h1 className="no-habit-text">No habits added yet</h1>
            )}
            {data.map((habit, index) => {
              return (
                <Habititem
                  habitName={habit.title}
                  habitDescription={habit.description}
                  habitStatus={habit.dates}
                  habitId={habit.id}
                  key={index}
                  isVisibleId={isVisibleId === habit.id}
                  setIsVisibleId={setIsVisibleId}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default HabitsComponent;
