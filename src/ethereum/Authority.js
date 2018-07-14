import web3 from './web3';
import AuthorityContract from './build/AuthorityContract.json';

const instance = new web3.eth.Contract(
  JSON.parse(AuthorityContract.interface),
  '0x70321A0B1c915669fE706fe2A0B48532992fF21f'
);

export default instance;
