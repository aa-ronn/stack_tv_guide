import { useContext } from "react";
import "./schedule-list.styles.scss";
import { Spinner } from "../spinner/spinner.component";
import { useParams } from "react-router-dom";

import { useEffect, FC } from "react";
import { AppContext } from "../../contexts/app/app.context";

interface IParams {
  channelName: string;
}

const ScheduleList: FC = () => {
  const params = useParams<IParams>();
  const { day, traverseScheduleDay, menuOpen, setupSchedulePage } = useContext(
    AppContext
  );

  useEffect(() => {
    const firstLoad = () => {
      //TODO Get this useEffect to only call one time legally
      console.log("Loaded - " + params.channelName);
      setupSchedulePage(params.channelName);
    };

    firstLoad();

    return () => {};
  }, [params.channelName]);

  const handleDayNavigation = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const name = event.currentTarget.name;
    traverseScheduleDay(name);
  };

  if (day === null) {
    return (
      <div className="schedule-list">
        <div className="loading">
          <div className={`channel-name ${menuOpen ? "hidden" : ""}`}>
            {params?.channelName}
          </div>
          {menuOpen ? null : <Spinner isLoading={true} />}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`schedule-list-wrapper`}>
        <div className="schedule-list">
          <div className={`channel-date-wrapper ${menuOpen ? "hidden" : ""}`}>
            <div className="channel-name">{params?.channelName}</div>
            <div className="date-info">{day?.date}</div>
          </div>
          <div className={`button-wrapper ${menuOpen ? "hidden" : ""}`}>
            <div className="floating-button-left">
              <button
                name="-"
                onClick={handleDayNavigation}
                className="floating-sticky"
              >
                <span className="arrow-left"></span>
              </button>
            </div>
            <div className="floating-button-right">
              <button
                name="+"
                onClick={handleDayNavigation}
                className="floating-sticky"
              >
                <span className="arrow-right"></span>
              </button>
            </div>
          </div>

          {day?.schedule.map((details, index) => {
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
                <div className="divider" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default ScheduleList;
