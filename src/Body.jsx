import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
