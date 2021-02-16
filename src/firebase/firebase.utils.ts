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
  measurementId: "G-GMXBNBL4SL"
};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

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

  constructor(
    date: string,
    schedule: TimeSlotDetails[]
  ) {
    this.date = date;
    this.schedule = schedule;
  }
}

export class Channel {
  name: string;
  dates_and_schedules: DaySchedule[];

  constructor(
    name: string,
    dates_and_schedules: DaySchedule[]
  ) {
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
          dates_and_schedules: sched.dates_and_schedules
        };
      },
      fromFirestore: function (snapshot: any, options: any) {
        const data = snapshot.data(options);
        return new Channel(
          data.name,
          data.dates_and_schedules
        );
      },
    };

    firebase
      .firestore()
      .collection('channels')
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
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        reject(error.message);
      });
  });

  export const sendEmailLink = () => {
    const email = "jp.stanley82@gmail.com";
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/emailLink",
      // This must be true.
      handleCodeInApp: true,
      //dynamicLinkDomain: 'etp-estate-admin.firebaseapp.com'
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
      });

  }

  
export default firebase;
