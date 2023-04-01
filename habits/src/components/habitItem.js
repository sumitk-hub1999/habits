import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteHabitHandler,
  updateHabitHandler,
} from "../features/habitslice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Habititem({
  habitName,
  habitDescription,
  habitStatus,
  habitId,
  isVisibleId,
  setIsVisibleId,
}) {
  //properties of habit as props from parent habit component
  //
  const dispatch = useDispatch();

  useEffect(() => {
    // Code for highlighting the current date and its status
    const dates = document.getElementsByClassName("dates");
    const dateArray = Object.values(dates).map((date) =>
      Number(date.innerHTML.split("/")[0])
    );
    const today = new Date();
    const todayDate = today.getDate();
    if (dates.length > 0) {
      const indexOfTodaysDateInDatesArray = dateArray.indexOf(todayDate);
      dates[indexOfTodaysDateInDatesArray].style.backgroundColor = "#808080";

      const dateStatus = document.getElementsByClassName("date-status");
      dateStatus[indexOfTodaysDateInDatesArray].style.backgroundColor =
        "#808080";
    }
  }, [isVisibleId]);
  const updateCompleteStatus = (e) => {
    // Restricting user to select future dates
    let clickedFullDate = e.target.getAttribute("data-date");
    console.log(e.target);
    console.log(clickedFullDate);
    console.log(clickedFullDate.split("/"));
    let clickedMonth = Number(clickedFullDate.split("/")[1]);
    let clickedDate = Number(clickedFullDate.split("/")[0]);
    let todayDate = new Date();

    if (clickedMonth > todayDate.getMonth() + 1) {
      toast.error(
        "You can only change for current and past dates. Not for future dates",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        }
      );
      return;
    } else if (clickedDate > todayDate.getDate()) {
      toast.error(
        "You can only change for current and past dates. Not for future dates",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        }
      );
      return;
    }
    // constructing the data object for updating the status of the date selected
    const data = {
      date: e.target.getAttribute("data-date"),
      id: habitId,
    };

    // dispatching the data to redux store ; data is passed as an argument to updateStatus reducer [function]
    dispatch(updateHabitHandler(data));
  };

  return (
    <div className="list-of-habits">
      <div className="name-and-icon">
        <div className="habit-details">
          <div className="habit-name">{habitName}</div>
          <div className="habit-description">{habitDescription}</div>
        </div>

        {isVisibleId ? (
          <div
            className="accordion-icon-up"
            onClick={() => {
              setIsVisibleId("");
              console.log("works");
            }}
          >
            <i className="fa-solid fa-chevron-up"></i>
          </div>
        ) : (
          <div
            className="accordion-icon-down"
            onClick={() => {
              setIsVisibleId(habitId);
              console.log("works well");
            }}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        )}
      </div>

      {isVisibleId && (
        <div className="seven-days-of-week">
          <table>
            <thead>
              <tr>
                {/* displaying the dates of the Last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index < 7) {
                    return (
                      <th key={index} className="dates">
                        {habitStatus[index].date}
                      </th>
                    );
                  }
                  return;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Displaying the habit status of the last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index < 7) {
                    return (
                      <td
                        key={index}
                        onClick={updateCompleteStatus}
                        data-date={habitStatus[index].date}
                        className="date-status"
                      >
                        {/* displaying the none, done or fail icon accoring to the state */}
                        {habitStatus[index].status === "none" ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : habitStatus[index].status === "done" ? (
                          <i className="fa-solid fa-circle-check done"></i>
                        ) : (
                          <i className="fa-solid fa-circle-xmark fail"></i>
                        )}
                      </td>
                    );
                  }
                  return;
                })}
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                {/* displaying the dates of the Last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index >= 7 && index < 14) {
                    return (
                      <th key={index} className="dates">
                        {habitStatus[index].date}
                      </th>
                    );
                  }
                  return;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Displaying the habit status of the last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index >= 7 && index < 14) {
                    return (
                      <td
                        key={index}
                        onClick={updateCompleteStatus}
                        data-date={habitStatus[index].date}
                        className="date-status"
                      >
                        {habitStatus[index].status === "none" ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : habitStatus[index].status === "done" ? (
                          <i className="fa-solid fa-circle-check done"></i>
                        ) : (
                          <i className="fa-solid fa-circle-xmark fail"></i>
                        )}
                      </td>
                    );
                  }
                  return;
                })}
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                {/* displaying the dates of the Last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index >= 14) {
                    return (
                      <th key={index} className="dates">
                        {habitStatus[index].date}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Displaying the habit status of the last 7 day */}
                {Object.values(habitStatus).map((date, index) => {
                  if (index >= 14) {
                    return (
                      <td
                        key={index}
                        onClick={updateCompleteStatus}
                        data-date={habitStatus[index].date}
                        className="date-status"
                      >
                        {/* displaying the none, done or fail icon accoring to the state */}
                        {habitStatus[index].status === "none" ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : habitStatus[index].status === "done" ? (
                          <i className="fa-solid fa-circle-check done"></i>
                        ) : (
                          <i className="fa-solid fa-circle-xmark fail"></i>
                        )}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Delete button for deleting a habit */}
      {/* dispatching deleteHabit reducer with habitId as payload so that the selected habit can be deleted */}
      <div
        onClick={() => dispatch(deleteHabitHandler(habitId))}
        className="delete-btn"
      >
        <i className="fa-solid fa-trash"></i>
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

export default Habititem;
