import React from "react";
import { v4 } from "uuid";

import classNames from "classnames/bind";
import * as styles from "./NewPost.css";
import {
  CtToggleSection,
  CtInput,
  CtMultiLineInput,
  CtButton,
} from "@captech/ct-react-library";

const cn = classNames.bind(styles);

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isValid: true,
      post: {
        id: v4(),
        title: "",
        postText: "",
        thumbsUp: 0,
        datePosted: Date.now(),
        dateEdited: Date.now(),
        isEdited: false,
        isDeleted: false,
        comments: [],
      },
      comment: {
        id: v4(),
        commentText: "",
        thumbsUp: 0,
        datePosted: Date.now(),
        dateEdited: Date.now(),
        isEdited: false,
        isDeleted: false,
      },
      editingComment: false,
      formInputs: {},
    };

    const { post, comment } = this.props;

    if (post) {
      this.state.post = post;
    }
    if (comment) {
      this.state.comment = comment;
      this.state.editingComment = true;
    }
  }

  toggle = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  };

  handleTitleChange = (event, clear) => {
    const { formInputs } = this.state;

    if (clear) {
      for (const prop in formInputs) {
        formInputs[prop].value = "";
      }
    } else {
      if (event && event.target) {
        formInputs[event.target.localName] = event.target;
      }

      const text = event.target.value;

      this.setState((prevState) => ({
        ...prevState,
        post: {
          ...prevState.post,
          title: text,
        },
      }));
    }
  };

  handleTextChange = (event, clear) => {
    const { parent } = this.props;
    const { editingComment, formInputs } = this.state;

    if (clear) {
      for (const prop in formInputs) {
        formInputs[prop].value = "";
      }
    } else {
      if (event && event.target) {
        formInputs[event.target.localName] = event.target;
      }

      const text = event.target.value;

      if (parent || editingComment) {
        this.setState((prevState) => ({
          ...prevState,
          comment: {
            ...prevState.comment,
            commentText: text,
          },
        }));
      } else {
        this.setState((prevState) => ({
          ...prevState,
          post: {
            ...prevState.post,
            postText: text,
          },
        }));
      }
    }
  };

  handleSubmit = (event) => {
    const { submit, parent } = this.props;
    const { editingComment } = this.state;
    const post = { postData: this.state.post };

    if (
      (!parent &&
        !editingComment &&
        (this.state.post.title.length < 1 ||
          this.state.post.postText.length < 1)) ||
      ((parent || editingComment) && this.state.comment.commentText.length < 1)
    ) {
      this.setState((prevState) => ({
        ...prevState,
        isValid: false,
      }));
    } else {
      if (parent) {
        submit(this.state.comment, parent);
        this.handleTextChange(null, true);
      } else if (editingComment) {
        this.setState(
          (prevState) => ({
            ...prevState,
            comment: {
              ...prevState.comment,
              isEdited: true,
              dateEdited: Date.now(),
            },
          }),
          () => submit(this.state.comment, parent)
        );
      } else {
        submit(post);
        this.handleTextChange(null, true);
        this.handleTitleChange(null, true);
      }
    }
  };

  render() {
    const { parent, title } = this.props;
    const { isOpen, editingComment } = this.state;
    return (
      <div className={cn({ newPost: true })}>
        <CtToggleSection
          title={title}
          speed={500}
          handleClick={this.toggle}
          open={isOpen}
        >
          <form>
            {!parent && !editingComment && (
              <CtInput
                required={true}
                ref={this.titleInput}
                onChange={this.handleTitleChange}
                label="Post Title"
              />
            )}
            <CtMultiLineInput
              required={true}
              ref={this.textInput}
              onChange={this.handleTextChange}
              label={`${parent ? "Comment" : "Post"} body`}
            />
            <CtButton primary={true} onClick={this.handleSubmit}>
              Submit
            </CtButton>
          </form>
        </CtToggleSection>
      </div>
    );
  }
}

export default NewPost;
