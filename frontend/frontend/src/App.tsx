import React from "react";
import 'vite/modulepreload-polyfill'
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleplayerPage from "./pages/SingleplayerPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage";
import RoomPage from "./pages/RoomPage";


class App extends React.Component {

  handleSingleplayerClick() {

  }

  handleMultiplayerClick() {
    
  }

  render() {
    return (
      <div className="flex flex-col items-center w-[100vw] h-[100vh] pt-[25vh] bg-background text-primary">
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
            path="/create-room"
            element={<CreateRoomPage />}
            />
            <Route
            path="/join-room"
            element={<JoinRoomPage />}
            />
            <Route
            path="/room/:roomCode"
            element={<RoomPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
