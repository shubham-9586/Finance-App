import styled from "styled-components";
import { keyframes } from "styled-components";

interface ButtonTypes {
  title: any;
  extra?: boolean;
  type: string;
  padding: string;
  clickHandler: any;
  hidden?: boolean;
}

interface ButtonSubContainerProps {
  color: string;
  padding: string;
  hidden?: boolean;
  extra?: boolean;
}

interface ButtonContainerProps {
  hidden: any;
}
const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
  visibility: ${(props) => (props.hidden == true ? "hidden" : "visible")};
`;

const animate = keyframes`
  50%{transform:scale(0.95);}
  100%{transform:scale(1)}
`;

const ButtonSubContainer = styled.button<ButtonSubContainerProps>`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 106px;
  padding: ${(props) => props.padding};
  font-size: ${(props) => (props.extra == true ? "14px" : "16px")};
  outline: none;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(props) => {
    if (props.color == "primary") {
      return "var(--white)";
    } else {
      return "var(--login-button)";
    }
  }};

  color: ${(props) => {
    if (props.color == "primary") {
      return "var(--black)";
    }
    if (props.color == "secondary") {
      return "var(--white)";
    }
  }};

  &:focus {
    animation: ${animate} 0.3s ease-in forwards;
  }
`;

const Button = ({
  title,
  extra,
  type,
  padding,
  clickHandler,
  hidden,
}: ButtonTypes) => {
  return (
    <ButtonContainer hidden={hidden}>
      <ButtonSubContainer
        color={type}
        onClick={() => {
          setTimeout(clickHandler, 300);
        }}
        padding={padding}
        extra={extra}
      >
        {title}
      </ButtonSubContainer>
    </ButtonContainer>
  );
};

export default Button;
