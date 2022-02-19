const VoteGovernor = artifacts.require("VoteGovernor");
const VoteToken = artifacts.require("VoteToken");
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('VoteGovernor',([deployer, voter1, voter2]) => {
    let governor;
    let token;
    let tokenAddress;
    before(async () => {
        governor = await VoteGovernor.new();

    })
    describe("VoteGovernor deployment", async()=>{
        it('has deployed votetoken', async()=>{
            tokenAddress = await governor.voteToken();
            assert.ok(tokenAddress);
            assert.ok(governor.address);

        })
        it('has a deployer', async()=>{
            const address = await governor.deployer()
            assert.equal(address , deployer)
        })
        it('can set candidates', async()=>{
            const presCandidates = [
                web3.utils.fromAscii("a"),
                web3.utils.fromAscii("b"),
                web3.utils.fromAscii("c")
            ]

            await governor.setPresidentialCandidates(presCandidates);
            const vpCandidates = [
                web3.utils.fromAscii("vp1"),
                web3.utils.fromAscii("vp2"),
                web3.utils.fromAscii("vp3")
            ]
            await governor.setVicePresidentialCandidates(vpCandidates);
            const senatorialCandidaes = [

                web3.utils.fromAscii("s1"),
                web3.utils.fromAscii("s2"),
                web3.utils.fromAscii("s3"),
                web3.utils.fromAscii("s4"),
                web3.utils.fromAscii("s5"),
                web3.utils.fromAscii("s6"),
                web3.utils.fromAscii("s7"),
                web3.utils.fromAscii("s8"),
                web3.utils.fromAscii("s9"),
                web3.utils.fromAscii("s10"),
                web3.utils.fromAscii("s11"),
                web3.utils.fromAscii("s12"),
                web3.utils.fromAscii("s13"),
                web3.utils.fromAscii("s14"),
                web3.utils.fromAscii("s15"),
            ]

            await governor.setSenatorialCandidates(senatorialCandidaes);
        })
        it('has candidates' , async()=>{
            let countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("a"));
            assert.ok(countOfVotes >0);
            countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("b"));
            assert.ok(countOfVotes > 0);
            countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("c"));
            assert.ok(countOfVotes > 0);
            countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("d"));
            assert.ok(countOfVotes <1);
        })
    })
    describe('Issue token', async()=>{
        before(async()=>{

            token = await VoteToken.at(tokenAddress)
        });
        it('can issue token', async ()=>{
            await governor.issueToken(voter1);
            const balance = await token.balanceOf(voter1);
            assert.equal(balance.toString(), "14")
            await governor.issueToken(voter2);
            balance2 = await token.balanceOf(voter2);
            assert.equal(balance2.toString(), "14")

        })
        it('cannot issue token if other people called the method', async()=>{

            let thrownError =false;
            try {
                let governorHacked = new web3.eth.Contract(VoteGovernor.abi, governor.address);
                await governorHacked.methods.issueToken(voter2).send({
                    from: voter1,
                    gas: '1000000'
                })
            }catch (err){
                thrownError = true;
            }
            assert.ok(thrownError);
        })
        it('cannot double issue token', async()=>{
            let thrownError =false;
            try {
                await governor.issueToken(voter1);
            }catch (err){
                thrownError= true;
            }
            assert.ok(thrownError);
            const balance = await token.balanceOf(voter1);
            assert.equal(balance.toString(), "14")

        })
    })
    describe("Voting", async()=>{
        it('voters can vote president',async()=>{
            const tokenId = await token.tokenOfOwnerByIndex(voter1,0);

            assert.ok(tokenId);

            await token.approve(governor.address, tokenId, {from: voter1});

            let governorVote = new web3.eth.Contract(VoteGovernor.abi, governor.address);

            await governorVote.methods.votePresident(web3.utils.fromAscii("a")).send(
                {
                    from: voter1,
                    gas: '1000000'
                }
            )

            let countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("a"));
            assert.equal(2, countOfVotes);

            let countOfTokenLeft = await token.balanceOf(voter1);
            assert.equal(countOfTokenLeft.toString(),"13");



        })
        it('voters can vote vp',async()=>{

            const tokenId = await token.tokenOfOwnerByIndex(voter1,0);
            assert.ok(tokenId);


            await token.approve(governor.address, tokenId, {from: voter1});

            let governorVote = new web3.eth.Contract(VoteGovernor.abi, governor.address);

            await governorVote.methods.voteVicePresident(web3.utils.fromAscii("vp1")).send(
                {
                    from: voter1,
                    gas: '1000000'
                }
            )

            let countOfVotes = await governor.vicePresidentialCandidates(web3.utils.fromAscii("vp1"));
            assert.equal(2, countOfVotes);

            let countOfTokenLeft = await token.balanceOf(voter1);
            assert.equal(countOfTokenLeft.toString(),"12");
        })

        it('voters cannot double vote',async()=>{
            const tokenId = await token.tokenOfOwnerByIndex(voter1,0);
            assert.ok(tokenId);

            let thrownError =false;
            try {
                await token.approve(governor.address, tokenId, {from: voter1});

                let governorVote = new web3.eth.Contract(VoteGovernor.abi, governor.address);

                await governorVote.methods.votePresident(web3.utils.fromAscii("a")).send(
                    {
                        from: voter1,
                        gas: '1000000'
                    }
                )
            }catch (err){
                thrownError = true;
            }
            assert.ok(thrownError);

            let countOfVotes = await governor.presidentialCandidates(web3.utils.fromAscii("a"));
            assert.equal(2, countOfVotes);

        })
        it('voters without token cannot vote', async()=>{


            let tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            let governorVote = new web3.eth.Contract(VoteGovernor.abi, governor.address);
            await governorVote.methods.votePresident(web3.utils.fromAscii("a")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )

            tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteVicePresident(web3.utils.fromAscii("vp1")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen1
            tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s1")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen2
            tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s2")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen3
            tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s3")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen4
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s4")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen5
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s5")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen6
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s6")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen7
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s7")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen8
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s8")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen9
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s9")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen10
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s10")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen11
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s11")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )

            // Sen12
             tokenId = await token.tokenOfOwnerByIndex(voter2,0);
            await token.approve(governor.address, tokenId, {from: voter2});
            await governorVote.methods.voteSenator(web3.utils.fromAscii("s12")).send(
                {
                    from: voter2,
                    gas: '1000000'
                }
            )
            // Sen13 - should error
            let shouldThrowErr = false;
            try{
                 tokenId = await token.tokenOfOwnerByIndex(voter2,0);
                 await token.approve(governor.address, tokenId, {from: voter2});
                await governorVote.methods.voteSenator(web3.utils.fromAscii("s12")).send(
                    {
                        from: voter2,
                        gas: '1000000'
                    }
                )
            }catch (err){
                shouldThrowErr = true;
            }
            assert.ok(shouldThrowErr);


            let countOfTokenLeft = await token.balanceOf(voter2);
            assert.equal(countOfTokenLeft.toString(),"0");


        })
    })
})