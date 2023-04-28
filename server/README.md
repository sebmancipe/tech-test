# `/server`

The server of the challenge is a NodeJS application built with TypeScript using Express as framework. The server handles files (PDF by the moment) and using a third party dependency (`pdf-to-text`), returns the text content of it.

Express was the chosen framework for the server due to the simplicity of the development by using it (the project is not big enough to use some more structured frameworks) and the availability of third party libraries. Altough Fastify could have been chosen as well, my experience is way more related to Express.

The way the server was built enables an easy way to extend the convert-to-text funcionality to other kind of documents by using a common interface: `FileService`. This also allows to extend the set of methods over documents.

In adition, any kind of `FileService` or any other service can be easily injected to the routes using an `Injector` helper function. This `Injector` is a expression of the Dependecy Injection pattern due the lack of Inversion of Control tools enabled by Express (and not other frameworks like NestJS). This way to inject classes allows also a better way to test the code by decoupling a class with their dependencies.

Files are stored using `multer` in the local disk and deleted after the file is processed.

Testing was done using `jest` at unit and integration level. Besides, a line coverage threshold was set, so it forces developers to fully test the code (or at least, the 70% of the lines of code written in the project). This output can be passed down to a CI strategy to disable the merging and deployment if the requirements are not met.

Development experience was improved by exposing a `dev` script mode where live code reloading is enabled using `nodemon` and `ts-node`.


## Available endpoints

You can find the list of endpoints available in this [section](/docs/api.md).


## Authentication

A layer of security was implemented in the `/convert-to-text` endpoint to avoid the use of the application by unauthenticated users. 

The strategy is based on a Basic Auth framework, where the client must provide an username and a password that are sent in an `Authorization: Basic` header in the request. Although this authentication process does not consider the Authorization part and is not fully secure due the "plain sending" of the credentials, is good enough if used in a secure medium (like HTTPS). This feature was implemented in the server using the `passport` library. The set of users and passwords to be used in the application can be found [here](/docs/credentials.md).

A better option for Authentication and Authorization flows can be a JSON Web Token strategy or OAuth auhtentication. 

This option is currently disabled for production usage.

## Data persistence

Even if a database was not used in this project, the implementation of it for data storing is possible. If the usage is the reading and searching of text on it and based on the context of the use case (documents with unstructured text), a noSQL database could be used. The managing of unstructured data along the missing overhead due to the lack of relationships (this means faster querying) and simplicity in the data model, are some of the reasons to use a noSQL database.

The processing of the data, by the other hand, depends of how fast is required to get the searching. If speed is a priority, a in memory noSQL database like `Redis` would be preferable.