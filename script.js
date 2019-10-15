var playerNo, divInfo, count, gamePlay;
var set1 = [1, 2, 3];
var set2 = [4, 5, 6];
var set3 = [7, 8, 9];
var set4 = [1, 4, 7];
var set5 = [2, 5, 8];
var set6 = [3, 6, 9];
var set7 = [1, 5, 9];
var set8 = [3, 5, 7];
divInfo = new Array();
// Prototype for a div
var DivInfo = function (id, uniqueNo, isClicked, value) {
    this.id = id;
    this.isClicked = isClicked;
    this.uniqueNo = uniqueNo;
    this.value = value;
}
init();

document.querySelector('.reset-btn').addEventListener('click', init);
function init() {
    gamePlay = true; // Start the game
    playerNo = 1; // Start with player one
    count = 0;
    document.querySelector('.header').classList.remove('colorGreen','colorRed');
    document.querySelector('.main-container').classList.remove('colorGreen','colorRed');
    document.querySelector('.header').innerHTML = "Player one turns ('O')"; // UI to display player one turn
    var x, i;
    // reset all the divs
    x = document.querySelectorAll(".reset");
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "";
    }
    divInfo[0] = new DivInfo(100, 100, false, 100);
    for (var i = 1; i < 10; i++) {
        var x = '#_' + i.toString();
        var y = '_' + i.toString();
        document.querySelector(x).addEventListener('click', function (event) { onDivClick(event) });
        divInfo[i] = new DivInfo(y, i, false, 0);
    }
}
function onDivClick(event) {
    if(gamePlay){
        var id = '#' + (event.target.id).toString();
        // Check if the div has clicked earlier
        var result = divInfo.find((val) => {
            return val.id === event.target.id
        })
        // console.log('----',result);
        if (result != undefined && result.isClicked === false) {
            result.isClicked = true;
            result.value = playerNo;
            // console.log(result);
            count += 1;
            if (playerNo === 1) {
                document.querySelector(id).innerHTML = "O"
                document.querySelector('.header').innerHTML = "Player two turns ('X')"; // UI to display player one turn
                this.playerNo = 2;
            }
            else {
                document.querySelector(id).innerHTML = "X"
                document.querySelector('.header').innerHTML = "Player one turns ('O')"; // UI to display player one turn
                this.playerNo = 1;
            }
            checkWinner(event.target.id);
            checkIfDraw();
        }
    }
}
function checkIfDraw() {
    if (count === 9) {
        document.querySelector('.header').innerHTML = "Draw ! Click reset for a new game" // UI to display player one turn
    }
}
function checkWinner(id) {
    var box = divInfo.find((elem) => {
        return id == elem.id;
    })
    var checkArray= [];
    if (box.uniqueNo == 5) {
        checkArray = [set5, set2, set8, set7];
    }
    else {
        checkArray = [set1, set2, set3, set4, set5, set6, set7, set8]
    }
        if(checkWinningCondition(checkArray)){
         if(playerNo != 1){ // Value of player  No alredy changed
             document.querySelector('.header').classList.add('colorRed');
             document.querySelector('.header').innerHTML = "Player  1 Wins !!" // UI to display winner
             document.querySelector('.main-container').classList.add('colorRed');
         }
         else {
            document.querySelector('.header').classList.add('colorGreen');
            document.querySelector('.header').innerHTML = "Player 2 Wins !!" // UI to display winner
            document.querySelector('.main-container').classList.add('colorGreen');
         }
        }
}
function checkWinningCondition(arry) {
    var abort = false;
    var result = null;
    for (var j = 0; (j < arry.length && !abort); j++) {
        if (divInfo[(arry[j][0])].isClicked && divInfo[(arry[j][1])].isClicked && divInfo[(arry[j][2])].isClicked) {
            if ((divInfo[(arry[j][0])].value == divInfo[(arry[j][1])].value) && (divInfo[(arry[j][1])].value == divInfo[(arry[j][2])].value)) {
                console.log('Got You, Babe !!');
                abort = true;
                gamePlay = false;
                result = true;
            }
        }
    }
    return result;
}
