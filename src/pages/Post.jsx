import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Post() {
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const postDoc = doc(db, "posts", id);
      const postData = await getDoc(postDoc);

      if (postData.exists()) {
        setPostData({ ...postData.data(), id: postData.id });
      } else {
        navigate("/");
      }
    };

    getPost();
  }, [id, navigate]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    navigate(`/${id}/edit`);
  };

  return (
    <div className="singlePost">
      <h2>{postData.title}</h2>
      <p>{postData.postText}</p>
      {localStorage.isAuth && postData.author.id === auth.currentUser.uid && (
        <button onClick={handleEditClick}>edit</button>
      )}
      <div className="author">
        <h3>@{postData.author.name}</h3>
        <img src={postData.author.img} alt={postData.author.name} />
      </div>
    </div>
  );
}

export default Post;
