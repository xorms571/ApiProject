import { Dispatch, SetStateAction } from "react";
type CompoProps = {
  handleSearch: (e: React.FormEvent) => void;
  query: string;
  category?: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  select?: boolean;
  windowWidth:number
};
const CompoTop = ({
  handleSearch,
  query,
  setQuery,
  title,
  select,
  category,
  setCategory,
  windowWidth
}: CompoProps) => {
  return (
    <div className={`${windowWidth>720 ? "flex items-end justify-between" : ""} w-full compoTop`}>
      <h1 className={`${windowWidth>720 ? "text-lg" : "mb-3 text-2xl"} font-bold`}>
        {title}
      </h1>
      <form
        onSubmit={handleSearch}
        className={`${
          select ? "w-3/6" : "w-2/6 py-1"
        } bg-white text-sm search rounded-md overflow-hidden border`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // 검색어 상태 업데이트
          placeholder="검색어를 입력하세요"
          className="w-8/12 px-4"
        />
        {select && (
          <select
            value={category}
            onChange={setCategory && ((e) => setCategory(e.target.value))}
            className="w-2/12 border-x bg-stone-100 h-full py-1"
          >
            <option value="general">통합</option>
            <option value="business">경제</option>
            <option value="technology">기술</option>
            <option value="sports">스포츠</option>
            <option value="science">과학</option>
            <option value="entertainment">연예</option>
            <option value="health">건강</option>
          </select>
        )}
        <button
          type="submit"
          className={`${select ? "w-2/12" : "w-4/12"} font-bold`}
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default CompoTop;
