/**
 * insurance_helper_services.js : This module encapsulate differents and cmethods that are used commonly across differents services.
 */ 

const httpRequest = require('superagent'); 
const config = require('../config/constants');

/**
 * searchClientByIdHandler : It holds the client searching process 
 **/ 
const searchClientByIdHandler = ( data, id ) => {
                                    let clientData = {};
                                    
                                    for( let indx=0; indx<data.clients.length; ++indx  ) {
                                      if( data.clients[indx].id === id ) {
                                         clientData = data.clients[indx];
                                         break;
                                      }    
                                    }
                                    return clientData;    
                                }

module.exports = {

  // makes the searching user by its id and returns de user data.
  searchClientById : searchClientByIdHandler,
                     
   searchClientByName : ( data, name ) => {
                          let clientData = {};
    
                          for( let indx=0; indx<data.clients.length; ++indx  ) {
                            if( data.clients[indx].name === name ) {
                               clientData= data.clients[indx];
                               break;
                            }    
                          }
                          return clientData;    
                        },
          
    // call to external resource to retrieve user data. The results are filtered by id.
    userDataFilteredByUserId : ( userId, cb ) => {
      
        httpRequest.get( config.URL_CLIENTS_DATA  )
                   .end( (err, resClientsData) => {
                            const resultClientData = searchClientByIdHandler( JSON.parse( resClientsData.text ), userId );
                            cb(err, resultClientData );                                          
                         });
                         
    }
                    
  
}// End of module