"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import Pagination from "../components/Pagination";
import Link from "next/link";
interface NewsItem {
  title: string;
  link: string;
  description: string;
}
type NewsProps = {
  windowWidth: number;
  itemsPerPage: number;
};
const News = ({ itemsPerPage, windowWidth }: NewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>(""); // 검색어 상태 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastItem - itemsPerPage;
  const currentnews = news.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
        setHasMore(false); // 더 이상 데이터가 없으면 'hasMore'를 false로 설정
      }
    } catch (error) {
      setError("뉴스를 가져오는 데 오류가 발생했습니다.");
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNews(query, currentPage);
  }, [currentPage]);
  // 더 많은 게시물 요청 (페이지 증가)
  const loadMoreItems = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지
    setLoading(false);
    setNews([]); // 검색어 입력 시 이전 항목 초기화
    setHasMore(true); // 추가 항목 요청을 허용하도록 설정
    setCurrentPage(1); // 페이지를 1로 초기화
    fetchNews(query, 1); // 첫 페이지로 데이터 요청
  };
  const width = windowWidth > 1200;

  return (
    <div
      className={`news ${
        width ? "bg-stone-100 border p-3 rounded-lg" : "bg-stone-100"
      } text-stone-600 flex flex-col justify-between h-3/6`}
    >
      <div
        className={`${width ? "flex items-end justify-between" : ''} w-full`}
      >
        <Link href={width ? "/news" : "#"}>
          <h1 className={`${width ? "text-lg" : "mb-3 text-2xl"} font-bold`}>
            네이버 뉴스 API
          </h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="text-sm w-2/6 search rounded-md overflow-hidden border"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // 검색어 상태 업데이트
            placeholder="검색어를 입력하세요"
            className="w-9/12 px-4 py-1"
          />
          <button type="submit" className="bg-white py-1 w-3/12 font-bold">
            검색
          </button>
        </form>
      </div>
      <ul
        className={`${
          width ? "my-3" : "my-8"
        } flex flex-wrap gap-3 justify-center itemList items-center`}
      >
        {loading ? (
          <p
          className={`${
            width ? "h-72" : ""
          } w-full flex justify-center items-center`}
        >
          <Image src={kOnzy} alt="loading" width={50} height={50} />
        </p>
        ) : (
          currentnews.map((item, index) => (
            <li
              key={index}
              className={`${
                width ? "flex items-center" : ''
              } item px-3 hover:shadow-lg hover:bg-white hover:text-stone-800 bg-stone-50 text-stone-500 overflow-hidden rounded-lg border`}
              style={{
                width: width ? "calc(33.3% - 8px)" : "",
                height: width ? "10vh" : "",
              }}
            >
              <Link href={item.link} className="h-full w-full" target="_blank" rel="noopener noreferrer">
                <h2 className="mt-2 text-nowrap font-medium underline">
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    className="ml-5"
                  />
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    className="ml-5"
                  />
                </h2>
                <div className="h-20 overflow-y-scroll">
                  <span
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={news.length}
        paginate={paginate}
        currentPage={currentPage}
        loadMoreItems={loadMoreItems}
        hasMore={hasMore}
        loading={loading}
        windowWidth={windowWidth}
      />
    </div>
  );
};

export default News;
