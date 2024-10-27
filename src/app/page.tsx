"use client";
import { useEffect, useState } from "react";
import News from "./components/News";
import Shopping from "./components/Shopping";
import User from "./components/User";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(Number);
  const [itemsPerPage, setItemPerPage] = useState(Number); // 페이지 당 게시물 수
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
    windowWidth < 820 ? setItemPerPage(10) : null;
    windowWidth < 1200 ? setItemPerPage(9) : null;
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [windowWidth]);
  return (
    <div
      className={`${
        windowWidth > 1200 ? "bg-stone-200 h-screen" : "bg-stone-100"
      } flex text-stone-700 parentContainer`}
    >
      <div className="w-4/5 childContainer flex flex-col justify-between gap-5">
        <Shopping itemsPerPage={itemsPerPage} windowWidth={windowWidth} />
        <News itemsPerPage={itemsPerPage} windowWidth={windowWidth}/>
      </div>
      <User />
    </div>
  );
};

export default Home;
