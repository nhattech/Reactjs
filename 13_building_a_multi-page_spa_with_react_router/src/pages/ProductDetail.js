import { Link, useParams } from 'react-router-dom';

function ProductDetail() {
  const params = useParams();
  return (
    <>
      <h1>Product detail</h1>
      <p>productId: {params.productId}</p>
      <p>
        <Link to={'..'} relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default ProductDetail;
