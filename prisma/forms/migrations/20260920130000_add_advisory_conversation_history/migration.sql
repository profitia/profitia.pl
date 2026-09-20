CREATE TABLE "advisory_conversations" (
    "id" TEXT NOT NULL,
    "visitor_key_hash" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "advisor_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "intent_code" TEXT,
    "destination_id" TEXT,
    "ip_address" INET,
    "started_at" TIMESTAMP(3) NOT NULL,
    "last_activity_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advisory_conversations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "advisory_conversations_visitor_key_hash_session_id_key"
ON "advisory_conversations"("visitor_key_hash", "session_id");

CREATE INDEX "advisory_conversations_visitor_key_hash_last_activity_at_idx"
ON "advisory_conversations"("visitor_key_hash", "last_activity_at");
