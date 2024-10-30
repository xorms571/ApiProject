"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CompoTop from "./CompoTop";
import ShoppingList from "./ShoppingList";
import { ShoppingItem } from "../interfaces";
export type ShoppingProps = {
  windowWidth: number;
  itemsPerPage: number;
  items: ShoppingItem[];
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
  fetchData: (searchQuery: string, page: number) => Promise<void>;
  hasMore: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
};
const Shopping = ({
  fetchData,
  hasMore,
  items,
  itemsPerPage,
  loading,
  setHasMore,
  setItems,
  setLoading,
  windowWidth,
}: ShoppingProps) => {
  const [query, setQuery] = useState<string>(""); // 검색어 상태 추가
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  // 현재 페이지의 게시물 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastItem - itemsPerPage;
  const currentitems = items.slice(indexOfFirstitem, indexOfLastItem); // 현재 페이지에 맞는 게시물

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 데이터를 서버에서 받아오는 함수

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
      } text-stone-600 flex flex-col justify-between`}
      style={{ minHeight: width ? "20vh" : "" }}
    >
      <CompoTop
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        width={width}
        title="네이버 API 쇼핑"
      />
      <ShoppingList
        currentitems={currentitems}
        loading={loading}
        width={width}
      />
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
