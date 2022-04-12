import Button from "../atoms/button";
import styled from "styled-components";
import AppLogo from "../vectors/Applogo";
import NewAppLogo from "./../vectors/NewApplogo";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";

interface HeaderProps {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonHandler: any;
  extraButton?: any;
  extraButtonHandler?: any;
  hidden?: boolean;
}

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1500px;
  height: 152px;
  display: flex;
  justify-content: space-between;
  padding: 35px 100px;
  align-items: center;
  background: var(--header-bg);
  border-radius: 30px;
  margin-top: 40px;
  @media only screen and (max-width: 1600px) {
    max-width: 1400px;
  }
  @media only screen and (max-width: 1500px) {
    max-width: 1300px;
  }
  @media only screen and (max-width: 1400px) {
    max-width: 1200px;
  }
`;

const HeaderContainer1 = styled(HeaderContainer)`
  position: relative;
  padding: 35px 60px;
`;

const Details = styled.div``;

const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
`;

const MainHeading = styled.div`
  font-size: 55px;
  text-align: right;
  font-family: var(--oswald);
  color: var(--header-text);
`;

const Header = ({
  heading,
  subheading,
  buttonText,
  buttonHandler,
  extraButton,
  extraButtonHandler,
  hidden,
}: HeaderProps) => {
  const theme: any = useSelector((state: RootState) => {
    return state.theme;
  });
  const history = useHistory();

  if (extraButton) {
    return (
      <HeaderContainer1>
        <Flex>
          <Button
            title={buttonText}
            type="primary"
            clickHandler={buttonHandler}
            padding="10px 20px"
            extra={true}
          />
          <Button
            title={extraButton}
            type="primary"
            clickHandler={extraButtonHandler}
            padding="10px 20px"
            extra={true}
          />
        </Flex>
        <LogoContainer onClick={() => history.push("/")}>
          {!theme ? <AppLogo /> : <NewAppLogo />}
        </LogoContainer>
        <Details>
          <MainHeading>{heading}</MainHeading>
        </Details>
      </HeaderContainer1>
    );
  }

  return (
    <HeaderContainer>
      <Button
        title={buttonText}
        type="primary"
        clickHandler={buttonHandler}
        padding="15px 30px"
        hidden={hidden}
      />
      <LogoContainer onClick={() => history.push("/")}>
        {!theme ? <AppLogo /> : <NewAppLogo />}
      </LogoContainer>
      <Details>
        <MainHeading>{heading}</MainHeading>
      </Details>
    </HeaderContainer>
  );
};

export default Header;
