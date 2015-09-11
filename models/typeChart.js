/*
0 - normal
1 - fighting
2 - flying
3 - poison
4 - ground
5 - rock
6 - bug
7 - ghost
8 - steel
9 - fire
10 - water
11 - grass
12 - electric
13 - psychic
14 - ice
15 - dragon
16 - dark
17 - fairy

[def][atk]
 */

normal=[1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1];
fighting=[2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5];
flying=[1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1];
poison=[1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2];
ground=[1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1];
rock=[1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1];
bug=[1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5];
ghost=[0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1];
steel=[1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2];
fire=[1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1];
water=[1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1];
grass=[1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1];
electric=[1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1];
psychic=[1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1];
ice=[1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1];
dragon=[1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0];
dark=[1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5];
fairy=[1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1];

var typechart = [];
typechart.push(normal);
typechart.push(fighting);
typechart.push(flying);
typechart.push(poison);
typechart.push(ground);
typechart.push(rock);
typechart.push(bug);
typechart.push(ghost);
typechart.push(steel);
typechart.push(fire);
typechart.push(water);
typechart.push(grass);
typechart.push(electric);
typechart.push(psychic);
typechart.push(ice);
typechart.push(dragon);
typechart.push(dark);
typechart.push(fairy);

function getEffectiveness(atk, def) {

    var atkType, defType
    switch(atk) {
        case "normal":
            atkType = 0;
            break;
        case "fighting":
            atkType = 1;
            break;
        case "flying":
            atkType = 2;
            break;
        case "poison":
            atkType = 3;
            break;
        case "ground":
            atkType = 4;
            break;
        case "rock":
            atkType = 5;
            break;
        case "bug":
            atkType = 6;
            break;
        case "ghost":
            atkType = 7;
            break;
        case "steel":
            atkType = 8;
            break;
        case "fire":
            atkType = 9;
            break;
        case "water":
            atkType = 10;
            break;
        case "grass":
            atkType = 11;
            break;
        case "electric":
            atkType = 12;
            break;
        case "psychic":
            atkType = 13;
            break;
        case "ice":
            atkType = 14;
            break;
        case "dragon":
            atkType = 15;
            break;
        case "dark":
            atkType = 16;
            break;
        case "fairy":
            atkType = 17;
            break;
    }

    switch(def.toLowerCase()) {
        case "normal":
            defType = 0;
            break;
        case "fighting":
            defType = 1;
            break;
        case "flying":
            defType = 2;
            break;
        case "poison":
            defType = 3;
            break;
        case "ground":
            defType = 4;
            break;
        case "rock":
            defType = 5;
            break;
        case "bug":
            defType = 6;
            break;
        case "ghost":
            defType = 7;
            break;
        case "steel":
            defType = 8;
            break;
        case "fire":
            defType = 9;
            break;
        case "water":
            defType = 10;
            break;
        case "grass":
            defType = 11;
            break;
        case "electric":
            defType = 12;
            break;
        case "psychic":
            defType = 13;
            break;
        case "ice":
            defType = 14;
            break;
        case "dragon":
            defType = 15;
            break;
        case "dark":
            defType = 16;
            break;
        case "fairy":
            defType = 17;
            break;
    }
    return typechart[atkType][defType];
}

module.exports = getEffectiveness;