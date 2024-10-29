import { useEffect, useState } from "react";
import { News2Item } from "../page";
import Link from "next/link";
import Pagination from "./Pagination";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
type NewsList2Props = {
  windowWidth: number;
  width: boolean;
  news2Loading: boolean;
  news2HasMore: boolean;
  news2PerPage: number;
  category: string;
  language: string;
  country: string;
  news2: News2Item[];
  setNews2Loading: React.Dispatch<React.SetStateAction<boolean>>;
  setNews2HasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setNews2: React.Dispatch<React.SetStateAction<News2Item[]>>;
  fetchNews2: (searchQuery: string, page: number) => Promise<void>;
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
  country,
  language,
  setCategory,
  setLanguage,
  setCountry,
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
    fetchNews2(query, currentPage);
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
    fetchNews2(query, 1); // 첫 페이지로 데이터 요청
  };
  return (
    <article
      className={`news ${
        width ? "bg-stone-100 border p-3 rounded-lg" : "bg-stone-100"
      } text-stone-600 flex flex-col justify-between`}
    >
      <div
        className={`${width ? "flex items-center justify-between" : ""} w-full`}
      >
        <h1 className={`${width ? "text-lg" : "mb-3 text-2xl"} font-bold`}>
          NEWS API
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-white text-sm w-3/6 flex justify-between search rounded-md overflow-hidden border"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-4/12 pl-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-2/12 border-l"
          >
            <option value="general">일반</option>
            <option value="business">사업</option>
            <option value="technology">기술</option>
            <option value="sports">스포츠</option>
            <option value="science">과학</option>
            <option value="entertainment">연예</option>
            <option value="health">건강</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-2/12 border-l"
          >
            <option value="en">영어</option>
            <option value="kr">한국어</option>
            <option value="jp">일본어</option>
          </select>
          <select
            className="w-2/12 border-l"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="us">미국</option>
            <option value="kr">한국</option>
            <option value="jp">일본</option>
          </select>
          <button className="border-l font-bold w-2/12 py-1" type="submit">
            검색
          </button>
        </form>
      </div>
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
                      className="w-full object-cover h-full"
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
                {windowWidth > 1200 ? <span
                    className="text-xs block text-end mr-1 my-1"
                    dangerouslySetInnerHTML={{
                      __html: new Date(article.publishedAt).toLocaleString(),
                    }}
                  /> : null}
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
