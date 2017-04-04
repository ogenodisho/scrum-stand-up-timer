/* jshint esversion: 6 */
/* jshint -W097 */
/* jshint -W117 */
'use strict';

const MessageTypes = {
    PING: 0,
    PONG: 1,
    NOTIFICATION_MESSAGE: 5
};

/* Subscriptions bitmask */
const SubscriptionTypes = {
    NOTIFICATIONS: 8
};

const pingRate = 60000;

var websocket_heartbeat_interval = null,
    websocket_missed_pongs = 0;

class CitadelNotificationWebSocket {

    /**
     * @param params: Object of parameters to configure CitadelNotificationWebSocket instance:
     *		{
     *			frameType: String (optional). One of 'binary' or 'text' (default). How data between client and server will be formatted
     *			onNotification: Fn (required). Callback when socket recieves a notification message. Takes 1 arg the message data.
     *			profileId: String (required). The profile that the connection applies to
     *			onSocketError: Fn (required). Callback when an error requiring socket shutdown occurs. Takes no args
     *			onSocketOpen: Fn (required). Callback when socket connection is opened. Takes no args
     *		}
     *
     */
    constructor(params) {
        if (params.frameType && (params.frameType === 'binary' || params.frameType === 'text')) {
            this.frameType = params.frameType;
        } else {
            this.frameType = 'text';
        }

        this.onNotification = params.onNotification;

        this.profileId = params.profileId;

        this.onSocketError = params.onSocketError;

        this.onSocketOpen = params.onSocketOpen;

        this.setupSocket();
    }

    dispatchIncommingMessage(message) {
        if (message.type === MessageTypes.PONG) {
            // reset the counter for missed heartbeats
            websocket_missed_pongs = 0;
        } else if (message.type === MessageTypes.NOTIFICATION_MESSAGE) {
            let parsedNotification = {};

            /* Data is stored as a string so needs to be hydrated */
            Object.assign(parsedNotification, message.notification, {
                data: JSON.parse(message.notification.data)
            });

            this.onNotification(parsedNotification);
        } else {
            console.log(`Message type '${message.type}' unprocessed.`);
        }
    }

    setupSocket() {
        console.log('Attempting to start Websocket connction...');

        this.ws = new WebSocket(`ws://${location.host}/broadcast/subscribe/${this.profileId}/${SubscriptionTypes.NOTIFICATIONS}/${this.frameType}`);

        this.ws.onopen = (evt) => {
            console.log('Websocket opened.');

            this.onSocketOpen();
            this.sendPing();
        };

        this.ws.onmessage = (message) => {
            console.log('Websocket message recieved.');

            if (message.data instanceof Blob) {
                /* dont make global as you can get errors when it is already 'in use' */
                let binaryReader = new FileReader();
                binaryReader.addEventListener("loadend", () => {
                    this.dispatchIncommingMessage(JSON.parse(binaryReader.result));
                });
                binaryReader.readAsText(message.data);
            } else {
                this.dispatchIncommingMessage(JSON.parse(message.data));
            }
        };

        this.ws.onclose = () => {
            this.closeSocket();
        };

        this.ws.onerror = () => {
            this.ws.close();
            console.log('Websocket error detected. Attempting Closing.');
        };
    }

    closeSocket() {
        console.log('Websocket closing.');

        websocket_missed_pongs = 0;
        clearInterval(websocket_heartbeat_interval);
        websocket_heartbeat_interval = null;

        if (this.ws !== null) {
            this.ws.close();
        }
        this.ws = null;
        this.onSocketError();
        setTimeout(() => this.setupSocket(), 15000);
    }

    sendPing() {
        if (websocket_heartbeat_interval === null) {
            websocket_missed_pongs = 0;
            websocket_heartbeat_interval = setInterval(() => {
                websocket_missed_pongs++;
                if (websocket_missed_pongs >= 3) {
                    this.closeSocket();
                } else {
                    console.log('Socket sending ping.');
                    this.sendSocketMessage({
                        type: MessageTypes.PING
                    });
                }
            }, pingRate);
        }
    }

    sendSocketMessage(message) {
        try {
            if (this.frameType === 'binary') {
                this.ws.send(new Blob([JSON.stringify(message)], {
                    type: 'application/json'
                }));
            } else {
                this.ws.send(JSON.stringify(message));
            }
        } catch (e) {
            console.log('Websocket exception caught sending message.');
            this.closeSocket();
        }
    }
}

//^^^^^^^^^^^^^^Websocket declaration ^^^^^^^^^^^^^^^^

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const NOTIFICATION_ID = getParameterByName('id');
const HOST_NAME = self.location.hostname;
const PROFILE_ID = {}
const NOTIFICATION_SERVICE_URI = `http://${HOST_NAME}:6630/notification-service/notifications/v1/${NOTIFICATION_ID}`;
const PLANET_EXPRESS_BOOTSTRAP_DATA = {
    teamAvatarUrl: "https://lh3.googleusercontent.com/-v2Z4lxXe6LY/AAAAAAAAAAI/AAAAAAAAAAA/uVDfAq0u28s/photo.jpg",
    teamMembers: [{
        name: "Aaron",
        imageUrl: "http://www.tfo.su/uploads5/futurama/03.png"
    }, {
        name: "Daniel",
        imageUrl: "http://www.tfo.su/uploads5/futurama/16.png"
    }, {
        name: "Ian",
        imageUrl: "http://www.tfo.su/uploads5/futurama/41.png"
    }, {
        name: "Jason",
        imageUrl: "http://www.tfo.su/uploads5/futurama/14.png"
    }, {
        name: "Ogen",
        imageUrl: "http://www.tfo.su/uploads5/futurama/36.png"
    }, {
        name: "Tegan",
        imageUrl: "http://www.tfo.su/uploads5/futurama/29.png"
    }, {
        name: "Tom",
        imageUrl: "http://www.tfo.su/uploads5/futurama/49.png"
    }],
    durationSeconds: 120
}
const NOTIFICATION_SERVICE_INIT = {
    method: 'GET',
    headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
    }),
    mode: 'cors'
};
export const retrieveProfileNotificationData = function(onComplete) {
    fetch(NOTIFICATION_SERVICE_URI, NOTIFICATION_SERVICE_INIT)
        .then(function(response) {
            if (response.ok) {
                return response.json().then((responseData) => {
                    const bootStrapData = JSON.parse(responseData.attributes.bootStrapData);
                    onComplete(bootStrapData);

                    PROFILE_ID.value = responseData.meta.profileId;
                });
            } else {
                console.log('Network response was not ok. Defaulting to Planet Express Bootstrap Data...');
                onComplete(PLANET_EXPRESS_BOOTSTRAP_DATA)
            }
        })
        .catch(function(error) {
            console.log('Defaulting to Planet Express Bootstrap Data due to error retrieving response from the Notification service: ' + error.message);
            onComplete(PLANET_EXPRESS_BOOTSTRAP_DATA)
        });
};

const BROADCAST_MESSAGE_SERVICE_URI = `http://${HOST_NAME}:6600/broadcast-request/v1/message`
const BROADCAST_MESSAGE_SERVICE_INIT = {
    method: 'POST',
    headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
    }),
    mode: 'cors'
};
export const postNotificationMessage = function(notificationData) {
    if ("value" in PROFILE_ID === false) {
        console.log("Profile id not set yet!")
    }
    var payload = BROADCAST_MESSAGE_SERVICE_INIT;
    const data = {
        notificationId: NOTIFICATION_ID,
        profileId: PROFILE_ID.value,
        data: notificationData
    }
    payload.body = JSON.stringify(data);
    fetch(BROADCAST_MESSAGE_SERVICE_URI, payload).then(function(response) {
            return response.json();
        })
        .then(function(result) {
            alert(result);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}

export const startNotificationWebSocketListener = function(onNotification) {
    fetch(NOTIFICATION_SERVICE_URI, NOTIFICATION_SERVICE_INIT)
        .then(function(response) {
            if (response.ok) {
                return response.json().then((responseData) => {
                    new CitadelNotificationWebSocket({
                        //frameType: 'binary',
                        frameType: 'text',
                        onNotification: onNotification,
                        profileId: responseData.meta.profileId,
                        onSocketError: () => {
                            console.log("onSocketError called")
                        },
                        onSocketOpen: () => {
                            console.log("onSocketOpen called")
                        }
                    });
                });
            } else {
                console.log("Network response was not ok.");
            }
        })
        .catch(function(error) {
            console.log("Error retrieving response from the Notification service: " + error.message);
        });
}

export const audioNotification = function(msg, voice) {
    const audioService = `http://${HOST_NAME}:6620/audio-service/v1`,
        data = {
            text: msg,
            format: 'wav',
            voice: voice
        },
        init = {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'audio/wav',
                'Content-Type': 'application/vnd.api+json'
            }),
            mode: 'cors',
            body: JSON.stringify(data)
        };

    fetch(audioService, init)
        .then(function(response) {
            if (response.ok) {
                return response.blob();
            } else {
                console.log('Failed to retrieve valid response from the audio service: ' + response);
            }
        })
        .then(function(blob) {
            const audioElement = new Audio(URL.createObjectURL(blob));
            audioElement.autoplay = true;
            audioElement.load();
            audioElement.play();

            return;
        })
        .catch(function(error) {
            console.log('Error retrieving response from the audio service: ' + error.message);
        });
};
