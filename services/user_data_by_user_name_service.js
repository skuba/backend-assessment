/**
 * user_data_by_user_id_service.js : This module encapsulates all the stuff related to the user
 *                                   searching it by its name.
 */ 
const config = require('../config/constants');
const httpRequest = require('superagent');
const insuranceHelperService = require('./insurance_helper_service');

const searchClientByName = insuranceHelperService.searchClientByName;

const userDataFilteredByUserName = ( userName, cb ) => {
      
        httpRequest.get( config.URL_CLIENTS_DATA  )
                   .end( (err, resClientsData) => {
                            const resultClientData = searchClientByName( JSON.parse( resClientsData.text ), userName );
                            cb(err, resultClientData );                                          
                         });
                         
};



module.exports = {

  retrieveUserDataByUserName : ( userName, res ) => {
      
                 userDataFilteredByUserName(  userName,
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