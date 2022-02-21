import MainPane from "../components/MainPane";
import {Component} from "react";
import {Alert} from "react-bootstrap";
import {voteToken, voteTokenAddress} from "../ethereum/votetoken";
import {voteGovernor, voteGovernorAddress} from "../ethereum/votegovernor";
import web3 from '../web3';

class Purchase extends Component{
    state = {
        tokens: 0
    }

    purchase = async () =>{
        await web3.met
        // const accounts = await web3.eth.getAccounts()
        // const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest'); //get latest nonce
        // const tx = {
        //     'from': accounts,
        //     'to': voteTokenAddress,
        //     'nonce': nonce,
        //     'gas': 500000,
        //     'data': voteToken.methods.safeMint(PUBLIC_KEY).encodeABI()
        // };



    }

    render() {
        return (
            <MainPane>
                <h1>Purchase Token</h1>
                <Alert variant="info">
                    In theory the commission on election should be the one responsible in funding the accounts of voters
                </Alert>
                You have {this.state.tokens} tokens<br/>
                <button type="submit" onClick={this.purchase} className="btn btn-primary btn-sm">Buy Token</button>

            </MainPane>
        )
    }
}
export default Purchase;