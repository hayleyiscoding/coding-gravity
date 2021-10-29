// Initial Setup
var canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; // automatic browser resizing

// Variables
var mouse = {
    x: innerWidth / 2, // tracking mouse positioning
    y: innerHeight / 2
}

var colors = [ // choosing color palette and storing in array
    '#D9ABFF',
    '#FFA6B5',
    '#97FEAF',
    '#FFFD72',
    '#FFC985'
];

var gravity = 1; // 9) create 'gravity' variable

var friction = 0.69 // 11) creae friction variable

//Event Listeners 
addEventListener("mousemove", (event) =>{
    mouse.x = event.clientX;
    mouse.y = event.clientY
}); 

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

addEventListener("click", () => {
    init(); // whenever you click the page the animation starts again
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random()* (max - min + 1) + min);
} // get a random integer within a specific range - just change min/max

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
} // get a random color


//Objects
function Ball(x, y, dx, dy, radius, color){ // 1) name function "Ball" with capital
    this.x = x;
    this.y = y;
    this.dx = dx; // 25) add x velocity - don't forget to add it to argument of function
    this.dy = dy; // 6) Declare velocity AND add it as an argument in same function AND add it in to init function when creating new balls ('2') 
    this.radius = radius;
    this.color = color;

    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height){ // 5) creating a function that reverses velocity when ball gets to bottom of page (+dy helps the balls to not stick together - add dy as step 24)
            this.dy = -this.dy * friction; // 7) reversing velocity 10) add friction (0.99) to slow the bounce of the ball as it bounces i.e. simulating friction
        } else {
            this.dy += gravity; // 8) change 1 to 'gravity' variable
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){ // 28) make sure that balls aren't falling off sides of screen 30) add "or" condition to make sure balls aren;t falling off left of screen
            this.dx = -this.dx; 
        }
        this.x += this.dx; // 26) needs x velocity
        this.y += this.dy; // 4) increases y velocity by 1 as long as this function keeps being called - instead change to 'dy' instead of 1. dy is velocity
        this.draw();
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // make a circle
        c.fillStyle = this.color;
        c.fill();
        c.stroke(); // step 22
        c.closePath();
        };
};

//Implementation
var ball; // 3) declare this variable outside of init function so it is accessible to animate function, too
var ballArray; // 12) to store multiple balls
function init(){
    ballArray = []; // 35) reset ball array whenever you resize page
    for(var i = 0; i < 400; i++){ // 13) Create multiple balls
        var radius = randomIntFromRange(8,20); // 23) create radius variable and minus radius from height so balls don't stick together - also change to radius in push new ball below in same function 33) Create range function for radius. 8 and 20 are the size of the balls. some big balls, some small balls
        var dx = randomIntFromRange(-2, 2); // 27) add this plus don't forget to add dx in push in same function
        var dy = randomIntFromRange(-2, 2); // 32) make y velocity random
        var x = randomIntFromRange(radius, canvas.width - radius); // 15) Randomize 29) adding radius will prevent balls from getting caught in the corners of sides fo screen 31) put 'radius' as first parameter so balls don't get caught on left of screen
        var y = randomIntFromRange(0, canvas.height - radius); // 21) also randomize y
        var color = randomColor(colors); // 34) create random colors and put in push below
        ballArray.push(new Ball(x, y, dx, dy, radius, color)); // 14) Push into ballArray
    };
    // ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, "red"); // 2) Create new ball objects, then delete this step (step 16)
    // console.log(ball); // test
    console.log(ballArray); //  step 18) test 2
}

// Animation Loop  - allows us to create multiple objects
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas each time we create an object on the screen / move your mouse, etc. This MUST be BEFORE loop.
for (var i = 0; i < ballArray.length; i++) { // 19) Animate each individua ball. If ballArray.lenth is 500, it will run 500 times each time animate function is called.
    ballArray[i].update(); // 20)

};
    // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y); // optional - adds text on your mouse as you move it
    // ball.update(); // Step 17) delete this line
};

init();
animate();

