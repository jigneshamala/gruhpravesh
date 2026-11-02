// Gruh Pravesh invitation interactions
const eventDate = new Date("2026-11-28T10:00:00+05:30");

const cover = document.getElementById("cover");
const invitationContent = document.getElementById("invitationContent");

document.getElementById("openInvitation").addEventListener("click", () => {
  cover.classList.add("cover-opening");
  window.setTimeout(() => {
    cover.hidden = true;
    invitationContent.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 420);
});

function updateCountdown() {
  const now = new Date();
  const remaining = eventDate.getTime() - now.getTime();
  if (remaining <= 0) {
    document.getElementById("countdown").hidden = true;
    document.getElementById("eventLive").hidden = false;
    return;
  }
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60)
  };
  Object.entries(values).forEach(([unit, value]) => {
    document.getElementById(unit).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

document.getElementById("calendarBtn").addEventListener("click", () => {
  // Event is 10:00 AM IST = 04:30 UTC.
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Surani Family//Gruh Pravesh//EN",
    "BEGIN:VEVENT", "UID:surani-gruh-pravesh-20261128@example.com",
    "DTSTAMP:20261102T000000Z", "DTSTART:20261128T043000Z", "DTEND:20261128T063000Z",
    "SUMMARY:Gruh Pravesh - Surani Family",
    "LOCATION:No-2445, Banashankari 6th Stage, 3rd Block, Bengaluru",
    "DESCRIPTION:Gruh Pravesh ceremony of Kantibhai Tulsibhai Surani and Shantaben Kantibhai Surani.",
    "URL:https://maps.app.goo.gl/kd4EUqYuVDPGwHMX8", "END:VEVENT", "END:VCALENDAR"
  ].join("\\r\\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "surani-gruh-pravesh.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Gruh Pravesh Invitation",
    text: "Join us for the Gruh Pravesh ceremony of the Surani family on 28 November 2026 at 10:00 AM, Bengaluru.",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert("Invitation link copied. Share it with your family and friends!");
    } else {
      prompt("Copy your invitation website link:", window.location.href);
    }
  } catch (error) {
    if (error.name !== "AbortError") alert("Unable to share right now. Please copy the website link from your browser.");
  }
});

document.getElementById("backToCover").addEventListener("click", () => {
  invitationContent.hidden = true;
  cover.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});
