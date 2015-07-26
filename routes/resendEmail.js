/**
 * Module dependencies
 */

var settings = require('../boot/settings')
  , mailer   = require('../boot/mailer')
  , oidc     = require('../oidc')
  , Client   = require('../models/Client')
  , User     = require('../models/User')
  , AuthorizationError = require('../errors/AuthorizationError')
  ;


/**
 * Resend e-mail verification message endpoint
 */

module.exports = function (server) {
  server.get('/email/resend', [
    oidc.selectConnectParams,
    oidc.verifyRedirectURI,
    function(req, res, next) {

      var params = {
        message: req.query.email ? 
          'If we have this e-mail address on file, then we have sent it a ' +
          'verification request.' : '',
        error: !req.query.email ? 'No e-mail address specified.' : '',
        email: req.query.email,
        from: mailer.from,
        redirect_uri: req.connectParams.redirect_uri,
        client_id: req.connectParams.client_id,
        response_type: req.connectParams.response_type,
        scope: req.connectParams.scope,
        resendURL: req.url
      };

      var emailParams = {
        redirect_uri: req.connectParams.redirect_uri,
        client_id: req.connectParams.client_id,
        response_type: req.connectParams.response_type,
        scope: req.connectParams.scope
      };

      if (!req.client) {

        delete params.redirect_uri;
        delete params.client_id;
        delete params.response_type;
        delete params.scope;

        delete emailParams.redirect_uri;
        delete emailParams.client_id;
        delete emailParams.response_type;
        delete emailParams.scope;

      }

      User.getByEmail(req.query.email, function(err, user) {
        if (err) { return next(err); }

        if (user && !user.emailVerified) {
          user.sendVerificationEmail(emailParams, function () {});
        }

        res.render('requireVerifiedEmail', params);
      });
    }
  ]); 
};

