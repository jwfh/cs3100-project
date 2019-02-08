# NumHub Site Setup Instructions

A _Makefile_ has been created to help automate building and running the app.

### Installation

To install NPM dependencies without running the app, use `make install`. 

### Demonstration 

As described in the goals, we wish to have a pre-initialized demo for the 
project. Therefore, we have implemented a section of the Makefile which 
calls SQLite with `demo.sql` to initialize the database to contain some past
actions. This feature can be called individually without running the app by
executing `make demo`. This calls `make init` to create the database schema
and then populates the database with some sample entries.

These can then be used in a live demonstration to show post pingbacks, password
history, account editing, etc. 

### Database Initialization

By default, if no initialization is performed, the application will create
(initialize) all required aspects of the database on first run. If the user
wishes to do this manually without starting the app, he may run `make init`.

### Running The App

To simply run the app, use `make`. This will call `make install` and any 
other dependencies before running `npm start`.
