import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  //the referance to created table on firestore
  const postCollectionRef = collection(db, "posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title: title,
      postText: postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  return (
    <>
      <div className="createPostPage">
        <div className="cpContainer">
          <h1>Create A Post</h1>
          <div className="inputGp">
            <label>Title:</label>
            <input
              placeholder="Title..."
              onChange={(x) => {
                setTitle(x.target.value);
              }}
            />
          </div>
          <div className="inputGp">
            <label>Post:</label>
            <textarea
              placeholder="Content..."
              onChange={(x) => {
                setPostText(x.target.value);
              }}
            />
          </div>
          <button onClick={createPost}>Submit Post</button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
