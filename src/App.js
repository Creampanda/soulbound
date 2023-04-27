import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
          let signer = provider.getSigner(accounts[0]);
          console.log(signer);
          //Создаем объект контракта
        });
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Request account</button>
        <h3>Wallet Addres: {walletAddress}</h3>
        <button onClick={connectWallet}>Connect Wallet</button>
      </header>
    </div>
  );
}

export default App;
