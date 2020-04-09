import React from "react";

import { CtList } from "@captech/ct-react-library";
import classNames from "classnames/bind";
import * as styles from "./CommentList.css";
import Comment from "./Comment";
import { v4 } from "uuid";

const cn = classNames.bind(styles);

const CommentList = ({ comments, userData, submitComment }) => {
  return (
    <CtList className={cn({ comments: true })} nested={false} collapse={false}>
      {comments &&
        comments.map(
          (comment) =>
            comment.user && (
              <Comment
                key={v4()}
                comment={comment}
                userData={userData}
                submitComment={submitComment}
              />
            )
        )}
    </CtList>
  );
};

export default CommentList;
