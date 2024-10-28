"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import Pagination from "../components/Pagination";
import Link from "next/link";
import { NewsItem } from "../page";
import CompoTop from "./CompoTop";
type NewsProps = {
  windowWidth: number;
  newsPerPage: number;
  news: NewsItem[];
  setNews: Dispatch<SetStateAction<NewsItem[]>>;
  fetchNews: (searchQuery: string, page: number) => Promise<void>;
  newsHasMore: boolean;
  newsLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
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
  setLoading,
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
  const width = windowWidth > 1200;

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
      <ul
        className={`${
          width ? "my-3" : "my-8"
        } flex flex-wrap gap-3 justify-center itemList items-center`}
      >
        {newsLoading ? (
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
                width ? "flex items-center" : ""
              } newsItem hover:shadow-lg hover:bg-white hover:text-stone-800 bg-stone-50 text-stone-500 overflow-hidden rounded-lg border`}
              style={{
                width: width ? "calc(33.3% - 8px)" : "",
              }}
            >
              <Link
                href={item.link}
                className="h-full w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mt-1 ml-1 text-nowrap font-medium underline">
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
                <div className="h-20 overflow-y-scroll bg-white my-1 px-2 border-y">
                  <span
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
                <p className="text-end mb-1 mr-1 text-sm">{new Date(item.pubDate).toLocaleString()}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
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
