import React from "react";
import Slider from "./components/Hero/Slides";
import PopularClases from "./components/PopularClases/PopularClases";
import Instructor from "./components/Instructor/Instructor";
import Limited from "./Pages/Limited";

const App = () => {
  return (
    <div className="dark:bg-gray-800">
      <Slider />
      <PopularClases />
      <Instructor />
      <Limited />
    </div>
  );
};

export default App;
