import { useState, createContext, FC, Dispatch, SetStateAction } from "react";
import {
  getChannelSchedule,
  DaySchedule,
  Channel,
} from "../../firebase/firebase.utils";
import useToast from "../../hooks/useToast.hook";
import { Toast } from "../../components/toast/toast.component";

type AppContextType = {
  day: DaySchedule | null;
  channel: Channel | null;
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setupSchedulePage: (channelName: string) => Promise<string>;
  traverseScheduleDay: (plusMinus: string) => void;
};

/**
 * Context to handle user auth state and actions. Uses AuthProvider
 * to wrap app.
 * @see AuthProvider
 */
export const AppContext = createContext<AppContextType>({
  day: null,
  channel: null,
  menuOpen: false,
  setMenuOpen: async () => {},
  setupSchedulePage: async () => "",
  traverseScheduleDay: () => {},
});

/**
 * Provides logic to and app wide access to the user auth context.
 * @see AppContext
 * @param children all children tsx component
 */
export const AppProvider: FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [day, setDay] = useState<DaySchedule | null>(null);
  const [dayIndex, setDayIndex] = useState(0);

  const {
    toastIsShowing,
    message,
    severity,
    setContets,
    toggleToast,
    forceHideToast,
  } = useToast();

  const setupSchedulePage = async (channelName: string): Promise<string> => {
    let result = "";

    if (channel === null || channelName !== channel.name) {
      console.log("Getting channel data");
      await getChannelSchedule(channelName)
        .then((receivedChannel) => {
          // save channel
          setChannel(receivedChannel);
          // use receivedChannel to setup selected day
          const today = new Date();
          if (receivedChannel !== null) {
            for (
              let index = 0;
              index < receivedChannel.dates_and_schedules.length;
              index++
            ) {
              const day = receivedChannel.dates_and_schedules[index];
              const dayDate = new Date(day.date);
              if (dayDate.toDateString() === today.toDateString()) {
                console.log(day);
                setDay(day);
                setDayIndex(index);
                result = "";
                break;
              }
            }
          }
        })
        .catch((message) => {
          setDay(null);
          setChannel(null);
          setContets(message, 1);
          toggleToast();
          result = message;
        });
    } else if (channel.name === channelName) {
      result = "";
    }

    return result;
  };

  const traverseScheduleDay = (plusMinus: string) => {
    if (channel !== null) {
      if (plusMinus === "+") {
        if (dayIndex + 1 <= channel.dates_and_schedules.length - 1) {
          setDay(channel.dates_and_schedules[dayIndex + 1]);
          setDayIndex(dayIndex + 1);
        } else {
          setContets("Sorry! No more days availiable. Check back tomorrow.", 1);
          toggleToast();
        }
      } else {
        if (dayIndex - 1 >= 0) {
          setDay(channel.dates_and_schedules[dayIndex - 1]);
          setDayIndex(dayIndex - 1);
        } else {
          setContets("Sorry! No more days availiable. Check back tomorrow.", 1);
          toggleToast();
        }
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        day,
        channel,
        menuOpen,
        setMenuOpen,
        setupSchedulePage,
        traverseScheduleDay,
      }}
    >
      <Toast
        isShowing={toastIsShowing}
        message={message}
        severity={severity}
        hide={forceHideToast}
      />
      {children}
    </AppContext.Provider>
  );
};
