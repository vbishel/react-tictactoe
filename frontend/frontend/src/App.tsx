import React from "react";
import 'vite/modulepreload-polyfill'
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SingleplayerPage from "./components/pages/SingleplayerPage";
import CreateRoomPage from "./components/pages/CreateRoomPage";
import JoinRoomPage from "./components/pages/JoinRoomPage";


class App extends React.Component {

  handleSingleplayerClick() {

  }

  handleMultiplayerClick() {
    
  }

  render() {
    return (
      <div className="flex flex-col items-center w-[100vw] h-[100vh] pt-[25vh] bg-background">
        <BrowserRouter>
          <Routes>
            <Route
            path="/"
            element={<HomePage />}
            />
            <Route
            path="/singleplayer"
            element={<SingleplayerPage />}
            />
            <Route
            path="/createRoom"
            element={<CreateRoomPage />}
            />
            <Route
            path="/joinRoom"
            element={<JoinRoomPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
