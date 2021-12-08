//Buttons

const getButton = document.getElementById('getData');
const stationButton = document.getElementById('stationBtn');

//Variables for user inputs

const dateInput = document.getElementById('date');
const depStationInput = document.getElementById('departureStation');
const arStationInput = document.getElementById('arrivalStation');
const stationInput = document.getElementById('findStation');

//Variables necessary for making the XMLHttpRequest for station shortcodes

const stationURL = 'https://rata.digitraffic.fi/api/v1/metadata/stations';
var xhr = new XMLHttpRequest();

//Clicking the button with searchglass icon will trigger this event

stationButton.addEventListener('click', function (e) {

    //Sending the request to the url that will provide the API with station names and shortcodes

    xhr.open("GET", stationURL, true);
    xhr.send();

    //Infomation is parsed from its JSON format to array of objects that we can use later

    xhr.onload = () => {
        stationsObj = JSON.parse(xhr.responseText);

        //Getting the stations name as user input and declaring empty variable for storing the result of following loop
    
        var searchStation = stationInput.value;
        var stationResult = '';

        //Looping through the data to find shortcode for the station that the user has provided as input

        for (var i = 0; i < stationsObj.length; i++) {

            //If the input matches some station within the data, the shortcode for that station is saved in the variable that was declared before the loop
            //Some of the stations had the string asema with it so we will check for those matches also

            if (searchStation + " asema" == stationsObj[i].stationName || searchStation == stationsObj[i].stationName) {
                stationResult = stationsObj[i].stationShortCode;            
            }    

        } 
            //The result will be printed to the page
            document.getElementById('stationData').innerHTML = `<br> Shortcode for ${searchStation} is <b>${stationResult}</b>`; 
    }
});

//Variables for the XMLHttpRequest that will get the API with the schedules
//Rest of the url will be built with user input so here is only the baseURL 

const baseURL = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
var xmlhttp = new XMLHttpRequest();

//Clicking the find trains button will trigger function that provides the schedule of departing trains


getButton.addEventListener('click', function (e) {

    //Naming variables for user input

    var date = dateInput.value;
    var departureStation = depStationInput.value;
    var arrivalStation = arStationInput.value;

    //Building the url for AJAX request using the user input

    const url = baseURL + departureStation + "/" + arrivalStation + "?departure_date=" + date + "&include_nonstopping=false";

    //If there are empty values, the request can not be sent and the user will receive message about the missing information

    if (depStationInput.value == ''){
        document.getElementById('errorMessage').innerHTML = 'Please check that you have provided departure station shortcode in capital letters';

    }  else if (arStationInput.value == '' ){
        document.getElementById('errorMessage').innerHTML = 'Please check that you have provided destination station shortcode in capital letters';

    } else if( dateInput.value == '') {
        document.getElementById('errorMessage').innerHTML = 'Please check that you have provided date';

    } else {

        //If all the fields have input in correct format, error message will be empty

        document.getElementById('errorMessage').innerHTML = '';
        
        //Sending the request for API that will provide necessary information 

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        //Again parsing the response 

        xmlhttp.onload = () => {
            jsonObj = JSON.parse(xmlhttp.responseText);

            var data = jsonObj;

            //Formatting the date so output to the page will be consistent with the input data and therefore look nice

            var showDate = new Date(dateInput.value);
            var printDay = showDate.getDate() + "." + (showDate.getMonth() + 1) + "." + showDate.getFullYear();

            //Creating table with headers for information and displaying the date 

            var out = ` <table>
                    <tr>
                    <th>Trains to your destination on ${printDay}</th>
                    </tr>
                    <tr>
                    <td><b>Train</b</td>
                    <td><b>Departure</b></td>
                    <td><b>Track</b></td>
                    </tr>`

            //Looping through the array of objects to find useful information that will be displayed

            for (var i = 0; i < data.length; i++) {

                //Empty variable for the traintype since there are multiple different kinds of trains in data that need to be displayed

                var trainType = '';

                //If the traintype is IC the type InterCity will be printed along the train number

                if (data[i].trainType == "IC") {
                    trainType = "InterCity " + data[i].trainNumber;

                //If the traintype is S the type Pendolino will be printed along the train number

                } else if (data[i].trainType == "S") {
                    trainType = "Pendolino " + data[i].trainNumber;
                
                //If the traintype is HL the type Lähijuna will be printed along the ID(usually letter)
                //The different traintypes can be found in https://rail.cc/fi/junatyyppi/suomi/fi

                } else if (data[i].trainType == "HL" || data[i].trainType == "HLV") {
                    trainType = "Lähijuna " + data[i].commuterLineID;
                }

                //Formatting the departure time so that only the departure time will be displayed without the date information
                //The hours may be displayed as one digit but minutes with two digits

                var departure = data[i].timeTableRows[0].scheduledTime
                var date = new Date(departure);
                var printTime = date.getHours() + ":" + ('0'+date.getMinutes()).slice(-2);

                //Some objects were missing infomation about the track that they were leaving from so the track is declared as empty variable

                var track = '';

                //If the data is missing, the message information missing will be displayed instead of empty space

                if (data[i].timeTableRows[0].commercialTrack == "") {
                    track = "information missing" ;

                //If the information can be found, it will be displayed

                } else {
                    track = data[i].timeTableRows[0].commercialTrack;
                }

                //Placing the information that was fetched from the object in table row 

                out += `<tr>`;

                out += `<td>` + trainType + `</td>`;
                out += `<td>` + printTime + `</td>`;
                out += `<td>` + track + `</td>`;

                out += `</tr>`;

            }

            out += `</table>`;
            
            //The table is added to its place once the loop is done

            document.getElementById('tabledata').innerHTML = out;
        }  
    }
});

//Possibility to fetch the data by pressing enter

document.addEventListener("keyup",function(event) { 
    if (event.keyCode === 13){                     
        event.preventDefault();

        document.getElementById("getData").click();  
    }
});



