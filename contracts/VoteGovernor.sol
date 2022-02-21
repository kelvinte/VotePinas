// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "./VoteToken.sol";

contract VoteGovernor  {
    VoteToken public voteToken;

    address public deployer;

    mapping(bytes32 => uint256) public presidentialCandidates;
    mapping(bytes32 => uint256) public vicePresidentialCandidates;
    mapping(bytes32 => uint256) public senatorialCandidates;

    mapping(bytes32 => mapping(address => bool)) public presidentialVotesReceived;
    mapping(bytes32 => mapping(address => bool)) public vicePresidentialVotesReceived;
    mapping(bytes32 => mapping(address => bool)) public senatorialVotesReceived;

    mapping(address => uint8) issuedToken;


    constructor(){
        deployer = msg.sender;
    }

    event Vote(
        address from,
        address to,
        uint256 tokenId
    );

    modifier onlyOwner() {
        require(deployer == msg.sender, "caller is not the owner ");
        _;
    }

    function setPresidentialCandidates(bytes32[] memory candidateList) public onlyOwner {
        for (uint16 i =0;i<candidateList.length ; i++){
            presidentialCandidates[candidateList[i]] = 1;//Deduct 1 when tallying
        }
    }
    function setVicePresidentialCandidates(bytes32[] memory candidateList) public onlyOwner {
        for (uint16 i =0;i<candidateList.length ; i++){
            vicePresidentialCandidates[candidateList[i]] = 1;//Deduct 1 when tallying
        }
    }
    function setSenatorialCandidates(bytes32[] memory candidateList) public onlyOwner {
        for (uint16 i =0;i<candidateList.length ; i++){
            senatorialCandidates[candidateList[i]] = 1;//Deduct 1 when tallying
        }
    }



    // Contract Deployer will be the only one to issue token
    function issueToken(address to) public onlyOwner{
        require(issuedToken[to] < 14, "you have been issued 14 token already");
        for ( uint8 i = 0 ; i<14; i++){
            voteToken.safeMint(to);
            issuedToken[to]++;
        }
    }

    function votePresident(bytes32 name) public payable
    {
        require(presidentialCandidates[name] >0, "your choice is not a candidate");
        require(voteToken.balanceOf(msg.sender)>0, "You don't have any vote credits");
        require(!presidentialVotesReceived[name][msg.sender], "You have already voted this candidate");
        presidentialVotesReceived[name][msg.sender] = true;
        presidentialCandidates[name]++;
        burnToken();
    }

    function voteVicePresident(bytes32 name) public payable
    {
        require(vicePresidentialCandidates[name] >0, "your choice is not a candidate");
        require(voteToken.balanceOf(msg.sender)>0, "You don't have any vote credits");
        require(!vicePresidentialVotesReceived[name][msg.sender], "You have already voted this candidate");
        vicePresidentialVotesReceived[name][msg.sender] = true;
        vicePresidentialCandidates[name]++;
        burnToken();
    }
    function voteSenator(bytes32 name) public payable
    {
        require(senatorialCandidates[name] >0, "your choice is not a candidate");
        require(voteToken.balanceOf(msg.sender)>0, "You don't have any vote credits");
        require(!senatorialVotesReceived[name][msg.sender], "You have already voted this candidate");
        senatorialVotesReceived[name][msg.sender] = true;
        senatorialCandidates[name]++;
        burnToken();
    }

     function  burnToken() private {
        uint256 tokenId = voteToken.tokenOfOwnerByIndex(msg.sender,0);
         emit Vote(msg.sender, address(this), tokenId);
        voteToken.burn(tokenId);
    }



}