class Tank {
    constructor(name) {
        this.name = name;
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
            console.log(num);
        } else {
            num = 0;
        }
        if ((num - endpoint) % 360 == 0) {
            return;
        }
        num = num > 0 ? num : num + 360;
        var diff = (num - endpoint);
        console.log(diff);
        var direction;
        if ((diff > 0&&diff<180)||(diff<0&&diff<-180)) {
            direction = -1;
        } else {
            direction = 1;
        }
        
        var deg = num + direction * angle;
        this.name.style.transform = "rotate(" + deg + "deg)";
    }
}
function setMove(t1,c1, c2, c3, c4,t2,d1,d2,d3,d4) {
    var speed;
    document.onkeydown = function (event) {
        event = event || window.event;
        // event.preventDefault();
        if (event.ctrlKey) {
            speed = 6;
        } else {
            speed = 3;
        }
        function s(tank, c1, c2, c3, c4) {
            var Green = tank;
            switch (event.keyCode) {
                case c1: //left
                    // simulContinuous(Green.move("left", -speed), Green.rotate(5, 270));
                    var stop = setInterval(function () {
                        Green.move("left", -speed);
                        Green.rotate(5, 270);
                    }, 25);
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
                        Green.move("top", -speed);
                        Green.rotate(5, 0);
                    }, 25);
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
                        Green.move("left", speed);
                        Green.rotate(5, 90);
                    }, 25);
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
                        Green.move("top", speed);
                        Green.rotate(5, 180);
                    }, 25);
                    window.addEventListener("keyup", function () {
                        //stop the loop
                        clearInterval(stop);
                        //and remove the keyup listener
                        window.removeEventListener("keyup", arguments.callee);
                    });
                    // g.style.top = g.offsetTop + speed + "px";
                    break;
                default:
                    break;
            }
        }
        s(t1, c1, c2, c3, c4);
        s(t2, d1, d2, d3, d4);
    }
}