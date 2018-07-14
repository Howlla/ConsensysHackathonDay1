pragma solidity ^0.4.17;

contract AuthorityContract{
    address public manager;   // address of the authority that will manage the contract
    mapping(address => address) public registered_doctors;
    mapping(address => bool) private registered_pharmacies;

    constructor() public {
        manager = msg.sender;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function addDoctor(address doc_address) public restricted{
        //GENERATE PRESCRIPTION FACTORY AND GIVE ADDRESS TO DOCTOR
        address factory = new PrescriptionFactory(doc_address);
        registered_doctors[doc_address] = factory;
    }

    function addPharmacy(address pharma_address) public restricted{
        registered_pharmacies[pharma_address] = true;
    }

    function deleteDoctor(address doc_address) public restricted{
        registered_doctors[doc_address] = 0;
    }

    function deletePharmacy(address pharma_address) public restricted{
        registered_pharmacies[pharma_address] = false;
    }

    function getPharmacy(address pharma) public view returns (bool)  {
        return registered_pharmacies[pharma];
    }
}


contract PrescriptionFactory{
 address[] private deployed_prescriptions;
 address public doctor;

 modifier restricted() {
     require(msg.sender == doctor);
     _;
 }

 constructor(address doctorz) public {
         doctor = doctorz;
    }

 function createPrescription(address patient_address, string ipfs_linkz) public restricted {
       address newPrescription = new Prescription(patient_address, doctor,ipfs_linkz);
       deployed_prescriptions.push(newPrescription);
    }
 function getDeployedPrescription() public view returns(address[]){
        return deployed_prescriptions;
    }

}


// code for prescription

contract Prescription {

    struct Request {
        address requestee;
        string description;
        bool approve;
    }

    Request[] public requests;
    address public patient;
    address public doctor;
    string private ipfs_link;
    bool public order_dispensed;
    address public fulfilled_by;
    address[] private white_list;

    modifier restricted() {
        require(msg.sender == patient);
        _;
    }

    constructor (address patientz, address doctorz, string ipfs_linkz) public{
        patient = patientz;
        ipfs_link = ipfs_linkz;
        doctor = doctorz;
        order_dispensed = false;
    }

    function getIPFS() public view returns (string) {
        bool can_see= false;
        for(uint i=0;i<white_list.length;i++){
            if(white_list[i]==msg.sender)
             can_see=true;
        }
        require(can_see || msg.sender==patient);
        return ipfs_link;
    }
    function approve(uint index) public restricted {
        require(!requests[index].approve);
        address temp = requests[index].requestee;
        white_list.push(temp);
        requests[index].approve = true;
    }

    // function remove() restricted {
    //  adress[] storage white_list = address[];
    // }

    function fulfilled(AuthorityContract authorityContractAddress) public {
        require( authorityContractAddress.getPharmacy(msg.sender));  // call the instance
        fulfilled_by = msg.sender;
        order_dispensed = true;
    }

    function requestPermission(string descriptionz) public{
        Request memory newRequest = Request({
          description: descriptionz,
          requestee: msg.sender,
          approve: false
      });
      requests.push(newRequest);
    }


}
