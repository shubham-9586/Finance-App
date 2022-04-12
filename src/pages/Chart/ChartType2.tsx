import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { get_Chart2Data } from "./../../api/chart";
import { Line } from "react-chartjs-2";
import SelectComponent from "../../components/atoms/select";
import ChartDetailsCard1 from "../../components/molecules/Chartdetails1";
import { SubContainer11 } from "./ChartType1";
import { CircularProgress } from "@mui/material";

const SubContainer1 = styled.div`
  padding: 60px;
  padding-top: 50px;
  padding-bottom: 0px;
  width: 1030px;
  min-height: 537px;
  background: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 93px;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #343a40;
  div {
    .yield-select {
      width: 100px;
      transform: translate(-110px, 0px);
    }
    .estimated {
      transform: translateY(5px);
      font-size: 18px;
    }
  }
`;

const SubHeader = styled.div`
  font-weight: 600;
  font-size: 28px;
  color: #343a40;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: "40px";
  margin-top: 50px;
  gap: 20px;
  .line-chart {
    height: 350px;
    width: 400px;
  }
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
const Yield_option = [
  { value: "1", name: "1" },
  { value: "2", name: "2" },
  { value: "3", name: "3" },
  { value: "4", name: "4" },
  { value: "5", name: "5" },
  { value: "6", name: "6" },
  { value: "7", name: "7" },
  { value: "8", name: "8" },
  { value: "9", name: "9" },
  { value: "10", name: "10" },
];

const ChartType1 = ({ clientId }: any) => {
  const [theme, lang]: any = useSelector((state: RootState) => {
    return [state.theme, state.lang];
  });

  const [chartData, setChartData]: any = useState(null);
  const [yieldno, setyieldno] = useState("5");
  const [data, setData]: any = useState(null);
  const [flag, setFlag] = useState(false);
  const up = (ctx: any, value: any) => {
    if (ctx.p0.parsed.y > 0) {
      return value;
    }
    return undefined;
  };

  const down = (ctx: any, value: any) => {
    if (ctx.p0.parsed.y < 0) {
      return value;
    }
    return undefined;
  };

  useEffect(() => {
    const getData = async () => {
      setChartData(null);
      const data1 = await get_Chart2Data(clientId, yieldno);
      if (data1.length === 0) {
        setFlag(true);
        setChartData([]);
        return;
      }
      const labels: any = [];
      const values: any = [];
      data1.map((obj: any) => {
        labels.push(obj.ForAge);
        values.push(obj.NetWorth);
      });
      const data = {
        labels: labels,
        datasets: [
          {
            label: lang ? "שווי נקי" : "NetWorth",
            data: values,
            fill: true,
            segment: {
              borderColor: (ctx: any) =>
                //@ts-ignore
                up(ctx, "#CCF148") || down(ctx, "rgba(255,26,104,1)"),
              backgroundColor: (ctx: any) =>
                //@ts-ignore
                up(ctx, "#CCF148") || down(ctx, "rgba(255,26,104,1)"),
            },
          },
        ],
      };
      setData(data);
      setChartData(data1);
    };
    getData();
  }, [yieldno]);

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
      <SubHeaderContainer>
        <SubHeader>{lang ? "יתרה " : "Long Term Capital"}</SubHeader>
        <div>
          <div className="yield-select">
            <SelectComponent
              options={Yield_option}
              value={yieldno}
              setvalue={setyieldno}
            />
          </div>
          <div className="estimated">{lang ? "תשואה" : "Estimated Yield"}</div>
        </div>
      </SubHeaderContainer>
      {chartData ? (
        flag ? (
          <MainContainerTemp>
            <h1>{lang ? "אין נתונים זמינים" : "No Data Available"}</h1>
          </MainContainerTemp>
        ) : (
          <SubContainer>
            <div className="line-chart">
              <Line options={options} data={data} />
            </div>
            <ChartDetailsCard1
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
