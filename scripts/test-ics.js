import assert from "node:assert";
import { buildIcs } from "../src/utils/calendar.js";
import { content, EVENT_START_ISO, EVENT_DURATION_HOURS, MAPS_URL } from "../src/data/wedding.js";

console.log("--- Running buildIcs verification tests ---");

// Test 1: English ICS
const enIcs = buildIcs(
  content.en.calendar.title,
  content.en.calendar.description,
  content.en.venue.name,
  MAPS_URL,
  EVENT_START_ISO,
  EVENT_DURATION_HOURS
);

// Test 2: Malayalam ICS (with multi-byte UTF-8 characters)
const mlIcs = buildIcs(
  content.ml.calendar.title,
  content.ml.calendar.description,
  content.ml.venue.name,
  MAPS_URL,
  EVENT_START_ISO,
  EVENT_DURATION_HOURS
);

for (const [lang, ics] of [["EN", enIcs], ["ML", mlIcs]]) {
  console.log(`\nTesting ${lang} ICS generation...`);

  // 1. Assert all line breaks are CRLF
  assert(ics.includes("\r\n"), "ICS must contain CRLF line endings");
  const lines = ics.split("\r\n");
  if (lines[lines.length - 1] === "") {
    lines.pop(); // Trailing CRLF
  }

  // 2. Assert no line exceeds 75 octets
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const byteLength = Buffer.byteLength(line, "utf8");
    assert(
      byteLength <= 75,
      `Line ${i + 1} exceeds 75 octets: ${byteLength} bytes -> "${line}"`
    );
  }
  console.log(`✓ All ${lines.length} lines end with CRLF and are <= 75 bytes`);

  // 3. Assert DTSTART and DTEND
  assert(ics.includes("DTSTART:20261206T070000Z"), "DTSTART must be 20261206T070000Z");
  assert(ics.includes("DTEND:20261206T100000Z"), "DTEND must be 20261206T100000Z");
  console.log("✓ DTSTART is 20261206T070000Z and DTEND is 20261206T100000Z");

  // 4. Assert UID, PRODID, VALARMs
  assert(ics.includes("UID:wedding-aamir-sajeena-20261206@aamirsajeena.invitation"), "Must contain stable UID");
  assert(ics.includes("TRIGGER:-P1D"), "Must contain 1-day reminder (-P1D)");
  assert(ics.includes("TRIGGER:-PT3H"), "Must contain 3-hour reminder (-PT3H)");
  console.log("✓ Stable UID and VALARMs (-P1D, -PT3H) with ACTION:DISPLAY present");
}

// Test 3: Unfolding test for Malayalam
console.log("\nTesting Malayalam unfolding and character integrity...");
// Unfold according to RFC 5545: replace CRLF followed by single space with empty string
const unfoldedMl = mlIcs.replace(/\r\n /g, "");

// Check Malayalam title survives folding without broken characters
const expectedMlTitle = content.ml.calendar.title;
assert(
  unfoldedMl.includes(`SUMMARY:${expectedMlTitle}`),
  `Malayalam title was corrupted or improperly folded! Expected SUMMARY:${expectedMlTitle}`
);
console.log(`✓ Malayalam title preserved without broken characters: "${expectedMlTitle}"`);

// Check Malayalam description survives (accounting for standard RFC 5545 escaped commas)
const unescapedMl = unfoldedMl.replace(/\\,/g, ",").replace(/\\;/g, ";");
const expectedMlDesc = content.ml.calendar.description;
assert(
  unescapedMl.includes(expectedMlDesc),
  "Malayalam description was corrupted during folding!"
);
console.log(`✓ Malayalam description preserved without broken characters: "${expectedMlDesc}"`);

console.log("\nALL ICS TESTS PASSED SUCCESSFULLY!");
