video =""
Status =""
objects =[]

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas= createCanvas(350,350)
    canvas.center();
}

function draw() {
    image(video, 0,0, 350,350);
    if(Status != "") {
        object.detect(video, gotResults);
    for(i =0; i< objects.length; i++) {
        document.getElementById("status").innerHTML ="Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML ="Number of Objects detected are : "+objects.length;

       fill("red");
        percent =floor(objects[i].confidence *100);
        text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y);
        noFill();
       stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
} 

function Start() {
    object =ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Objects";
}

function modelLoaded() {
console.log("model is Loaded");
Status =true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error, result) {
    if(result) {
        console.log(result);
        objects =result;
    }else {
        console.error(error);
    }
}