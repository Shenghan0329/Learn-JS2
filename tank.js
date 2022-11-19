class bullet {
    constructor(obj, damage, l, t, dirX, dirY, speed, bounce) {
        this.obj = obj;
        this.damage = damage;
        this.l = l;
        this.t = t;
        this.obj.style.left = l + "px";
        this.obj.style.top = t + "px";
        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = speed;
        this.bounce = bounce;
    }
    clear() {
        var b = this.obj;
        b.parentElement.removeChild(b);
        // this = null;
    }
    fly(obj) {
        let bullet = this;
        let b = this.obj;
        let dirX = this.dirX;
        let dirY = this.dirY;
        let speed = this.speed;
        let hit = false;
        var stop = setInterval(function () {
            var left = parseInt(b.style.left);
            var top = parseInt(b.style.top);
            var posX = left + 2 * speed * dirX;
            var posY = top + 2 * speed * dirY;
            // console.log(posX);
            if (!bullet.hit(obj)) {
                b.style.left = posX + "px";
                b.style.top = posY + "px";
            }
            else {
                clearInterval(stop);
                bullet.clear();
                hit = true;
                obj.life = obj.life - 10;
                addClass(obj.name,"hit");
                setTimeout(function () {
                    removeClass(obj.name, "hit");
                }, 200);
                obj.isDead();
            }
        }, 10);
        setTimeout(function () {
            if (hit == true) {
                return;
            }
            clearInterval(stop);
            bullet.clear();
        }, 4000);
    }
    hit(obj) {
        let b = this.obj;
        let bX = parseInt(b.style.left);
        let bY = parseInt(b.style.top);
        let oX = parseInt(obj.name.style.left)+20;
        let oY = parseInt(obj.name.style.top)+20;
        let dist = Math.sqrt(((bX - oX) * (bX - oX) + (bY - oY) * (bY - oY)));
        if (dist < 32) {
            return true;
        } else {
            return false;
        }
    }
}
class Tank {
    constructor(name, rotate, boardwidth, boardheight) {
        this.name = name;
        this.boardwidth = boardwidth;
        this.boardheight = boardheight;
        var tank = this.name;
        this.life = 500;
        tank.style.transform = "rotate(" + rotate + "deg)";
    }
    isAlive() {
        return this.life > 0 ? true : false;
    }
    isDead() {
        console.log(this.isAlive());
        if (!this.isAlive()) {
            this.name.backgroundImage = "";
            setTimeout(function () {
                removeClass(this.name, "destroyed");
                // this.name.parentElement.removeChild(this.name);
                alert("Game ended");
                location.reload();
            }, 3000);
        }
    }
    move(char, value) {
        let oldValue = parseInt(getComputedStyle(this.name).getPropertyValue(char));
        var newValue = oldValue + value;
        this.name.style[char] = newValue + "px";
    }
    rotate(angle, endpoint) {
        var rotate = this.name.style.transform.match(/rotate\((.+)\)/);
        if (rotate) {
            var [num, unit] = rotate.slice(1);
            num = parseInt(num) % 360;
        } else {
            num = 0;
        }
        if ((num - endpoint) % 360 == 0) {
            return;
        }
        num = num > 0 ? num : num + 360;
        var diff = (num - endpoint);
        var direction;
        if ((diff > 0&&diff<180)||(diff<0&&diff<-180)) {
            direction = -1;
        } else {
            direction = 1;
        }
        
        var deg = num + direction * angle;
        this.name.style.transform = "rotate(" + deg + "deg)";
    }
    isLegal(dir,sign) {
        var tank = this.name;
        var dir = parseInt(tank.style[dir]);
/*        console.log(dir);*/
        if (sign > 0) {
            if (dir < 0) {
                return false;
            }
        } else if (sign < 0) {
            //console.log(dir);
            //console.log(this.boardwidth);
            if (dir > this.boardwidth) {
                return false;
            }
        } else {
            //console.log(dir);
            //console.log(this.boardheight);
            if (dir > this.boardheight) {
                return false;
            }
        }
        return true;
    }
    setBullet(speed) {
        let left = parseInt(getComputedStyle(this.name).getPropertyValue("left"))+20;
        let top = parseInt(getComputedStyle(this.name).getPropertyValue("top"))+20;
        let rotate = this.name.style.transform.match(/rotate\((.+)\)/);
        if (rotate) {
            var [angle, unit] = rotate.slice(1);
            angle = parseInt(angle) % 360;
        }
        angle = angle > 0 ? angle : angle + 360;
        console.log(angle);
        let dirX = Math.sin(angle*Math.PI/180);
        let dirY = -Math.cos(angle*Math.PI/180);
        let board = document.querySelector(".board");
        console.log("dirX:" + dirX);
        console.log("dirY:" + dirY);
        let bull = document.createElement("div");
        bull.className = "bullet";
        board.appendChild(bull);
        let b = new bullet(bull, 10, left, top, dirX, dirY, speed, 0);
        return b;
    }
}
function setMove(t1, c1, c2, c3, c4, c5,target,t2, d1, d2, d3, d4,d5,target2) {
    var speed;
    document.onkeydown = function (event) {
        event = event || window.event;
        //event.preventDefault();
        if (event.ctrlKey) {
            speed = 4;
        } else {
            speed = 2;
        }
        function s(tank, c1, c2, c3, c4,c5,tar) {
            var Green = tank;
            switch (event.keyCode) {
                case c1: //left
                    // simulContinuous(Green.move("left", -speed), Green.rotate(5, 270));
                    var stop = setInterval(function () {
                        if (Green.isLegal("left", 1)) {
                            Green.move("left", -speed/2);
                            Green.rotate(1, 270);
                        }
                        
                    }, 10);
                    window.addEventListener("keyup", function () {
                        //stop the loop
                        clearInterval(stop);
                        //and remove the keyup listener
                        window.removeEventListener("keyup", arguments.callee);
                    });

                    //document.onkeyup = function () {
                    //     //stop the loop
                    //    clearInterval(stop);
                    //}

                    break;
                case c2: //up
                    var stop = setInterval(function () {
                        if (Green.isLegal("top", 1)) {
                            Green.move("top", -speed/2);
                            Green.rotate(1, 0);
                        }
                    }, 10);
                    window.addEventListener("keyup", function () {
                        //stop the loop
                        clearInterval(stop);
                        //and remove the keyup listener
                        window.removeEventListener("keyup", arguments.callee);
                    });
                    // g.style.top = g.offsetTop - speed + "px";
                    break;
                case c3: //right
                    var stop = setInterval(function () {
                        if (Green.isLegal("left", -1)) {
                            Green.move("left", speed/2);
                            Green.rotate(1, 90);
                        }
                    }, 10);
                    window.addEventListener("keyup", function () {
                        //stop the loop
                        clearInterval(stop);
                        //and remove the keyup listener
                        window.removeEventListener("keyup", arguments.callee);
                    });

                    // g.style.left = g.offsetLeft + speed + "px";
                    break;
                case c4: //down
                    
                    var stop = setInterval(function () {
                        if (Green.isLegal("top", 0)) {
                            Green.move("top", speed/2);
                            Green.rotate(1, 180);
                        }
                    }, 10);
                    window.addEventListener("keyup", function () {
                        //stop the loop
                        clearInterval(stop);
                        //and remove the keyup listener
                        window.removeEventListener("keyup", arguments.callee);
                    });
                    // g.style.top = g.offsetTop + speed + "px";
                    break;
                case c5:
                    var b = Green.setBullet(2);
                    b.fly(tar);
                default:
                    break;
            }
        }
        s(t1, c1, c2, c3, c4,c5,target);
        s(t2, d1, d2, d3, d4,d5,target2);
    }
}
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}
function hasClass(obj, cn) {
    let reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}

function removeClass(obj, cn) {
    if (hasClass(obj, cn)) {
        obj.className = obj.className.replace(cn, "");
    }
}