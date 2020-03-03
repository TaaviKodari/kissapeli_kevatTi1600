let taustakuva;
let kissakuva;
let taustan_korkeus = 400;
let taustan_leveys = 800;

let lautan_leveys = 80;
let lautanY = 350;

var kissalista = [];
var kissa_ajastin;
var elamia_jaljella = 9;
var pelastetut_kissat = 0;

function preload() {
  taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
}

function setup(){
  var canvas = createCanvas(taustan_leveys,taustan_korkeus);
  canvas.parent("kissapeli");
  angleMode(DEGREES);
  //luo_kissoja();
}

function AloitaPeli()
{
  kissalista = [];
  elamia_jaljella = 9;
  pelastetut_kissat = 0;
  clearTimeout(kissa_ajastin);
  loop();
  luo_kissoja();
}

function draw(){
  image(taustakuva,0,0,taustan_leveys,taustan_korkeus);
  Luo_lautta();

  kissalista.forEach(function(kissa_olio,monesko) {
    kissa_olio.liikuta();

    if(kissa_olio.Yposition > taustan_korkeus)
    {
      kissalista.splice(monesko,1);
      elamia_jaljella = elamia_jaljella -1;
    }
    if(kissa_olio.Xposition > taustan_leveys)
    {
      kissalista.splice(monesko,1);
      pelastetut_kissat = pelastetut_kissat +1;
    }
  });
  textSize(30);
  textAlign(LEFT,TOP);
  text("Elämät: " + elamia_jaljella + "\nPelastetut kissat: " + pelastetut_kissat,5,5);
  if(elamia_jaljella <= 0)
  GameOver();

}

function Luo_lautta(){
  fill('#ffe6e6');
  rect(mouseX,taustan_korkeus -50,lautan_leveys,30,20,20,0,0);
}

function luo_kissoja()
{
  let uusi_kisu = new Kissa();
  kissalista.unshift(uusi_kisu);
  kissa_ajastin = setTimeout(luo_kissoja,2000);
}

class Kissa {
  constructor() {
    this.Xposition = 30;
    this.Yposition = 200;
    this.Xnopeus = 2;
    this.Ynopeus = -2;
    this.korkeus = 50;
    this.leveys = 50;
    this.kulma = 0;
  }
  liikuta(){
    this.Xposition = this.Xposition + this.Xnopeus;//liikutaan oikealle päin
    this.Ynopeus = this.Ynopeus + 0.05; //painovoima

    //Tähän tulee: Osuiko kissa lautaan
    if(this.Yposition + this.korkeus / 2 > lautanY)
    {
      if(this.Xposition > mouseX && this.Xposition < mouseX + lautan_leveys)
      {
        this.Ynopeus = -abs(this.Ynopeus);
      }
    }

    this.Yposition = this.Yposition + this.Ynopeus;

    //Pyöritellään kissaa
    this.kulma = this.kulma + 1;
    push();
    translate(this.Xposition,this.Yposition); // siirtää koordinaatiston origon kissan kohdalle
    rotate(this.kulma);
    imageMode(CENTER);
    image(kissakuva,0,0,this.leveys,this.korkeus);
    pop();
  }
}

function GameOver()
{
  noLoop();
  textSize(80);
  textAlign(CENTER);
  fill(255,0,0);
  text("Game Over", taustan_leveys/2,taustan_korkeus/2);
}
