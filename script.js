const getButton = document.getElementById('getData');
const dateInput = document.getElementById('date');
const depStationInput = document.getElementById('departureStation');
const arStationInput = document.getElementById('arrivalStation');
var xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/station/HKI/RI?departure_date=2021-12-08&include_nonstopping=false" )
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        jsonObj = JSON.parse(xmlhttp.responseText);

        console.log(jsonObj[1].timeTableRows[0].scheduledTime)
    }
}
