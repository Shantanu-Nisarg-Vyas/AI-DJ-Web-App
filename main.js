leftwristy = 0;
rightwristy = 0;
leftwristx = 0;
rightwristx = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
song = "";

function setup() {
    canvas = createCanvas(640, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 640, 500);
    fill("red");
    stroke("red");
    circle(leftwristx, leftwristy, 20);
    circle(rightwristx, rightwristy, 20);
    numleftwristy = Number(leftwristy);
    roundleftwristy = floor(numleftwristy);
    numrightwristy = Number(rightwristy);
    roundrightwristy = floor(numrightwristy);
}

function play() {
    song.play();
    song.setVolume(0.8);
    song.rate(1)
}

function modelLoaded() {
    console.log("PoseNet Initialized!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristy = results[0].pose.leftWrist.y;
        rightwristy = results[0].pose.rightWrist.y;
        leftwristx = results[0].pose.leftWrist.x;
        rightwristx = results[0].pose.rightWrist.x;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Y = " + leftwristy + ", Right Wrist Y = " + rightwristy);
        console.log("Left " + scoreleftwrist + ", Right " + scorerightwrist)
        if (scoreleftwrist > 0.2) {
            leftwrist = 500 - roundleftwristy;
            vol = leftwrist / 500;
            document.getElementById("volume").innerHTML = "Volume = " + vol;
            song.setVolume(vol);
        }
        if (scorerightwrist > 0.2) {
            if (rightwristy > 0 && rightwristy <= 100) {
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                song.rate(2.5);
            }
            if (rightwristy > 100 && rightwristy <= 200) {
                document.getElementById("speed").innerHTML = "Speed = 2x";
                song.rate(2);
            }
            if (rightwristy > 200 && rightwristy <= 300) {
                document.getElementById("speed").innerHTML = "Speed = 1.5x";
                song.rate(1.5);
            }
            if (rightwristy > 300 && rightwristy <= 400) {
                document.getElementById("speed").innerHTML = "Speed = 1x";
                song.rate(1);
            }
            if (rightwristy > 400 && rightwristy <= 500) {
                document.getElementById("speed").innerHTML = "Speed = 0.5x";
                song.rate(0.5);
            }
        }
    }
}