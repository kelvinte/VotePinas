import web3 from "../web3"
import VoteToken from "../abis/VoteToken.json"


let instance = null;
const tokenData = VoteToken.networks['5777']
if(tokenData) {
    instance = new web3.eth.Contract(
        VoteToken.abi,
        tokenData.address
    )
}else{
    window.alert('Token contract not deployed to detected network');
}


export  var  voteToken = instance
export var voteTokenAddress = tokenData.address