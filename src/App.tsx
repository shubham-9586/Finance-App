import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Routes from "./routes";
import GlobalDarkTheme from "./themeDark";
import GlobalLightTheme from "./themeLight";
import { useDispatch } from "react-redux";
import { SetToken } from "./store/Reducers/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import ThemeSwitch from "./components/atoms/themeSwitch";
import Switch from "@mui/material/Switch";
import { ChangeLanguage } from "./store/Reducers/lang";
import { MenuItem, Select } from "@mui/material";

const Theme = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`;

const LanguageSwitch = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
`;

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const lang = useSelector((state: RootState) => state.lang);
  const [selectedLanguage, setSelectedLanguage] = useState(
    lang ? "Hebrew" : "English"
  );

  if (localStorage.getItem("token")) {
    const val = localStorage.getItem("token");
    dispatch(SetToken(val));
  }

  const handleChange = (event: any) => {
    console.log("e", event.target.value);
    if (event.target.value != selectedLanguage) {
      setSelectedLanguage(event.target.value);
      dispatch(ChangeLanguage());
    }
  };

  useEffect(() => {
    if (lang) {
      document.documentElement.style.setProperty("--font", "Varela Round");
      document.documentElement.style.setProperty("--oswald", "Varela Round");
    } else {
      document.documentElement.style.setProperty("--font", "Poppins");
      document.documentElement.style.setProperty("--oswald", "Oswald");
    }
  }, [lang]);

  return (
    <Fragment>
      <ToastContainer />
      {theme ? <GlobalDarkTheme /> : <GlobalLightTheme />}
      <Theme>
        <ThemeSwitch />
      </Theme>
      <LanguageSwitch>
        <Select
          margin="dense"
          id="demo-simple-select-outlined"
          value={selectedLanguage}
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Hebrew">Hebrew</MenuItem>
        </Select>
      </LanguageSwitch>
      <Routes />
    </Fragment>
  );
};

export default App;
