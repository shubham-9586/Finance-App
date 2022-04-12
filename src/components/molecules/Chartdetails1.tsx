import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import Circle from "../atoms/circle";
import SvgDelete from "../vectors/Delete";

interface ContainerProps {
  theme: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;

  background: ${(props) => {
    console.log(props);
    if (props.theme == "light") {
      return "var(--black)";
    }
    if (props.theme == "dark") {
      return "var(--largecard-primary)";
    }
  }};
  border-radius: 42px;
  width: 400px;
  height: 100%;
`;

interface DetailsContainerProps {
  theme: string;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  height: 247px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: inset 3.01531px 5.02551px 4.02041px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  padding: 28px;
  padding-top: 42px;
  padding-right: 20px;
  background: ${(props) => {
    if (props.theme == "light") {
      return "var(--card-grey)";
    }
    if (props.theme == "dark") {
      return "var(--largecard-secondary)";
    }
  }};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;
const SubContainer1 = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;
interface HeadingProps {
  theme: string;
}

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  .no-money {
    margin-right: 20px;
  }
`;
const Heading = styled.div<HeadingProps>`
  font-size: 16px;
  font-weight: 400;
  color: "var(--black)";
`;
const Heading1 = styled.div<HeadingProps>`
  width: 8px;
  height: 8px;
  background: #2196f3;
  border-radius: 50%;
`;
const Heading2 = styled.div<HeadingProps>`
  width: 8px;
  height: 8px;
  background: #7d8c0b;
  border-radius: 50%;
`;
const Heading3 = styled.div<HeadingProps>`
  width: 8px;
  height: 8px;
  background: #d11515;
  border-radius: 50%;
`;
const Heading11 = styled.div`
  height: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
interface InfoProps {
  theme: string;
}

const Info = styled.div<InfoProps>`
  font-size: 16px;
  font-weight: 500;
  color: var(--black);
`;

interface BalanceContainerProps {
  theme: string;
}

const BalanceContainer = styled.div<BalanceContainerProps>`
  padding: 32px;
  padding-top: 10px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 42px;
  border-bottom-right-radius: 42px;
  background: ${(props) => {
    if (props.theme == "dark") {
      return "var(--largecard-primary)";
    }
    if (props.theme == "light") {
      return "var(--black)";
    }
  }};
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--header-text)";
    }
    if (props.theme == "light") {
      return "var(--white)";
    }
  }};
  .balance-text {
    font-weight: 500;
    font-size: 16px;
  }
  .balance-amount {
    font-weight: 600;
    font-size: 26px;
  }
`;

export const CircleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 25px;
  .dark {
    position: absolute;
    transform: translate(-50%, 50%);
  }
  .light {
    transform: translate(-30%, -30%);
    box-shadow: 0px 4.56px 4.56px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    z-index: 5;
  }
`;

const ChartDetailsCard1 = ({ theme, chartData }: any) => {
  const [neg, setNeg] = useState(false);
  const [endingbalance, setendingbalance]: any = useState(null);
  const lang = useSelector((state: RootState) => state.lang);
  const [nomoney_age, setnomoney_age] = useState(-1);

  useEffect(() => {
    const all_networth: any = chartData.map((val: any) => val.NetWorth);
    const all_data: any = chartData.map((val: any) => [
      val.NetWorth,
      val.ForAge,
    ]);
    all_data.sort();
    all_data.map((val: any) => {
      if (val[0] == 0) {
        setnomoney_age(val[1]);
      }
    });
    if (all_networth.length > 0) {
      setendingbalance(
        Math.max(
          Math.abs(parseFloat(all_networth[0])),
          Math.abs(parseFloat(all_networth[all_networth.length - 1]))
        )
      );
    } else {
      setendingbalance(23);
    }
  }, []);

  return (
    <Container theme={theme}>
      <CircleContainer onClick={() => {}}>
        <div className="dark">
          <Circle color="dark" size="small" />
        </div>
        <div className="light">
          <Circle color="light" size="small" />
        </div>
      </CircleContainer>
      <DetailsContainer theme={theme}>
        <SubContainer>
          <Info theme={theme}>
            {chartData.length > 0 ? chartData[0].StartNetWorth : null}
          </Info>
          <HeadingContainer>
            <Heading theme={theme}>
              {lang ? "יתרה התחלתית" : "Beginning balance"}
            </Heading>
            <Heading11>
              <Heading1 />
            </Heading11>
          </HeadingContainer>
        </SubContainer>
        <SubContainer>
          <Info theme={theme}>{parseFloat(endingbalance)?.toFixed(2)}</Info>
          <HeadingContainer>
            <Heading theme={theme}>
              {lang ? "מאזן סיום" : "Ending Balance"}
            </Heading>
            <Heading11>{neg ? <Heading3 /> : <Heading2 />}</Heading11>
          </HeadingContainer>
        </SubContainer>
        <SubContainer>
          <Info theme={theme}>{nomoney_age}</Info>
          <HeadingContainer>
            <Heading className="no-money" theme={theme}>
              {lang ? "גיל בו הכסף אוזל" : "No money age"}
            </Heading>
          </HeadingContainer>
        </SubContainer>
      </DetailsContainer>
      <BalanceContainer theme={theme}>
        <div className="balance-amount" style={{ opacity: 0 }}>
          {chartData.length > 0
            ? parseFloat(chartData[0].SPY).toFixed(2)
            : null}
        </div>
        <div className="balance-text" style={{ opacity: 0 }}>
          {lang ? "חסכון שנתי" : "Savings per year"}
        </div>
      </BalanceContainer>
    </Container>
  );
};

export default ChartDetailsCard1;
