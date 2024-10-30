"use client";
import { useEffect } from "react";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import { WeatherData } from "../interfaces";
//import 구문을 type-only로 지정하여 해결

type WeatherProps = {
  fetchWeather: () => Promise<void>;
  weatherLoading: boolean;
  windowWidth: number;
  weather: WeatherData[];
};
const Weather = ({
  fetchWeather,
  weatherLoading,
  windowWidth,
  weather,
}: WeatherProps) => {
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div
      className={`weather w-full h-fit ${
        windowWidth > 1200 ? "bg-stone-100" : "bg-stone-50"
      } border rounded-lg p-3 text-sm`}
    >
      {weatherLoading ? (
        <p className={`w-full flex justify-center items-center`}>
          <Image src={kOnzy} alt="loading" width={50} height={50} />
        </p>
      ) : (
        <>
          <h2 className="font-bold mb-2">OpenWeather API 전국날씨</h2>
          <ul className="w-full h-40 overflow-y-scroll">
            {weather.map((x) => (
              <li
                key={x.id}
                className={`flex h-10 text-xs justify-between border-t ${
                  windowWidth > 1200 ? "odd:bg-stone-50" : "odd:bg-white"
                }`}
              >
                <div className="flex flex-col justify-center">
                  <p>
                    <b>{x.name}</b> {x.main.temp}°C
                  </p>
                  <p>{x.weather[0].description}</p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Weather;
