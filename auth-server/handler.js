// this line enables strict mode in javascript which help catch common coding  error and enforces a stricter coding style 
'use strict';

//import google API client library and create an instance of the google calendarAPI client v3
const {google} = require("googleapis");
const calendar = google.calendar("v3");

// defines the scope of access
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

//line retrieve client_secret , client_id and and calender_id from environment variables
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

//this line specifies the redirect URI(s) that google will use to redirect the user after they grand or deny permission to the application
const redirect_uris = [
  "https://rkanishka.github.io/My-meet/"
];

//line create new oAuth2 using client id , client secret and first redierect URI
 const oAuth2Client = new  google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
 );

 //this line defines asynchronous function that will be exported from module
 module.exports.getAuthURL = async () => {
 
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};
module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token 
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
module.exports.getCalendarEvents = async (event) => {
  const access_token = event.pathParameters.access_token;
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

 