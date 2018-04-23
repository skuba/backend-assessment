/**
 * user_data_by_user_id_service.js : This module encapsulates all the stuff related to the user
 *                                   searching it by its id.
 */ 
const config = require('../config/constants');
const httpRequest = require('superagent');
const insuranceHelperService = require('./insurance_helper_service.js');

const searchClientById = insuranceHelperService.searchClientById;

const userDataFilteredByUserId = insuranceHelperService.userDataFilteredByUserId;


module.exports = {

  retrieveUserDataByUserId : ( userId, res ) => {
      
                 userDataFilteredByUserId(  userId,
                                            ( err, data ) =>  {// callback
                                             if(!err) {
                                              res.json( data );
                                             } else {
                                              res.json( {error : 1, description:"Error in search process"} );
                                             }
                                                 
                                            }
                                          );
  }

}// End of module