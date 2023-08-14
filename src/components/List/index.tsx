import React, { useState } from "react";

import { products, companies } from "../../constants";
import { IProduct, ICompany } from "../../types";
import "./List.css";

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => (
  <li className="product">
    <p className="product-name">{product.productName}</p>
    <p className="product-price">${product.price}</p>
    <p className="product-description">{product.description}</p>
  </li>
);

interface IProps {
  title: string;
  items: IProduct[];
}

const List = ({ title, items }: IProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  };

  return (
    <div className="list-container">
      <div className="heading">
        <h2 className="text-1xl font-bold">{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && (
        <ul className="list">
          {displayItems.map((product) => (
            <ProductItem key={product.productName} product={product} />
          ))}
        </ul>
      )}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
};

export default List;
