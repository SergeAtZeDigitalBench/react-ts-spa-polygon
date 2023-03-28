import { useState } from "react";

import Carousel from "./components/Carousel";
import ArticleSummary from "./components/ArticleSummary";
import { cars } from "./data";

import "./App.css";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Carousel</h1>
      <div className="h-screen flex items-center">
        <Carousel itemsPerView={3}>
          {cars.map((article) => (
            <Carousel.Item key={article.id}>
              <ArticleSummary item={article} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default App;
