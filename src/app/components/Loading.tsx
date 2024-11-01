import Image from "next/image";
import kOnzy from "/public/kOnzy.gif";
const Loading = () => {
  return (
    <div
      className={`w-full flex justify-center items-center loading`}
    >
      <Image src={kOnzy} alt="loading" width={50} height={50} />
    </div>
  );
};

export default Loading;
