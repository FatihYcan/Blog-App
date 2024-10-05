import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import About from "../pages/About";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "../pages/Detail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MyBlogs from "../pages/MyBlogs";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="new-blog" element={<NewBlog />} />
        </Route>
        <Route path="/detail/:_id" element={<Detail />} />
        <Route path="my-blogs" element={<MyBlogs />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
