let x = 2; //position of character
let alive = true;
let level = 1;
let s = 0; //score
let gameOverScreen = false;

let invaders = [[0, 0, 1], [1, 0, 1], [2, 0, 1], [0, 1, 1], [1, 1, 1], [2, 1, 1]]; //x, y, dead = 0/alive = 1
let path = [[1, 0], [1, 0], [0, 1], [-1, 0], [-1, 0], [0, 1]]; //path that invaders follow
let pm = 0; //distance that the invaders have moved over the path 
let ispeed = 100; //speed of invaders
let tispeed = ispeed; //time until next move
let livingInvaders = invaders.length;

let shooting = false; //whether or not the player is shooting
let bspeed = 5; //speed of bullet
let tbspeed = bspeed; //time until next shot
let bx = 0; //x of bullet
let by = 0; //y of bullet
let hit = false; //is the bullet hitting a wall/invader?

basic.showString("LVL" + level);

basic.forever(function () {

    if (alive) {

        basic.clearScreen();
        led.plotBrightness(x, 4, 200);

        tispeed--;

        if (tispeed <= 0) {

            for (let i = 0; i < invaders.length; i++) {

                invaders[i][0] += path[pm % 6][0];
                invaders[i][1] += path[pm % 6][1];

            }

            pm++;
            tispeed = ispeed;//work here

        }

        for (let i = 0; i < invaders.length; i++) { //draw invaders

            if (invaders[i][2] == 1) {

                led.plotBrightness(invaders[i][0], invaders[i][1], 250);

            }

        }

        if (shooting) {

            tbspeed--;
            led.plotBrightness(bx, by, 150);

            if (tbspeed <= 0) {

                by--;
                tbspeed = bspeed;

            }

            if (by < 0) {

                hit = true;

            } else {

                for (let i = 0; i < invaders.length; i++) {

                    if (bx == invaders[i][0] && by == invaders[i][1] && invaders[i][2] == 1) {

                        invaders[i][2] = 0;
                        s += 9 + level;
                        hit = true;

                    }

                }

            }

            if (hit) {

                shooting = false;
                hit = false;

            }

        }

        for (let i = 0; i < invaders.length; i++) {

            if (invaders[i][2] == 1) {

                livingInvaders++;

                if (invaders[i][1] == 4) {

                    alive = false;

                }

            }

        }

        if (livingInvaders == 0) {

            basic.pause(500);
            basic.clearScreen();
            level++;
            basic.showString("LVL" + level);
            x = 2;
            invaders = [[0, 0, 1], [1, 0, 1], [2, 0, 1], [0, 1, 1], [1, 1, 1], [2, 1, 1]];
            shooting = false;
            pm = 0;
            ispeed *= .85;
            tispeed = ispeed
            hit = false;

        } else {

            livingInvaders = 0;

        }

    } else {

        if (!gameOverScreen) {

            basic.pause(500);
            basic.clearScreen();
            basic.showString("GAMEOVER");
            gameOverScreen = true;

        } else {

            basic.showString("SCORE" + s);

        }

    }

})

input.onButtonPressed(Button.A, function () {

    x--;

    if (x < 0) {

        x = 0;

    }

})

input.onButtonPressed(Button.B, function () {

    x++;

    if (x > 4) {

        x = 4;

    }

})

input.onButtonPressed(Button.AB, function () {

    if (!shooting) {

        shooting = true;
        tbspeed = bspeed;
        bx = x;
        by = 3;

    }

})
