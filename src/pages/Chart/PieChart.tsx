import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./colors";
var options = {
  maintainAspectRatio: false,
  scales: {},
  legend: {
    labels: {
      fontSize: 25,
    },
  },
};

const initial_data = {
  labels: ["Critical case", "Urgent case", "Errors", "Reviewed", "Success"],
  datasets: [
    {
      data: [30, 30, 5, 15, 20],
      backgroundColor: [
        "rgb(242,165,152)",
        "rgb(255,232,157)",
        "rgb(236,107,109)",
        "rgb(122,231,125)",
        "rgb(195,233,151)",
      ],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],

  plugins: {
    labels: {
      render: "percentage",
      fontColor: ["green", "white", "red"],
      precision: 2,
    },
  },
  text: "23%",
};

const PieChart = ({ chartData }: any) => {
  const [data, setData] = useState(initial_data);
  useEffect(() => {
    let x: any = [];
    let y: any = [];
    for (let i = 0; i < chartData.length; i++) {
      x.push(chartData[i].GroupName);
      y.push(chartData[i].Amount);
    }
    const data1: any = {
      labels: x,
      datasets: [
        {
          data: y,
          backgroundColor: [
            "rgb(242,165,152)",
            "rgb(255,232,157)",
            "rgb(236,107,109)",
            "rgb(122,231,125)",
            "rgb(195,233,151)",
            ...chartColors,
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],

      plugins: {
        labels: {
          render: "percentage",
          fontColor: ["green", "white", "red"],
          precision: 2,
        },
      },
      text: "23%",
    };
    setData(data1);
  }, [chartData]);
  return <Doughnut data={data} options={options} />;
};

export default PieChart;
