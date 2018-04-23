/**
 * authorization_services.js : This module encapsulate all the stuff related to the authorization and is exported as a service.
 */ 

const insuranceHelperService = require('./insurance_helper_service.js');

/**
 * hasPermission : helper method that encapsulates if a role has a certain permission.
 */ 
const hasPermission = ( permissions, role ) => {
    return (permissions.indexOf( role ) > -1)
}


module.exports = {
  /**
   * For simplicity we consider that the token pass is the user id (when the user is logged the token pass has the user id).
   * 
   */ 
  hasPermissions : ( cbErr, cbOk, tokenPass, permissions ) => {
                       insuranceHelperService.userDataFilteredByUserId(tokenPass,
                                                                       (err,data) => {
                                                                          if( hasPermission(permissions, data.role ) ) {
                                                                            cbOk();
                                                                          } else {
                                                                            cbErr();
                                                                          }
                                                                       });       
                    
                   }
                 
}// End of module