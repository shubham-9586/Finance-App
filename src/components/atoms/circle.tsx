import React from "react";
import styled from "styled-components";

interface CircleContainerProps {
  selected?: string;
  color: string;
  size: string;
}

const CircleContainer = styled.div<CircleContainerProps>`
  width: ${(props) => {
    if (props.size == "large") {
      return "214px";
    }
    if (props.size == "small") {
      return "60px";
    }
    if (props.size == "verysmall") {
      return "40px";
    }
  }};
  height: ${(props) => {
    if (props.size == "large") {
      return "214px";
    }
    if (props.size == "small") {
      return "60px";
    }
    if (props.size == "verysmall") {
      return "40px";
    }
  }};
  background-color: ${(props) => {
    if (props.color == "dark") {
      return "var(--circle-primary)";
    }
    if (props.color == "light") {
      if (props.theme == "dark") {
        return "var(--circle-tertiary)";
      } else {
        return "var(--circle-secondary)";
      }
    }
    return "none";
  }};
  border-radius: 50%;
`;

interface CircleProps {
  theme?: string;
  color: string;
  size: string;
}

const Circle = ({ theme, color, size }: CircleProps) => {
  return (
    <CircleContainer theme={theme} color={color} size={size}></CircleContainer>
  );
};

export default Circle;
