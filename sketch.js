
let puntos = [];
let _dist = [];
let NUM_PUNTOS = -1;
let CANVAS_SIZE_X = 1000;
let CANVAS_SIZE_Y = 450;
let N_ELEGIDOS = -1;
let sF = [];
let iter = 0;
let a=0.0;
let scal=0.0;



function setup() {
  createCanvas(CANVAS_SIZE_X, CANVAS_SIZE_Y);


  mdp = createElement('h2','MDP - Problema de la Máxima Diversidad');
  mdp.position(1000, 50);

  mElementos = createElement('h4','Elementos a escoger (m)');
  mElementos.position(1100, 90);
  inputM = createInput();
  inputM.position(1100, 150);

  nElementos = createElement('h4','Elementos totales (n)');
  nElementos.position(1100, 170);
  inputN = createInput();
  inputN.position(1100, 230);

  button = createButton('Iniciar');
  button.position(1100, 280);
  button.mousePressed(iniciar);

}

function iniciar() {
  puntos = [];
  sF = [];
  _dist = [];
  iter = 7;
  scal = 0.0;

  NUM_PUNTOS = inputN.value();
  N_ELEGIDOS = inputM.value();

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

    background(50, 50, 50);
  stroke(255, 0, 0);
  strokeWeight(7);
  for (let p of puntos)
    point(p.x, p.y);

  sF = Greedy();

  draw();
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

function primerElemento(s) {
    if( 0 < s.length )
        return s[0];
    else return 0;
}

function draw() {

    if(NUM_PUNTOS != -1) {

      if(sF.length >= 0)
        loop();

      if(iter<35) {
          if(iter< 25) {
              a = a + 0.04;
              scal++;
          }

          else {
              a = a - 0.04;
              scal--;
          }

          fill(255);
          let p = primerElemento(sF);

          strokeWeight(scal);
          point(puntos[p].x, puntos[p].y);

          iter++;
      }

      else {
          a=0.0;
          scal=0.0;
          iter=7;
          sF.splice(0, 1);
      }


    frameRate(100);

    if(sF.length <= 0)
        noLoop();
    }
}
