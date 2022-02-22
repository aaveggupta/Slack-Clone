import React, { useEffect, useState } from "react";
import "./App.css";
import ChatGround from "./Components/ChatGround/ChatGround";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import { auth } from "./Firebase/firebase-config";
import useDataLayer from "./Helpers/StateProvider";

const App = () => {
  const [{ user }, dispatch] = useDataLayer();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user
        ? dispatch({ type: "SET_USER", user: user })
        : dispatch({ type: "SET_USER", user: null });
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <SignIn />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <SideBar />
              <Routes>
                <Route path="/channel/:channelID" element={<ChatGround />} />
                <Route path="/" element={<ChatGround />} />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
