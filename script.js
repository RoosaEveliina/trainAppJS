const getButton = document.getElementById('getData');
const dateInput = document.getElementById('date');
const depStationInput = document.getElementById('departureStation');
const arStationInput = document.getElementById('arrivalStation');
const stationButton = document.getElementById('stationBtn')
const stationInput = document.getElementById('findStation')

const stationURL = 'https://rata.digitraffic.fi/api/v1/metadata/stations'
var xhr = new XMLHttpRequest();

stationButton.addEventListener('click', function(e) {
    xhr.open("GET", stationURL, true);
    xhr.send();

    xhr.onload = () => {
        stationsObj = JSON.parse(xhr.responseText);
        var searchStation = stationInput.value;
        var stationResult = '';


        for (var i = 0; i < stationsObj.length; i++) {
          if (searchStation + " asema" == stationsObj[i].stationName || searchStation == stationsObj[i].stationName) {
            stationResult = stationsObj[i].stationShortCode
            

        }
        document.getElementById('stationData').innerHTML = stationResult
        }

       
    } 
})



const baseURL = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
var xmlhttp = new XMLHttpRequest();



getButton.addEventListener('click', function(e){

    var date = dateInput.value;
    var departureStation = depStationInput.value;
    var arrivalStation = arStationInput.value;
     

    const url = baseURL + departureStation + "/" + arrivalStation + "?departure_date=" + date + "&include_nonstopping=false"

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    xmlhttp.onload = () => {
        jsonObj = JSON.parse(xmlhttp.responseText);

        var data = jsonObj;

        var showDate = new Date(dateInput.value);
        var printDay = showDate.getDate() + "." + (showDate.getMonth() + 1) + "." + showDate.getYear();
        
        var out = ` <table>
                    <tr>
                    <th>${departureStation} - ${arrivalStation} &emsp; schedules for ${printDay} </th>
                    </tr>
                    <tr>
                    <td>Train</td>
                    <td>Departure</td>
                    <td>Track</td>
                    <td>Destination</td>
                    </tr>`


        for (var i = 0; i < data.length; i++) { 

            
            var trainType = '';

           if(data[i].trainType == "IC") {
               trainType = "InterCity " + data[i].trainNumber
           }  else if (data[i].trainType == "S"){
              trainType = "Pendolino " + data[i].trainNumber
           } else if (data[i].trainType == "HL" || data[i].trainType == "HLV"){
             trainType = "Lähijuna " + data[i].commuterLineID   
           }

           
            
            var departure = data[i].timeTableRows[0].scheduledTime
            var date = new Date(departure);
            var printTime = date.getHours() + ":" + (date.getMinutes());
            
            var track = '';

           if (data[i].timeTableRows[0].commercialTrack == "") {
               track = "information missing"
           } else {
              track = data[i].timeTableRows[0].commercialTrack
           }
            
            var destination = arrivalStation

            out += `<tr>`;

            out += `<td>` + trainType + `</td>`;
            out += `<td>` + printTime + `</td>`;
            out += `<td>` + track + `</td>`;
            out += `<td>` + destination+ `</td>`;

            out += `</tr>`;
        
        }  

            out += `</table>`;

            document.getElementById('tabledata').innerHTML = out;
    }
   
})

