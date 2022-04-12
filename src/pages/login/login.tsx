import { useState, useEffect, useRef } from "react";
import "./login.css";
import { login } from "../../api/post";
import Input from "../../components/atoms/input";
import Button from "../../components/atoms/button";
import { useDispatch } from "react-redux";
import { SetToken } from "../../store/Reducers/Auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router";
import Circle from "../../components/atoms/circle";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import ThemeSwitch from "../../components/atoms/themeSwitch";
import styled from "styled-components";
import AppLogo from "../../components/vectors/LoginAppLogo";
import NewAppLogo from "../../components/vectors/LoginNewAppLogo";

const Theme = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`;

const Login: any = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [token, lang] = useSelector((state: RootState) => {
    return [state.isAuth.isAuth, state.lang];
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  // useEffect(() => {
  //   // ref.addEventListener("keypress", onKeyPress);
  //   const all_input = document.getElementsByTagName("input");
  //   all_input[1].onkeyup = (e) => {
  //     var keyCode = e.key;
  //     if (keyCode == "Enter") {
  //       clickHandler();
  //       return false;
  //     }
  //   };
  //   // return () => {
  //   //   console.log("removing eventlistner");
  //   //   window.removeEventListener("keypress", clickHandler);
  //   // };
  // }, []);

  const clickHandler: any = async () => {
    if (email == "") {
      if (lang) {
        toast.warning("אנא מלא את האימייל שלך");
        return;
      } else {
        toast.warning("Please Fill Your Email");
        return;
      }
    }
    if (password == "") {
      if (lang) {
        toast.warning("אנא מלא את הסיסמה שלך");
        return;
      } else {
        toast.warning("Please Fill Your Password");
        return;
      }
    }
    setFlag(true);
    const data = await login(email, password);
    if (Array.isArray(data)) {
      console.log(data[0].Token);
      localStorage.setItem("token", data[0].Token);
      dispatch(SetToken(data[0].Token));
      setFlag(false);
      return;
    } else {
      if (lang) {
        toast.error("אישורים לא חוקיים");
      } else {
        toast.error("Invalid Credentials");
      }
      setFlag(false);
      return;
    }
  };

  return (
    <div className="login-MainContainer">
      <Theme>
        <ThemeSwitch />
      </Theme>
      <div
        className="login-Container"
        style={{
          minHeight: "700px",
        }}
      >
        <div className="login-circle">
          <div className="login-circle-dark">
            <Circle color="dark" size="large" />
          </div>
          <div className="login-circle-light">
            <Circle color="light" size="large" />
          </div>
        </div>
        <div className="login-Header">
          <div className="logo">{!theme ? <AppLogo /> : <NewAppLogo />}</div>
          <div className="login-text-1">{lang ? "כניסה" : "Login"}</div>
          <div className="login-text-2">
            {lang ? "ברוכים הבאים" : "Welcome back !"}
          </div>
        </div>
        <div className="Login-email">
          <div style={{ width: "80%" }}>
            <Input
              type="email"
              placeholder="pandey27nilesh@gmail.com"
              label={lang ? "מייל" : "Email"}
              value={email}
              setvalue={setEmail}
              height={56}
            />
          </div>
        </div>

        <div className="Login-password">
          <div style={{ width: "80%" }}>
            <Input
              type="password"
              placeholder=""
              label={lang ? "סיסמא" : "Password"}
              value={password}
              setvalue={setPassword}
              height={56}
            />
          </div>
        </div>

        <div className="Login-button"></div>

        <Button
          title={
            flag ? (
              <CircularProgress
                color="inherit"
                style={{ color: "white" }}
                size={28}
              />
            ) : lang ? (
              "כניסה"
            ) : (
              "Login"
            )
          }
          type="secondary"
          clickHandler={clickHandler}
          padding="24px 170px"
        ></Button>
      </div>
    </div>
  );
};

export default Login;
