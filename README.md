# Ebury trading app
- I am also still to add tests to this App, this will be complete by **Monday**  
- If my application is unsuccessful **please** can we still go through this code and discuss; 
- There are a few points that I am interested to find out how to do these things better (see client Dockerfile),
If you have already worked it out, I'd love to hear how, if not maybe we could discuss the better solution 
- And would really like to learn from the experience
- I spent a lot of my time just understanding React, so if you are unhappy with this submission I would be happy
to do a new project where I can split my time a bit more evenly between front and backend.  
    - To account for my time on the project,
        - I started on the 15th of November, and had the Flask and DB setup very quickly,
        - After deciding to use React, Javascript is where I have spent 80-90% of the time since, 
        - Would like to revert back to DB and Flask (especially tests), but did not have time before today (22nd), 

---

#### API:
- I ran into a bit of an issue with the API which the take home test suggested I use from (https://fixer.io/),
- The API is functional but have removed a lot of features from the "free tier" of the API,
- The results of which mean that I could continue using the API but it would mean only allowing for EUR conversions in the final application
- I did a bit of research and have found quite a few people with a similar issue (https://github.com/fixerAPI/fixer/issues/109)
- As I would like to create something more functional than the above, I am instead used a completely free conversion API https://exchangeratesapi.io/ in place of the one from fixer;

--- 

### React
- The front end of this app was a bit of a challenge for me; 
    - The last time I did any sort of Javascript was around 4 years ago, 
    - After a bit of research I started using **React** last Saturday, for this project (have never tried this framework before)
    - There are a few things in the front end which I am currently not too happy with however I am hoping 
    that you take my eagerness to learn as a positive point in this regard, 
    - I am also still going to revert on all TODO's until I am happy with this app; regardless of what happens with the job
    - Not sure I'd make the decision to use **React** again; would have liked to experiment with some of the other frameworks a 
    bit more before committing to it but thought that finishing this was more important
    - Really really want to move everything into custom components, think the actually converter page is way too messy,
    but again, just what I could finish with a week of dev. 
    
--- 

### Flask API
- Kept things very simple here
- Probably ended up removing more code than I added, 
- Not happy with the DataModel currently; but would really like to discuss what the other options were;
    - I implemented a few of these but decided to K.I.S.S (please check the commit history if curious) 
- There is also a .Config file within the Flask App; I'm not too sure that I like using this here when we have .env files
(Strong believer in configuring once)

---

### Maria DB
- Not much to say on the DB;
- Reason I chose MariaDB is that it is one of the smallest full-featured db images available, 
    - There are some security flaws with the engine itself but using Docker is a good way to mitigate some of these
- As next steps would like to implement the type of DB engine as a variable in the .env file; Think this is a great way 
to make the most of the SQL alchemy abstraction layer + Docker, but did not have time to do so before; main complication
will be the requirements (specially connectors) -- will likely resolve this as a personal project.  

---

### Features

**Hot reloading** is enabled for the React code, after every code change the container is up-to-date automatically !

These default values can be changed in the `docker-compose.yml` file.
The Flask application uses SQLAlchemy to retrieve the content of the `Trades`,
ReactJS call the REST API and display it !

---

#### Run the app

Check example .env file;
- Rename to mysql-credentials.env 
- fill in all params; 
- Everything is containerized from the client, backend to the database.
- So all you need is Docker installed, and then you can run :

```
docker-compose up --build
```

And your app will be up on the **port 3000** !

##### Reloading Database configuration

If you change user, password, database name or any other kind of database configuration, you may need to run 
`docker-compose -up --build` from a fresh start. Make sure to run `docker-compose down` before or even `docker-compose rm` if some containers are stopped but not destroyed.
