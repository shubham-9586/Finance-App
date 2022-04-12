import React from "react";
import Header from "../../components/molecules/header";
import styled from "styled-components";
import { Ink } from "../../components/vectors";
import { useHistory } from "react-router";
import NotFound from "./../../components/vectors/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const AddClientContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
`;
const AddText = styled.div`
  font-weight: 500;
  font-size: 35.102px;
  text-align: center;
  color: var(--grid-text);
  margin-top: 40px;
`;
const AddText1 = styled.div`
  font-weight: 500;
  font-size: 35.102px;
  text-align: center;
  color: var(--grid-text);
`;
const NoSource = () => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const history = useHistory();
  return (
    <AddClientContainer>
      <Header
        heading={lang ? "אופס!" : "Ooops !"}
        subheading="@WW24"
        buttonText={lang ? "עבור לעמוד הבית" : "Go to Home Page"}
        buttonHandler={() => {
          history.push("/");
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <NotFound color="var(--ink-icon)" />
      </div>
      <AddText>
        {lang ? "דף זה אינו זמין" : "This page is not available"}
      </AddText>
      <AddText1>
        {lang ? "נראה שמשהו השתבש...." : "It seems something went wrong...."}
      </AddText1>
    </AddClientContainer>
  );
};

export default NoSource;
