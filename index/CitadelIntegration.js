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
const NOTIFICATION_SERVICE_URI = `http://localhost:6630/notification-service/notifications/v1/${NOTIFICATION_ID}`;
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

export const audioNotification = function(msg) {
    const audioService = 'http://localhost:6620/audio-service/v1',
        data = {
            text: msg,
            format: 'wav',
            voice: 'cmu-rms-hsmm'
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
