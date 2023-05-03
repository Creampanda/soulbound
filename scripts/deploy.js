const { ethers, run, network } = require("hardhat");

async function main() {
  const SoulboundTokenFactory = await ethers.getContractFactory("SoulboundToken");
  console.log("Deploying contract...");
  const contractName = "Soulbound";
  const soulboundToken = await SoulboundTokenFactory.deploy(contractName);
  await soulboundToken.deployed();
  console.log(`Deployed contract to: ${soulboundToken.address}`);
  // console.log(network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await soulboundToken.deployTransaction.wait(6);
    await verify(soulboundToken.address, [contractName]);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("Already verified")) {
      console.log("Already verified");
    } else {
      console.log(error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
