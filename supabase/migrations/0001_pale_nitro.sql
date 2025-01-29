ALTER TABLE "auth_session" ALTER COLUMN "session" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "auth_state" ALTER COLUMN "state" SET DATA TYPE jsonb;