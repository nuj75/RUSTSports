const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;


let games_container = document.getElementById("games-container");
let games_nav = document.getElementById("games-nav");

let old_score_one = [];
let old_score_two = [];

  var teams = { 
    "Atlanta": "Hawks", 
    "Boston":"Celtics", 
    "Brooklyn":"Nets",
    "Timberwolves":"Minnesota",
    "Nuggets":"Denver",
    "Bucks": "Milwaukee",
    "Knicks": "NewYork",
    "Pacers": "Indiana",
    "76ers": "Philadelphia",
    "Magic": "Orlando",
    "Cavaliers": "Cleveland",
    "Mavericks": "Dallas",
    "Clippers": "LAClippers",
    "Celtics": "Boston",
    "Thunder": "OklahomaCity"

  };


async function add_network() {
  let networks = (await invoke("add_network", {league : "nba"})); 


  for (var key in networks) {
    document.getElementById("game-network-" + key).textContent = networks[key];
  }
  
}


async function get_scores() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  // document.getElementById("debug").textContent = "k";

  let scores = (await invoke("get_scores", { league: "nba" })); 

  
  for (var key in scores) {
    let temp = scores[key];


  
    generateTeam(temp[0], temp[1], key);



    old_score_one.push(0);
    old_score_two.push(0);



  }  



  await add_network();



 
}

async function update_scores() {
  
  let scores = (await invoke("get_scores", { league: "nba" })); 

  
  for (var key in scores) {

    let game_one = document.getElementById("game-score-" + key + "-one");
    let game_two = document.getElementById("game-score-" + key + "-two");

    let game_one_parent = game_one.parentNode;
    let game_two_parent = game_two.parentNode;




    let temp = scores[key];

    if (old_score_one[key] != temp[0][1] && temp[0][1] != -1 && old_score_one[key] < temp[0][1]) {
      game_one.textContent = (temp[0][1]);

      old_score_one[key] = temp[0][1];


      game_one_parent.replaceChild(game_one, game_one);

    }



    if (old_score_two[key] != temp[1][1] && temp[1][1] != -1 && old_score_two[key] < temp[1][1]) {
      game_two.textContent = (temp[1][1]);
      

      old_score_two[key] = temp[1][1];

      game_two_parent.replaceChild(game_two, game_two);

    }

    


  }  



}

function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;

}



function generateTeam(team_one, team_two, number) {


  if (team_one[1] == -1) {
    team_one[1] = "";
    team_two[1] = "";
  }
  
  const newElement = elementFromHtml (
    "<div class = 'game' id='game-" + number + "'>" 
      +  "<div class = 'team' >" 
        + "<img  src='assets/teamlogos/Team=" + teams[team_one[0]] + ",Alt=Default.png' style='width: 50%; padding: 5%;'></img>" + team_one[0].toUpperCase() + "<br>" + "<div class = 'animation' id = 'game-score-" + number + "-one'>" + team_one[1] + "</div>"
      + "</div>" 

      +  "<div class = 'team' >" 
        + "<img src='assets/teamlogos/Team=" + teams[team_two[0]] + ",Alt=Default.png' style='width: 50%; padding: 5%; '></img>" + team_two[0].toUpperCase() + "<br>" + "<div class = 'animation' id = 'game-score-" + number + "-two'>" + team_two[1] + "</div>"
      + "</div>"


      + "<div id='game-network-" + number + "' class='game-network'></div>"
    
    + "</div>" 
  );

  const link = elementFromHtml (
      "<div class='game-nav-button' id='game-nav-"+ number +"' onclick='changeCurr(" + number + ")'></div>" 
  );


  

  games_container.appendChild(newElement);



  games_nav.appendChild(link);



  document.getElementById("game-nav-0").classList.add("curr"); 


          
  
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// document.getElementById("debug").textContent = "j";

await get_scores();




const resizeObserver = new ResizeObserver(e => {
  window.addEventListener('resize', changeCurr(getPrev()));
});

resizeObserver.observe(document.body);






while (true) {

  await update_scores();
    
  await delay(5000);
  // document.getElementById("debug").textContent = "off";

  await delay(1000);
  // document.getElementById("debug").textContent = "on";



}
































