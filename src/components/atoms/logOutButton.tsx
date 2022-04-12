import React from "react";
import Logout from "../vectors/logout";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const SubHeaderT1 = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 52px;
  border-radius: 106px;
  border: 2px solid var(--subheader-color);
  cursor: pointer;
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: var(--subheader-color);
`;

const Sub = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sub1 = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const LogOutButton = () => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });

  return (
    <SubHeaderT1
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      <Sub>
        <Logout color="var(--logout-icon)" />
        <Sub1>
          <Text>{lang ? "יציאה" : "Log out"}</Text>
        </Sub1>
      </Sub>
    </SubHeaderT1>
  );
};

export default LogOutButton;
