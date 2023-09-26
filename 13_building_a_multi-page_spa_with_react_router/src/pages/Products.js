import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
  { id: 'p4', title: 'Product 4' },
  { id: 'p5', title: 'Product 5' },
];
const Products = () => {
  return (
    <>
      <h1>Products Page</h1>
      <Link to={'/'}>Go to the Home Page</Link>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
