import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

const MultiselectContainer = styled.div`
  width: 100%;
  align-self: flex-end;
`;

const MultiselectLabel = styled.div`
  color: var(--black);
  text-align: right;
  font-weight: 500;
  font-size: 18px;
`;

interface MultiselectProps {
  label: string;
  value: any;
  setvalue: any;
}

const additional_soc_list = ["own house", "paying mortgage", "rent house"];

const Multiselect = ({ label, value, setvalue }: MultiselectProps) => {

  return (
    <MultiselectContainer>
      <MultiselectLabel>{label}</MultiselectLabel>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        value={value}
        onChange={(e) => setvalue(e)}
      >
        {additional_soc_list.map((val) => {
          return (
            <Option key={val} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
    </MultiselectContainer>
  );
};

export default Multiselect;
