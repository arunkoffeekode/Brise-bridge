import React, { useEffect, useState } from "react";
import useMetaMask from "../wallet/hook";
import { Link } from "react-router-dom";
import swap from "../img/swap.png";
// import google from "../img/google-play.png";
// import store from "../img/app-store.png";
// import code from "../img/code.png";

import { HalfMalf } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

import { toast } from "react-toastify";

import Web3 from "web3";
import axios from "axios";

import TOKEN from "../abi/Token.json";
import BRIDGE from "../abi/USDT_USDC.json";

function Usdt() {
  const {
    isActive,
    account,
    library,
    handleWalletModal,
    network,
    setNetwork,
    chainId,
    providerType,
  } = useMetaMask();

  const percentage = parseFloat(process.env.REACT_APP_PERCENTAGE);
  var API_URL = process.env.REACT_APP_API_URL;

  const [swapAmount, setSwapAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [allowance, setAllowance] = useState(false);
  const [swapTime, setSwapTime] = useState(false);

  const notify = (isError, msg) => {
    if (isError) {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const approve = async () => {
    setLoading(true);
    try {
      var contract = new library.eth.Contract(TOKEN, network[0].usdtTokenAddress);
      var Router = network[0].usdtAddress;

      var amountIn = 10 ** 69;
      amountIn = amountIn.toLocaleString("fullwide", { useGrouping: false });

      await contract.methods
        .approve(Router, amountIn.toString())
        .send({ from: account })
        .then(async () => {
          await loadUserData();
          notify(false, "enable token successfully");
          setAllowance(false);
          setLoading(false);
        });
    } catch (err) {
      notify(true, err.message);
    }
  };

  const swapBalance = async () => {
    setLoading(true);
    setSwapLoading(true);

    var amount = swapAmount * Math.pow(10,18);
    amount = amount.toLocaleString("fullwide", { useGrouping: false });
    var BN = library.utils.BN;
    var amountIn = new BN(amount.toString());

    try {
      if (network[0].name === "BSC") {
        var bridgeContract = new library.eth.Contract(BRIDGE, network[0].usdtAddress);

        await bridgeContract.methods
          .swap(amountIn.toString())
          .send({ from: account })
          .then(async (result) => {
            await axios
              .post(`${API_URL}swapUsdt`, {
                type: network[0].name,
                hash: result.transactionHash,
                account: account
              })
              .then(function (response) {
                if (response.status === false) {
                  notify(true, response.error);
                } else {
                  notify(
                    false,
                    `Transaction successful, Please check your wallet.`
                  );
                }
                setSwapAmount("");
                setOutputAmount("");
                loadUserData();
              })
              .catch(function (err) {
                notify(true, err.message);
              });
          });
      } else {
        var bridgeContract = new library.eth.Contract(BRIDGE,network[0].usdtAddress);

        await bridgeContract.methods
          .swap(amountIn.toString())
          .send({ from: account })
          .then(async (result) => {
            await axios
              .post(`${API_URL}swapUsdt`, {
                type: network[0].name,
                hash: result.transactionHash,
                account: account
              })
              .then(function (response) {
                if (response.status === false) {
                  notify(true, response.error);
                } else {
                  notify(
                    false,
                    `Transaction successful, Please check your wallet.`
                  );
                }
                setSwapAmount("");
                setSwapTime(0);
                setOutputAmount("");
                loadUserData();
              })
              .catch(function (err) {
                notify(true, err.message);
              });
          });
      }
      setSwapTime(false);
      setLoading(false);
      setSwapLoading(false);
    } catch (err) {
      if (err.message !== "MetaMask Tx Signature: User denied transaction signature.") {
        if (!swapTime) {
          setSwapTime(true);
          setTimeout(() => {
            swapBalance();
          }, 1000);
        } else {
          notify(true, err.message);
          setSwapLoading(false);
          setLoading(false);
        }
      } else {
        notify(true, err.message);
        setSwapLoading(false);
        setLoading(false);
      }
    }
  };

  const loadUserData = async () => {
    setLoading(true);

    // if (network[0].name === "BSC") {
      // const web3 = new Web3(n  etwork[0].RPC_URL);
      var token = new library.eth.Contract(TOKEN, network[0].usdtTokenAddress);

      var getAllowance = await token.methods
        .allowance(account, network[0].usdtAddress)
        .call();

      if (getAllowance <= 2) {
        setAllowance(true);
      }
    // } else {
    //   setAllowance(false);
    // }

    setLoading(false);
  };

  const switchNetwork = async (mode, provider) => {
    setLoading(true);

    if (provider === "metaMask") {
      var net = network;
      if (!mode) {
        net = network.reverse();
        setNetwork(net);
      }
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net[0].chainId }], // chainId must be in hexadecimal numbers
      });
    } else {
      var net = network;
      if (network[0].name === "BSC" && chainId === 32520) {
        net = network.reverse();
      }
      setNetwork(net);
    }
    if (isActive) {
      loadUserData();
    }
  };

  useEffect(() => {
    if (isActive) {
      loadUserData();
      switchNetwork(true, providerType);
    }
  }, [isActive, account, chainId]);

  return (
    <div>
      <div className="stack-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 col-xl-5">
              <div className="app">
                <h3>
                  SWAP YOUR USDC IN <br />
                  ONE GO!
                </h3>
                <p>
                  If you experience transaction failure or swap issues, Please goto "Transactions History" and check the status, If shown fail, then click "Retry", If the issue is not resolved after above mentioned solution, please feel free to contact us at support@bitgert.com
                </p>

              </div>
            </div>
            <div className="col-md-12 col-lg-7 col-sm-12 col-xl-7">
              <div className="checkout-form-centre">
                <div className="checkout-login-step">
                  <div className="head">
                    <h2>USDC Bridge</h2>
                    <Link to='/usdcTx' className="button2">
                      <i class="fa fa-history" aria-hidden="true"></i>
                    </Link>
                  </div>
                  <div className="box-section">
                    <div className="balence">
                      <button type="button">
                        <div>
                          <div className="round">
                            <div className="box">
                              <p>You Send</p>
                              <input
                                type="number"
                                placeholder="0.0000"
                                value={swapAmount}
                                disabled={loading}
                                onChange={(e) => {
                                  setSwapAmount(parseFloat(e.target.value));

                                  if (percentage === 0) {
                                    var amt = 0;
                                  } else {
                                    var amt =
                                      parseFloat(e.target.value) *
                                      (percentage / 100);
                                  }
                                  setOutputAmount(
                                    parseFloat(e.target.value) - amt
                                  );
                                }}
                              ></input>
                              <div className="icon">
                                <img src={network[0].usdcLogo} alt="" />
                                {/* <span>{network[0].usdcsymbol}</span> */}
                                <div class="btn-group">
                                  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Right-aligned menu
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">Action</button>
                                    <button class="dropdown-item" type="button">Another action</button>
                                    <button class="dropdown-item" type="button">Something else here</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>

                      <div className="font-icon">
                        <h4>
                          1 USDC ={" "}
                          {percentage === 0 ? 1 : 1 - 1 * (percentage / 100)}{" "}
                        </h4>
                        <div
                          className="round12"
                          onClick={() => switchNetwork(false, providerType)}
                        >
                          <img src={swap} alt="" />
                        </div>
                      </div>

                      <button type="button">
                        <div>
                          <div className="round">
                            <div className="box">
                              <p>You Receive</p>
                              <input
                                type="number"
                                placeholder="0.0000"
                                value={outputAmount}
                                readOnly
                              ></input>
                              <div className="icon">
                                <img src={network[1].usdcLogo} alt="" />
                                {/* <span>{network[1].usdcsymbol}</span> */}
                                <div class="btn-group">
                                  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Right-aligned menu
                                  </button>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">Action</button>
                                    <button class="dropdown-item" type="button">Another action</button>
                                    <button class="dropdown-item" type="button">Something else here</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div
                    className="box-section"
                    style={{
                      background: "none",
                      padding: "0px",
                      border: "0px",
                    }}
                  >
                    <div className="balence">
                      <button type="button">
                        <div className="sr-btn-wrap">
                          {isActive ? (
                            allowance ? (
                              <button
                                type="button"
                                className="sr-btn-2"
                                onClick={() => approve()}
                                disabled={loading}
                              >
                                {loading ? "Please wait, Loading.." : "Enable"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="sr-btn-2"
                                onClick={() => swapBalance()}
                                disabled={loading}
                              >
                                {loading ? "Please wait, Loading.." : "Swap"}
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              className="sr-btn-2"
                              onClick={() => handleWalletModal(true)}
                            >
                              Connect Wallet
                            </button>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal ${swapLoading ? "show" : ""}`}
        id="myModal"
        style={{
          display: `${swapLoading ? "block" : "none"}`,
        }}
      >
        <HalfMalf
          text={
            "Do not close or refresh this window while processing the transaction."
          }
          bgColor={"#ffff"}
          width={"250px"}
          height={"250px"}
          center={true}
        />
      </div>
    </div>
  );
}

export default Usdt;