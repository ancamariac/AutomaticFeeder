#include <UIPEthernet.h>

EthernetClient client;

byte server[] = { 192, 168, 1, 121 }; // local laptop ip

void setup() {
  Serial.begin(9600);
  Serial.println("OK! Booting stuff");
      
  uint8_t mac[6] = {0x00,0x01,0x02,0x03,0x04,0x05};
  Ethernet.begin(mac); //Configure IP address via DHCP

  // TODO: try to replace the IPAddress constructor with server variable from above
  if (client.connect(IPAddress(192,168,1,121), 1337)) {
    Serial.println("connected");
    //client.println("GET /search?q=arduino HTTP/1.0");
    // TODO : remove this as it is not used ( just for debugging )
    client.println("connected feeder!\n");
  } else {
    Serial.println("connection failed");
  }

  Serial.println("Internet Setup done!");

  feedSetup();
}

void feedSetup(){
  pinMode(2, OUTPUT);
}

void feedCat(){
  digitalWrite(2, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(2, LOW);    // turn the LED off by making the voltage LOW
}

void loop()
{

  
  // client.available() returneaza cati bytes pot fi cititi din buffer
  while (true){
    int sz = client.available();
    if (sz > 0){
      //char c = client.read();
      // TODO : might want to do dynamic allocation once.
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

  // TODO : modify this so the arduino reconnects to server
  // in case of failure.
  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    for(;;)
      ;
  }
}
