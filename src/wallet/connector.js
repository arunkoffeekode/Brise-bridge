import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [56, 32520, 97, 64668],
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    56: "https://bsc-dataseed1.binance.org/",
    32520: "https://mainnet-rpc.brisescan.com/",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 12000,
});
