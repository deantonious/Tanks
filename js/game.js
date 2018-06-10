//0 = empezar, 1 = jugando, 2 = pausa, 3 = gameover
const START = 0, PLAYING = 1, PAUSE = 2, GAME_OVER = 3, END = 4;
const MAX_LIVES = 3;

var canvas, ctx, mouseX, mouseY, mouseInRange;
var player, tanks = [], walls = [];
var score = 0;
var lives = 3;

var sound_shot, sound_bounce;

var wall_sprites = ['tree1.png', 'tree2.png', 'tree3.png', 'col.png'];

var status;

//Variables de movimiento
var new_x, new_y, move;

//Sprites
var heart = new Image();
var bullet = new Image();

var level = 0;

var levels = [
    //Nivel 0 | 1 Enemigo
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    //Nivel 1 | 1 Enemigo
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    //Nivel 2 | 2 Enemigos
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    //Nivel 3 | 2 Enemigos
    [[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    //Nivel 4 | 3 Enemigos
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    //Último Nivel 5 | 4 Enemigos
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]];

//Eventos
window.addEventListener('load', init, false);
window.addEventListener('mousemove', function(event) { mouseMove(event); }, false);
window.addEventListener('click', function(event) { mouseClick(event); }, false);
window.addEventListener('keydown', function(event) { keyDown(event.which); }, false);

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) { window.setTimeout(callback, 17); };
}());

function paint(ctx) {
    //Fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Radio disparo
    ctx.beginPath();
    ctx.arc(player.x, player.y, 250, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.fill();

    //Pintar jugador y sus balas
    player.draw(ctx, mouseX, mouseY);

    //Pintar tanques enemigos y sus balas
    for(var i = 0; i < tanks.length; i++) {
        tanks[i].draw(ctx, player.x, player.y);
    }

    //Cursor
    ctx.strokeStyle = '#fff';
    ctx.setLineDash([6, 10]);
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY-19);
    ctx.lineTo(mouseX, mouseY+20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mouseX-19, mouseY);
    ctx.lineTo(mouseX+20, mouseY);
    ctx.stroke();

    if (status == PLAYING && mouseInRange) {
        //Linea de trayectoria
        ctx.strokeStyle = '#fff';
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.strokeStyle = 'lightred';
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.setLineDash([0, 0]);
    }

    //Pintar muros
    for(var i in walls) {
        walls[i].fill(ctx);
    }

    //Vidas
    var start_w = canvas.width-50;
    for(var i = 0; i < lives; i++) {
        ctx.drawImage(heart, start_w, 10, 32, 32);
        start_w -= 25;
    }

    start_w = canvas.width-50;
    for(var i = 0; i < player.maxBullets - player.bullets.length; i++) {
        ctx.drawImage(bullet, start_w, 50, 32, 32);
        start_w -= 25;
    }


    if(status != PLAYING) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.fillStyle='#fff';
    ctx.textAlign = 'center';
    //Estado del juego
    if (status == START) {
        ctx.font = '64px Courier';
        ctx.fillText('EPIC TANKS', canvas.width/2, canvas.height/2);
        ctx.font = '16px Courier';
        ctx.fillText('Pulsa P o ESPACIO para jugar [Lvl. ' + level + ']', canvas.width/2, canvas.height/2 + 35);
    }
    if (status == GAME_OVER) {
        ctx.font = '64px Courier';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
        ctx.font = '16px Courier';
        ctx.fillText('Pulsa ESPACIO para jugar otra partida.', canvas.width/2, canvas.height/2 + 35);
        ctx.font = '20px Courier';
        ctx.fillText(score + ' PUNTOS', canvas.width/2, canvas.height/2 + 65);
    }
    if(status == PAUSE) {
        ctx.font = '64px Courier';
        ctx.fillText('PAUSA', canvas.width/2, canvas.height/2);
        ctx.font = '16px Courier';
        ctx.fillText('Pulsa ESC o P para seguir.', canvas.width/2, canvas.height/2 + 35);
    }
    if(status == END) {
        ctx.font = '64px Courier';
        ctx.fillText('VICTORIA!!!!', canvas.width/2, canvas.height/2);
        ctx.font = '18px Courier';
        ctx.fillText('Enhorabuena! Has completado todos los niveles!', canvas.width/2, canvas.height/2 + 35);
        ctx.font = '20px Courier';
        ctx.fillText(score + ' PUNTOS', canvas.width/2, canvas.height/2 + 65);
    }
}

function repaint() {

}

function act() {
    if(status == PLAYING) {
        if(tanks.length == 0) {
            //Victoria
            status = START;
            score *= lives;
            lives = 3;
            level++;
            if(level < levels.length) {
                if(level == 0) {
                    loadLevel(levels[0], 1, 1);
                }
                if(level == 1) {
                    loadLevel(levels[1], 1, 2);
                }
                if(level == 2) {
                    loadLevel(levels[2], 2, 2);
                }
                if(level == 3) {
                    loadLevel(levels[3], 2, 3);
                }
                if(level == 4) {
                    loadLevel(levels[4], 3, 3);
                }
            } else {
                status = END;
            }
        }

        //Mover enemigos y balas
        for(var i in tanks) {
            for(var j in tanks[i].bullets) {

                //Mover bala
                tanks[i].bullets[j].x += Math.cos(tanks[i].bullets[j].rotation)*tanks[i].bullets[j].speed;
                tanks[i].bullets[j].y += Math.sin(tanks[i].bullets[j].rotation)*tanks[i].bullets[j].speed;

                if(tanks[i].bullets[j].life == 0) {
                    //Eliminar bala del array
                    tanks[i].bullets.splice(j, 1);
                } else {
                    //Colision horizontal
                    if(tanks[i].bullets[j].x >= canvas.width || tanks[i].bullets[j].x <= 0) {
                        tanks[i].bullets[j].rotation = Math.PI - tanks[i].bullets[j].rotation;
                        tanks[i].bullets[j].life--;
                        sound_bounce.play();
                    }
                    //Colision vertical
                    if(tanks[i].bullets[j].y >= canvas.height || tanks[i].bullets[j].y <= 0) {
                        tanks[i].bullets[j].rotation = 2*Math.PI - tanks[i].bullets[j].rotation;
                        tanks[i].bullets[j].life--;
                        sound_bounce.play();
                    }
                    //Colision con muro
                    for(var w in walls){
                        if (tanks[i].bullets[j] != undefined && inRange(tanks[i].bullets[j].x, tanks[i].bullets[j].y, walls[w].x + (walls[w].width/2), walls[w].y + (walls[w].height/2), walls[w].width/2+6)) {
                            tanks[i].bullets.splice(j, 1);
                        }
                    }
                }

                //Impacto de bala enemiga con jugador
                if (tanks[i].bullets[j] != undefined && inRange(tanks[i].bullets[j].x, tanks[i].bullets[j].y, player.x, player.y, 23)) {
                    tanks[i].bullets.splice(j, 1);
                    lives--;
                    if (lives == 0)
                        status = GAME_OVER;
                }
            }

            //Disparar
            if(status == PLAYING) {
                if(tanks[i].bullets.length < tanks[i].maxBullets) {
                    var now = Date.now();
                    if(now - tanks[i].last_shoot > 1000) {
                        tanks[i].shoot(player.x, player.y, 5);
                        tanks[i].last_shoot = now;
                    }
                }

            }
        }

        //Mover jugador y balas
        for(var i in player.bullets) {
            player.bullets[i].x += Math.cos(player.bullets[i].rotation)*player.bullets[i].speed;
            player.bullets[i].y += Math.sin(player.bullets[i].rotation)*player.bullets[i].speed;

            if(player.bullets[i].life == 0) {
                //Eliminar bala del array
                player.bullets.splice(i, 1);
            } else {
                //Colision horizontal
                if(player.bullets[i].x >= canvas.width || player.bullets[i].x <= 0) {
                    player.bullets[i].rotation = Math.PI - player.bullets[i].rotation;
                    player.bullets[i].life--;
                    sound_bounce.play();
                }
                //Colision vertical
                if(player.bullets[i].y >= canvas.height || player.bullets[i].y <= 0) {
                    player.bullets[i].rotation = 2*Math.PI - player.bullets[i].rotation;
                    player.bullets[i].life--;
                    sound_bounce.play();
                }
                //Colision bala con muro
                for(var w in walls) {
                    if (player.bullets[j] != undefined && inRange(player.bullets[j].x, player.bullets[j].y, walls[w].x + (walls[w].width/2), walls[w].y + (walls[w].height/2), walls[w].width/2+6)) {
                        player.bullets.splice(j, 1);
                    }
                }

                //Impacto fuego amigo
                if(player.bullets[i] != undefined && !inRange(player.bullets[i].x, player.bullets[i].y, player.x, player.y, 23))
                    player.bullets[i].out = true;

                if(player.bullets[i] != undefined && inRange(player.bullets[i].x, player.bullets[i].y, player.x, player.y, 23) && player.bullets[i].out == true){
                    player.bullets.splice(i, 1);
                    lives--;
                    if (lives == 0)
                        status = GAME_OVER;
                }
            }

            //Impactar bala con otro tanque
            for(var j in tanks){
                if (player.bullets[i] != undefined && inRange(player.bullets[i].x, player.bullets[i].y, tanks[j].x, tanks[j].y, 23)) {
                    player.bullets.splice(i, 1);
                    tanks.splice(j, 1);
                    score++;
                }
            }
        }
    }
}

function run() {
    setTimeout(run, 20); //1000/100FPS = 10
    act();
    paint(ctx);
}

function init() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    mouseInRange = false;

    canvas.style.width='60%';
    canvas.width = canvas.offsetWidth;
    canvas.height = 600;
    canvas.style.height='600px';

    heart.src = './sprites/heart.png';
    bullet.src = './sprites/bullet.png';
    status = START;

    sound_shot = document.createElement('audio');
    sound_shot.src = './sounds/shot.mp3';

    sound_bounce = document.createElement('audio');
    sound_bounce.src = './sounds/bounce.mp3';

    //player = new Tank(getAleatorio(25, canvas.width - 30), getAleatorio(25, canvas.height - 30), PLAYER, 3);
    loadLevel(levels[0], 1, 1);
    repaint();
    run();
}

/*
    EVENTOS
*/
function keyDown(key) {
    if(status == START) {
        //Si estamos en pausa solo controlamos el control de pausa
        //P (pause) o ESPACIO
        if(key == 80 || key == 32) {
            status = PLAYING;
        }
    } else if (status == PLAYING) {

        if(key == 87) {
            //W
            new_x = player.x + Math.cos(player.rotation)*player.speed;
            new_y = player.y + Math.sin(player.rotation)*player.speed;
            move = false;
            //Dentro del canvas
            if(new_x > 5 && new_x < canvas.width - 5 && new_y > 5 && new_y < canvas.height - 5) {
                var move = true;
                for(var w in walls) {
                    if(inRange(new_x, new_y, walls[w].x + (walls[w].width/2), walls[w].y + (walls[w].height/2), walls[w].width/2+8)) {
                        move = false;
                    }
                }
            }
            if(move) {
                player.x = new_x;
                player.y = new_y;
            }
        }
        if(key == 65) {
            //A
            player.rotation -= 10*Math.PI/180;
            if(player.rotation <= 0)
                player.rotation += 360*Math.PI/180;
        }
        if(key == 83) {
            //S
            new_x = player.x - Math.cos(player.rotation)*player.speed;
            new_y = player.y - Math.sin(player.rotation)*player.speed;
            move = false;
            //Dentro del canvas
            if(new_x > 5 && new_x < canvas.width - 5 && new_y > 5 && new_y < canvas.height - 5) {
                var move = true;
                for(var w in walls) {
                    if(inRange(new_x, new_y, walls[w].x + (walls[w].width/2), walls[w].y + (walls[w].height/2), walls[w].width/2+8)) {
                        move = false;
                    }
                }
            }
            if(move) {
                player.x = new_x;
                player.y = new_y;
            }
        }
        if(key == 68) {
            //D
            player.rotation += 10*Math.PI/180;
            if(player.rotation >= 360*Math.PI/180)
                player.rotation -= 360*Math.PI/180;

        }
        if(key == 32) {
            //Espacio
            //TODO: Powerup
        }
        if(key == 80 || key == 27) {
            //P o ESC (pause)
            status = PAUSE;
        }
    } else if(status == PAUSE) {
        //P o ESC (pause)
        if(key == 80 || key == 27) {
            status = PLAYING;
        }
    } else if (status == GAME_OVER) {
        if (key == 32) {
            status = START;
            score = 0;
            level = 0;
            loadLevel(levels[0], 1, 1);
        }
    }
}

function mouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if(inRange(mouseX, mouseY, player.x, player.y, 250)) {
        mouseInRange = true;
    } else {
        mouseInRange = false;
    }
}

function mouseClick(event) {
    if (status == PLAYING) {
        //Disparar bala
        if(player.bullets.length < player.maxBullets && mouseInRange) {
            sound_shot.play();

            player.shoot(mouseX, mouseY, 5);
        }
    }
}

function inRange(x0, y0, x1, y1, range) {
    if(Math.sqrt((x0-x1)*(x0-x1) + (y0-y1)*(y0-y1)) < range)
        return true;
    return false;
}

function getAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min));
}

function loadLevel(map, max_player_bullets, max_enemy_bullets) {
    lives = MAX_LIVES;
    tanks = [];
    walls = [];
    //Cargar mapa
    var x_step = canvas.width / map[0].length;
    var y_step = canvas.height / map.length;
    var x = 0, y = 0, size = 64;
    for(var i in map) {
        for(var j in map[i]) {
            if(map[i][j] == 1) {
                //Spawnear jugador
                player = new Tank(x, y, PLAYER, 5);
                player.maxBullets = max_player_bullets;
            }
            if(map[i][j] == 2) {
                //Spawnear muro
                var wall = new Wall(wall_sprites[getAleatorio(0, wall_sprites.length)], x, y, size, size);
                walls.push(wall);
            }
            if(map[i][j] == 3) {
                //Spawnear tanque enemigo
                var new_tank = new Tank(x, y, TANK_1, 3);
                new_tank.maxBullets = max_enemy_bullets;
                tanks.push(new_tank);
            }
            x += x_step;
        }
        x = 0;
        y += y_step;
    }
}
