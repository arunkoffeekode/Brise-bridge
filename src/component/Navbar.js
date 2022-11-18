import React from "react";
import { Link } from "react-router-dom";
import useMetaMask from "../wallet/hook";
import swap from "../img/brise.png";
import swap1 from "../img/logoicon.png";
function Navbar() {
  const {
    connect,
    disconnect,
    isActive,
    account,
    walletModal,
    handleWalletModal,
  } = useMetaMask();

  return (
    <div>
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand text-brand" to="/">
            <img src="images/logo.png" alt="" />
          </Link>
          <div className="navbar-collapse collapse justify-content-end" id="navbarDefault">
            <ul className="navbar-nav">
              <li>
                <button type="button" className="bitgert-btn"><img src={swap1}></img>Bitgert</button>
              </li>
              <li className="nav-item dropdown ">
                <div class="dropdown">
                  <button class="btn drp dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Stable Coins
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#"> <img src={swap}></img>Binance coin</a>
                    <a class="dropdown-item" href="#"> <img src={swap}></img>Binance coin(BNB)</a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div class="dropdown">
                  <button class="btn drp dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Altcoins
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#"> <img src={swap}></img>Binance coin</a>
                    <a class="dropdown-item" href="#"> <img src={swap}></img>Binance coin(BNB)</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="right-side">
            <ul>
              {/* <li>
                <Link to='/' className="nav-link">
                  <img src={swap}></img>
                  BRISE</Link>
              </li>
              <li>
                <Link to='/usdt' className="nav-link">
                <img src={swap}></img>
                  USDT</Link>
              </li>
              <li>
                <Link to='/usdc' className="nav-link">
                <img src={swap}></img>
                  USDC</Link>
              </li> */}
              {isActive ? (
                <>
                  <li>
                    <a>
                      <div className="nav_loop">
                        <div className="wallet">
                          <svg
                            width="20"
                            height="25"
                            viewBox="0 0 31 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M29.1673 5.91667H30.584V20.0833H29.1673V24.3333C29.1673 24.7091 29.0181 25.0694 28.7524 25.3351C28.4867 25.6007 28.1264 25.75 27.7507 25.75H2.25065C1.87493 25.75 1.51459 25.6007 1.24892 25.3351C0.98324 25.0694 0.833984 24.7091 0.833984 24.3333V1.66667C0.833984 1.29094 0.98324 0.930609 1.24892 0.664932C1.51459 0.399255 1.87493 0.25 2.25065 0.25H27.7507C28.1264 0.25 28.4867 0.399255 28.7524 0.664932C29.0181 0.930609 29.1673 1.29094 29.1673 1.66667V5.91667ZM26.334 20.0833H17.834C15.9554 20.0833 14.1537 19.3371 12.8253 18.0087C11.4969 16.6803 10.7507 14.8786 10.7507 13C10.7507 11.1214 11.4969 9.31971 12.8253 7.99133C14.1537 6.66294 15.9554 5.91667 17.834 5.91667H26.334V3.08333H3.66732V22.9167H26.334V20.0833ZM27.7507 17.25V8.75H17.834C16.7068 8.75 15.6258 9.19777 14.8288 9.9948C14.0317 10.7918 13.584 11.8728 13.584 13C13.584 14.1272 14.0317 15.2082 14.8288 16.0052C15.6258 16.8022 16.7068 17.25 17.834 17.25H27.7507ZM17.834 11.5833H22.084V14.4167H17.834V11.5833Z"
                              fill="#ffffff"
                            />
                          </svg>
                        </div>
                        <div className="popover__content">
                          <div
                            className="product-body"
                            onClick={() => disconnect()}
                          >
                            <button className="color">
                              <div className="left">Disconnect</div>
                              <div className="right">
                                <svg
                                  viewBox="0 0 24 24"
                                  width="20px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ fill: "#ffffff" }}
                                >
                                  <path d="M16.3 8.09014C15.91 8.48014 15.91 9.10014 16.3 9.49014L18.2 11.3901H9C8.45 11.3901 8 11.8401 8 12.3901C8 12.9401 8.45 13.3901 9 13.3901H18.2L16.3 15.2901C15.91 15.6801 15.91 16.3001 16.3 16.6901C16.69 17.0801 17.31 17.0801 17.7 16.6901L21.29 13.1001C21.68 12.7101 21.68 12.0801 21.29 11.6901L17.7 8.09014C17.31 7.70014 16.69 7.70014 16.3 8.09014ZM4 19.3901H11C11.55 19.3901 12 19.8401 12 20.3901C12 20.9401 11.55 21.3901 11 21.3901H4C2.9 21.3901 2 20.4901 2 19.3901V5.39014C2 4.29014 2.9 3.39014 4 3.39014H11C11.55 3.39014 12 3.84014 12 4.39014C12 4.94014 11.55 5.39014 11 5.39014H4V19.3901Z"></path>
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>
                        {account ? (
                          <div className="name">
                            {" "}
                            {account
                              .slice(0, 6)
                              .concat(`...${account.slice(-4)}`)}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {/* <li>
                   <Link to='/transactions' className="nav-link">Transaction</Link>
                   </li> */}
                  <li>
                    <a
                      type="button"
                      className="sr-btn"
                      onClick={() => {
                        handleWalletModal(true);
                      }}
                    >
                      Connect Wallet
                    </a>
                  </li>
                </>
              )}

              <div
                className={`modal ${walletModal ? "show" : ""}`}
                id="myModal"
                style={{
                  display: `${walletModal ? "block" : "none"}`,
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Connect Wallet</h4>
                      <a
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={() => handleWalletModal(false)}
                      >
                        &times;
                      </a>
                    </div>
                    <div className="modal-body">
                      <a
                        type="button"
                        className="btn-connect"
                        onClick={() => connect("metaMask")}
                      >
                        <h1 className="connect">metamask</h1>
                        <img src="images/meta.png" />
                      </a>

                      <a
                        type="button"
                        className="btn-connect"
                        onClick={() => connect("walletConnect")}
                      >
                        <h1 className="connect">Wallet Connect</h1>
                        <img src="images/wallet-connect.png" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
