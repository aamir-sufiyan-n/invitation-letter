/**
 * Calendar utilities
 * Generates RFC 5545 .ics text and Google Calendar URL.
 * Pure JS – runs in Node and browser.
 */

function getByteLength(str) {
  if (typeof Buffer !== "undefined") {
    return Buffer.byteLength(str, "utf8");
  }
  return new TextEncoder().encode(str).length;
}

/**
 * Format a Date to UTC format YYYYMMDDTHHMMSSZ
 */
function formatUtc(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

/**
 * Escape text per RFC 5545 (backslashes, semicolons, commas, newlines)
 */
function escapeIcsText(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Fold lines longer than 75 octets with CRLF + space.
 * Never split a multi-byte UTF-8 character.
 */
function foldLine(line) {
  if (getByteLength(line) <= 75) {
    return line;
  }

  let result = "";
  let currentLineBytes = 0;
  let isFirst = true;

  for (const char of line) {
    const charBytes = getByteLength(char);
    const maxBytes = isFirst ? 75 : 74; // 74 because of the 1-byte leading space on continuation lines

    if (currentLineBytes + charBytes > maxBytes) {
      result += "\r\n ";
      currentLineBytes = charBytes;
      isFirst = false;
    } else {
      currentLineBytes += charBytes;
    }
    result += char;
  }

  return result;
}

/**
 * buildIcs
 * @param {string} title
 * @param {string} description
 * @param {string} location
 * @param {string} url
 * @param {string} startIso
 * @param {number} durationHours
 * @returns {string} RFC 5545 compliant ics file content
 */
export function buildIcs(
  title,
  description,
  location,
  url,
  startIso,
  durationHours
) {
  const startDate = new Date(startIso);
  const endDate = new Date(startDate.getTime() + durationHours * 3600 * 1000);

  const dtStart = formatUtc(startDate);
  const dtEnd = formatUtc(endDate);
  const dtStamp = "20261101T000000Z"; // Stable UTC stamp
  const uid = "wedding-aamir-sajeena-20261206@aamirsajeena.invitation"; // Stable UID

  const fullDescription = url ? `${description}\n\n${url}` : description;

  const rawLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aamir & Sajeena//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(fullDescription)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(title)}`,
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT3H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return rawLines.map(foldLine).join("\r\n") + "\r\n";
}

/**
 * Download an .ics file in the browser
 */
export function downloadIcs(icsText, filename = "wedding-invitation.ics") {
  if (typeof window === "undefined") return;
  const blob = new Blob([icsText], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generate Google Calendar TEMPLATE link
 */
export function googleCalendarUrl({
  title,
  description,
  location,
  url,
  startIso,
  durationHours,
}) {
  const startDate = new Date(startIso);
  const endDate = new Date(startDate.getTime() + durationHours * 3600 * 1000);

  const startUtc = formatUtc(startDate);
  const endUtc = formatUtc(endDate);
  const dates = `${startUtc}/${endUtc}`;
  const details = url ? `${description}\n\n${url}` : description;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    details,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

