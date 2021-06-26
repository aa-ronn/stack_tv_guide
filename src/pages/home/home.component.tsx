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
          className="grid-item tv-global"
          onClick={() => handleNavigationClick("/global")}
        >
          Global
        </div>
        <div
          className="grid-item tv-history"
          onClick={() => handleNavigationClick("/history")}
        >
          History
        </div>
        <div
          className="grid-item tv-adult-swim"
          onClick={() => handleNavigationClick("/adult-swim")}
        >
          Adult Swim
        </div>
        <div
          className="grid-item tv-teletoon"
          onClick={() => handleNavigationClick("/teletoon")}
        >
          Teletoon
        </div>
        <div
          className="grid-item tv-hgtv"
          onClick={() => handleNavigationClick("/hgtv")}
        >
          HGTV
        </div>
        <div
          className="grid-item tv-w"
          onClick={() => handleNavigationClick("/w-network")}
        >
          W Network
        </div>
        <div
          className="grid-item tv-treehouse"
          onClick={() => handleNavigationClick("/treehouse")}
        >
          Treehouse
        </div>
        <div
          className="grid-item tv-food-network"
          onClick={() => handleNavigationClick("/food-network")}
        >
          Food Network
        </div>
        <div
          className="grid-item tv-slice"
          onClick={() => handleNavigationClick("/slice")}
        >
          Slice
        </div>
        <div
          className="grid-item tv-show-case"
          onClick={() => handleNavigationClick("/show-case")}
        >
          Show Case
        </div>
        <div
          className="grid-item tv-national-geographic"
          onClick={() => handleNavigationClick("/national-geographic")}
        >
          National Geographic
        </div>
        <div
          className="grid-item tv-ytv"
          onClick={() => handleNavigationClick("/ytv")}
        >
          YTV
        </div>
      </div>
      <div className="colophon">
        <p>Work in Progress 😃</p>
      </div>
    </div>
  );
};

export default Home;
