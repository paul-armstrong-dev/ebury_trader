# Ebury trading app


- I have managed to add some fairly boilerplate testing over the weekend, I would really like to work on and make the 
React test components way more extensive. 
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
### Styling
- Tried to adhere to AirBnb's React/JSX style guide from here where possible: [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
    - I also used a ui-template kit from the good people here: [UI Kit](https://www.creative-tim.com/product/argon-dashboard-react)
    - And was trying to stick with [React Strap components](https://reactstrap.github.io/) for consistency
- For python I just used PyCharms' built in pep-8 inspector.
    - I usually adhere to a Python "best of best" practises/style guide which was used at RTL and is available here: [Python Style Guide](https://github.com/paul-armstrong-dev/technology_notes/blob/master/python/style_guide/rtl-style-guide.md)
    - Though I'm not sure I even wrote enough python for this app for the above to be important 
    - I would still encourage to look into the above python standards, specifically the values section, these are things I feel very strongly about
- Implemented SonarCloud to do some standard checks against the repo
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
    - I'm also aware I left out some input validation, I rewrote an extensive input validation suite (this was the JS I did 4 years ago), so this is definitely something I understand, but without any real business requirements I thought it more important to structure the app logically correctly   
### Flask API
- Kept things very simple here
- Probably ended up removing more code than I added, 
- Not happy with the DataModel currently; but would really like to discuss what the other options were;
    - I implemented a few of these but decided to K.I.S.S (please check the commit history if curious) 
- There is also a .Config file within the Flask App; I'm not too sure that I like using this here when we have .env files
(Strong believer in configuring once)

### Maria DB
- Not much to say on the DB;
- Reason I chose MariaDB is that it is one of the smallest full-featured db images available, 
    - There are some security flaws with the engine itself but using Docker is a good way to mitigate some of these
- As next steps would like to implement the type of DB engine as a variable in the .env file; Think this is a great way 
to make the most of the SQL alchemy abstraction layer + Docker, but did not have time to do so before; main complication
will be the requirements (specially connectors) -- will likely resolve this as a personal project.  

### Features

**Hot reloading** is enabled for the React code, after every code change the container is up-to-date automatically !

These default values can be changed in the `docker-compose.yml` file.
The Flask application uses SQLAlchemy to retrieve the content of the `Trades`,
ReactJS call the REST API and display it !


#### Run the app

Check example.env file;
- Rename to .env
- fill in all params or keep default; 
  - Unfortunately I have not passed the DB name and port all the way through using the .env files so these need to stay as is.
  - Test environment sets up a sql lite db in Docker, all others create MariaDB
  - For environment configuration check Backend/Config, but should only need to choose from testing or production. 
- If the connect fails based on a use error please rerun the docker compose command; 
- **in testing I've found that for some reason docker compose does not successfully interpolate the trader-db name all the way through the system(specifically the Client/Config.py),
 rerunning the compose gets the i.p. in its place as it should**
    - I would have liked to spend more time debugging the above, if you're aware of the issue / solution I'd really like to find out. 
    - Found that this is actually just a sequencing issue; will be resolved through one of these tools:
        - [Mongo DB Wait](https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b)
        - [Bash wait for](https://github.com/vishnubob/wait-for-it)
- Everything is containerized from the client, backend to the database.
- So all you need is Docker installed, and then you can run :
```
docker-compose up --build -d
```
And your app will be up on the **port 3000** !

##### Reloading Database configuration

If you change user, password, database name or any other kind of database configuration, you may need to run 
`docker-compose -up --build` from a fresh start. Make sure to run `docker-compose down` before or even `docker-compose rm` if some containers are stopped but not destroyed.
