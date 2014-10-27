Btton.co Smart Jacket
============================
This if the program for a smart leather jacket that can interface with the TouchTunes api to play songs via an embedded button and an 
onboard Intel Edison system

Winner of the Intel IOT Roadshow New York 

Important App Files
---------------------------
* main.js
* package.json


Requirements
-------------------------------------------
* Intel(R) Edison Module
* Button 
* Jacket
* Intel(R) XDK to upload files to the board
	or upload via SSH

Api
------------------------------------------
Choose whatever api that you want to interact with, in this case we are interacting with the touchtunes api
**Replace the Username, Password, and Api keys with your own**
You can get these by signing up for the as a developer for the service you want

Intel(R) XDK 
-------------------------------------------
To run the project, add the main.js and package.json file into the Intel XDK connected to an Edison board. The Edison must also have
a button connected to Analog Pin 0. Upload and run the program and if done correctly, when pressed the button will send an api
call. Connect to whichever api you want. 

Via SSh
-------------------------------------------
After uplaoding the files vai ssh, simply run node main.js within node_app deirectory of the edison 

