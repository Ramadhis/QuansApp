import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Row, Container, Card, Badge } from "react-bootstrap";
import { Outlet } from "react-router-dom";
//
import Quans from "./components/pages/Quans";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import MainContentsearch from "./components/layouts/searchQuansLayout/index";
import Notfound from "./components/pages/404page";
import Tag from "./components/pages/Tag";

// import Sidebar from "./components/widgets/sidebar/Sidebar";
import Header from "./components/widgets/Header";
import Sidebar from "./components/widgets/sidebar/Sidebar";
//

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="quans"
          element={
            <main>
              <Header />
              <Sidebar />
            </main>
          }
        >
          <Route path="dashboard" element={<Outlet />}>
            <Route path="" element={<Dashboard />} />
            <Route path="id" element={<Quans />} />
          </Route>

          <Route path="Tag" element={<Tag />}></Route>
          <Route index element={<Quans />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
