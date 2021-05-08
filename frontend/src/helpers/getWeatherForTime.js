export default function getWeatherForTime(weatherList, event) {
    const time = getTimeOfDay(event);
    for(const weather in weatherList) {
        if(weatherList[weather].timeOfDay === time.timeOfDay) {
            if(weatherList[weather].date === time.day) {
                if(weatherList[weather].month === time.month) {
                    if(weatherList[weather].year === time.year) {
                        return(weatherList[weather]);
                    }
                }
            }
        }
    }
    return(null);
}

function getTimeOfDay(event) {
    const date = new Date(event.startTime)
    const timeOfDay = date.getHours();
    var time;
    if(timeOfDay < 3) {
        time = 0;
    } else if(timeOfDay >= 3 && timeOfDay < 6) {
        time = 3;
    } else if(timeOfDay >= 6 && timeOfDay < 9) {
        time = 6;
    } else if(timeOfDay >= 9 && timeOfDay < 12) {
        time = 9;
    } else if(timeOfDay >= 12 && timeOfDay < 15) {
        time = 12;
    } else if(timeOfDay >= 15 && timeOfDay < 18) {
        time = 15;
    } else if(timeOfDay >= 18 && timeOfDay < 21) {
        time = 18;
    } else if(timeOfDay >= 21 && timeOfDay < 24) {
        time = 21;
    }
    return({
        month: date.getMonth(),
        year: date.getFullYear(),
        day: date.getDate(),
        timeOfDay: time
    })
}