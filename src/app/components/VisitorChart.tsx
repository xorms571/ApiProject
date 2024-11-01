"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { VisitorData } from "../interfaces";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type VisitorChartProps = {
  windowWidth: number;
};
const VisitorChart = ({ windowWidth }: VisitorChartProps) => {
  const [visitorStats, setVisitorStats] = useState<VisitorData[]>([]);

  useEffect(() => {
    // 오늘 방문자 수 증가
    const incrementVisitor = async () => {
      try {
        await axios.get("https://apiprojectserver-production.up.railway.app/api/visitor-count");
      } catch (error) {
        console.error("Error incrementing visitor count:", error);
      }
    };

    // 날짜별 방문자 데이터 가져오기
    const fetchVisitorStats = async () => {
      try {
        const response = await axios.get<VisitorData[]>(
          "https://apiprojectserver-production.up.railway.app/api/visitor-stats"
        );
        setVisitorStats(response.data);
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
      }
    };

    incrementVisitor(); // 첫 로드 시 오늘 방문자 수 증가
    fetchVisitorStats(); // 방문자 데이터 가져오기
  }, []);

  // 차트 데이터 포맷
  const chartData = {
    labels: visitorStats.map((data) => data.date), // 날짜 배열
    datasets: [
      {
        label: "방문자 수",
        data: visitorStats.map((data) => data.count), // 방문자 수 배열
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div
    className={`visitors w-full h-fit ${
      windowWidth > 1200 ? "bg-stone-100" : "bg-stone-50"
    } border rounded-lg p-3 text-sm`}
    >
      <h2>방문자 차트</h2>
      <Line data={chartData} />
    </div>
  );
};

export default VisitorChart;
