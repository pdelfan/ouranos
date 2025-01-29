CREATE TABLE "auth_session" (
	"key" text PRIMARY KEY NOT NULL,
	"session" text NOT NULL,
	CONSTRAINT "auth_session_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "auth_state" (
	"key" text PRIMARY KEY NOT NULL,
	"state" text NOT NULL,
	CONSTRAINT "auth_state_key_unique" UNIQUE("key")
);
