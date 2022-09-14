set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"isCompleted" BOOLEAN NOT NULL,
	"exercises" json NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);
