import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('/products');
  }
  return (
    <>
      <h1>My Home Page</h1>
      <p>Go to <a href="/products">the products pages</a></p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
};

export default Home;
