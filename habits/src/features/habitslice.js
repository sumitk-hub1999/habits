/**@format */
import { createSlice } from "@reduxjs/toolkit";

//fetching data from local storage
let habbitsArray = localStorage.getItem("habits");
if (habbitsArray === null) {
  habbitsArray = [];
} else {
  habbitsArray = JSON.parse(localStorage.getItem("habits"));
}

//setting initial state as habit array in local storage
const initialState = {
  habits: habbitsArray,
};

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabitHandler: (state, action) => {
      /*
       * updating the current state
       * using spread operator (...state.habits) for getting previous data and then adding the new data at the end
       * action.payload [haibitToBeAdded] is the object that is sent form the HabitComponent
       * action.payload = addHabit: {id: number, title: string, description: string, dates: {date: any, status: string};
       */
      state.habits = [...state.habits, action.payload];
      const newHabitsArray = state.habits;
      //updating in local storage
      localStorage.setItem("habits", JSON.stringify(newHabitsArray));
    },
    //for deleting a habit
    deleteHabitHandler: (state, action) => {
      const DeleteHabitId = Number(action.payload);
      const DeleteHabitArrayLs = JSON.parse(localStorage.getItem("habits"));
      let newArray = DeleteHabitArrayLs.filter(
        (habit) => habit.id !== DeleteHabitId
      );
      localStorage.setItem("habits", JSON.stringify(newArray));
      state.habits = newArray;
    },

    updateHabitHandler: (state, action) => {
      const data = action.payload;
      const HabitArrayLs = JSON.parse(localStorage.getItem("habits"));
      let habitupdate = HabitArrayLs.filter((habit) => habit.id === data.id);
      let habitObjectupdate = habitupdate[0];
      let DateArray = habitObjectupdate.dates.map((date) => {
        if (date.date === data.date) {
          console.log(date.status);
          if (date.status === "none") {
            date.status = "done";
          } else if (date.status === "done") {
            date.status = "fail";
          } else if (date.status === "fail") {
            date.status = "none";
          }
        }
        return date;
      });

      let newHabitsArrayLs = HabitArrayLs.map((habit) => {
        if (data.id === habit.id) {
          habit.dates = DateArray;
        }
        return habit;
      });
      localStorage.setItem("habits", JSON.stringify(newHabitsArrayLs));
      state.habits = newHabitsArrayLs;
    },
  },
});
export const { addHabitHandler, deleteHabitHandler, updateHabitHandler } =
  habitSlice.actions;
export default habitSlice.reducer;
