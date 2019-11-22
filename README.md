# Ebury trading app
SO


### Flask API

### Maria DB

### React


### Features

A database named `sport_stats` (user: myuser / password: mypassword) is initialized when the database container start. 
These default values can be changed in the `docker-compose.yml` file.
The Flask application uses SQLAlchemy to retrieve the content of the `players`, ReactJS call the REST API and display it !

**Hot reloading** is enabled for the React and Flask code, after every code change the container is up-to-date automatically !

#### Run the app

Everything is containerized from the client, backend to the database. So all you need is Docker installed, and then you can run :

```
docker-compose up --build
```

And your app will be up on the *port 3000* !

##### Reloading Database configuration

If you change user, password, database name or any other kind of database configuration, you may need to run 
`docker-compose -up --build` from a fresh start. Make sure to run `docker-compose down` before or even `docker-compose rm` if some containers are stopped but not destroyed.