const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledAuthority = require('../ethereum/build/AuthorityContract.json');
const compiledFactory = require('../ethereum/build/PrescriptionFactory.json');
const compiledPrescription = require('../ethereum/build/Prescription.json');

let accounts;
let factory;
let authority;
let factoryAddress;
let prescription;
let prescriptionAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  authority = await new web3.eth.Contract(JSON.parse(compiledAuthority.interface))
    .deploy({ data: compiledAuthority.bytecode })
    .send({ from: accounts[0], gas: '3000000' });

  await authority.methods.addDoctor(accounts[1]).send({
    from: accounts[0],
    gas: '1000000'
  });

  factoryAddress = await authority.methods.registered_doctors(accounts[1]).call();
  
  factory = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    factoryAddress
  );

  prescriptionAddress = await factory.methods.createPrescription(accounts[2],"linkHere").send({
    from:accounts[1],
    gas:'1000000'
  });
  [prescriptionAddress] = await factory.methods.getDeployedPrescription().call();
  // console.log('JRTRRTRTR',prescriptionAddress);
  prescription = await new web3.eth.Contract(
    JSON.parse(compiledPrescription.interface),
    prescriptionAddress
  )
});

describe ('Contracts', () => {
  it('deploys authority,factory & a prescription ', ()=>{
    assert.ok(authority.options.address);
    assert.ok(factory.options.address);
    assert.ok(prescription.options.address);
  });
});
