import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-functions";

// STG config
const config = {
  apiKey: "AIzaSyDmCjlfS-qkvlAvc2_z1oIU1m-JfWuyoiE",
  authDomain: "stack-tv-guide.firebaseapp.com",
  projectId: "stack-tv-guide",
  storageBucket: "stack-tv-guide.appspot.com",
  messagingSenderId: "474677366292",
  appId: "1:474677366292:web:c1f55f148d9be5111b2101",
  measurementId: "G-GMXBNBL4SL",
};

firebase.initializeApp(config);

export class TimeSlotDetails {
  am_pm: string;
  time_of_day: string;
  show_title: string;
  episode_title: string;

  constructor(
    am_pm: string,
    time_of_day: string,
    show_title: string,
    episode_title: string
  ) {
    this.am_pm = am_pm;
    this.time_of_day = time_of_day;
    this.show_title = show_title;
    this.episode_title = episode_title;
  }
}

export class DaySchedule {
  date: string;
  schedule: TimeSlotDetails[];

  constructor(date: string, schedule: TimeSlotDetails[]) {
    this.date = date;
    this.schedule = schedule;
  }
}

export class Channel {
  name: string;
  dates_and_schedules: DaySchedule[];

  constructor(name: string, dates_and_schedules: DaySchedule[]) {
    this.name = name;
    this.dates_and_schedules = dates_and_schedules;
  }
}

/**
 * Get a provided channels show schedule.
 * @param channel the document to access
 */
export const getChannelSchedule = (channel: string): Promise<Channel> =>
  new Promise((resolve, reject) => {
    // Firestore data converter
    var dataConverter = {
      toFirestore: (sched: Channel) => {
        return {
          name: sched.name,
          dates_and_schedules: sched.dates_and_schedules,
        };
      },
      fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new Channel(data.name, data.dates_and_schedules);
      },
    };

    firebase
      .firestore()
      .collection("channels")
      .doc(channel)
      .withConverter(dataConverter)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Convert to User Object
          const data = doc.data();
          if (data) {
            resolve(data);
          }
        } else {
          reject("Sorry, we don't have a schedule for that channel.");
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });

export default firebase;
