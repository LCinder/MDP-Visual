
let puntos = [];
let _dist = [];
let NUM_PUNTOS = 500;
let CANVAS_SIZE_X = 1300;
let CANVAS_SIZE_Y = 650;
let N_ELEGIDOS = 50;

function setup() {
  createCanvas(CANVAS_SIZE_X, CANVAS_SIZE_Y);

  for (let i = 0; i < NUM_PUNTOS; i++)
    puntos.push(createVector(random(40, CANVAS_SIZE_X-40), random(40, CANVAS_SIZE_Y-40)));

  for (let i = 0; i < puntos.length; i++)
    _dist[i] = [];

  for (let i = 0; i < puntos.length; i++) {
    for (let j = i + 1; j < puntos.length; j++) {
      let dist_eu = sqrt(pow(puntos[i].x - puntos[j].x, 2) + Math.pow(puntos[i].y - puntos[j].y, 2));
      _dist[i][j] = dist_eu;
    }
  }

}

function sMasLejano() {
  let d = 0.0,
    max = 0.0;
  let iMax;
  for (let i = 0; i < NUM_PUNTOS; i++) {
    for (let j = 0; j < NUM_PUNTOS; j++) {
      if (i > j)
        d += _dist[j][i];
      if (i < j)
        d += _dist[i][j];
    }

    if (d > max) {
      max = d;
      iMax = i;
    }
    d = 0.0;
  }

  return iMax;
}


function distancia(i, s, k) {
  let d = 0.0;

      if(k<i)
        d += _dist[k][i];
      else
        d += _dist[i][k];

  return d;
}

function criterioSeleccion(s, sel) {
  let iMax;
  let max = 0.0, d = 0.0;

  for (let i=0; i < s.length; i++) {
    for (let j=0; j < sel.length; j++)
        d += distancia(sel[j], sel, s[i]);

      if (d > max) {
        max = d;
        iMax = s[i];
      }

      d = 0.0;
  }

  return iMax;
}

function Greedy() {
  let sel = [], s = [];
  let k;
  for (let i = 0; i < NUM_PUNTOS; i++)
    s.push(i);

  k = sMasLejano();
  stroke(0, 255, 0);
  strokeWeight(25);
  sel.push(k);
  s.splice(s.indexOf(k), 1);

  while (sel.length != N_ELEGIDOS) {
    k = criterioSeleccion(s, sel);
    sel.push(k);
    s.splice(s.indexOf(k), 1);
  }

  return sel;
}


function draw() {
  background(0);
  stroke(255, 0, 0);
  strokeWeight(10);
  for (let p of puntos)
    point(p.x, p.y);

  let s = Greedy();

    console.log(s.length);
  strokeWeight(15);
  stroke(0, 255, 0);
  for (let p of s)
    point(puntos[p].x, puntos[p].y);

  noLoop();
}
