import React from "react";
import { Link } from "react-router-dom";

import { CtListItem, CtButton, CtAlert } from "@captech/ct-react-library";
import NewPost from "./NewPost";
import classNames from "classnames/bind";
import * as styles from "./Comment.css";
const cn = classNames.bind(styles);

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInEditMode: false };
  }

  toggleEditMode = () => {
    const { isInEditMode } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isInEditMode: !isInEditMode,
    }));
  };

  submit = (comment, parent) => {
    let { submitComment } = this.props;
    this.toggleEditMode();
    submitComment(comment, parent);
  };

  deleteComment = (comment) => {
    const { submitComment } = this.props;

    comment.isDeleted = true;

    submitComment(comment);
  };

  render() {
    const { comment, userData } = this.props;
    const { isInEditMode } = this.state;

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    comment.editDate = new Date(comment.dateEdited);
    comment.postDate = new Date(comment.datePosted);

    return (
      <CtListItem key={comment.id}>
        <div className={cn({ comment: true })}>
          <div className={cn({ postHeader: true })}>
            <Link
              className={cn({ userName: true })}
              to={{
                pathname: `/user/${comment.user.userName}`,
                state: {
                  userData: comment.user,
                },
              }}
            >
              <img
                alt={`avatar for ${comment.user.userName}`}
                src={comment.user.avatar}
                className={cn({ avatarCircle: true })}
              ></img>
            </Link>
            <Link
              className={cn({ userName: true })}
              to={{
                pathname: `/user/${comment.user.userName}`,
                state: {
                  userData: comment.user,
                },
              }}
            >
              {comment.user.userName}
            </Link>
            <span className={cn({ postDate: true })}>
              {`Posted on ${comment.postDate.toLocaleDateString(
                "en-US",
                options
              )}`}
            </span>
          </div>
          {comment.isEdited && (
            <CtAlert
              type={"important"}
            >{`Edited on ${comment.editDate.toLocaleDateString(
              "en-US",
              options
            )}`}</CtAlert>
          )}
          <p>{comment.commentText}</p>
          {userData.id === comment.user.id && (
            <>
              <CtButton iconLeft={"edit"} onClick={this.toggleEditMode}>
                Edit
              </CtButton>
              <CtButton
                iconLeft={"delete"}
                onClick={() => this.deleteComment(comment)}
              >
                Delete
              </CtButton>
              {isInEditMode && (
                <NewPost
                  comment={comment}
                  submit={this.submit}
                  title={"Edit Comment"}
                />
              )}
            </>
          )}
        </div>
      </CtListItem>
    );
  }
}

export default Comment;
