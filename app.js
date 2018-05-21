// Setting constraints for the vidoe stream
var constraints = { video: { facingMode: "user"}, 
audio: false };

// Defining constants for all of the parts we created 
const   cameraView = document.querySelector("#camera-view"),
        cameraOutput = document.querySelector("#camera-output"),
        cameraSensor = document.querySelector("#camera-sensor"),
        cameraTrigger = document.querySelector("#camera-trigger");

// Lets create a function that will access the camera and stream the video to the camera-view element we create
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTrack()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. something is broken.", error);
        });
}

// Lets make the button to grab a frame from the stream that we'll use as our image output
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.classList.add("taken");
};

// Initiating the cameraStart function that starts the video stream when the window is finished loading.
window.addEventListener("load", cameraStart, false);
