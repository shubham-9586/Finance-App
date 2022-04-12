import React, { useState } from "react";
import Header from "../../components/molecules/header";
import styled from "styled-components";
import ChartType1 from "./ChartType1";
import ChartType2 from "./ChartType2";
import ChartType3 from "./ChartType3";
import ChartType4 from "./ChartType4";
import { useHistory } from "react-router";
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
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1500px;
  min-height: 650px;
  background: var(--lightgrey);
  border-radius: 93px;
  margin: 39px;
  @media only screen and (max-width: 1600px) {
    max-width: 1400px;
    min-height: 650px;
  }

  @media only screen and (max-width: 1500px) {
    max-width: 1300px;
    min-height: 600px;
  }

  @media only screen and (max-width: 1400px) {
    max-width: 1200px;
    min-height: 550px;
  }
`;

const SubContainer = styled.div`
  /* width: 370px; */
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
  }
`;

const SubContainerText = styled.div`
  font-weight: 600;
  font-size: 28px;
  color: var(--black);
  margin-top: 50px;
  margin-bottom: 34px;
`;

interface SubContainerBankTextProps {
  name: string;
  selected: string;
}

const SubContainerButtonText = styled.div<SubContainerBankTextProps>`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  padding: 24px 28px;
  text-align: center;
  background: ${(props) => {
    if (props.name == props.selected) {
      return "var(--cc-primary)";
    } else {
      return "none";
    }
  }};
  color: ${(props) => {
    if (props.name == props.selected) {
      return "var(--cc-text)";
    } else {
      return "var(--black)";
    }
  }};
  border-radius: 106px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 1600px) {
    padding: 15px 18px;
  }
  @media only screen and (max-width: 1500px) {
    padding: 10px 12px;
  }
`;

const Chart = ({ client_id, setstate }: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const history = useHistory();
  const [selected, setSelected]: any = useState("type1");
  return (
    <>
      <AddClientContainer>
        <Header
          heading={lang ? "סטטיסטיקת לקוחות" : "Client Statistics"}
          subheading="@WW24"
          buttonText={lang ? "ריכוז פעולות" : "Unified transactions"}
          buttonHandler={() => {
            setstate((prev: any) => !prev);
          }}
        />
        <MainContainer>
          {selected === "type1" ? (
            <ChartType1 clientId={client_id} />
          ) : selected === "type2" ? (
            <ChartType2 clientId={client_id} />
          ) : selected === "type3" ? (
            <ChartType3 clientId={client_id} />
          ) : (
            <ChartType4 />
          )}
          <SubContainer>
            <SubContainerText>
              {lang ? "סוג תרשימים" : "Charts Type"}
            </SubContainerText>
            <div className="buttons">
              <SubContainerButtonText
                name="type1"
                selected={selected}
                onClick={() => {
                  setSelected("type1");
                }}
              >
                {lang ? "הכנסה תוצאת הוצאות" : "Income Expense result"}
              </SubContainerButtonText>
              <SubContainerButtonText
                name="type2"
                selected={selected}
                onClick={() => {
                  setSelected("type2");
                }}
              >
                {lang ? "הון לטווח ארוך" : "Long Term Capital"}
              </SubContainerButtonText>
              <SubContainerButtonText
                name="type3"
                selected={selected}
                onClick={() => {
                  setSelected("type3");
                }}
              >
                {lang ? "עוגת הכנסות והוצאות" : " Income Expense pie"}
              </SubContainerButtonText>
              {/* <SubContainerButtonText
                name="type4"
                selected={selected}
                onClick={() => {
                  setSelected("type4");
                }}
              >
                Drill from Income Expense Pie
              </SubContainerButtonText> */}
            </div>
          </SubContainer>
        </MainContainer>
      </AddClientContainer>
    </>
  );
};

export default Chart;
