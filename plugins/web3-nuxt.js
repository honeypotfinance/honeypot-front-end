import { ethers } from "ethers";
import Web3Modal from "web3modal";

import WalletConnect from "@walletconnect/web3-provider";

export default async function() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnect,
      options: {
        rpc: "https://matic-mainnet.chainstacklabs.com",
        infuraId: process.env.INFURA_KEY 
      }
    },
  },
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  }),
  instance = await web3Modal.connect(),
  provider = new ethers.providers.Web3Provider(instance);
  
  return provider.getSigner()
}
