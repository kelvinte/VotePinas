const VoteGovernor = artifacts.require("VoteGovernor");
const web3 = require('web3');


module.exports = async function (deployer) {
    await deployer.deploy(VoteGovernor);
};
