import styled from "styled-components";

const SubContainer1 = styled.div`
  padding: 120px;
  padding-top: 50px;
  padding-bottom: 0px;
  width: 1030px;
  min-height: 537px;
  background: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 93px;
`;
const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  font-size: 28px;
  text-align: right;
  color: #343a40;
`;

const ChartType4 = () => {
  return (
    <SubContainer1>
      <SubHeader>ChartType4</SubHeader>
    </SubContainer1>
  );
};

export default ChartType4;
