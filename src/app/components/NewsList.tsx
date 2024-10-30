import Link from "next/link";
import kOnzy from "/public/kOnzy.gif";
import Image from "next/image";
import { NewsItem } from "../interfaces";
type NewsListProps = {
  currentnews: NewsItem[];
  newsLoading: boolean;
  width: boolean;
};
const NewsList = ({ currentnews, newsLoading, width }: NewsListProps) => {
  return (
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
              <p className="text-end mb-1 mr-1 text-xs">
                {new Date(item.pubDate).toLocaleString()}
              </p>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default NewsList;
