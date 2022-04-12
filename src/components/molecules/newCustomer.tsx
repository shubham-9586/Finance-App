import styled from "styled-components";
import { useHistory } from "react-router";
import Button from "../atoms/button";
import Circle from "../atoms/circle";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Text1 = styled.div`
  margin-top: 5px;
  font-weight: 500;
  font-size: 18px;
  color: var(--black);
`;
const Text2 = styled.div`
  font-weight: normal;
  font-size: 55px;
  color: var(--black);
`;
const MainContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 516px;
  height: 385px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
`;

export const CircleContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  .dark {
    position: absolute;
    transform: translate(70%, -40%);
    z-index: 5;
  }
  .light {
    transform: translate(35%, -60%);
  }
`;

const NewCustomer = ({ firstname, lastname }: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });

  const history = useHistory();
  return (
    <MainContainer>
      <CircleContainer>
        <div className="dark">
          <Circle color="dark" size="large" />
        </div>
        <div className="light">
          <Circle color="light" size="large" />
        </div>
      </CircleContainer>
      <Text1>{lang ? "לקוח חדש התווסף" : "New client added !"}</Text1>
      <Text2>
        {firstname} {lastname}
      </Text2>
      <div style={{ marginTop: "30px" }}>
        <Button
          title={lang ? "דשבורד מנהלים" : "Go to manager dashboard"}
          type="secondary"
          padding="25px 30px"
          clickHandler={() => {
            history.push("/");
          }}
        ></Button>
      </div>
    </MainContainer>
  );
};

export default NewCustomer;
