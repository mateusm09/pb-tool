import mqtt = require('mqtt')

const topic = 'device/status/report'

const client = mqtt.connect("mqtt://servermqtt.duckdns.org",
    {
        clientId: "jaubert-mindtech",
        username: "afira",
        password: "afira",
    });

const errorHandler = (err: string) => {
    console.log(typeof err)
    if (err) {
        console.log(err)
    }
}

function EventConnect(): void {
    console.log("Connected")
    client.subscribe([topic],
        () => {
            console.log(`Connected to ${topic}`);
        })

    client.publish(topic, 'nodejs mqtt teste', { qos: 0, retain: false }, errorHandler)
}

function EventMessage(topic: string, payload: string): string {
    console.log(`Received message on ${topic}: ${payload.toString()}`);
    return topic
}


client.on('connect', EventConnect)
client.on('message', EventMessage)