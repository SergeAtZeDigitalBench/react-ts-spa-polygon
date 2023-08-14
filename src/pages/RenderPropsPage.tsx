import React from "react";

import ProductItem from "../components/ProductItem";
import List from "../components/ListRenderProps";
import { products } from "../constants";
import { IProduct } from "../types";

const RenderPropsPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Render props</h1>
      <div className=" max-w-[50%] mx-auto">
        <List
          title="Products (render props)"
          items={products}
          render={(product: IProduct) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
      </div>
    </div>
  );
};

export default RenderPropsPage;
