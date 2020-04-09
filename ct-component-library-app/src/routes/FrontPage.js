import React from "react";
import PostList from "../components/PostList";
import NewPost from "../components/NewPost";
import classNames from "classnames/bind";
import * as styles from "./FrontPage.css";
const cn = classNames.bind(styles);

const FrontPage = ({ frontPageData, submitComment, submitPost }) => {
  return (
    <main className={cn({ frontPage: true })}>
      <NewPost submit={submitPost} title={"Submit New Post"} />
      <PostList
        frontPageData={frontPageData}
        submitComment={submitComment}
        submitPost={submitPost}
      />
    </main>
  );
};

export default FrontPage;
