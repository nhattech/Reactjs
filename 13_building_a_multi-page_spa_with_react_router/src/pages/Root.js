import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const Root = () => {
  return (
    <>
      <MainNavigation />
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
