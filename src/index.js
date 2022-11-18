import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import { MetaMaskProvider } from "./wallet/hook";
function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetaMaskProvider>
          <App />
        </MetaMaskProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
