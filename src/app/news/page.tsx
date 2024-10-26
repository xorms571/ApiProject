"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";
interface NewsItem {
  title: string;
  link: string;
  description: string;
}
const Page: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>(""); // 검색어 상태 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage] = useState(18); // 페이지 당 게시물 수

  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastItem - itemsPerPage;
  const currentnews = news.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const fetchNews = async (searchQuery: string, page: number) => {
    try {
      const response = await axios.get("http://localhost:5000/api/news", {
        params: { q: searchQuery, page, display: itemsPerPage }, // 예시 검색어
      });
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

  return (
    <div className="bg-stone-100 text-stone-700 min-h-screen flex flex-col justify-between">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-3">네이버 뉴스 API 검색</h1>
        <Layout/>
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

      <ul className="flex flex-wrap gap-3 py-7 itemList">
        {loading ? (
          <p className="w-full flex justify-center items-center">
            <Image src={kOnzy} alt="loading" width={50} height={50} />
          </p>
        ) : (
          currentnews.map((item, index) => (
            <li key={index} className="p-5 border rounded-md item">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h2 className="mb-3 text-nowrap font-medium underline">
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
                <div className="h-28 overflow-y-scroll">
                  <span
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </a>
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
      />
    </div>
  );
};

export default Page;
