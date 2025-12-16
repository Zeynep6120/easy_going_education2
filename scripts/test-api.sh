#!/usr/bin/env bash
set -euo pipefail

BASE=http://localhost:3000

echo "GET  /api/items"
curl -sS "$BASE/api/items" | jq . || true
echo -e "\n---\n"

echo "POST /api/items -> create test item"
CREATED=$(curl -sS -X POST "$BASE/api/items" -H "Content-Type: application/json" -d '{"title":"script-test","description":"created by test script"}') || true
echo "$CREATED" | jq . || echo "$CREATED"
echo -e "\n---\n"

echo "GET  /api/items (after create)"
curl -sS "$BASE/api/items" | jq . || true
echo -e "\n---\n"

ID=$(echo "$CREATED" | jq -r '.id' 2>/dev/null || true)
if [[ -n "$ID" && "$ID" != "null" ]]; then
  echo "DELETE /api/items/$ID"
  curl -sS -X DELETE "$BASE/api/items/$ID" -w "\nHTTP_STATUS:%{http_code}\n"
  echo -e "\n---\n"
  echo "GET  /api/items (after delete)"
  curl -sS "$BASE/api/items" | jq . || true
else
  echo "Could not determine created item ID; skipping DELETE"
fi

echo -e "\nAll done."
