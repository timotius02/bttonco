/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*global */

var request = require('request');
var mraa = require('mraa'); //require mraa
//var LCD = require('jsupm_i2clcd');
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
// var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
// myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var loginKey;
var buttonPressed = false;

//Load i2clcd module
//Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS) 
//var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);
//myLcd.setCursor(0,0);
//myLcd.write('Hello World');  

periodicActivity(); //call the periodicActivity function

function periodicActivity() {
    var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    var analogValue = analogPin0.read(); //read the value of the analog pin

    if (analogValue >= 1000 && buttonPressed === false) {
        console.log('pressing Button');
        buttonPressed = true;
        request.post({
            url: "https://api.mytouchtunes.com/v2/access_token",
            form: {

                grant_type: 'password',
                username: 'USERNAME',
                password: 'PASSWORD',
                oauth_consumer_key: 'AUTH KEY'
            }
        }, function(error, response, body) {

            if (error) {
                console.log(error);
            } else {
                loginKey = 'Bearer ' + JSON.parse(body).response.access_token;
                console.log(loginKey);
                request.post({
                    headers: {
                        'Authorization': loginKey
                    },
                    url: 'https://api.mytouchtunes.com/v2/users/816635/locations',
                    form: {

                        device_id: '2068872'
                    }

                }, function(error, response, body) {
                    if (error) {
                        console.error(error);
                    } else {

                        request.post({
                            headers: {
                                'Authorization': loginKey
                            },
                            url: "https://api.mytouchtunes.com/v2/locations/148418/devices/2068872/queues/jukebox",
                            form: {

                                song_id: '44791909',
                                play_next: '1'
                            }
                        }, function(error, response, body) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('success!');
                                setTimeout(function(){
                                    buttonPressed = false;
                                }, 1000)
                                setTimeout(periodicActivity, 500); //call the indicated function after 1 second (1000 milliseconds)
                            }

                        });
                    }
                });


            }
        });

    } else {
        setTimeout(periodicActivity, 500); //call the indicated function after 1 second (1000 milliseconds)    
    }
    
    
}