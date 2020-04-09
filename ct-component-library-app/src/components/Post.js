import React from "react";
import { Link } from "react-router-dom";
import { CtToggleSection, CtAlert, CtButton } from "@captech/ct-react-library";
import CommentList from "./CommentList";
import NewPost from "./NewPost";
import classNames from "classnames/bind";
import * as styles from "./Post.css";
const cn = classNames.bind(styles);

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      isInEditMode: false,
    };
  }

  toggle = () => {
    const { isOpen } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isOpen: !isOpen,
    }));
  };

  toggleEditMode = () => {
    const { isInEditMode } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isInEditMode: !isInEditMode,
    }));
  };

  deletePost = () => {
    const { post, submitPost } = this.props;

    post.isDeleted = true;

    const newPost = {
      postData: post,
    };
    submitPost(newPost);
  };

  submistPostEdit = () => {};

  render() {
    const { isOpen, isInEditMode } = this.state;
    const { post, submitComment, submitPost, userData } = this.props;

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let editDate = new Date(post.dateEdited);
    let postDate = new Date(post.datePosted);

    return (
      <CtToggleSection
        title={post.title}
        speed={500}
        disabled={post.isDeleted}
        handleClick={this.toggle}
        open={isOpen}
      >
        <div className={cn({ postHeader: true })}>
          <Link
            className={cn({ userName: true })}
            to={{
              pathname: `/user/${post.user.userName}`,
              state: {
                userData: post.user,
              },
            }}
          >
            <img
              alt={`avatar for ${post.user.userName}`}
              src={post.user.avatar}
              className={cn({ avatarCircle: true })}
            ></img>
          </Link>
          <Link
            className={cn({ userName: true })}
            to={{
              pathname: `/user/${post.user.userName}`,
              state: {
                userData: post.user,
              },
            }}
          >
            {post.user.userName}
          </Link>
          <span className={cn({ postDate: true })}>
            {`Posted on ${postDate.toLocaleDateString("en-US", options)}`}
          </span>
        </div>
        {post.isEdited && (
          <CtAlert type={"important"}>{`Edited on ${editDate.toLocaleDateString(
            "en-US",
            options
          )}`}</CtAlert>
        )}
        <p>{post.postText}</p>
        {userData.id === post.user.id && (
          <>
            <CtButton iconLeft={"edit"} onClick={this.toggleEditMode}>
              Edit
            </CtButton>
            <CtButton iconLeft={"delete"} onClick={this.deletePost}>
              Delete
            </CtButton>
            {isInEditMode && (
              <NewPost post={post} submit={submitPost} title={"Edit Post"} />
            )}
          </>
        )}

        <CommentList
          comments={post.comments}
          userData={userData}
          submitComment={submitComment}
        />
        <NewPost
          parent={post}
          submit={submitComment}
          title={"Submit New Comment"}
        />
      </CtToggleSection>
    );
  }
}

export default Post;
