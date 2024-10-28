import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-12 lg:pt-14">
        <div className="max-w-[968px] mx-auto px-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
