"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { NewsItem } from "../page";
import CompoTop from "./CompoTop";
import NewsList from "./NewsList";
type NewsProps = {
  windowWidth: number;
  newsPerPage: number;
  newsHasMore: boolean;
  newsLoading: boolean;
  news: NewsItem[];
  setNews: Dispatch<SetStateAction<NewsItem[]>>;
  fetchNews: (searchQuery: string, page: number) => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  width:boolean
};
const News = ({
  newsPerPage,
  windowWidth,
  news,
  fetchNews,
  setNews,
  newsHasMore,
  newsLoading,
  setHasMore,
  setLoading,width
}: NewsProps) => {
  const [query, setQuery] = useState<string>(""); // 검색어 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * newsPerPage;
  const indexOfFirstitem = indexOfLastItem - newsPerPage;
  const currentnews = news.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchNews(query, currentPage);
  }, [currentPage]);
  // 더 많은 게시물 요청 (페이지 증가)
  const loadMoreItems = () => {
    if (newsHasMore && !newsLoading) {
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
    <div
      className={`news ${
        width ? "bg-stone-100 border p-3 rounded-lg" : "bg-stone-100"
      } text-stone-600 flex flex-col justify-between`}
    >
      <CompoTop
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        width={width}
        title="네이버 API 뉴스"
      />
      <NewsList
        currentnews={currentnews}
        newsLoading={newsLoading}
        width={width}
      />
      <Pagination
        postsPerPage={newsPerPage}
        totalPosts={news.length}
        paginate={paginate}
        currentPage={currentPage}
        loadMoreItems={loadMoreItems}
        hasMore={newsHasMore}
        loading={newsLoading}
        windowWidth={windowWidth}
      />
    </div>
  );
};

export default News;
