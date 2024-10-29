import Image from "next/image";
import Link from "next/link";
import kOnzy from "/public/kOnzy.gif";
import { ShoppingItem } from "../page";
type ShoppingListProps = {
  currentitems: ShoppingItem[];
  loading: boolean;
  width?: boolean;
};
const ShoppingList = ({ currentitems, loading, width }: ShoppingListProps) => {
  return (
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
              width ? "flex items-center" : ""
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
              className={`${width ? "w-2/5 z-10" : ""} shoppingImg bg-stone-300`}
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
                width ? "flex flex-col justify-center w-3/5" : ""
              } p-2`}
            >
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <h2
                  className={`${
                    width ? "text-sm" : ""
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
              </Link>
              <b className="text-sm">{item.mallName}</b>
              <p className="text-sm">
                가격: <b>{item.lprice}원</b>
              </p>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ShoppingList;
