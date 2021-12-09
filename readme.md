Trains schedule app with digitraffic API Roosa Turunen

The user will input the information of the stations they want to travel between and the date they want to leave the departure station. They will receive information about the trains leaving the departure station that go the destination they have chosen. They will receive information about the train type and number, the time the train will leave and the track it will leave from. 

Because the input of stations need to be in the station shortcodes, there is also a tool which will give the station shortcode of the station that the user wants to search for. 

This project uses digitraffic APIs to get the necessary information. It could be optimized so that the program itself transforms the name of the stations automatically to the shortcodes without the help from the user. but I will have to look into that. There is also repetition since the xmlHttprequest is sent twice and processed the same way and written to the code as the same process two times. This could be optimized in a way that the call itself is a function but this will need the use of something called promises and I will have to look into that more. 

Overall I think I got the concept of how this works and can continue from here to optimize the code and learn to use multiple APIs as a complementaries to each other to form a fully functional program. 

Link to gitHub repository https://github.com/RoosaEveliina/trainAppJS

Published with Netlify https://digitrafficapi.netlify.app/ 
