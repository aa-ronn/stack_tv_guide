import { useHistory } from "react-router-dom";

import "./home.styles.scss";

const Home = () => {
  const history = useHistory();
  const handleNavigationClick = (link: string) => {
    history.push(link);
  };

  return (
    <div className="home">
      <div className="home-grid">
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/global")}
        >
          Global
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/history")}
        >
          History
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/adult-swim")}
        >
          Adult Swim
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/teletoon")}
        >
          Teletoon
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/hgtv")}
        >
          HGTV
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/w-network")}
        >
          W Network
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/treehouse")}
        >
          Treehouse
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/food-network")}
        >
          Food Network
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/slice")}
        >
          Slice
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/show-case")}
        >
          Show Case
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/national-geographic")}
        >
          National Geographic
        </div>
        <div
          className="grid-item"
          onClick={() => handleNavigationClick("/ytv")}
        >
          YTV
        </div>
      </div>
    </div>
  );
};

export default Home;
