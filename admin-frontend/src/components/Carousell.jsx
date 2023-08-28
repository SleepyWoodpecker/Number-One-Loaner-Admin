import React, { useState, useRef } from "react";
import CarousellItem from "./CarousellItem";
import "../Carousell.css";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";

function Carousell({ carousellItems }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // help to detect the swipes
  const startLocation = useRef(null);
  const endLocation = useRef(null);
  // const carousellItems = ["item 1", "item 2", "item 3"];

  const minDistance = 50;

  // need to remember to add in swiping capabilities as well
  const moveCarousell = (index) => {
    if (index < 0) {
      setActiveIndex(carousellItems.length - 1);
    } else if (index > carousellItems.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  // hehe thanks github
  const handleTouchStart = (e) => {
    endLocation.current = null;
    startLocation.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    // console.log(startLocation, endLocation);
  };

  const handleTouchMove = (e) => {
    // console.log("touchMove");
    endLocation.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    // console.log(startLocation, endLocation);
  };

  const handleTouchEnd = (e) => {
    // console.log("touch end");
    // console.log(startLocation, endLocation);
    // endLocation will be null if the event is just a touch
    if (endLocation.current === null) return;
    // if horizontalDistance < 0 it is a left swipe. If it is positive, it is a right swipe
    const horizontalDistance = startLocation.current.x - endLocation.current.x;
    const verticalDistance = startLocation.current.y - endLocation.current.y;
    // only count it as a swipe if the horizontal distance is greater than the vertical distance
    if (
      Math.abs(horizontalDistance) > verticalDistance &&
      horizontalDistance < -minDistance
    ) {
      // leftSwipe
      moveCarousell(activeIndex - 1);
    } else if (
      Math.abs(horizontalDistance) > verticalDistance &&
      horizontalDistance > minDistance
    ) {
      // right swipe
      moveCarousell(activeIndex + 1);
    }
  };
  // console.log(activeIndex);
  return (
    <div className="relative w-full h-full mt-7">
      <div
        className="absolute w-full h-full swiper bottom-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div id="carousell">
          {/* should remember that I need to center this later */}
          {/* buttons for moving the slider */}
          {/* <div className="absolute flex justify-between w-full z-10">
          <MdKeyboardArrowLeft
            size={20}
            onClick={() => moveCarousell(activeIndex - 1)}
          />
          <MdKeyboardArrowRight
            size={20}
            onClick={() => moveCarousell(activeIndex + 1)}
          />
        </div> */}
          <div
            id="inner"
            style={{ transform: `translate(-${activeIndex * 100}%)` }}
          >
            {carousellItems.map((item) => (
              <CarousellItem key={item.id}>{item.tab}</CarousellItem>
            ))}
          </div>
          {/* indicator on which is the active tab */}
          <div
            className="fixed flex justify-center"
            style={{ bottom: "4.5rem" }}
          >
            {carousellItems.map((item, i) =>
              i === activeIndex ? (
                <GoDotFill color="#2e2d2d" key={item.id} />
              ) : (
                <GoDot color="#bfbdbd" key={item.id} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousell;

// style={{transform: `translateX(-${activeItem * 100}%)`}}
