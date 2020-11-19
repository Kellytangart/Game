'use strict';


//url to the api
var api = 'https://api.giphy.com/v1/gifs/search?';
//public beta key that allows people to use it to the public
var apiKey = '&api_key=dc6zaTOxFJmzC';
//q is the search query term or phrase (parameters that get strung together)
// a set of query always start with a question mark
var query = '&q=dog';


let state = 'title';
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let coin = [];


function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');
//  player = new Player();
  //coin[] = new Coin();
  //coin.push(new Coin());
  var url = api + apiKey + query;
  //gives a url from an api thats going to give JSON
loadJSON(url, gotData);
}

function gotData(giphy) {
  //createImg makes a HTML element of img src
  //the for var allows gifhy to make an image element for every single image
  for (var i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }

function draw() {


  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;
  }
}
//  if (state === 'title') {
//    title();
//  cnv.mouseClicked(titleMouseClicked);
//  } else if (state === 'level 1') {
//  level1();
// cnv.mouseClicked(level1MouseClicked);
//  }else {

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left';
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right';
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up';
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down';
  } else if (key == ' ') {
    player.direction = 'still';
  }
}


function title() {
  background(100);
  textSize(80);
  fill(255);
  textAlign(CENTER);
  text('My Game', w / 2, h / 5);

  textSize(30);
  text('click anywhere to start', w / 2, h / 2);
}

function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1() {
  background(50, 150, 200);

  if (random(1) <= 0.01) {
    coin.push(new Coin());
  }
  player.display();
  player.move();

  for (let i = 0; i < coin.length; i++) {
    coin[i].display();
    coin[i].move();
  }

  //check for collision, if there is a collision increase points by 1
  for (let i = coin.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, coin[i].x, coin[i].y) <= (player.r + coin[i].r) / 2) {
      points++;
      coin.splice(i, 1);
    } else if (coin[i].y > h) {
      coin.splice(i, 1);
      console.log('coin is out of town');
    }
  }
  text(`points: ${points}`, w / 4, h - 30);
}

function level1MouseClicked() {
  //points = points =1; diiferent way to say below
  //points += 1; diiferent ways to say below
  points++;
  console.log('points=' + points);

  if (points >= 10) {
    state = 'you win';
  }
}

function youWin() {
  background(255, 50, 80);
  textSize(80);
  stroke(255);
  text('You Win', w / 2, h / 2);
  textSize(30);
  text('click anywhere to restart', w / 2, h * 3 / 4);
}

function youWinMouseClicked() {
  state = 'level 1';
  points = 0;
}
}
