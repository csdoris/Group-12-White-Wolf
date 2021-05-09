# Group-12-White-Wolf

Weather you're ready is a web application that aids in the planning of trips. In Weather you're ready, you are able to create plans and populate them with events and have weather information presented to you. Events will also be placed on a map for you to visualise your trip/plan. Additionally, you are able to login with Google, and are able to import calendar events in the form of ICS file as well as export your events. You are also able to view your plans along with the location of events offline which is ideal for remote locations.

## The Weather Forecasting
For this application the OpenWeather API is used, in particular its [5 Day/ 3 Hour forecast API](https://openweathermap.org/forecast5). This will allow weather information to be displayed for events that are occurring within 5 days the current viewing date.
## Installation

Before you install and get started with this project, please ensure that you have installed nodejs and npm on your computer. You can download nodejs [here](https://nodejs.org/en/download/). 

First, clone the repo onto your computer:

```
git clone https://github.com/csdoris/Group-12-White-Wolf.git
cd Group-12-White-Wolf
```

Then run the application locally, both frontend and backend must be ran together. To run the application perform the following on two separate terminal windows pointed to the root directory of the project:

**Frontend:**

```
cd frontend
npm install
npm start
```

**Backend:** <sup>[1]</sup>

```
cd backend
npm install
npm start
```

**Note:** the `npm install` command only applies on the first installation of the proejct. Subsequent runs of the program do not require you to run this command.

## Testing

In order to run the tests:

**Frontend:**

```
cd frontend
npm test --watchAll
```

**Backend:** <sup>[2]</sup>

```
cd backend
npm test -- --runInBand
```

<sup>[1]</sup> Before running the backend, you will need to create a `.env` file in the `backend` folder. This file will need the following keys present:

-   ATLAS_URI="_REPLACE_WITH_YOUR_API_KEY_"
-   GOOGLE_MAPS_API_KEY="_REPLACE_WITH_YOUR_API_KEY_"
-   WEATHER_API_KEY="_REPLACE_WITH_YOUR_API_KEY_"
-   SECRET_KEY="_REPLACE_WITH_YOUR_API_KEY_"
-   GOOGLE_CLIENT_ID="_REPLACE_WITH_YOUR_API_KEY_"

To obtain your own API keys head over to our [wiki page](https://github.com/csdoris/Group-12-White-Wolf/wiki/Getting-your-own-API-keys).

<sup>[2]</sup> The `--runInBand` flag is required to run tests in sequential order, due to port 3000 being required for multiple suites.