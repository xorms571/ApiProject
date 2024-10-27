"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
import Pagination from "../components/Pagination";
import Link from "next/link";

interface Item {
  title: string;
  link: string;
  image: string;
  lprice: string;
  hprice: string;
  mallName: string;
  productId: string;
}
type ShoppingProps = {
  windowWidth: number;
  itemsPerPage: number;
};

const Shopping = ({ itemsPerPage, windowWidth }: ShoppingProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>(""); // 검색어 상태 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastItem - itemsPerPage;
  const currentitems = items.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 데이터를 서버에서 받아오는 함수
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
      setError("에러가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 페이지가 변경될 때 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchData(query, currentPage); // 검색 쿼리와 페이지에 맞게 데이터 요청
  }, [currentPage]); // currentPage와 query가 변경될 때마다 실행

  // 더 많은 게시물 요청 (페이지 증가)
  const loadMoreItems = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지
    setLoading(false);
    setItems([]); // 검색어 입력 시 이전 항목 초기화
    setHasMore(true); // 추가 항목 요청을 허용하도록 설정
    setCurrentPage(1); // 페이지를 1로 초기화
    fetchData(query, 1); // 첫 페이지로 데이터 요청
  };
  const width = windowWidth > 1200;

  return (
    <div
      className={`shopping ${
        width ? "bg-stone-100 border p-3 rounded-lg" : "bg-stone-100"
      } text-stone-600 flex flex-col justify-between h-3/6`}
      style={{ minHeight: width ? "20vh" : "" }}
    >
      <div
        className={`${width ? "flex items-end justify-between" : null} w-full`}
      >
        <Link href={width ? "/shopping" : "#"}>
          <h1 className={`${width ? "text-lg" : "mb-3 text-2xl"} font-bold`}>
            네이버 쇼핑 API
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
          currentitems.map((item, index) => (
            <li
              key={index}
              className={`${
                width ? "flex items-center" : null
              } item hover:shadow-lg hover:bg-white hover:text-stone-800 bg-stone-50 text-stone-500 overflow-hidden rounded-lg border`}
              style={{
                width: width ? "calc(33.3% - 8px)" : "",
                height: width ? "10vh" : "",
              }}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${width ? "w-2/5 z-10" : null} shoppingImg`}
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={720}
                    height={240}
                    className={`${
                      width ? "object-contain" : "object-cover"
                    } w-full h-60 item-img`}
                  />
                </div>
              </Link>
              <div
                className={`${
                  width ? "flex flex-col justify-center w-3/5" : null
                } p-2`}
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <h2
                    className={`${
                      width ? "text-sm" : null
                    } mb-1 text-nowrap underline font-medium`}
                  >
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
                </a>
                <b className="text-sm">{item.mallName}</b>
                <p className="text-sm">
                  가격: <b>{item.lprice}원</b>
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Pagination 컴포넌트 */}
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={items.length}
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

export default Shopping;
