// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use regex::Regex;
use reqwest::blocking::{get, Client};
use scraper::{Html, Selector};







#[tauri::command]
fn get_scores() -> Vec < ((String, i32) , (String, i32)) > {

    let http_client = Client::new();



    // while true {

    let mut return_vec: Vec < ((String, i32) , (String, i32)) > = Vec::new();

    let http_client = Client::new();
    let http_result = http_client.get("https://www.espn.com/nba/scoreboard/").send().unwrap();

    let full_html = &http_result.text().unwrap();
    
    let full_fragment = Html::parse_fragment(full_html);
    let game_selector_one = Selector::parse(".ScoreCell__TeamName").unwrap();
    let game_selector_two = Selector::parse(".ScoreCell__Score").unwrap();

    let game_teams = full_fragment.select(&game_selector_one);
    let mut game_score = full_fragment.select(&game_selector_two);



    let mut game_vec1 = ("".to_owned(), 0);


    let mut last_team = false;

    for team in game_teams {

        let score = match (game_score.next()) {
            Some(a) => a.inner_html().parse::<i32>().unwrap(),
            None => 1
        };

        if(last_team) {
            let game_vec2 = (team.inner_html(), score);
            return_vec.push((game_vec1.clone(), game_vec2));
            last_team = false;

        } else {
            game_vec1 = (team.inner_html(), score);
            last_team = true;
        }

    }

   
    
   


    return return_vec;

}




fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_scores])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
