# Session Details Provider

`session-details-app.js` starts a node express server that connects to the same redis instance as the primary application,
using the same session secret and session id cookie.
Its purpose is to provide tests with access to the confirmation code used for two factor authentication,
without those tests needing to actually receive the code via text or email.

`session-details-manifest.yml` is used to deploy it to cloud foundry, by running this command from the root of the project:
```
cf push -f src/test/session-details-provider/session-details-manifest.yml \
    --var session_details_app_name=htbhf-session-details-staging \
    --var session_secret=ReplaceWithTheRealSessionSecret \
    --var session_details_host_name=apply-for-healthy-start-staging.london.cloudapps.digital
```
(It is deployed by the CD scripts during testing against the staging environment).

During local testing the app is started by the `test:session-details` script in `package.json`.
