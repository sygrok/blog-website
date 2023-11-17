import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    postText: "",
    author: {
      id: "",
      name: "",
      img: "",
    },
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const postData = await getDoc(postDoc);

        if (postData.exists()) {
          setPostData({ ...postData.data(), id: postData.id });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditPost = async () => {
    try {
      const postDoc = doc(db, "posts", id);
      await updateDoc(postDoc, {
        title: postData.title,
        postText: postData.postText,
      });
      navigate(`/${id}`);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editPost">
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="postText">Post Text:</label>
        <textarea
          id="postText"
          name="postText"
          value={postData.postText}
          onChange={handleInputChange}
        ></textarea>
        <button type="button" onClick={handleEditPost}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
