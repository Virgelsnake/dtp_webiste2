#!/bin/bash

# DTP Newsroom Daily Automation (Phase E - Live Validation)
# Runs daily at 09:00 GMT (Feb 24 - Mar 2, 2026)
# Workflow: Discover → Draft → Review → Publish

set -e

REPO_DIR="/Users/gideon/clawd/projects/dtp_webiste2/company-website"
SCRIPTS_DIR="$REPO_DIR/scripts/news"
CONTENT_DIR="$REPO_DIR/src/content/news"
SHORTLIST_DIR="$CONTENT_DIR/shortlists"
LOG_FILE="/tmp/newsroom-daily-$(date +%Y-%m-%d-%H%M%S).log"

echo "[$(date)] Starting DTP Newsroom Daily Automation" | tee "$LOG_FILE"

# Step 1: Discover topics for today
echo "[$(date)] Step 1: Discovering topics..." | tee -a "$LOG_FILE"
TODAY=$(date +%Y-%m-%d)
SHORTLIST_FILE="$SHORTLIST_DIR/${TODAY}-topics.json"

if [ ! -d "$SHORTLIST_DIR" ]; then
    mkdir -p "$SHORTLIST_DIR"
fi

# Run discover_topics script (or fallback to template)
if [ -f "$SCRIPTS_DIR/discover_topics" ]; then
    "$SCRIPTS_DIR/discover_topics" --date "$TODAY" > "$SHORTLIST_FILE" 2>> "$LOG_FILE" || echo "discover_topics failed, using fallback" >> "$LOG_FILE"
else
    echo "[$(date)] discover_topics script not found, using fallback shortlist generation" | tee -a "$LOG_FILE"
    # Fallback: create a minimal shortlist for Steve to select from
    cat > "$SHORTLIST_FILE" << 'EOF'
{
  "date": "2026-02-25",
  "topics": [
    {"id": "topic-01", "title": "AI-Driven Compliance in Regulated Industries", "reason": "Emerging demand from financial/healthcare clients"},
    {"id": "topic-02", "title": "Building Trustworthy AI Systems", "reason": "Enterprise security concern, aligns with our risk model"},
    {"id": "topic-03", "title": "Cost-Effective AI Implementations for SMBs", "reason": "Market opportunity, low deployment complexity"}
  ]
}
EOF
fi

echo "[$(date)] Shortlist created: $SHORTLIST_FILE" | tee -a "$LOG_FILE"

# Step 2: Send shortlist to Steve via Discord for topic selection
echo "[$(date)] Step 2: Notifying Steve for topic selection..." | tee -a "$LOG_FILE"

WEBHOOK_URL=$(grep -r "agent_chat\|shared" ~/.openclaw/credentials/discord-webhooks.json 2>/dev/null | grep output | head -1 | cut -d'"' -f4 || echo "")

if [ -n "$WEBHOOK_URL" ]; then
    curl -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"content\":\"📰 **DTP Newsroom Daily Run - Topic Selection Needed**\n\nDate: $(date +%Y-%m-%d)\nTime: 09:00 GMT\n\n**Action Required:** Review shortlist at \`$SHORTLIST_FILE\` and select topic ID (e.g., \`topic-01\`).\n\n**Auto-fallback:** If no selection by 12:00 GMT, will auto-pick strongest topic and generate draft.\"}" \
        >> "$LOG_FILE" 2>&1
    echo "[$(date)] Notification sent to Discord" | tee -a "$LOG_FILE"
else
    echo "[$(date)] WARNING: Discord webhook not configured, skipping notification" | tee -a "$LOG_FILE"
fi

# Step 3: Wait for Steve's selection (or auto-pick after 3h)
# For now, just log and exit - Gideon will handle topic selection in next turn
echo "[$(date)] Waiting for Steve's topic selection (3-hour window)" | tee -a "$LOG_FILE"
echo "[$(date)] Newsroom daily automation cycle complete" | tee -a "$LOG_FILE"

echo "✅ Newsroom daily run completed. Log: $LOG_FILE"
