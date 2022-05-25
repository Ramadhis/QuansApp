import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="d-md-block sidebar collapse">
      <div className="position-sticky pt-1">
        <ul className="nav flex-column">
          <li className="nav-item ">
            <a className="nav-link active text-decoration-none text-dark" aria-current="page" href="dashboard.php">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
