require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.post('/workouts/start', (req, res, next) => {
  const createdAt = new Date();
  const isCompleted = false;
  const exercises = '[]';
  const sql = `
  INSERT INTO "workouts" ("createdAt", "isCompleted", "exercises")
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const params = [createdAt, isCompleted, exercises];
  db.query(sql, params)
    .then(result => {
      const [newWorkout] = result.rows;
      res.status(201).json(newWorkout);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
