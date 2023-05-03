import { ethers } from "./ethers.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const mintButton = document.getElementById("mintButton");
const getSoulButton = document.getElementById("getSoulButton");
getSoulButton.onclick = getSoul;
connectButton.onclick = connect;
mintButton.onclick = mintSoul;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerHTML = "Connected!";
    console.log("Connected metamask!");
  } else {
    connectButton.innerHTML = "Pls install metamask";
  }
}

async function mintSoul() {
  if (typeof window.ethereum !== "undefined") {
    // provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer / wallet
    const signer = provider.getSigner();
    console.log(signer);
    // contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.mint(signer.getAddress(), [
      "aaaa",
    ]);
    console.log(`Minting soul for ${signer.getAddress()}...`);
  }
}

async function getSoul() {
  if (typeof window.ethereum !== "undefined") {
    // provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer / wallet
    const signer = provider.getSigner();
    console.log(signer);
    // contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transactionResponse = await contract.getSoul(signer.getAddress());
    console.log(transactionResponse);
  }
}
