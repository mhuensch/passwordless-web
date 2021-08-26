# kickstart-web
Demo application for passwordless authentication using Auth0.  This is the client portion of the demo.  A server demo is also [available on GitHub](https://github.com/mhuensch/kickstart-api) as well.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Gotcha's
As browser security has increased, the use of cookies has become more restricted.  When developing locally, because we are using the same domain, you can get a bunch of cookie warnings in the browser when changing projects, starting a new project, etc.  Simply clear out the cookies for the localhost URL and these warnings will disappear.

### Overview
I often find that I want to authenticate users but don't want to invest in the overhead it takes to setup and manage a custom authentication process.  On the other hand, I also don't want to be locked into a particular vendor or experience over the long term.  This demo project represents the best compromise I've found between those two desires.

#### Auth0
I've used Auth0 in the past for basic user authentication and found it to be a bit clunky.  However, while there are other companies that offer similar functionality (magic.link, cotter.app, etc.), they all have trade-offs I'm not willing to accept in terms of price or customizing the experience.  So I'm sticking with Auth0 for now and documenting some of the "gotcha's" I've found when using their service.

1. The tenant name you select will be used as the url for auth.  You can have multiple applications under a single tenant.  So my preference is to create a tenant for each "project" name I am working on and then create a Auth0 project for each environment.  For instance, this runs against my "huensch-demo" tenant for the project inside that tenant named "Huensch Passwordless Demo: Dev" against the domain "huensch-demo.us.auth0.com".  A production application could run against the same domain, but providing a separate client ID.
1. To enable passwordless auth for the tenant, you need to go to Connections > Passwordless and enable/save the default configuration.  You will also need to enable an app (or the "Default App") on the Applications tab of the popup.
1. You can simply rename the "Default App" to whatever you want your app name to be or create a new app.  If you create a new app, you will need to enable it in the passwordless config as above.
1. You will need to add your domain to your application in the "Allowed Web Origins", "Allowed Origins (CORS)", "Allowed Logout URLs", and "Allowed Callback URLs" (i.e. http://localhost:8080)
1. In the "Connections" settings for your application, you should also disable all other connection types (i.e. Username-Password-Authentication, google-oauth2, etc.)
1. If you don't use the Auth0 embedded form, which I never want to do as it breaks the application flow I am trying to achieve, and are using passwordless - you can not get a refresh token in a single page application.  Refresh tokens are reserved for "off-line" access and need to be requested from the server side.
1. Set application "Application Type" to "Single Page Application"

#### Passwordless
Passwordless (aka Magic Link) authentication offers a number of advantages over traditional user/password login experiences.  Briefly the flow looks something like:

* The user provides a contact point that is also used as an identifier (usually an email address or phone number).
* A message is sent to the point of contact with a short-lived, randomly generated, code.  This code can be embedded in a referral link for easier use.
* That code is verified and the user's device, browser, or application is authenticated for a period of time.

In terms of experience and logical flow, this process looks very similar to a password reset or two-factor authentication.  Given the average user's familiarity with these processes, passwordless logins add very little mental overhead to the user experience and removes the need to remember passwords entirely.

For more information, see [Passwords are Obsolete](https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb) by Justin Balthrop.

#### Objectives
* Quick initial setup
* Custom user experience
* Low maintenance and cost
* Clean, simple, and repeatable


Users of this api will be authenticated using passwordless from Auth0. 
  | If this API does not have an access token, you will need to login; 
  | as neither the API nor the socket will work until you do. 
  | Once logged in, the API will receive an access token (set in memory) 
  | and a refresh token (set in an http only cookie).  The access token is short lived 
  | - 24 hours - and will disappear whenever the application is refreshed.
  | The refresh token is long lived (30+ days) so it can be used to get a new access token
  | when needed (page refresh, inactivity, etc.), but it can be revoked
  | and will change with each request for security.
  
  
  
  p.sub-text This socket connection in this project is optional.  I've included it 
   | because socket connections can be tricky to set up with authentication.  The flow for
   | most socket connections looks like:
  
  ul
    li Attempt to open a socket connection
    li If the connection fails as unauthorized, attempt to connect via the http API
    li If that connection is successful, a token is set in the http API (see API above)
    li Attempt to re-connect using the socket connection
    
  p.sub-text Once connected the socket client can receive messages and emit events as normal. 
    | See src/modules/socket.js for examples of how to extend this connection.
</template>