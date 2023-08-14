import { faker } from "@faker-js/faker";

export const navLinks = [
  { id: 1, pathname: "/", title: "Home", exact: true },
  { id: 2, pathname: "/hoc", title: "HOC", exact: false },
  { id: 3, pathname: "/render-props", title: "Render-props", exact: false },
  { id: 4, pathname: "/custom-hook", title: "Custom-hook", exact: false },
];

export const products = Array.from({ length: 20 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

export const companies = Array.from({ length: 15 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});
