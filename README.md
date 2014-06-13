# Anvil Connect

**Anvil Connect** aims to be a scalable, full-featured, ready-to-run
[**OpenID Connect**](http://openid.net/connect/) + [**OAuth 2.0**](http://tools.ietf.org/html/rfc6749) **Provider**.


### Why run your own OpenID Connect Povider?

* Protect your apps and APIs with a shared identity and authorization service *that you control*
* Provide your users with a seamless authentication experience across several apps, as well as social signin via other providers like Google+
* Authorize third party access to your APIs on a user's behalf
* Be the bedrock of an ecosystem as an identity provider for other developers


### Why use **Anvil Connect**?

We're building Anvil Connect for small teams like us that want to build fast, grow exponentially and need Identity and Access Management to be a solved problem.

* Deploy to the cloud in minutes
* Quickly connect your apps and APIs
* It's free and open source


### Lightning fast setup

```bash
# Install the CLI
$ npm install -g anvil-connect

# Make a place for your deployment repository to live
$ mkdir path/to/project
$ cd path/to/project

# Generate a deployment repository
$ nv init deployment

# Install dependencies
$ npm install

# Initialize the local database
$ nv init db

# Create the first user account
$ nv signup

# Assign a role
$ nv assign <email> authority

# Start the server in development mode
$ nv serve
```

You should now have an OpenID Connect Provider running in development mode.


### Even faster deployment

If you're using Modulus.io, deployment is a snap. Create a new project and edit the `issuer` in `config.production.json` to reflect your app's url. Be sure to configure Redis as well. Then set these environment variables in the project administration section:

* `ANVIL_CONNECT_PRIVATE_KEY`
* `ANVIL_CONNECT_PUBLIC_KEY`

You can copy these values from the `.pem` files using `$ nv copy keys/<private|public>.pem`. Be sure to use this command to copy the keys as it will encode the values as expected by Anvil Connect.

```bash
$ modulus deploy
```

Support for other deployment targets is in the works.


### Configure and customize

* [Documentation](https://github.com/christiansmith/anvil-connect/wiki/Documentation)
* [References](https://github.com/christiansmith/anvil-connect/wiki/References)


## MIT License

Copyright (c) 2014 Christian Smith http://anvil.io

