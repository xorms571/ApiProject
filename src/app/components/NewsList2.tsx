import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "./Pagination";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import CompoTop from "./CompoTop";
import { News2Item } from "../interfaces";
type NewsList2Props = {
  windowWidth: number;
  width: boolean;
  news2Loading: boolean;
  news2HasMore: boolean;
  news2PerPage: number;
  category: string;
  news2: News2Item[];
  setNews2Loading: React.Dispatch<React.SetStateAction<boolean>>;
  setNews2HasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setNews2: React.Dispatch<React.SetStateAction<News2Item[]>>;
  fetchNews2: (
    searchQuery: string,
    page: number,
    category: string
  ) => Promise<void>;
};
const NewsList2 = ({
  windowWidth,
  width,
  fetchNews2,
  news2,
  news2HasMore,
  news2Loading,
  news2PerPage,
  setNews2,
  setNews2HasMore,
  setNews2Loading,
  category,
  setCategory,
}: NewsList2Props) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * news2PerPage;
  const indexOfFirstitem = indexOfLastItem - news2PerPage;
  const currentnews2 = news2.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물
  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setNews2Loading(false);
    setNews2([]);
    setNews2HasMore(true); // 추가 항목 요청을 허용하도록 설정
    setCurrentPage(1); // 페이지를 1로 초기화
    setCategory(category);
    fetchNews2(query, currentPage, category);
  }, [category]);
  useEffect(() => {
    fetchNews2(query, currentPage, category);
  }, [currentPage]);
  const loadMoreItems = () => {
    if (news2HasMore && !news2Loading) {
      setCurrentPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지
    setNews2Loading(false);
    setNews2([]); // 검색어 입력 시 이전 항목 초기화
    setNews2HasMore(true); // 추가 항목 요청을 허용하도록 설정
    setCurrentPage(1); // 페이지를 1로 초기화
    setCategory(category);
    fetchNews2(query, 1, category); // 첫 페이지로 데이터 요청
  };
  return (
    <article
      className={`news ${
        width ? "bg-stone-100 border p-3 rounded-lg" : "bg-stone-100"
      } text-stone-600 flex flex-col justify-between`}
    >
      <CompoTop
        windowWidth={windowWidth}
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        title="News API"
        select={true}
        category={category}
        setCategory={setCategory}
      />
      <ul
        className={`${
          width ? "my-3" : "my-8"
        } news2 flex flex-wrap gap-3 justify-normal itemList items-center`}
      >
        {news2Loading ? (
          <p
            className={`${
              width ? "h-64" : ""
            } w-full flex justify-center items-center`}
          >
            <Image src={kOnzy} alt="loading" width={50} height={50} />
          </p>
        ) : (
          currentnews2.map((article, index) => (
            <li
              key={index}
              className={`${
                width ? "flex items-center" : ""
              } item hover:shadow-lg hover:bg-white hover:text-stone-800 bg-stone-50 text-stone-500 overflow-hidden rounded-lg border`}
              style={{
                width: width ? "calc(33.3% - 8px)" : "",
              }}
            >
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${width ? "w-2/5 z-10" : ""} shoppingImg`}
                style={{ height: width ? "132px" : "" }}
              >
                {article.urlToImage && (
                  <div className="overflow-hidden h-full">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className={`${
                        width ? "object-cover" : "object-cover"
                      } w-full h-full item-img`}
                    />
                  </div>
                )}
              </Link>
              <div
                className={`${
                  width ? "flex flex-col justify-center w-3/5" : ""
                } h-full`}
              >
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-nowrap font-medium underline text-lg">
                    <span
                      className="ml-2"
                      dangerouslySetInnerHTML={{ __html: article.title }}
                    />
                    <span
                      className="ml-5"
                      dangerouslySetInnerHTML={{ __html: article.title }}
                    />
                    <span
                      className="ml-5"
                      dangerouslySetInnerHTML={{ __html: article.title }}
                    />
                  </h2>
                </Link>
                <div
                  className={`${
                    width ? "h-20 border-y" : "h-2/3 border-t"
                  } overflow-y-scroll pl-2 bg-white`}
                >
                  <span
                    className="text-xs"
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  />
                </div>
                {windowWidth > 1200 ? (
                  <span
                    className="text-xs block text-end mr-1 my-1"
                    dangerouslySetInnerHTML={{
                      __html: new Date(article.publishedAt).toLocaleString(),
                    }}
                  />
                ) : null}
              </div>
            </li>
          ))
        )}
      </ul>
      <Pagination
        postsPerPage={news2PerPage}
        totalPosts={news2.length}
        paginate={paginate}
        currentPage={currentPage}
        loadMoreItems={loadMoreItems}
        hasMore={news2HasMore}
        loading={news2Loading}
        windowWidth={windowWidth}
      />
    </article>
  );
};

export default NewsList2;
