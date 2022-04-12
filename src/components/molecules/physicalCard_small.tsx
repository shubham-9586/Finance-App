import styled from "styled-components";
import Circle from "../atoms/circle";

interface ContainerProps {
  theme: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  background: ${(props) => {
    if (props.theme == "dark") {
      return "var(--largecard-primary)";
    }
    if (props.theme == "light") {
      return "var(--black)";
    }
  }};
  border-radius: 24.2169px;
  width: 300px;
  transform: ${(props) => {
    if (props.theme == "light") {
      return "scale(0.8) translateX(10px)";
    }
    if (props.theme == "dark") {
      return "none";
    }
  }};
  transition: all 0.3s ease-in;
`;

interface DetailsContainerProps {
  theme: string;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  padding: 16px;
  box-shadow: inset 3.01531px 5.02551px 4.02041px rgba(0, 0, 0, 0.25);
  border-radius: 24.3404px;
  background-color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--largecard-secondary)";
    }
    if (props.theme == "light") {
      return "var(--card-grey)";
    }
  }};
  transition: all 0.2s ease-in;
  text-align: right;
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--white)";
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
  padding: 16px;
  padding-top: 10px;
  padding-bottom: 0px;
  text-align: right;
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--header-text)";
    }
    if (props.theme == "light") {
      return "var(--white)";
    }
  }};
  transition: all 0.2s ease-in;
  .balance-text {
    font-weight: 500;
    font-size: 16px;
  }
  .balance-amount {
    font-weight: 600;
    font-size: 26px;
    transform: translateY(-8px);
  }
`;

const SubContainer = styled.div`
  .mt {
    margin-top: 24px;
  }
`;

interface HeadingProps {
  theme: string;
}

const Heading = styled.div<HeadingProps>`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--largecard-primary-text)";
    }
    if (props.theme == "light") {
      return "var(--white)";
    }
  }};
  transition: all 0.2s ease-in;
`;

const Info = styled.div`
  div {
    font-weight: 500;
    font-size: 20px;
    color: var(--subheader-color);
  }
  .account-holder-name {
    font-size: 24px;
  }
  .account-number {
    font-size: 20px;
    transform: translateY(-8px);
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
    transform: translate(-60%, -20%);
  }
  .light {
    transform: translate(-40%, -60%);
    box-shadow: 0px 4.56px 4.56px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    z-index: 5;
  }
`;

interface Physical_cardProps {
  theme: string;
  details: any;
  name?: string;
}

const PhysicalCard_small = ({ theme, details, name }: Physical_cardProps) => {
  return (
    <Container theme={theme}>
      <CircleContainer>
        <div className="dark">
          <Circle color="dark" size="small" />
        </div>
        <div className="light">
          <Circle color="light" size="small" />
        </div>
      </CircleContainer>
      <DetailsContainer theme={theme}>
        <SubContainer>
          <Heading theme={theme}>{details.sourceName}</Heading>
          <Info>
            <div>{details.bankName}</div>
          </Info>
        </SubContainer>
        <SubContainer>
          <Heading className="mt" theme={theme}>
            Account info
          </Heading>
          <Info>
            <div className="account-holder-name">{name}</div>
            <div className="account-number">
              xxx{" "}
              {details.bankAccountNumber.substr(
                details.bankAccountNumber.length - 5
              )}
            </div>
          </Info>
        </SubContainer>
      </DetailsContainer>
      <BalanceContainer theme={theme}>
        <div className="balance-text" style={{ opacity: 0 }}>
          Balance
        </div>
        <div className="balance-amount" style={{ opacity: 0 }}>
          xx xxx
        </div>
      </BalanceContainer>
    </Container>
  );
};

export default PhysicalCard_small;
