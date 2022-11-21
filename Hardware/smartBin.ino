#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <NewPing.h> 

//3nG5tuDt   //39829828 
const char* ssid = "HSD";
const char* password = "39829828";

// Domain Name with full URL Path for HTTP PUT Request
const char* serverName = "http://54.178.202.126:4009/Hardware/update/bin";
const char* serverName1 = "http://54.178.202.126:4009/Hardware/update/binCompaction";

// THE DEFAULT TIMER IS SET TO 10 SECONDS FOR TESTING PURPOSES
// For a final application, check the API call limits per hour/minute to avoid getting blocked/banned
unsigned long lastTime = 0;
// Timer set to 10 seconds (10000)
unsigned long timerDelay = 10000;

//buzzer pin
const int buzzer = 5; //D1

//IR sensor pin
int IRSensor = 16; //D0

int max_distance = 20;
int compaction = 0;



// Motor A

int in1 = 15; //D8
int in2 = 13; //D7

//ultrasonic sensor 
const int trigPin = 0; //D3
const int echoPin = 4; //D2

//to take the distance directly
NewPing sonar(trigPin, echoPin, max_distance);

//for 3 LEDs
int ledA=2; //D4  -->RED
int ledB=14; //D5 -->YELLOW
int ledC=12; //D6  --> GREEN

//to check percentage levels
int a=60;
int b=25;



void setup() {
// put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 10 seconds (timerDelay variable), it will take 10 seconds before publishing the first reading.");

  // Random seed is a number used to initialize a pseudorandom number generator
  randomSeed(analogRead(0));


  
  pinMode (ledA,OUTPUT);
  pinMode (ledB,OUTPUT);
  pinMode (ledC,OUTPUT);
  pinMode (buzzer, OUTPUT);
  pinMode (IRSensor, INPUT);

  digitalWrite(ledA, LOW);
  digitalWrite(ledB, LOW);
  digitalWrite(ledC, LOW);
  digitalWrite(buzzer, LOW);  

  pinMode(trigPin,OUTPUT);
  pinMode(echoPin, INPUT);

// Set all the motor control pins to outputs
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);

}


void demoOne()
 
{
 
  // This function will run the motors in both directions at a fixed speed
 
  // Turn on motor A
 
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
 
  // Set speed to 200 out of possible range 0~255
 
  //analogWrite(enA, 200);
 
  delay(30000);
 
  // Now change motor directions
 
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);  
 
  delay(35000);
 
  // Now turn off motors
 
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);  
  
 
}

void loop() {

// put your main code here, to run repeatedly:
long duration = 0, inches , cm ;
int percentage;
char binColor[2]; 
int i;

digitalWrite(trigPin, LOW);
delayMicroseconds(2);
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

// take distance from sensor to garbage
cm = sonar.ping_cm();
// take the fill level as percentage
percentage = (100-(100/max_distance)*cm);
Serial.println(cm);

Serial.println(percentage);
delayMicroseconds(50000);  
//if fill level>= 60% ON --> red
if (percentage >=a) {
  binColor[0] = 'r';
  digitalWrite (ledA,HIGH);
  digitalWrite (ledB,LOW); 
  digitalWrite (ledC,LOW);
  
  Serial.println("RED");
  // only do 1 compaction
  if (compaction < 1)  {   
    int statusSensor = digitalRead (IRSensor);      
       
    if(statusSensor == 1){
      digitalWrite(buzzer, HIGH); 
      demoOne();      
    }  
        
    compaction = compaction +1 ;
    
  }
  else{
    digitalWrite(buzzer, LOW);     
    compaction =0;
  }
} 
//if fill level>= 20% and <60% ON --> YELLOW
else if (percentage >=b && percentage < a){
  binColor[0]='y';
  digitalWrite(buzzer, LOW);
  digitalWrite (ledA,LOW);
  digitalWrite (ledB,HIGH); 
  digitalWrite (ledC,LOW);  
  Serial.println("YELLOW"); 
}
//if fill level<20% ON --> GREEN
else if (percentage <b){
  digitalWrite(buzzer, HIGH);
  binColor[0]='g'; 
  digitalWrite (ledA,LOW);
  digitalWrite (ledB,LOW); 
  digitalWrite (ledC,HIGH);  
  Serial.println("GREEN"); 
}
delayMicroseconds(50000);
 //Send an HTTP POST request every 10 seconds
 //if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      //http.begin(client, serverName1);
      
      // Specify content-type header
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      // Data to send with HTTP POST
      String httpRequestData = "&binId=" + String(1) +"&binFillLevel=" + String(percentage) +"&binColor="+ binColor;  
      //String httpRequestData = "&binId=" + String(1) +"&binFillLevel=" + String(70) +"&binColor="+ "r"; 
      //String httpRequestData1 = "&binId=" + String(1) +"&binCompactionCycles=" + String(compaction);           
      // Send HTTP POST request
      int httpResponseCode = http.PUT(httpRequestData);
      //int httpResponseCode1 = http.PUT(httpRequestData1);
      
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      //Serial.println(httpResponseCode1);      
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  //}
      
     

}


