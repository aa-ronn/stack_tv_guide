import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

import { AppProvider } from "./contexts/app/app.context";
import ScheduleList from "./components/schedule-list/schedule-list.component";
import Header from "./components/header/header.component";
import Home from "./pages/home/home.component";
import About from "./pages/about/about.page";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/:channelName" component={ScheduleList} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
