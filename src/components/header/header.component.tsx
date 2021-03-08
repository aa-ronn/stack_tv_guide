import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./header.styles.scss";

import { AppContext } from "../../contexts/app/app.context";

const Header: FC = () => {
  const { menuOpen, setMenuOpen } = useContext(AppContext);
  const history = useHistory();

  const handleNavigationClick = (link: string) => {
    setMenuOpen(false);
    history.push(link);
  };

  const handleTitleClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    history.push("/");
  };

  return (
    <div className="header">
      <nav role="navigation" className="nav">
        <div className="menu-toggle">
          <input
            type="checkbox"
            className={menuOpen ? "open" : ""}
            onChange={() => setMenuOpen(!menuOpen)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul className={`menu ${menuOpen ? "" : "closed"}`}>
            <li onClick={() => handleNavigationClick("/")}>Home</li>
            <p>
              <li onClick={() => handleNavigationClick("/global")}>Global</li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/history")}>History</li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/adult-swim")}>
                Adult Swim
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/teletoon")}>
                Teletoon
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/hgtv")}>HGTV</li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/w-network")}>
                W Network
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/treehouse")}>
                Treehouse
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/food-network")}>
                Food Network
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/slice")}>Slice</li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/national-geographic")}>
                National Geographic
              </li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/ytv")}>YTV</li>
            </p>
            <p>
              <li onClick={() => handleNavigationClick("/about")}>About</li>
            </p>
          </ul>
        </div>
      </nav>
      <div className="title" onClick={handleTitleClick}>
        <div className={`hidden-text ${menuOpen ? "open" : ""}`}>S</div>
        <div className="green">TV</div>
        <div>Guide</div>
      </div>
    </div>
  );
};

export default Header;
