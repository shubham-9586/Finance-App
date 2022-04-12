import { Select } from "antd";
import "./select.css";
import styled from "styled-components";

const { Option } = Select;

interface SelectProps {
  name?: string;
  label?: string;
  labelforcss?: string;
  value: any;
  setvalue: any;
  options: any;
}
interface SelectContainerProps {
  label: any;
}

const SelectContainer = styled.div<SelectContainerProps>`
  width: ${(props) => {
    if (
      props.label == "Bank Name" ||
      props.label == "Credit Card Type" ||
      props.label == "Credit Card Provider" ||
      props.label == "Active"
    ) {
      return "100%";
    }
    return "258px";
  }};

  @media only screen and (max-width: 1600px) {
    max-width: ${(props) => {
      if (
        props.label == "Bank Name" ||
        props.label == "Credit Card Type" ||
        props.label == "Credit Card Provider" ||
        props.label == "Active"
      ) {
        return "100%";
      }
      return "230px";
    }};
  }

  @media only screen and (max-width: 1500px) {
    max-width: ${(props) => {
      if (
        props.label == "Bank Name" ||
        props.label == "Credit Card Type" ||
        props.label == "Credit Card Provider" ||
        props.label == "Active"
      ) {
        return "100%";
      }
      return "210px";
    }};
  }

  @media only screen and (max-width: 1400px) {
    max-width: ${(props) => {
      if (
        props.label == "Bank Name" ||
        props.label == "Credit Card Type" ||
        props.label == "Credit Card Provider" ||
        props.label == "Active"
      ) {
        return "100%";
      }
      return "200px";
    }};
  }
`;

const SelectContainer1 = styled.div`
  width: 100%;
  height: 20px;
`;

const SelectLabel = styled.div`
  color: var(--black);
  text-align: right;
  font-weight: 500;
  font-size: 18px;
`;

const SelectComponent = ({
  name,
  label,
  labelforcss,
  value,
  setvalue,
  options,
}: SelectProps) => {
  if (!label) {
    return (
      <SelectContainer1>
        <Select
          style={{ width: "100%" }}
          value={value}
          onChange={(e) => {
            if (name) {
              setvalue((prev: any) => {
                return {
                  ...prev,
                  [name]: e,
                };
              });
            } else {
              setvalue(e);
            }
          }}
        >
          {options.map((opt: any) => {
            return (
              <Option key={opt.value} value={opt.value}>
                {opt.name}
              </Option>
            );
          })}
        </Select>
      </SelectContainer1>
    );
  }

  return (
    <SelectContainer label={labelforcss ? labelforcss : null}>
      <SelectLabel>{label}*</SelectLabel>
      <Select
        style={{ width: "100%" }}
        value={value}
        onChange={(e) => {
          if (name) {
            console.log("selet", e);
            setvalue((prev: any) => {
              return {
                ...prev,
                [name]: e,
              };
            });
          } else {
            setvalue(e);
          }
        }}
      >
        {options.map((opt: any) => {
          return (
            <Option key={opt.value} value={opt.value}>
              {opt.name}
            </Option>
          );
        })}
      </Select>
    </SelectContainer>
  );
};

export default SelectComponent;
