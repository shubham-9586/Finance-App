import styled from "styled-components";
import Circle from "../atoms/circle";
import SvgDelete from "../vectors/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
interface ContainerProps {
  theme: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;

  background: ${(props) => {
    if (props.theme == "light") {
      return "var(--black)";
    }
    if (props.theme == "dark") {
      return "var(--largecard-primary)";
    }
  }};
  border-radius: 42px;
  width: 500px;
`;

interface DetailsContainerProps {
  theme: string;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: inset 3.01531px 5.02551px 4.02041px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  padding: 60px;
  padding-top: 22px;
  padding-bottom: 22px;
  background: ${(props) => {
    if (props.theme == "light") {
      return "var(--card-grey)";
    }
    if (props.theme == "dark") {
      return "var(--largecard-secondary)";
    }
  }};
  text-align: right;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

interface HeadingProps {
  theme: string;
}

const Heading = styled.div<HeadingProps>`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--largecard-primary-text)";
    }
    if (props.theme == "light") {
      return "var(--black)";
    }
  }};
`;

interface InfoProps {
  theme: string;
}

const Info = styled.div<InfoProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--subheader-color)";
    }
    if (props.theme == "light") {
      return "var(--black)";
    }
  }};
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

const DeleteIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10px;
  top: 10px;
  /* transform: translate(-50%, -50%); */
  z-index: 9;
`;

interface Physical_cardProps {
  theme: string;
  details: any;
  setDeleteId?: any;
  handleOpen?: any;
}

const PhysicalCard_large = ({
  theme,
  details,
  setDeleteId,
  handleOpen,
}: Physical_cardProps) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  return (
    <Container theme={theme}>
      <CircleContainer
        onClick={() => {
          setDeleteId(details.ID);
          handleOpen();
        }}
      >
        <div className="dark">
          <Circle color="dark" size="small" />
        </div>
        <div className="light">
          <Circle color="light" size="small" />
        </div>
      </CircleContainer>
      <DeleteIcon
        onClick={() => {
          setDeleteId(details.ID);
          handleOpen();
        }}
      >
        <SvgDelete color="var(--header-text)" width={20} height={20} />
      </DeleteIcon>

      <DetailsContainer theme={theme}>
        <SubContainer>
          <Info theme={theme}>{details.sourceName}</Info>
          <Heading theme={theme}>
            {lang ? "שם בעל חשבון" : "Account holder name"}
          </Heading>
        </SubContainer>
        <SubContainer>
          <Info theme={theme}>{details.bankAccountNumber}</Info>
          <Heading theme={theme}>
            {lang ? "מספר חשבון" : "Bank Account Number"}
          </Heading>
        </SubContainer>
        <SubContainer>
          <Info theme={theme}>{details.bankName}</Info>
          <Heading theme={theme}>{lang ? "שם הבנק" : "Bank name"}</Heading>
        </SubContainer>
        <SubContainer>
          <Info theme={theme}>{details.bankBranch}</Info>
          <Heading theme={theme}>{lang ? "שם סניף" : "Branch name"}</Heading>
        </SubContainer>
        {/* <SubContainer>
          <Info theme={theme}>010800</Info>
          <Heading theme={theme}>{lang ? "קוד בנק" : "Bank code"} </Heading>
        </SubContainer> */}
      </DetailsContainer>
      <BalanceContainer theme={theme}>
        <div className="balance-amount" style={{ opacity: 0 }}>
          xx xxx
        </div>
        <div className="balance-text" style={{ opacity: 0 }}>
          {lang ? `יתרה בש"ח` : "Balance"}
        </div>
      </BalanceContainer>
    </Container>
  );
};

export default PhysicalCard_large;
