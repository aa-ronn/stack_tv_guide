import "./schedule-list.styles.scss";

import { useState, useEffect } from "react";
import {
  getChannelSchedule,
  Channel,
  DaySchedule,
} from "../../firebase/firebase.utils";

const ScheduleList = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [day, setDay] = useState<DaySchedule | null>(null);
  const [dayIndex, setDayIndex] = useState(0);
  const [indexLength, setIndexLength] = useState(0);

  useEffect(() => {
    const setup = async () => {
      await getChannelSchedule("global").then((channel) => {
        setChannel(channel);
      });
    };

    // if first time loading component get schedule data
    if (channel === null) {
      setup();
    } else {
      if (day === null) {
        console.log("date check");
        if (channel != null) {
          const today = new Date();
          setIndexLength(channel?.dates_and_schedules.length);
          for (let index = 0; index < indexLength; index++) {
            const day = channel?.dates_and_schedules[index];
            const dayDate = new Date(day.date);
            if (dayDate.toDateString() === today.toDateString()) {
              setDay(day);
              setDayIndex(index);
              break;
            }
          }
        }
      } else {
        // otherwise traverse channel schedule array
        setDay(channel.dates_and_schedules[dayIndex]);
      }
    }
  }, [dayIndex, channel, day, indexLength]);

  const handleDayNavigation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const name = event.currentTarget.name;
    if (name === "+") {
      if (dayIndex + 1 <= indexLength - 1) {
        setDayIndex(dayIndex + 1);
      }
    } else {
      if (dayIndex - 1 >= 0) {
        setDayIndex(dayIndex - 1);
      }
    }
  };

  if (day === null) {
    return (
      <div className="schedule-list">
        <div className="channel-name">{channel?.name}</div>
        <div className="loading">Loading...</div>
      </div>
    );
  } else {
    return (
      <div className="schedule-list">
        <div className="channel-name">{channel?.name}</div>
        <div className="date-info">{day.date}</div>
        <div className="navigation-buttons">
          <button name="-" onClick={handleDayNavigation}>
            <span className="green">{"<"}</span>
          </button>
          <button name="+" onClick={handleDayNavigation}>
            <span className="green">{">"}</span>
          </button>
        </div>
        {day.schedule.map((details, index) => {
          return (
            <div key={index} className="show-block">
              <div className="show-block-details">
                <div className="time-info">
                  {details.time_of_day} {details.am_pm}
                </div>
                <div className="show-info">
                  <div className="show-title">{details.show_title}</div>
                  <div className="episode-title">{details.episode_title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ScheduleList;
