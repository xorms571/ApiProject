import { useEffect, useState } from "react";
import { Article } from "../page";
import Link from "next/link";
type NewsList2Props = {
  width: boolean;
};
const NewsList2 = ({ width }: NewsList2Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [news2query, setNews2Query] = useState("news");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("us");
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://apiprojectserver-production.up.railway.app/api/news2?q=${news2query}&category=${category}&language=${language}&country=${country}`
        );
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [news2query, category, language, country]);
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
        <div className="bg-white text-sm w-3/6 flex justify-between search rounded-md overflow-hidden border">
          <input
            type="text"
            value={news2query}
            onChange={(e) => setNews2Query(e.target.value)}
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
          </select>
          <select
            className="w-2/12 border-l"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="us">미국</option>
            <option value="kr">한국</option>
          </select>
          <button
            className="border-l font-bold w-2/12 py-1"
            onClick={() => setArticles([])}
          >
            검색
          </button>
        </div>
      </div>
      <ul
        className={`${
          width ? "my-3" : "my-8"
        } flex flex-wrap gap-3 justify-normal itemList items-center`}
      >
        {articles.map((article, index) => (
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
              className={`${width ? "w-2/5 h-32 z-10" : ""} shoppingImg`}
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
                className={`${width ? "h-20" : "h-2/3"} overflow-y-scroll pl-2`}
              >
                <span
                  className="text-xs"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default NewsList2;
