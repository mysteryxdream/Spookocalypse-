
let ghosts = [];
let bat;

let score = 0;
let duration = 30;
let startTime;
let state = 'start';

function setup() {
  createCanvas(720, 540);

  spawnGhost();
  spawnGhost();
  spawnGhost();
  spawnBat();
}

function draw() {
  background(28, 12, 48);

  scale(1.5);

  // STARS
  noStroke();
  fill(225, 190, 255);

  ellipse(40, 40, 4);
  ellipse(100, 75, 4);
  ellipse(180, 35, 4);
  ellipse(290, 65, 4);
  ellipse(350, 30, 4);
  ellipse(440, 100, 4);
  ellipse(250, 110, 4);
  ellipse(60, 150, 3);
  ellipse(200, 130, 3);
  ellipse(320, 150, 3);

  // MOON
  fill(255, 225, 170);
  ellipse(400, 65, 65, 65);

  // PURPLE NIGHT SKY DETAILS
  fill(65, 35, 90);
  ellipse(100, 210, 100, 50);
  ellipse(145, 200, 90, 55);
  ellipse(350, 220, 110, 45);
  ellipse(390, 210, 90, 55);

  // GROUND
  fill(35, 65, 42);
  rect(0, 290, 480, 70);

  // GRASS
  fill(55, 110, 55);

  triangle(0, 290, 20, 255, 40, 290);
  triangle(100, 290, 120, 260, 140, 290);
  triangle(300, 290, 320, 255, 340, 290);
  triangle(430, 290, 450, 260, 470, 290);

  // TOMBSTONES
  fill(105, 100, 125);

  rect(35, 255, 35, 45);
  ellipse(52, 255, 35, 25);

  rect(130, 265, 35, 40);
  ellipse(147, 265, 35, 25);

  rect(330, 260, 35, 45);
  ellipse(347, 260, 35, 25);

  rect(420, 250, 35, 55);
  ellipse(437, 250, 35, 25);

  // PUMPKINS
  drawPumpkin(85, 300);
  drawPumpkin(250, 305);
  drawPumpkin(390, 300);

  // START SCREEN
  if (state === 'start') {
    textAlign(CENTER, CENTER);

    fill(225, 190, 255);
    textSize(28);
    text('GRAVEYARD GHOST HUNT', 240, 130);

    fill(255);
    textSize(17);
    text('Catch ghosts and avoid bats!', 240, 185);

    fill(255, 160, 50);
    textSize(22);
    text('Click to start!', 240, 240);

    return;
  }

  // GAME OVER
  if (state === 'over') {
    textAlign(CENTER, CENTER);

    fill(225, 190, 255);
    textSize(35);
    text('GAME OVER!', 240, 130);

    fill(255);
    textSize(23);
    text('Your score: ' + score, 240, 185);

    fill(255, 160, 50);
    textSize(20);
    text('Click to play again', 240, 240);

    return;
  }

  // TIMER
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  // MOVE BAT
  if (frameCount % 85 === 0) {
    spawnBat();
  }

  // DRAW THREE GHOSTS
  for (let i = 0; i < ghosts.length; i++) {
    drawGhost(ghosts[i].x, ghosts[i].y);
  }

  // DRAW BAT
  drawBat(bat.x, bat.y);

  // SCORE
  textAlign(LEFT, TOP);
  fill(255);
  textSize(18);
  text('Score: ' + score, 12, 12);

  // TIME
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), 468, 12);
}

// MOUSE CLICKING
function mousePressed() {

  let mx = mouseX / 1.5;
  let my = mouseY / 1.5;

  // START OR RESTART
  if (state === 'start' || state === 'over') {

    state = 'play';
    score = 0;
    startTime = millis();

    ghosts = [];

    spawnGhost();
    spawnGhost();
    spawnGhost();
    spawnBat();

    return;
  }

  // CATCH GHOSTS
  for (let i = 0; i < ghosts.length; i++) {

    if (dist(mx, my, ghosts[i].x, ghosts[i].y) < 30) {

      score++;

      ghosts.splice(i, 1);
      spawnGhost();

      break;
    }
  }

  // AVOID BAT
  if (dist(mx, my, bat.x, bat.y) < 25) {

    score = max(0, score - 1);

    spawnBat();
  }
}

// CREATE GHOSTS
function spawnGhost() {

  ghosts.push({
    x: random(40, 440),
    y: random(80, 220)
  });
}

// DRAW GHOSTS
function drawGhost(x, y) {

  noStroke();

  fill(220, 210, 255);
  ellipse(x, y, 65, 65);

  fill(20);
  ellipse(x - 13, y - 5, 11);
  ellipse(x + 13, y - 5, 11);

  fill(220, 210, 255);

  triangle(x - 32, y + 10, x - 27, y + 38, x - 12, y + 25);
  triangle(x + 32, y + 10, x + 27, y + 38, x + 12, y + 25);
}

// CREATE BAT
function spawnBat() {

  bat = {
    x: random(40, 440),
    y: random(80, 220)
  };
}

// DRAW BAT
function drawBat(x, y) {

  noStroke();

  fill(100, 65, 135);

  triangle(x - 10, y, x - 35, y - 22, x - 28, y + 15);
  triangle(x + 10, y, x + 35, y - 22, x + 28, y + 15);

  ellipse(x, y, 25, 27);

  fill(255, 80, 80);

  ellipse(x - 6, y - 4, 5);
  ellipse(x + 6, y - 4, 5);
}

// DRAW PUMPKINS
function drawPumpkin(x, y) {

  noStroke();

  fill(255, 125, 20);

  ellipse(x, y, 45, 35);
  ellipse(x - 12, y, 25, 33);
  ellipse(x + 12, y, 25, 33);

  // STEM
  fill(55, 120, 45);
  rect(x - 3, y - 23, 7, 12);

  // EYES
  fill(35, 35, 15);

  triangle(x - 13, y - 7, x - 5, y - 7, x - 9, y + 2);
  triangle(x + 13, y - 7, x + 5, y - 7, x + 9, y + 2);

  // MOUTH
  rect(x - 8, y + 9, 16, 4);
}
