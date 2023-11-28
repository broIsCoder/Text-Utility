import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { NavBar } from './component/NavBar';
import { Main } from './component/Main';
import { About } from './component/About';
import Alert from './component/Alert';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState({
    backgroundColor: "#111111",
    color: "grey"
  });
  const [theme2, setTheme2] = useState({
    background: "black",
    color: "grey"
  });

  /* Theme 1: Primary Background Colors */
  const themeList = [
    {
      background: 'rgba(33, 150, 243, 1)',  // Dodger Blue
      textColor: 'rgba(255, 255, 255, 1)',  // White text color
    },
    {
      background: 'rgba(233, 30, 99, 1)',   // Pink
      textColor: 'rgba(255, 255, 255, 1)',  // White text color
    },
    {
      background: 'rgba(0, 150, 136, 1)',   // Teal
      textColor: 'rgba(255, 255, 255, 1)',  // White text color
    },
  ];

  /* Theme 2: Secondary Background Colors */
  const theme2List = [
    {
      background: 'rgba(255, 193, 7, 1)',   // Amber
      textColor: 'rgba(0, 0, 0, 1)',         // Black text color
    },
    {
      background: 'rgba(76, 175, 80, 1)',   // Light Green
      textColor: 'rgba(0, 0, 0, 1)',         // Black text color
    },
    {
      background: 'rgba(255, 87, 34, 1)',   // Deep Orange
      textColor: 'rgba(0, 0, 0, 1)',         // Black text color
    },
  ];

  let randomIndex = 0;
  getRandomItem(themeList)
  function getRandomItem(list) {
    return Math.floor(Math.random() * list.length);
  }
  const [themeAlt, setThemeAlt] = useState(themeList[randomIndex]);
  const [themeAlt2, setThemeAlt2] = useState(theme2List[randomIndex]);
  const [alert, setAlert] = useState(null);

  function renderAlert(type, message) {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null)
    },
      3000);
  }

  function toggleTheme() {
    if (!darkMode) {
      setTheme({
        backgroundColor: "#111111",
        color: "grey"
      });
      setTheme2({
        background:"black",
        color: "grey"
      });
      setDarkMode(true);
      renderAlert("success", "Dark Mode have been enabled")
    }
    else {
      setTheme({
        background: " #c0c0c0",
        color: "black"
      });
      setTheme2({
        background: "linear-gradient(#f1d1d1 ,#88e3f1)",
        color: "black"
      });
      setDarkMode(false);
      renderAlert("success", "Light Mode have been enabled")
    }
  }

  function toggleThemeAlt() {
    renderAlert("success", "Theme switch to random color: " + themeAlt.background)
    setTheme(themeAlt)
    setTheme2(themeAlt2)

    //next up random
    let randIndex = getRandomItem(themeList);
    while (themeList[randIndex].background === themeAlt.background) {
      randIndex = getRandomItem(themeList);
      console.log('wrong:' + randIndex)
    }
    setThemeAlt(themeList[randIndex])
    setThemeAlt2(theme2List[randIndex])
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <>
            <NavBar title="TextUtility" version={10.1} theme={theme} toggleTheme={toggleTheme} themeAlt={themeAlt} toggleThemeAlt={toggleThemeAlt} />
            <Alert alert={alert} />
            <Main renderAlert={renderAlert} heading="Try text Utility " theme={theme} theme2={theme2} alert={renderAlert} />
          </>
        }></Route>
        <Route exact path='/about' element={
          <>
            <NavBar title="TextUtility" version={10.1} theme={theme} toggleTheme={toggleTheme} themeAlt={themeAlt} toggleThemeAlt={toggleThemeAlt} />
            <Alert alert={alert} />
            <About theme={theme} theme2={theme2} />
          </>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;
