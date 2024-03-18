# Whether Weather

## Description
Uses openweathermap API to get a weather forecast on searched city names.

## The Result
[Click here!](DEPLOYED_URL_HERE)

![Screenshot of the deployed project.](SCREENSHOT_OF_PROJECT_IN_ASSETS)

## Credits
- [Josh Comeau's CSS reset](https://www.joshwcomeau.com/css/custom-css-reset/)


## TODO
- [x] Create HTML sections, header + 3 body parts
- [x] Create the Search section
    - [x] Label, text input, button, search history ul
    - [x] Fetch request geocoder, get latitude & longitude
    - [x] Fetch request the weather with lat/lon
    - [x] Add successful search info to localStorage
    - [x] Presents search history as buttons
- [ ] Create the Current Weather section
    - [x] 4 blocks of string, bordered
    - [ ] Print the temp, wind speed, and humidity unstyled 
    - [ ] Print the city name, date, and weather icon
        - [ ] Wait what's the deal with weather icons??
- [ ] Create the 5-Day Forecast section
    - [x] Label, ordered list of recent weather boxes
    - [ ] Get 5 reports from 5 days (first of the day)
    - [ ] Style it similarly to Current Weather info
- [ ] Use bootstrap to format it better
    - [ ] Row with 2 columns, right column has 2 sub-rows



## User Story
AS A traveler,
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria
GIVEN a weather dashboard with form inputs

WHEN I search for a city,
THEN I am presented with current and future conditions for that city and that city is added to the search history.

WHEN I view current weather conditions for that city,
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed.

WHEN I view future weather conditions for that city,
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.

WHEN I click on a city in the search history,
THEN I am again presented with current and future conditions for that city.