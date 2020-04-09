import React from "react";
import { userPageData } from "../utils/dataGenerator";
import classNames from "classnames/bind";
import * as styles from "./AccountPage.css";
const cn = classNames.bind(styles);

const AccountPage = (props) => {
  const { location } = props;

  let pageData = {};
  if (location && location.state && location.state.userData) {
    pageData = { userData: location.state.userData };
  } else {
    pageData = userPageData;
    pageData.userData.userName = location.pathname.split("/")[2];
  }

  return (
    <>
      <main>
        <div className={cn({ userContainer: true })}>
          <img
            alt={`avatar for ${pageData.userData.userName}`}
            src={pageData.userData.avatar}
            className={cn({ profileAvatarCircle: true })}
          ></img>
          <div className={cn({ profileInfoContainer: true })}>
            <h1>{pageData.userData.userName}</h1>
            <h3>
              Contact Me: {"\u00A0\u00A0"}
              <a href={`mailto:${pageData.userData.email}`}>
                {pageData.userData.email}
              </a>
            </h3>
            <h3>About Me:</h3>
            <p>{pageData.userData.bio}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountPage;
