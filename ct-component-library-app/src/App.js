import React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import { CtResponsiveNav, CtHeader } from "@captech/ct-react-library";
import classNames from "classnames/bind";
import FrontPage from "./routes/FrontPage";
import AccountPage from "./routes/AccountPage";
import { frontPageData } from "./utils/dataGenerator";

import * as styles from "./App.css";

const cn = classNames.bind(styles);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = frontPageData;
  }
  render() {
    const HydratedFrontpage = (props) => {
      return (
        <FrontPage
          {...props}
          frontPageData={this.state}
          submitComment={this.submitComment}
          submitPost={this.submitPost}
        />
      );
    };

    return (
      <div className="app">
        <BrowserRouter>
          <header>
            <CtHeader>
              <CtResponsiveNav bp="(min-width: 850px)">
                <a href="https://captechconsulting.com/">
                  <img
                    src="/captech.png"
                    alt="CapTech Logo"
                    className={cn({ logo: true })}
                  ></img>
                </a>
                <Link to="/">Home</Link>
                <Link
                  to={{
                    pathname: `/user/${frontPageData.userData.userName}`,
                    state: {
                      userData: frontPageData.userData,
                    },
                  }}
                >
                  My Account
                </Link>
              </CtResponsiveNav>
            </CtHeader>
          </header>
          <Switch>
            <Route path="/user/:userName" component={AccountPage} />
            <Route path="/" render={HydratedFrontpage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  submitComment = (comment, parent) => {
    const { userData } = this.state;
    comment.user = userData;

    let postIndex = -1;
    if (parent) {
      postIndex = this.state.posts.findIndex(
        (x) => x.postData.id === parent.id
      );
    } else {
      let parentId = -1;
      this.state.posts.forEach((x) => {
        if (x.postData.comments) {
          x.postData.comments.forEach((c) => {
            if (c.id === comment.id) {
              parentId = x.postData.id;
            }
          });
        }
      });
      postIndex = this.state.posts.findIndex((x) => x.postData.id === parentId);
    }

    if (postIndex < 0) {
      console.error("error");
    } else {
      let commentIndex = this.state.posts[
        postIndex
      ].postData.comments.findIndex((x) => x.id === comment.id);
      let newPost = this.state.posts[postIndex];

      if (commentIndex < 0) {
        newPost.postData.comments.push(comment);
      } else if (comment.isDeleted) {
        newPost.comments = newPost.postData.comments.splice(commentIndex);
      } else {
        newPost.postData.comments[commentIndex] = comment;
      }
      this.setState((prevState) => ({
        ...prevState,
        posts: [
          ...prevState.posts.slice(0, postIndex),
          newPost,
          ...prevState.posts.slice(postIndex + 1),
        ],
      }));
    }
  };

  submitPost = (post) => {
    const { userData } = this.state;
    post.postData.user = userData;

    let postIndex = this.state.posts.findIndex(
      (x) => x.postData.id === post.postData.id
    );

    if (post.postData.isDeleted) {
      this.setState((prevState) => ({
        ...prevState,
        posts: [
          ...prevState.posts.slice(0, postIndex),
          ...prevState.posts.slice(postIndex + 1),
        ],
      }));
    } else {
      if (postIndex < 0) {
        this.setState((prevState) => ({
          ...prevState,
          posts: [post, ...prevState.posts],
        }));
      } else {
        post.postData.isEdited = true;
        this.setState((prevState) => ({
          ...prevState,
          posts: [
            ...prevState.posts.slice(0, postIndex),
            post,
            ...prevState.posts.slice(postIndex + 1),
          ],
        }));
      }
    }
  };
}

export default App;
