import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('products');
  }
  return (
    <>
      <h1>My Home Page</h1>
      <p>Go to <Link to="products">the products pages</Link></p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
};

export default Home;
