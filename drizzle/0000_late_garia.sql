CREATE TABLE "achievements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "achievements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"body" varchar NOT NULL,
	"number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lists" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lists_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"body" text,
	"image" text,
	"is_shared" boolean DEFAULT false,
	"shared_user_id" integer,
	"is_favorite" boolean DEFAULT false,
	"category_id" integer
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"list_id" varchar NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tasks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"list_id" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"body" text,
	"end_time" integer,
	"frequency" integer,
	"alert" integer,
	"image" text,
	"is_done" boolean DEFAULT false,
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
	"is_completed" boolean DEFAULT false,
	"is_notified" boolean DEFAULT false,
	"number" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notifications_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"body" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"sender_user_id" integer,
	"send_time" integer NOT NULL,
	"is_read" boolean DEFAULT false,
	"task_id" integer,
	"task_title" varchar,
	"task_list_id" varchar,
	"achievement_id" integer
);
--> statement-breakpoint
CREATE TABLE "tasks_tags" (
	"task_id" varchar NOT NULL,
	"task_list_id" varchar NOT NULL,
	"task_user_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
