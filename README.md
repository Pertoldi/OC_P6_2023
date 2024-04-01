# P6-Développez une application full-stack complète

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17

Don't forget to install your node_modules before starting (`npm install`).

Dependencies: The external UI library `@angular/materials`.

## Back

set up the MySQL database by running the script `script.sql`. It will create a database named P6.

This project uses java 21 and the following dependencies:

Spring Web -> To build restful API using Spring MVC
Spring Boot DevTools -> for enhance development experience
MySQL Driver -> To easily connect and access MySQL data
Data JPA  -> to improve the data access layers and enhance developer experience
Lombrok -> to reduce boilerplate code
Spring Security -> To implement access-control on the Spring Application

### Development server

Go to the front folder and run `npm run start` or for a dev server. Navigate to `http://localhost:4200/`. The angular application will automatically reload if you change any of the source files.

To run the back end, on vs-code, use the run button available in the main class BackApplication.


### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


### Content

This application allows people:
- to connect/disconnect
- to post articles
- to comment articles
- to subscribe/unsubscribe to subject
- to change userName and Email