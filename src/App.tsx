import React from "react";
import "./App.scss";

import ScheduleList from "./components/schedule-list/schedule-list.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div className="App">
      <Header />
      <ScheduleList />
    </div>
  );
}

export default App;
