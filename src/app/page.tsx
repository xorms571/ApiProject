"use client";
import React, { useEffect, useState } from "react";
import { News2Item, NewsItem, ShoppingItem, WeatherData } from "./interfaces";
import News from "./components/News";
import NewsList2 from "./components/NewsList2";
import Shopping from "./components/Shopping";
import User from "./components/User";
import axios from "axios";
import Weather from "./components/Weather";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsHasMore, setNewsHasMore] = useState(true); // 추가 데이터 여부
  const [news2Loading, setNews2Loading] = useState(true);
  const [news2HasMore, setNews2HasMore] = useState(true); // 추가 데이터 여부
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [news2, setNews2] = useState<News2Item[]>([]);
  const [itemsPerPage, setItemPerPage] = useState(9); // 페이지 당 게시물 수
  const [newsPerPage, setNewsPerPage] = useState(6); // 페이지 당 게시물 수
  const [news2PerPage, setNews2PerPage] = useState(6); // 페이지 당 게시물 수
  const [windowWidth, setWindowWidth] = useState(Number);
  const [category, setCategory] = useState("general");
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const fetchData = async (searchQuery: string, page: number) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await axios.get(
        "https://apiprojectserver-production.up.railway.app/api/search",
        {
          params: { query: searchQuery, page, display: itemsPerPage }, // 입력된 쿼리와 페이지 번호로 요청
        }
      );
      const newItems = response.data.items;

      // 받아온 데이터가 있으면 상태 업데이트
      if (newItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...newItems]); // 이전 게시물에 추가
      } else {
        setHasMore(false); // 더 이상 데이터가 없으면 'hasMore'를 false로 설정
      }
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  const fetchNews = async (searchQuery: string, page: number) => {
    try {
      setNewsLoading(true);
      const response = await axios.get(
        "https://apiprojectserver-production.up.railway.app/api/news",
        {
          params: { q: searchQuery, page, display: itemsPerPage }, // 예시 검색어
        }
      );
      const newItems = response.data.items;
      // 받아온 데이터가 있으면 상태 업데이트
      if (newItems.length > 0) {
        setNews((prevItems) => [...prevItems, ...newItems]); // 이전 게시물에 추가
      } else {
        setNewsHasMore(false); // 더 이상 데이터가 없으면 'hasMore'를 false로 설정
      }
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setNewsLoading(false);
    }
  };
  const fetchNews2 = async (
    searchQuery: string,
    page: number,
    category: string
  ) => {
    try {
      setNews2Loading(true);
      const res = await fetch(
        `https://apiprojectserver-production.up.railway.app/api/news2?q=${searchQuery}&category=${category}&language=en&country=us&page=${page}&pageSize=${itemsPerPage}`
      );
      const articles = await res.json();
      const filteredArticles = articles.filter(
        (article: News2Item) =>
          article.urlToImage && !article.title.toLowerCase().includes("removed")
      );
      if (filteredArticles && filteredArticles.length > 0) {
        setNews2((prevItems) => [...prevItems, ...filteredArticles]);
      } else {
        setNews2HasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setNews2Loading(false);
    }
  };
  const fetchWeather = async () => {
    setWeatherLoading(true);
    try {
      const response = await axios.get(
        "https://apiprojectserver-production.up.railway.app/api/weather"
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  let timer: NodeJS.Timeout;
  const resizeWindow = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 500);
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeWindow);
    setItemPerPage(window.innerWidth > 700 ? 9 : 3);
    setNewsPerPage(window.innerWidth > 700 ? 6 : 3);
    setNews2PerPage(window.innerWidth > 700 ? 6 : 3);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [windowWidth]);
  const width = windowWidth > 1200;
  return (
    <div
      className={`${
        windowWidth > 1200 ? "bg-stone-200" : "bg-stone-100"
      } flex text-stone-700 justify-between parentContainer`}
    >
      <div className="w-9/12 childContainer flex flex-col">
        <Shopping
          items={items}
          itemsPerPage={itemsPerPage}
          windowWidth={windowWidth}
          hasMore={hasMore}
          loading={loading}
          fetchData={fetchData}
          setItems={setItems}
          setHasMore={setHasMore}
          setLoading={setLoading}
        />
        <News
          news={news}
          width={width}
          newsPerPage={newsPerPage}
          windowWidth={windowWidth}
          newsHasMore={newsHasMore}
          newsLoading={newsLoading}
          fetchNews={fetchNews}
          setNews={setNews}
          setHasMore={setHasMore}
          setLoading={setLoading}
        />
        <NewsList2
          windowWidth={windowWidth}
          width={width}
          news2={news2}
          category={category}
          news2HasMore={news2HasMore}
          news2Loading={news2Loading}
          news2PerPage={news2PerPage}
          fetchNews2={fetchNews2}
          setNews2={setNews2}
          setCategory={setCategory}
          setNews2HasMore={setNews2HasMore}
          setNews2Loading={setNews2Loading}
        />
      </div>
      <div className="childContainer2 w-full">
        <div className="flex flex-col title">
          <div
            className={`user w-full h-fit ${
              windowWidth > 1200 ? "bg-stone-100 border" : ""
            } rounded-lg p-3 flex text-sm justify-between items-center`}
          >
            <h1 className={`${windowWidth>1200? 'text-center':''} font-extrabold text-3xl w-full`}>
              API{windowWidth > 1200 ? "" : <br />} Project
            </h1>
          </div>
          <User windowWidth={windowWidth} />
        </div>
        <Weather
          windowWidth={windowWidth}
          fetchWeather={fetchWeather}
          weatherLoading={weatherLoading}
          weather={weather}
        />
      </div>
    </div>
  );
};

export default Home;
