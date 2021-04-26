const https = require("https");

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} in JS.`;

  console.log(message);
}

function getProfile(username) {
  const request = https.get(
    `https://teamtreehouse.com/${username}.json`,
    (response) => {
      let body = "";
      console.log(response.statusCode);

      response.on("data", (data) => {
        body += data.toString();
      });

      response.on("end", () => {
        const profile = JSON.parse(body);
        printMessage(
          username,
          profile.badges.length,
          profile.points.JavaScript
        );
      });
    }
  );
}

const users = process.argv.slice(2);

users.forEach(getProfile);
