import React from "react";
import * as styles from "./App.css";

import classNames from "classnames/bind";

import { CtButton, CtAlert, CtInput } from "@captech/ct-react-library";

const cn = classNames.bind(styles);

function App() {
  return (
    <div className="App">
      <div>
        <p className={cn({ header: true })}>
          CapTech Component Library Documentation (accessible on CapTech Network
          or VPN):{" "}
          <a
            className={cn({ link: true })}
            href="http://si.captech.site/ct-react-library/?"
          >
            http://si.captech.site/ct-react-library/?
          </a>
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
