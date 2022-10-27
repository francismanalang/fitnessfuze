# FitnessFuze

A full stack web application for gym goers who want to track their workouts.

## Why I built this

I have been an olympic weightlifter for the last 5 years and have tried a multitude of fitness apps. Most of the time, I found them to be overly complicated and full of advertisements. Because of this, I've always had the idea of building my own fitness app that I would be excited to use. 

My goal was to incorporate the most useful features that a gym goer would need in order to track their workouts and progress. Addtionally, I was eager to challenge myself and apply everything that I have learned to create an app that I was proud of.

## Live Demo

Try the application live here: [Dokku deployment](https://fitnessfuze.francismanalang.net/)

## Technologies Used

* React.js
* Node.js
* Express.js
* PostgreSQL
* Webpack
* JavaScript (ES6)
* Chart.js
* HTML5
* CSS3
* Bootstrap
* Babel
* Argon2
* dotenv
* Pgweb
* Dokku

## Features

* User can start a workout
* User can add exercises to a workout
* User can modify reps and weight to a set
* User can add a set
* User can save a workout
* User can view finished workouts
* User can sign up
* User can sign in
* User can sign out
* User can calculate one rep max

## Preview

### Mobile

![Kapture 2022-10-05 at 14 41 34](https://user-images.githubusercontent.com/101234537/194170461-1cfbeb25-9382-4869-be40-22c04af35212.gif)


### Desktop

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/101234537/194170401-6b3b9689-b18f-4bb6-8e8c-c65a1c63a419.gif)


## Features in Development

* User can delete an exercise
* User can view all sets

## Development

### System Requirements

* Node (v18)
* NPM (v8)
* PostgreSQL (v14)

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:francismanalang/fitnessfuze.git
    cd fitnessfuze
    ```

2. Install [PostgreSQL](https://www.postgresql.org/download/)
    
3. Install all dependencies with NPM.

    ```shell
    npm install
    ```

4. Create a `.env` file from the example template and update `TOKEN_SECRET` value
    
    ```shell
    cp .env.example .env
    ```
 
 5. Start PostgreSQL and create the database
    ```shell
    sudo service postgresql start
    createdb nameOfDatabase
    ```
    
 6. Update `DATABASE_URL` value to point to your PostgreSQL database.
    
7. Initialize the database
    ```shell
    npm run db:import
    ```
    
8. Start the project. Once started, you can view the application by opening `http://localhost:3000` in your browser.

    ```shell
    npm run dev
    ```
