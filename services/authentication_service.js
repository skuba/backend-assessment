/**
 * authentication_services.js : This module encapsulate all the stuff related to the authentication and is exported as a service.
 */ 

const insuranceHelperService = require('./insurance_helper_service.js');


// InsuranceHelperService

module.exports = {
  /**
   * For simplicity we consider that the token pass is the user id (when the user is logged the token pass has the user id).
   * 
   */ 
  authenticate : ( cbErr, cbOk, tokenPass ) => {
      
                   insuranceHelperService.userDataFilteredByUserId(tokenPass,
                                                                   (err,data) => {
                                                                     
                                                                     if(data.id) {
                                                                         cbOk();
                                                                     } else {
                                                                         cbErr();
                                                                     }   
                                                                   }); 
                                                                  
                 }
}// End of module