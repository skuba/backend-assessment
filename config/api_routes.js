/**
 * api_routes.js : This module encapsulate all the stuff related to mapping routes and controllers.
 */ 
const config = require('../config/constants');
const userController = require('../controllers/user_controller');
const policyController = require('../controllers/policy_controller');
const authenticationService = require('../services/authentication_service');
const authorizationService = require('../services/authorization_service');


module.exports = {
    api : (app) => {
            // Ini Middleware section
            // All the request goes throw here..
            // basically it makes the authentication process.
            app.use(  (req, res, next) => {
              console.log('>Time  in:', Date.now())
              console.log("HEADER token-pass : ", req.get('token-pass')); // authentication
              
              authenticationService.authenticate( 
                                                  () => {
                                                  
                                                    res.json ( {
                                                                error: config.AUTHENTICATION_ERROR_CODE,
                                                                description: config.AUTHENTICATION_ERROR_MESSAGE
                                                               });
                                                  },
                                                  
                                                  () => {
                                                    next();
                                                    console.log('>Time out:', Date.now());
                                                  },
                                                  req.get( config.TOKEN_PASS_HEADER_KEY )
                                                );
              
            });
            
            // This middleware makes the authorization process
            // each authorization is particular in terms of roles and depends on the url.
            // only the maching urls goes throw its corresponding middleware.
            // /user/id/:userId
            app.use( config.USER_ID_$USERID_URLPATH, (req,res,next) => {
              console.log('>>Time  /user/id/:userId : ', Date.now() );
              
              authorizationService.hasPermissions( 
                                                    () => {
                                                      res.json ( {
                                                                  error: config.AUTHORIZATION_ERROR_CODE,
                                                                  description: config.AUTHORIZATION_ERROR_MESSAGE
                                                               });
                                                    },
                                                    
                                                    () => {
                                                      next();
                                                      console.log('>>Time out /user/id/:userId :', Date.now() );                                                      
                                                    },
                                                    
                                                    req.get( config.TOKEN_PASS_HEADER_KEY ),
                                                    [config.ROLE_USER, config.ROLE_ADMIN]
                                                 );

            }); 
            
            // /user/name/:userName
            app.use( config.USER_NAME_$USERNAME_URLPATH, (req,res,next) => {
              console.log('>>Time  /user/name/:userName : ', Date.now() );
              
              authorizationService.hasPermissions( 
                                                    () => {
                                                      res.json ( {
                                                                  error: config.AUTHORIZATION_ERROR_CODE,
                                                                  description: config.AUTHORIZATION_ERROR_MESSAGE
                                                               });
                                                    },
                                                    
                                                    () => {
                                                      next();
                                                      console.log('>>Time out /user/name/:userName :', Date.now() );                                                      
                                                    },
                                                    
                                                    req.get(config.TOKEN_PASS_HEADER_KEY),
                                                    [config.ROLE_USER, config.ROLE_ADMIN]
                                                 );

            });
            
            // /user/policy/number/:policyNumber
            app.use( config.USER_POLICY_NUMBER_$POLICYNUMBER_URLPATH, (req,res,next) => {
              console.log('>>Time  /user/policy/number/:policyNumber: ', Date.now() );
              
              authorizationService.hasPermissions( 
                                                    () => {
                                                      res.json ( {
                                                                  error: config.AUTHORIZATION_ERROR_CODE,
                                                                  description: config.AUTHORIZATION_ERROR_MESSAGE
                                                               });
                                                    },
                                                    
                                                    () => {
                                                      next();
                                                      console.log('>>Time out /user/policy/number/:policyNumber :', Date.now() );                                                      
                                                    },
                                                    
                                                    req.get(config.TOKEN_PASS_HEADER_KEY),
                                                    [config.ROLE_ADMIN]
                                                 );

            });
            
            // /polices/user/name/:userName
            app.use( config.POLICES_USER_NAME_$USERNAME_URLPATH, (req,res,next) => {
              console.log('>>Time  /polices/user/name/:userName : ', Date.now() );
              
              authorizationService.hasPermissions( 
                                                    () => {
                                                      res.json ( {
                                                                  error: config.AUTHORIZATION_ERROR_CODE,
                                                                  description: config.AUTHORIZATION_ERROR_MESSAGE
                                                               });
                                                    },
                                                    
                                                    () => {
                                                      next();
                                                      console.log('>>Time out /polices/user/name/:userName :', Date.now() );                                                      
                                                    },
                                                    
                                                    req.get(config.TOKEN_PASS_HEADER_KEY),
                                                    [config.ROLE_ADMIN]
                                                 );

            });
            // End Middleware section
            
            
            // Ini Routing section
            // Here we define the url path with the controller#action method.
            app.get('/', (req,res) => {
              res.send('It works! :'+ Date.now() );
            });
            
            // /user/id/:userId
            app.get( config.USER_ID_$USERID_URLPATH, userController.getDataByUserId );
            
            // /user/name/:userName
            app.get( config.USER_NAME_$USERNAME_URLPATH, userController.getDataByUserName );
            
            // /user/policy/number/:policyNumber
            app.get( config.USER_POLICY_NUMBER_$POLICYNUMBER_URLPATH, userController.getDataByPolicyNumber );

            // /polices/user/name/:userName
            app.get( config.POLICES_USER_NAME_$USERNAME_URLPATH, policyController.getDataByUserName );
            // End Routing section

    }
}