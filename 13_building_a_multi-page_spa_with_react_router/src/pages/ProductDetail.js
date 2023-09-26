import { useParams } from 'react-router-dom';

function ProductDetail() {
  const params = useParams();
  return (
    <>
      <h1>Product detail</h1>
      <p>productId: {params.productId}</p>
    </>
  );
}

export default ProductDetail;
