/**
 * policy_controller.js : This module encapsulate all the stuff related to policies.
 */ 
const policesByUserNameService = require('../services/policies_by_user_name_service');

module.exports = {
  
  /**
   * getDataByUserName : Retrieve client data from its user name.
   */ 
  getDataByUserName : (req, res) => {
    policesByUserNameService.retrievePolicesDataByUserName( req.params.userName, res );
  }

}// End of module