import web3 from "../web3"
import VoteGovernor from "../abis/VoteGovernor.json"


let instance = null;
const data = VoteGovernor.networks['5777']
if(tokenData) {
    instance = new web3.eth.Contract(
        VoteGovernor.abi,
        data.address
    )
}else{
    window.alert('Token contract not deployed to detected network');
}


export  var  voteGovernor = instance
export var voteGovernorAddress = data.address