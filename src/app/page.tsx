"use client";
import React, { useEffect, useState } from "react";
import News from "./components/News";
import Shopping from "./components/Shopping";
import User from "./components/User";
import axios from "axios";
import NewsList2 from "./components/NewsList2";
export interface ShoppingItem {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
}
export interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
}
export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsHasMore, setNewsHasMore] = useState(true); // 추가 데이터 여부
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [itemsPerPage, setItemPerPage] = useState(Number); // 페이지 당 게시물 수
  const [newsPerPage, setNewsPerPage] = useState(Number); // 페이지 당 게시물 수
  const [windowWidth, setWindowWidth] = useState(Number);
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
    if (windowWidth > 820) setItemPerPage(9);
    if (windowWidth < 1200) setItemPerPage(6);
    if (windowWidth > 820) setNewsPerPage(6);
    if (windowWidth < 1200) setNewsPerPage(6);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [windowWidth]);
  const width = windowWidth > 1200;
  return (
    <div
      className={`${
        windowWidth > 1200 ? "bg-stone-200" : "bg-stone-100"
      } flex text-stone-700 parentContainer`}
    >
      <div className="w-4/5 childContainer flex flex-col">
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
          newsPerPage={newsPerPage}
          windowWidth={windowWidth}
          newsHasMore={newsHasMore}
          newsLoading={newsLoading}
          fetchNews={fetchNews}
          setNews={setNews}
          setHasMore={setHasMore}
          setLoading={setLoading}
          width={width}
        />
        <NewsList2 width={width} />
      </div>
      <User windowWidth={windowWidth} />
    </div>
  );
};

export default Home;
