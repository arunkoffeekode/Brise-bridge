import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected, walletConnect } from "./connector";
import { useWeb3React } from "@web3-react/core";

import BNB_LOGO from "../img/icon.png";
import BRISE_LOGO from "../img/logoicon.png";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, active, chainId, deactivate } =
    useWeb3React();

  const [network, setNetwork] = useState([
    {
      name: "BSC",
      symbol: "BRISE (binance smart chain)",
      logo: BRISE_LOGO,
      usdtsymbol: "USDT (binance smart chain)",
      usdcsymbol: "USDC (binance smart chain)",
      usdcLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      usdtLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      // chainId: "0x38",
      // RPC_URL: "https://bsc-dataseed1.binance.org/",
      RPC_URL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: "0x61",
      tokenAddress: process.env.REACT_APP_BSC_TOKEN,
      usdtTokenAddress: process.env.REACT_APP_BSC_USDT_TOKEN,
      usdcTokenAddress: process.env.REACT_APP_BSC_USDC_TOKEN,
      bridgeAddress: process.env.REACT_APP_BSC_BRIDGE,
      usdtAddress: process.env.REACT_APP_BSC_USDT_BRIDGE,
      usdcAddress: process.env.REACT_APP_BSC_USDC_BRIDGE,
      pow: Math.pow(10, 9),
    },
    {
      name: "Brise Chain",
      symbol: "BRISE (mainnet)",
      logo: BRISE_LOGO,
      usdtsymbol: "USDT (Brise Chain)",
      usdcsymbol: "USDC (Brise Chain)",
      usdcLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      usdtLogo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      // chainId: "0x7F08",
      // RPC_URL: "https://mainnet-rpc.brisescan.com/",
      chainId: "0xFC9C",
      RPC_URL: "https://testnet-rpc.brisescan.com",
      tokenAddress: "",
      usdtTokenAddress: process.env.REACT_APP_BRISE_USDT_TOKEN,
      usdcTokenAddress: process.env.REACT_APP_BRISE_USDC_TOKEN,
      bridgeAddress: process.env.REACT_APP_BRISE_BRIDGE,
      usdtAddress: process.env.REACT_APP_BRISE_USDT_BRIDGE,
      usdcAddress: process.env.REACT_APP_BRISE_USDC_BRIDGE,
      pow: Math.pow(10, 18),
    },
  ]);

  const [isActive, setIsActive] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(true);
  const [providerType, setProviderType] = useState("");

  async function fetchData() {
    var providerType = await localStorage.getItem("providerType");
    var isConnected = await localStorage.getItem("isConnected");
    setProviderType(await localStorage.getItem("providerType"));
    if (isConnected) {
      connect(providerType).then((val) => {
        setIsLoading(false);
      });
    }
  }
  // Init Loading
  useEffect(() => {
    fetchData();
  }, []);

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  const handleWalletModal = async (state) => {
    setWalletModal(state);
  };

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async (providerType) => {
    setShouldDisable(true);
    try {
      if (providerType === "metaMask") {
        await activate(injected).then(() => {
          localStorage.setItem("providerType", "metaMask");
          localStorage.setItem("isConnected", true);
          setProviderType("metaMask");
          setShouldDisable(false);
        });
      } else if (providerType === "walletConnect") {
        await activate(walletConnect).then(() => {
          localStorage.setItem("providerType", "walletConnect");
          localStorage.setItem("isConnected", true);
          setProviderType("walletConnect");
          setShouldDisable(false);
        });
      } else {
      }
      setWalletModal(false);
    } catch (error) {
      console.log("Error on connecting: ", error);
      setShouldDisable(false);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    try {
      await deactivate();
      await localStorage.removeItem("isConnected");
      await localStorage.removeItem("providerType");
      window.location.reload();
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      chainId,
      account,
      isLoading,
      walletModal,
      handleWalletModal,
      connect,
      disconnect,
      library,
      shouldDisable,
      network,
      setNetwork,
      providerType,
    }),
    [
      isActive,
      chainId,
      isLoading,
      shouldDisable,
      account,
      walletModal,
      network,
      providerType,
    ]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
