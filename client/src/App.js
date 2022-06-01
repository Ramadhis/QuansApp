import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Row, Container, Card, Badge } from "react-bootstrap";
//
import Quans from "./components/pages/Quans";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MainContentsearch from "./components/layouts/searchQuansLayout/index";
import Notfound from "./components/pages/404page";

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
          <Route path="dashboard" index element={<Quans />}></Route>
          <Route path="search" element={<MainContentsearch />}></Route>
          <Route index element={<Quans />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
