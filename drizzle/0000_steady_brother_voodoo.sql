CREATE TABLE "achievements" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"body" varchar NOT NULL,
	"number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lists" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"body" text,
	"image" text,
	"is_shared" boolean DEFAULT false NOT NULL,
	"shared_user_id" integer,
	"category_id" uuid
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"list_id" uuid NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"list_id" uuid NOT NULL,
	"user_id" integer NOT NULL,
	"body" text,
	"end_time" varchar,
	"frequency" integer,
	"alert" integer,
	"image" text,
	"is_done" boolean DEFAULT false NOT NULL,
	"latitude" double precision,
	"longitude" double precision
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" varchar(255),
	"password" varchar(255) NOT NULL,
	"salt" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"achievement_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"is_notified" boolean DEFAULT false NOT NULL,
	"number" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"body" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"sender_user_id" integer,
	"send_time" varchar NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"task_id" uuid,
	"task_title" varchar,
	"task_list_id" uuid,
	"achievement_id" integer
);
--> statement-breakpoint
CREATE TABLE "tasks_tags" (
	"task_id" uuid NOT NULL,
	"task_list_id" uuid NOT NULL,
	"task_user_id" integer NOT NULL,
	"tag_id" uuid NOT NULL
);
