import web3 from './web3';
import FactoryContract from './build/PrescriptionFactory.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(FactoryContract.interface), address);
};
