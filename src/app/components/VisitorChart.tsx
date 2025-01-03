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
import Loading from "./Loading";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 오늘 방문자 수 증가
    const incrementVisitor = async () => {
      try {
        setLoading(true);
        await axios.get(
          "https://apiprojectserver-production.up.railway.app/api/visitor-count"
        );
      } catch (error) {
        console.error("Error incrementing visitor count:", error);
      }
    };

    // 날짜별 방문자 데이터 가져오기
    const fetchVisitorStats = async () => {
      try {
        setLoading(true);
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
    setLoading(false);
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

  // 차트 옵션 설정
  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            return typeof value === "number" ? Math.floor(value) : value; // 소수점 제거
          },
          autoSkip: true,
          maxTicksLimit: 10,
          stepSize: 1, // Y축 값 간격 설정
        },
      },
    },
  };

  return (
    <div
      className={`visitors w-full h-fit ${
        windowWidth > 1200 ? "bg-stone-100" : "bg-stone-50"
      } border rounded-lg p-3 text-sm`}
    >
      {loading ? (
        <Loading />
      ) : (
        <Line className="min-h-full" data={chartData} options={options} />
      )}
    </div>
  );
};

export default VisitorChart;
