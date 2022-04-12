import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChartDetailsCard from "../../components/molecules/Chartdetails";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { get_Chart1Data } from "./../../api/chart";
import { Bar } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";

const SubContainer1 = styled.div`
  padding: 80px;
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

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: "40px";
`;
export const SubContainer11 = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: "40px";
`;
const MainContainerTemp = styled.div`
  height: 500px;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
`;
const ChartType1 = ({ clientId }: any) => {
  const [theme, lang]: any = useSelector((state: RootState) => {
    return [state.theme, state.lang];
  });
  const [chartData, setChartData] = useState(null);
  const [data, setData]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data1 = await get_Chart1Data(clientId);
      if (data1.SPY === "-1") {
        setFlag(true);
      }
      let data = {};
      if (data1.SPM > 0) {
        data = {
          labels: ["In", "Out"],
          datasets: [
            {
              label: lang ? "ערך" : "Value",
              backgroundColor: ["#2196f3", "#ccf148"],
              hoverBackgroundColor: ["#1B26C9", "#7D8C0B"],
              data: [data1.In, data1.Out],
            },
          ],
        };
      } else {
        data = {
          labels: ["In", "Out"],
          datasets: [
            {
              label: "Value",
              backgroundColor: ["#2196f3", "#D11515"],
              hoverBackgroundColor: ["#1B26C9", "#D14E4E"],
              data: [data1.In, data1.Out],
            },
          ],
        };
      }
      setData(data);
      setChartData(data1);
      setLoading(false);
    };
    getData();
  }, []);
  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <SubContainer1>
      <SubHeader>
        {lang
          ? "הכנסה ממוצעת מול הוצאה ממוצעת"
          : "Average monthy income v/s outcome"}
      </SubHeader>
      {chartData ? (
        flag ? (
          <MainContainerTemp>
            <h1>{lang ? "אין נתונים זמינים" : "No Data Available"}</h1>
          </MainContainerTemp>
        ) : (
          <SubContainer>
            <div style={{ height: "400px", width: "250px", marginTop: "25px" }}>
              <Bar data={data} height={400} options={options} />
            </div>
            <ChartDetailsCard
              theme={`${theme ? "light" : "dark"}`}
              chartData={chartData}
            />
          </SubContainer>
        )
      ) : (
        <SubContainer11>
          <CircularProgress />
        </SubContainer11>
      )}
    </SubContainer1>
  );
};

export default ChartType1;
