/**
 * policies_by_user_name_service.js : This module encapsulate all the stuff related to the polices and is exported as a service.
 */ 
const config = require('../config/constants');
const httpRequest = require('superagent');
const insuranceHelperService = require('./insurance_helper_service');

const searchClientByName = insuranceHelperService.searchClientByName;

const searchPolicesByClientId = ( data, clientId ) => {
    let policesData = [];
    
    for( let indx=0; indx<data.policies.length; ++indx  ) {
      if( data.policies[indx].clientId === clientId ) {
         policesData.push( data.policies[indx] );
      }    
    }
 return policesData;    
}

// private module method.
// calls to external resources to retrieve user and polices data.
// Throubleshooting. Is a chained call. The second has to wait that the first is finished.
// Could be performed in parallel but with a little more effort.
const retrieveInsuranceDataFilteredByUserName = ( userName, cb ) => {
      
        httpRequest.get( config.URL_CLIENTS_DATA  )
                   .end( (err, resClientsData) => {
                            const resultClientData = searchClientByName( JSON.parse( resClientsData.text ), userName );
                           
                            // call to second service
                            httpRequest.get( config.URL_POLICIES_DATA )
                                       .end( (err, resPolicesData) => {
                                           const resultPolicesData = searchPolicesByClientId( JSON.parse( resPolicesData.text ), resultClientData.id);
                                            
                                           cb(err, resultPolicesData );                                          
                                         });
                         });
                         
};



module.exports = {
  // Given a user name its polices information are retrieved.
  retrievePolicesDataByUserName : ( userName, res ) => {
      
    retrieveInsuranceDataFilteredByUserName(  userName,
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