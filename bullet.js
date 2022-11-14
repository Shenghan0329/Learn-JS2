class bullet {
    constructor(obj, damage, l,t,dirX, dirY, speed, bounce) {
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
    fly() {
        let bullet = this;
        let b = this.obj;
        let dirX = this.dirX;
        let dirY = this.dirY;
        let speed = this.speed;
        var stop = setInterval(function () {
            var left = parseInt(b.style.left);
            var top = parseInt(b.style.top);
            console.log(left);
            var posX = left + 2*speed * dirX;
            var posY = top + 2*speed * dirY;
            // console.log(posX);
            b.style.left = posX + "px";
            console.log(b.style.left);
            b.style.top = posY + "px";
        }, 5);
        setTimeout(function () {
            clearInterval(stop);
            bullet.clear();
        }, 4000);       
    }
}