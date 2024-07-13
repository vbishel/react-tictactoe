import React from "react";
import 'vite/modulepreload-polyfill'
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SingleplayerPage from "./components/pages/SingleplayerPage";

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
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
