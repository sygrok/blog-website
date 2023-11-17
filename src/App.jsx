import {
  BrowserRouter as Router,
  Link,
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import "./App.css";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  //logout
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          {localStorage.isAuth && <Link to="/createpost">Post</Link>}
          {!localStorage.isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <button className="bb" onClick={signUserOut}>
              <h2>Logout</h2>
            </button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          {localStorage.isAuth && (
            <Route path="/createpost" element={<CreatePost />} />
          )}
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/:id/edit" element={<EditPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
