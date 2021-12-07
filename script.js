const getButton = document.getElementById('getData');
const dateInput = document.getElementById('date');
const depStationInput = document.getElementById('departureStation');
const arStationInput = document.getElementById('arrivalStation');

const baseURL = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
var xmlhttp = new XMLHttpRequest();


getButton.addEventListener('click', function(e){

    const date = (dateInput.value);
    let departureStation = (depStationInput.value);
    let arrivalStation = (arStationInput.value);

    const url = baseURL + departureStation + "/" + arrivalStation + "?departure_date=" + date + "&include_nonstopping=false"

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    xmlhttp.onload = () => {
        jsonObj = JSON.parse(xmlhttp.responseText);

        var data = jsonObj;
        
        var out = ` <table>
                    <tr>
                    <th>${departureStation} - ${arrivalStation}</th>
                    </tr>
                    <tr>
                    <td>Train</td>
                    <td>Departure</td>
                    <td>Track</td>
                    <td>Destination</td>
                    <td>Arrival<td>
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

           var track = '';

           if (data[i].timeTableRows[0].commercialTrack == "") {
               track = "information missing"
           } else {
              track = data[i].timeTableRows[0].commercialTrack
           }
            
            var departure = data[i].timeTableRows[0].scheduledTime

            var date = new Date(departure);


            var printTime = date.getHours() + ":" + (date.getMinutes());


            
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
