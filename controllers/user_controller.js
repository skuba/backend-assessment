/**
 * user_controller.js : This module encapsulate all the stuff related to user.
 */ 

const userDataByUserIdService = require('../services/user_data_by_user_id_service');
const userDataByUserNameService = require('../services/user_data_by_user_name_service');
const userDataByPolicyNumberService = require('../services/user_data_by_policy_number_service');


module.exports = {

  /**
   * getDataByUserId: given an user id then retrieve the client data. 
   */ 
  getDataByUserId : (req, res) => {
    userDataByUserIdService.retrieveUserDataByUserId( req.params.userId, res );
  },
  
  /**
   * getDataByUserName: given a user name then retrieve the client data
   */
  getDataByUserName : (req, res) => {
    userDataByUserNameService.retrieveUserDataByUserName( req.params.userName, res );
  },

  /**
   *getDataByPolicyNumber: given a policy number then retrieve the client data.
   */
  getDataByPolicyNumber : (req, res) => {
    userDataByPolicyNumberService.retrieveUserDataByPolicyNumber( req.params.policyNumber, res);
  }
  
}// End of module