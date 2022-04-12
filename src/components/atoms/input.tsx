import styled from "styled-components";
import { useState } from "react";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;
interface LabelProps {
  focus: boolean;
  label: string;
}

const Label = styled.div<LabelProps>`
  color: var(--black);
  text-align: right;
  font-size: 18px;
  font-weight: ${(props) => (props.focus === true ? 700 : 500)};
`;

const InputBase = styled.input<InputBaseProps>`
  margin-top: 8px;
  height: ${(props) => props.height}px;
  text-align: right;
  padding: 16px;
  border: 1px solid var(--black);
  border: ${(props) =>
    props.focus === true
      ? "1.5px solid var(--black)"
      : "1px solid var(--grey)"};
  outline: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  &::placeholder {
    color: var(--black);
    opacity: 0.2;
  }
`;

interface InputBaseProps {
  focus: boolean;
  height: number;
}

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  height: number;
  value: any;
  setvalue?: any;
  name?: any;
}

const Input = ({
  type,
  label,
  placeholder,
  height,
  value,
  setvalue,
  name,
}: InputProps) => {
  const [focus, setFocus] = useState(false);
  if (name) {
    const ChangeHandler = (e: any) => {
      setvalue((prev: any) => {
        console.log("repv", prev);
        return {
          ...prev,
          [name]: e.target.value,
        };
      });
    };
    return (
      <InputContainer>
        <Label focus={focus} label={label}>
          {label}
        </Label>
        <InputBase
          tabIndex={-1}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          focus={focus}
          type={type}
          value={value}
          height={height}
          onChange={ChangeHandler}
        />
      </InputContainer>
    );
  }
  return (
    <InputContainer>
      <Label focus={focus} label={label}>
        {label}*
      </Label>
      <InputBase
        onFocus={(e) => setFocus(true)}
        onBlur={(e) => setFocus(false)}
        focus={focus}
        type={type}
        value={value}
        height={height}
        onChange={(e) => {
          setvalue(e.target.value);
        }}
      >
        {/* <Currency></Currency> */}
      </InputBase>
    </InputContainer>
  );
};

export default Input;
