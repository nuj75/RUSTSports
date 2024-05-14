let prevNum = 0;

function getPrev() {
    return prevNum;
}

function changeCurr(currNum) {
    
    
    var prevNav = document.getElementById("game-nav-" + prevNum);
    var currNav = document.getElementById("game-nav-" + currNum);

    if (prevNum != currNum) {
        currNav.classList.add("curr");
        prevNav.classList.remove("curr");
    }
    



    var currentGame = document.getElementById("game-" + currNum);
    

    currentGame.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    

    prevNum = currNum;  




}






function next() {


    
    changeCurr(prevNum + 1);



}


function prev() {

    changeCurr(prevNum - 1);



}
