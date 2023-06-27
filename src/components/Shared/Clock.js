import React, { useEffect, useState } from "react";

function Clock() {
  const [days, setdays] = useState();
  const [hours, sethours] = useState();
  const [minutes, setminutes] = useState();
  const [seconds, setseconds] = useState();

  let destination = new Date("July 20, 2023 ").getTime();
  let interval = setInterval(() => {
    let now = new Date().getTime();

    const distance = destination - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (destination < 0) {
      clearInterval(interval);
    } else {
      setdays(days);
      sethours(hours);
      setminutes(minutes);
      setseconds(seconds);
    }
  }, 1000);

  return (
    <div className="flex gap-4 items-center text-black/90 font-semibold mt-4 mb-7 dark:text-white">
      <div className="flex items-center md:space-x-6 space-x-2">
        <div className="flex items-center flex-col justify-center">
          <p className="">{days}</p>
          <p className="md:text-lg text-xs">Days</p>
        </div>
        <span className="text-xl">:</span>
      </div>
      <div className="flex items-center md:space-x-6 space-x-2">
        <div className="flex items-center flex-col justify-center">
          <p className="">{hours}</p>
          <p className="md:text-lg text-xs">Hours</p>
        </div>
        <span className="text-xl">:</span>
      </div>
      <div className="flex items-center md:space-x-6 space-x-2">
        <div className="flex items-center flex-col justify-center">
          <p className="">{minutes}</p>
          <p className="md:text-lg text-xs">Minutes</p>
        </div>
        <span className="text-xl">:</span>
      </div>
      <div className="flex items-center md:space-x-6 space-x-2">
        <div className="flex items-center flex-col justify-center">
          <p className="">{seconds}</p>
          <p className="md:text-lg text-xs">Seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Clock;
