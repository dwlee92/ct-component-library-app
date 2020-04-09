import React from "react";
import Post from "./Post";

const PostList = ({ submitComment, submitPost, frontPageData }) => {
  const { posts, userData } = frontPageData;

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post.postData.id}
              post={post.postData}
              userData={userData}
              submitComment={submitComment}
              submitPost={submitPost}
            >
              <div>{post.postData.user.userName}</div>
              <p>{post.postData.postText}</p>
            </Post>
          );
        })}
    </>
  );
};

export default PostList;
