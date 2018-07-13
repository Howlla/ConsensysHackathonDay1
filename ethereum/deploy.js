const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledAuthority = require('./build/AuthorityContract.json');
// const compiledFactory = './build/PrescriptionFactory.json';
// const compiledPrescription = './build/Prescription.json';

//CURRENTLY DEPLOYED TO 0x1e61c176e9bC1438aB18d155FEB092dD5d8C7Cda

const provider = new HDWalletProvider(
    'praise wolf enhance skill zone laptop adapt upgrade often obey dilemma degree',
    'https://rinkeby.infura.io/LbatmIOh6BM4PEpBearb'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from',accounts[0]);
    const result = await new web3.eth.Contract(
      JSON.parse(compiledAuthority.interface))
        .deploy({data: '0x'+compiledAuthority.bytecode})
        .send({ gas:'3000000', from: accounts[0] });
    console.log('Contract deployed to',result.options.address);
};

deploy();
