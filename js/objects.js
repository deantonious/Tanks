const PLAYER = 0, TANK_1 = 1, TANK_2 = 2;

class Tank {
    constructor(x, y, type, speed) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.bulletLife;
        this.bullets = [];
        this.type = type;
        this.speed = speed;
        this.last_shoot = 0;

        if(type == PLAYER) {
            this.maxBullets = 1;
            this.bulletLife = 2;
        } else if(type == TANK_1) {
            this.maxBullets = 1;
            this.bulletLife = 3;
        }
    }

    //Disparar una bala a la posición dada con una velocidad
    shoot(targetX, targetY, speed) {
        var bulletRotation = Math.atan2(targetY-this.y, targetX-this.x);
        var bullet = new Bullet(this.x, this.y, bulletRotation, speed, this.bulletLife, false);
        this.bullets.push(bullet);
    }

    draw(ctx, targetX, targetY) {

        if(this.type == PLAYER) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation); // *Math.PI/180);
            var sprite = new Image();
            sprite.src = './sprites/tank_green_0.png';
            ctx.drawImage(sprite, -32/2, -32/2, 32, 32);
            ctx.restore();

            //Dubujar torreta
            var turret_rotation = Math.atan2(targetY-this.y, targetX-this.x);
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(turret_rotation); // *Math.PI/180);
            var sprite = new Image();
            sprite.src = './sprites/tank_green_turret.png';
            ctx.drawImage(sprite, -32/2, -32/2, 32, 32);
            ctx.restore();

        } else if(this.type == TANK_1) {
            this.rotation = Math.atan2(targetY-this.y, targetX-this.x);
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation); // *Math.PI/180);
            var sprite = new Image();
            sprite.src = './sprites/tank_blue_0.png';
            ctx.drawImage(sprite, -32/2, -32/2, 32, 32);
            ctx.restore();

            //Dubujar torreta
            var turret_rotation = Math.atan2(targetY-this.y, targetX-this.x);
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(turret_rotation); // *Math.PI/180);
            var sprite = new Image();
            sprite.src = './sprites/tank_blue_turret.png';
            ctx.drawImage(sprite, -32/2, -32/2, 32, 32);
            ctx.restore();
        }

        for(var i in this.bullets) {
            this.bullets[i].draw(ctx);
        }

        //ctx.rotate(this.rotation*Math.PI/180);
        //ctx.drawImage(img, -img.width/2, -img.height/2);
    }
}

class Bullet {
    constructor(x, y, rotation, speed, life, out) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.speed = speed;
        this.life = life;
        this.out = out;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation); // *Math.PI/180);
        var sprite = new Image();
        sprite.src = './sprites/bullet_projectile.png';
        ctx.drawImage(sprite, -32/2, -32/2, 32, 32);
        ctx.restore();


        // ctx.beginPath();
        // ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        // ctx.fillStyle = 'orange';
        // ctx.fill();
    }
}

class Wall {
    constructor(sprite, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    fill(ctx) {
        if(ctx == null) {
            console.log('No context defined');
        } else {

            var sprite = new Image();
            sprite.src = './sprites/' + this.sprite;
            ctx.drawImage(sprite, this.x, this.y, 64, 64);
        }
    }
}
