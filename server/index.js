require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.post('/workouts/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "hashedPassword")
        VALUES ($1, $2)
        RETURNING "userId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/workouts/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    SELECT "userId",
           "hashedPassword"
      FROM "users"
     WHERE "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/workouts/start/:workoutId', (req, res, next) => {
  const workoutId = Number(req.params.workoutId);
  if (!Number.isInteger(workoutId) || workoutId < 1) {
    res.status(400).json({
      error: 'workoutId must be a positive integer'
    });
    return;
  }
  const sql = `
    SELECT "exercises"
    FROM "workouts"
    WHERE "workoutId" = $1
  `;
  const params = [workoutId];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      if (!data) {
        res.status(404).json({
          error: `cannot find exercises with workoutId ${workoutId}`
        });
        return;
      }
      res.status(200).json(data.exercises);
    })
    .catch(err => next(err));
});

app.post('/workouts/start', (req, res, next) => {
  const { userId } = req.user;
  const createdAt = new Date();
  const exercises = '[]';
  const sql = `
  INSERT INTO "workouts" ("createdAt", "exercises", "userId")
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const params = [createdAt, exercises, userId];
  db.query(sql, params)
    .then(result => {
      const [newWorkout] = result.rows;
      res.status(201).json(newWorkout);
    })
    .catch(err => next(err));
});

app.put('/workouts/start/:workoutId', (req, res, next) => {
  const workoutId = Number(req.params.workoutId);
  const { exercises } = req.body;
  if (!Number.isInteger(workoutId) || workoutId < 1) {
    res.status(400).json({
      error: 'workoutId must be a positive integer'
    });
    return;
  }
  if (!exercises) {
    res.status(400).json({
      error: 'exercises is a required field'
    });
    return;
  }
  const sql = `
  UPDATE "workouts"
  SET "exercises" = $1::json
  WHERE "workoutId" = $2
  RETURNING *
  `;
  const params = [JSON.stringify(exercises), workoutId];
  db.query(sql, params)
    .then(result => {
      const [workout] = result.rows;
      res.status(200).json(workout);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
