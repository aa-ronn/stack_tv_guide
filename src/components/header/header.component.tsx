import { FC, useState } from "react";
import "./header.styles.scss";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <ul className="menu">
            <p>
              <li>Home</li>
            </p>
            <p>
              <li>About</li>
            </p>
            <p>
              <li>Info</li>
            </p>
            <p>
              <li>Contact</li>
            </p>
            <p>
              <li>Show me more</li>
            </p>
          </ul>
        </div>
      </nav>
      <div className="title">
        <div className={`hidden-text ${menuOpen ? "open" : ""}`}>S</div>
        <div className="green">TV</div>
        <div>Guide</div>
      </div>
    </div>
  );
};

export default Header;
