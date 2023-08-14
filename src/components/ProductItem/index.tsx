import { IProduct } from "../../types";

interface IProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProps) => (
  <li className="product">
    <p className="product-name">{product.productName}</p>
    <p className="product-price">${product.price}</p>
    <p className="product-description">{product.description}</p>
  </li>
);

export default ProductItem;
