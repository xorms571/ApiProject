import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type CompoProps = {
  width: boolean;
  handleSearch: (e: React.FormEvent) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  title: string;
};
const CompoTop = ({
  width,
  handleSearch,
  query,
  setQuery,
  title,
}: CompoProps) => {
  return (
    <div className={`${width ? "flex items-end justify-between" : ""} w-full`}>
      <h1 className={`${width ? "text-lg" : "mb-3 text-2xl"} font-bold`}>
        {title}
      </h1>
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
  );
};

export default CompoTop;
