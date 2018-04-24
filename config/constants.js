/**
 * constants.js : Here are defined constants for error code, some message, roles, url path, .. etc
 */ 
module.exports = {
    URL_CLIENTS_DATA : "http://www.mocky.io/v2/5808862710000087232b75ac",
    URL_POLICIES_DATA : "http://www.mocky.io/v2/580891a4100000e8242b75c5",
    HTTP_SERVER_PORT : process.env.PORT||3000,
    AUTHENTICATION_ERROR_CODE : 100,
    AUTHENTICATION_ERROR_MESSAGE : "Authentication error",
    AUTHORIZATION_ERROR_CODE : 201,
    AUTHORIZATION_ERROR_MESSAGE : "Permission Denied",
    TOKEN_PASS_HEADER_KEY : 'token-pass',
    ROLE_ADMIN : 'admin',
    ROLE_USER : 'user',
    USER_ID_$USERID_URLPATH:'/user/id/:userId',
    USER_NAME_$USERNAME_URLPATH: '/user/name/:userName',
    USER_POLICY_NUMBER_$POLICYNUMBER_URLPATH: '/user/policy/number/:policyNumber',
    POLICES_USER_NAME_$USERNAME_URLPATH : '/polices/user/name/:userName'
}