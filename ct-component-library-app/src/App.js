import React from "react";
import * as styles from "./App.css";

import classNames from "classnames/bind";

import { CtButton, CtAlert, CtInput } from "@captech/ct-react-library";

const cn = classNames.bind(styles);

function App() {
  return (
    <div className="app">
      <div>
        <p className={cn({ header: true })}>
          CapTech Component Library Documentation (accessible on CapTech Network
          or VPN): <br></br>
          <a
            className={cn({ link: true })}
            href="http://si.captech.site/ct-react-library/"
          >
            http://si.captech.site/ct-react-library/
          </a>
        </p>
      </div>
      <div>
        <p className={cn({ header: true })}>
          Please provide feedback on your experience by filling out{" "}
          <a
            className={cn({ link: true })}
            href="https://teams.microsoft.com/_?tenantId=ae9d6e9a-cc18-4204-ac29-43a0ccb860e8#/tab::c58eadc6-6a68-43bd-95fb-112c48ebaed7/Component%20Library%20Feedback?threadId=19:df9128676cd640eea561ed01e0528bff@thread.skype&ctx=channel"
          >
            this Component Usability Feedback survey on Teams
          </a>{" "}
          and also please feel free to post any feedback in{" "}
          <a
            className={cn({ link: true })}
            href="https://teams.microsoft.com/l/channel/19%3adf9128676cd640eea561ed01e0528bff%40thread.skype/Component%2520Library%2520Feedback?groupId=cc19cb29-06a2-48e4-adcc-b6e4a8fe7dfa&tenantId=ae9d6e9a-cc18-4204-ac29-43a0ccb860e8"
          >
            the Component Usability Teams channel
          </a>
          .
        </p>
      </div>
      <p className={cn({ header: true })}>
        <b> Sample components: </b>
      </p>
      <div>
        <div className={cn({ row: true, alert: true })}>
          <CtAlert type={"success"}>Success</CtAlert>
        </div>
      </div>
      <div>
        <div className={cn({ row: true, textInput: true })}>
          <CtInput
            readOnly={false}
            disabled={false}
            success={false}
            error={false}
            required={false}
            label="Label"
            placeholder="Placeholder"
            caption="Caption"
          />
        </div>
      </div>
      <div>
        <div className={cn({ row: true, button: true })}>
          <CtButton
            primary={true}
            disabled={false}
            disabledLight={false}
            large={false}
            small={false}
          >
            Button
          </CtButton>
        </div>
      </div>
    </div>
  );
}

export default App;
