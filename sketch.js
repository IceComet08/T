var game = 0
var lander_img
var bg_img
var chao
var arvore
var arvoreL = 400
var arvI
var pedrao
var vx = 0
var sad
var g = 0.05
var vy = 0
var player
var playerL = 100
var terraM = []
var playerI, terraG, folhaG
var pedregulhos
var sujeira
var finalI, final
var leave
var pedraM = []
var plantaM = []
var win, winI
var bird, corvo
function preload() {
  bg_img = loadImage('[.webp')
  playerI = loadImage('a.png')
  arvI = loadImage('Arv.png')
  pedrao = loadImage('pede4.png')
  sujeira = loadImage('sujo.png')
  leave = loadImage('leave.png')
  finalI = loadImage('dop.png')
  corvo = loadImage('corvo.png')
  sad = loadImage("triste.png")
  winI = loadImage("d.png")
}

function setup() {
  createCanvas(1275, 575)
  frameRate(80)

  chao = createSprite(width / 2 + 180, 580, 900, 30)
  chao.visible = false
  player = createSprite(550, 50, 20, 20)
  player.addImage(playerI)
  player.scale = 0.5
  bird = createSprite(player.x, player.y - 200, 20, 20)
  final = createSprite(width / 2, height / 2, width / 2, height / 2)
  final.addImage(finalI)
  final.visible = false
  win = createSprite(width / 2, height / 2, width / 2, height / 2)
  win.addImage(winI)
  win.visible = false
  
  //bird.addImage(corvo)
  //pedrao.addImage()
  arvore = createSprite(width / 2 + 500, 360, 70, 80)
  arvore.addImage("arvI",arvI)
  arvore.addImage("sad",sad)
 
  arvore.scale = 1
  //arvore.debug = true
  arvore.setCollider('circle', 0, 0, 100)
  pedregulhos = new Group()
  terraG = new Group()
  folhaG = new Group()
}

function draw() {
  background(bg_img)
  player.velocityY = player.velocityY + 3
  player.collide(chao)
  push()
  fill(255)
  text('VIDA DA ARVORE: ' + arvoreL, 200, 75)
  text('PLAYER LIFE: ' + playerL, 400, 75)
  pop()

  //descida
  // vy +=g;
  if (game === 0) {
    attack()
    attack2()
    if (keyDown('space')) {
      console.log('tirar')
      pedregulho()
    }

    if (keyDown('A')) {
      player.x = player.x - 10
    }
    if (keyDown('D')) {
      player.x = player.x + 10
    }
    if (keyDown('W')) {
      player.y = player.y - 30
    }

    for (var i = 0; i < pedraM.length; i++) {
      if (pedraM[i].isTouching(arvore)) {
        pedraM[i].destroy()
        arvoreL = arvoreL - 10
        console.log(arvoreL)
      }
    }
    for (var i = 0; i < terraM.length; i++) {
      if (terraM[i].isTouching(player)) {
        terraM[i].destroy()
        playerL = playerL - 1
        console.log(playerL)
      }
    }
    for (var i = 0; i < plantaM.length; i++) {
      if (plantaM[i].isTouching(player)) {
        plantaM[i].destroy()
        playerL = playerL - 1
        console.log(playerL)
      }
    }

    if (player.y > 600) {
      playerL = playerL - 1
      player.y = 50
      player.x = 550
    }
    if (arvoreL < 1) {
      game = 2
    }

    if (playerL < 1) {
      game = 1
    }
  }
  if (game === 1) {
    player.visible = false
    final.visible = true
    playerL = 0
  }
  if(game === 2){

    win.visible = true
    arvore.changeImage("sad")

  }
  drawSprites()
}

function pedregulho() {
  if (frameCount % 20 === 0) {
    var pedra = createSprite(player.x, player.y, 40, 10)

    pedra.addImage(pedrao)
    pedra.scale = 0.25
    pedra.velocityX = +3

    //assign lifetime to the variable
    pedra.lifetime = 300

    //add each cloud to the group
    pedregulhos.add(pedra)
    pedraM.push(pedra)
  }
}
//obstaculos que darao dana ao player
function attack() {
  if (frameCount % 200 === 0 && arvoreL > 0) {
    var terra = createSprite(arvore.x, arvore.y + 150, 70, 10)

    terra.addImage(sujeira)
    terra.scale = 0.2
    terra.velocityX = -3
    //terra.debug = true

    //assign lifetime to the variable
    terra.lifetime = 300

    //add each cloud to the group
    terraG.add(terra)
    terraM.push(terra)
  }
}
function attack2() {
  if (frameCount % 200 === 0 && arvoreL > 0) {
    var folha = createSprite(player.x, player.y - 500, 70, 10)

    folha.addImage(leave)
    folha.scale = -0.25
    folha.velocityY = +3
    //folha.debug = true
    //assign lifetime to the variable
    folha.lifetime = 300

    //add each cloud to the group
    folhaG.add(folha)
    plantaM.push(folha)
  }
}
