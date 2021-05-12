#include <UIPEthernet.h>
#include<Servo.h>

EthernetClient client;
Servo myservo;

int pos = 0;
const int servoPin = 3;
const int buttonPin = 2;

byte server[] = { 192, 168, 1, 121 }; // local laptop ip

void setup() {
  Serial.begin(9600);
  Serial.println("OK! Booting stuff");
      
  uint8_t mac[6] = {0x00,0x01,0x02,0x03,0x04,0x05};
  Ethernet.begin(mac); //Configure IP address via DHCP

  if (client.connect(IPAddress(192,168,1,121), 1337)) {
    Serial.println("connected");
    client.println("connected feeder!\n");
  } else {
    Serial.println("connection failed");
  }

  Serial.println("Internet Setup done!");

  feedSetup();
}

void feedSetup(){
  pinMode(buttonPin,INPUT);
  myservo.attach(servoPin);
}

void feedCat(){
  // rotire servo-motor la 180 grade
  myservo.write(30);
  delay(2000); // delay pentru momentul in care revine la pozitia initiala
  myservo.write(180);
  //delay(3000); // blocare buton 
}

void reconnect() {
  bool reconnected = false;
  while (!reconnected) {
    if (client.connect(IPAddress(192,168,1,121), 1337)) {
      Serial.println("connected");
      reconnected = true;
    }
  }
}

void loop()
{
  int buttonVal = digitalRead(buttonPin);

  // SCENARIUL 1 : pisica apasa pe buton
  if (buttonVal == LOW) {
    client.println("x");
    client.flush();
    feedCat();
    delay(3000); // blocare buton 
  }


  // SCENARIUL 2 : comanda de hranire prin server
  // client.available() returneaza cati bytes pot fi cititi din buffer
  while (true){
    int sz = client.available();
    if (sz > 0){
      uint8_t* msg = (uint8_t*)malloc(sz+1);
      memset(msg, 0, sz+1);
      sz = client.read(msg,sz);
      Serial.write(msg,sz);

      for ( int i = 0; i < sz; i++ ){
        if (msg[i] == 'f'){
          feedCat();
        }
      }
          
      free(msg);
    } else {
      break;
    }
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    reconnect();
  }
}
