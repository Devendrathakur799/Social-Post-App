import { useEffect, useState } from "react";
import API from "../api/axios";

function PostCard() {

  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const res = await API.get("/posts");

      setPosts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const likePost = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/posts/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const addComment = async (postId) => {

    try {

      const token = localStorage.getItem("token");

      await API.post(
        `/posts/comment/${postId}`,
        {
          text: commentText[postId]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCommentText({
        ...commentText,
        [postId]: ""
      });

      fetchPosts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      {posts.map((post) => (

        <div
          key={post._id}
          className="card mt-4 shadow-sm"
        >

          <div className="card-body">

            {/* Username */}

            <h5 className="card-title">
              {post.user.username}
            </h5>

            {/* Post Text */}

            <p className="card-text">
              {post.text}
            </p>

            {/* Image */}

            {post.image && (

              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt="post"
                className="img-fluid rounded mb-3"
              />

            )}

            {/* Like Section */}

            <div className="d-flex gap-3 align-items-center">

              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  likePost(post._id)
                }
              >
                ❤️ Like
              </button>

              <span>
                Likes: {post.likes.length}
              </span>

              <span>
                Comments: {post.comments.length}
              </span>

            </div>

            <hr />

            {/* Comment Input */}

            <input
              type="text"
              className="form-control"
              placeholder="Write a comment..."
              value={
                commentText[post._id] || ""
              }
              onChange={(e) =>
                setCommentText({
                  ...commentText,
                  [post._id]:
                    e.target.value
                })
              }
            />

            <button
              className="btn btn-primary mt-2"
              onClick={() =>
                addComment(post._id)
              }
            >
              Add Comment
            </button>

            {/* Show Comments */}

            <div className="mt-3">

              {post.comments.map(
                (comment, index) => (

                  <div
                    key={index}
                    className="border rounded p-2 mt-2"
                  >

                    <strong>
                      {comment.username}
                    </strong>

                    <p className="mb-0">
                      {comment.text}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default PostCard;