import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import { SwiperSlide } from "swiper/react";
import Slides from "../Swiper/Slides";

interface SwiperBtnsProps {
  prevClass: string;
  nextClass: string;
}

const SwiperBtns: React.FC<SwiperBtnsProps> = ({ prevClass, nextClass }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <div
        className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4  dark:hover:bg-dark-fill-3   cursor-pointer  `}
      >
        <RxCaretLeft className={`text-4xl font-bold ${prevClass} text-white`} />
      </div>
      <div
        className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3   cursor-pointer `}
      >
        <RxCaretRight className={`text-4xl font-bold ${nextClass} text-white`} />
      </div>
    </div>
  );
};

export default SwiperBtns;
