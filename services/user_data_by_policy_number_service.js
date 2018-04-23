/**
 * user_data_by_policy_number_service.js : This module encapsulates all the stuff related to the user
 *                                         searching it by its policies.
 */ 

const config = require('../config/constants');
const httpRequest = require('superagent');
const insuranceHelperService = require('./insurance_helper_service.js');


const searchClientById = insuranceHelperService.searchClientById;

const searchPolicesById = ( data, id ) => {
    let policyData = {};
    
    for( let indx=0; indx<data.policies.length; ++indx  ) {
      if( data.policies[indx].id === id ) {
         policyData = data.policies[indx];
      }    
    }
 return policyData;    
}


const retrieveInsuranceDataFilteredByPolicyNumber = ( policyNumber, cb ) => {
      
        httpRequest.get( config.URL_POLICIES_DATA)
                   .end( (err, resPolicyData) => {
                            //const resultClientData = searchClientByName( JSON.parse( resClientsData.text ), userName );
                            const resultPolicesData = searchPolicesById( JSON.parse( resPolicyData.text ), policyNumber );
                                          
                            // call to second service
                            httpRequest.get( config.URL_CLIENTS_DATA )
                                       .end( (err, resClientData) => {
                                           const resultClientData = searchClientById( JSON.parse( resClientData.text ), resultPolicesData.clientId);
                                            
                                           cb(err, resultClientData );                                          
                                         });  
                         });
                         
};



module.exports = {
 
  retrieveUserDataByPolicyNumber : ( policyNumber, res ) => {
      
    retrieveInsuranceDataFilteredByPolicyNumber(  policyNumber,
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