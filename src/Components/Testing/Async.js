import React, { useEffect, useState } from "react";

const Async = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  });

  return (
    <>
      <div>Async data</div>;
      <div>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </div>
      ;
    </>
  );
};

export default Async;