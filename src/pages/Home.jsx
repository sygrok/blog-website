import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "posts");
  const orderedPostsQuery = query(postCollectionRef, orderBy("date", "desc"));

  const getPosts = async () => {
    const data = await getDocs(orderedPostsQuery);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const goToArticle = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      <div className="homePage">
        {postList.map((post) => {
          return (
            <div key={post.id} className="post">
              <div className="postHeader">
                <div className="title">
                  <h2 className="title" onClick={() => goToArticle(post.id)}>
                    {post.title}
                    {"\u00A0"}
                    &#8594;
                  </h2>
                </div>
                <div className="deletePost">
                  {localStorage.isAuth &&
                    post.author.id === auth.currentUser.uid && (
                      <button
                        className="button"
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        &#128465;
                      </button>
                    )}
                </div>
              </div>
              <div className="postTextContainer">{post.postText}</div>
              <div className="authorx">
                <h3>@{post.author.name}</h3>
                <h4>date: {post.date}</h4>

                <img src={post.author.img} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
