import DataProvider from "../components/ListRenderProps/DataProvider";
import List from "../components/List";
import ProductItem from "../components/ProductItem";
import CompanyItem from "../components/CompanyItem";
import ListRenderProps from "../components/ListRenderProps";
import { products, companies } from "../constants";
import { IProduct, ICompany } from "../types";

const RenderPropsPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Render props</h1>
      <div className="flex justify-center gap-2">
        <div className="flex-1">
          <ListRenderProps
            title="Products (render props)"
            items={products}
            render={(product: IProduct) => (
              <ProductItem key={product.productName} product={product} />
            )}
          />
        </div>
        <div className="flex-1">
          <ListRenderProps
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
      <div className="px-4 mt-6">
        <h3 className="text-1xl font-bold">Data provider render props</h3>
        <DataProvider>
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <p className="p-4 bg-blue-700 text-white text-center">
                  Loading...
                </p>
              );
            }
            if (error) {
              return (
                <p className="p-4 bg-red-600 text-white text-center">{error}</p>
              );
            }
            if (data) {
              return <List title="Products" items={data as IProduct[]} />;
            }
          }}
        </DataProvider>
      </div>
    </div>
  );
};

export default RenderPropsPage;
