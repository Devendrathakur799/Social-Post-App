import { useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Home() {

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("token");
    window.location.href = "/";

  };

  return (

    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          TaskPlanet Social
        </h2>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <CreatePost />

      <PostCard />

    </div>

  );

}

export default Home;