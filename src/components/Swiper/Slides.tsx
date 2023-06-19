/** Slider **/
import { Swiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/virtual";

interface SlidesProps {
  items: React.JSX.Element[];
  handleSlideChange?: (e: any) => void;
  styles: string[];
  prevClass: string;
  nextClass: string;
  showEmptyContainer?: boolean
}

const Slides: React.FC<SlidesProps> = ({
  items,
  styles,
  prevClass,
  nextClass,
  showEmptyContainer,
  handleSlideChange,
}) => {
  return (
    <>
      <div className={`${styles.join("")}`}>
        <Swiper
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          allowTouchMove={false}
          modules={[Navigation]}
          className="flex gap-2 w-full flex-wrap"
          onSwiper={(swiper) => true}
          onSlideChange={(e) => handleSlideChange?.(e)}
          slideToClickedSlide
          effect="fade"
        >
          <>{items.length > 0 && items}</>
        </Swiper>
        {(items.length < 1  && showEmptyContainer) && (
          <div className="text-center dark:text-dark-gray-4 text-sm flex justify-center w-full">
            {`There aren't any items here yet!`}
          </div>
        )}
      </div>
    </>
  );
};

export default Slides;

// interface SlidesProps {
//   companiesSliders: React.JSX.Element[];
//   handleSlideChange?: (e: any) => void;
//   styles: string[];
// }

// const Slides: React.FC<SlidesProps> = ({
//   companiesSliders,
//   styles,
//   handleSlideChange,
// }) => {
//   return (
//     <>
//       <div className={`${styles.join("")}`}>
//         <Swiper
//           navigation={{
//             prevEl: ".prev",
//             nextEl: ".next",
//           }}
//           allowTouchMove={false}
//           modules={[Navigation]}
//           className="flex gap-2 w-full flex-wrap"
//           onSwiper={(swiper) => true}
//           onSlideChange={(e) => handleSlideChange?.(e)}
//           slideToClickedSlide
//         >
//           <>{companiesSliders.length > 0 && companiesSliders}</>
//         </Swiper>
//         {companiesSliders.length < 1 && (
//           <div className="text-center dark:text-dark-gray-4 text-sm flex justify-center w-full">
//             {`There aren't any tags here yet!`}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Slides;
