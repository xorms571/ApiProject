import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type VisitorChartProps = {
  windowWidth:number
}
const VisitorChart = ({windowWidth}:VisitorChartProps) => {
  const [visitorCount, setVisitorCount] = useState(0); // 방문자 수를 저장할 상태

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await axios.get(
          "https://apiprojectserver-production.up.railway.app/api/visitor-count"
        );

        // response.data에서 count 값을 추출
        if (response.data && response.data.count !== undefined) {
          setVisitorCount(response.data.count);
        } else {
          console.error("Invalid visitor data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitorCount();
  }, []);

  // 차트 데이터
  const chartData = {
    labels: ["오늘"], // x축 라벨 (예: "오늘")
    datasets: [
      {
        label: "방문자 수",
        data: [visitorCount], // 방문자 수를 데이터로 사용
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div
      className={`visitors w-full h-fit ${
        windowWidth > 1200 ? "bg-stone-100" : "bg-stone-50"
      } border rounded-lg p-3 text-sm`}
    >
      <h2>오늘 방문객 수: {visitorCount}</h2>
      <Line data={chartData} />
    </div>
  );
};

export default VisitorChart;
