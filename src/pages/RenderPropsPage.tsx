import React from "react";

import ProductItem from "../components/ProductItem";
import CompanyItem from "../components/CompanyItem";
import List from "../components/ListRenderProps";
import { products, companies } from "../constants";
import { IProduct, ICompany } from "../types";

const RenderPropsPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Render props</h1>
      <div className="flex justify-center gap-2">
        <div className="flex-1">
          <List
            title="Products (render props)"
            items={products}
            render={(product: IProduct) => (
              <ProductItem key={product.productName} product={product} />
            )}
          />
        </div>
        <div className="flex-1">
          <List
            title="Companies (render props)"
            items={companies}
            render={(company: ICompany) => (
              <CompanyItem
                key={company.companyName}
                company={company}
                defaultVisibility={false}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderPropsPage;
