use std::fs;
use std::path::Path;
use std::string::String;
use std::io::Error;


fn main() {


    match organize("/Users/akandasamy/Documents/coding/rusty-sports-app/src/assets/teamlogos") {
        Ok(()) => {
        }
        Err(a) => {
            print!("{}", a);
        }
    }

    

}

fn organize(curr_directory: &str ) -> Result <(), Error> {
    for entry in fs::read_dir(curr_directory).unwrap() {
        
        let file_name = entry.unwrap();
        let path_name = file_name.path();
        let final_name = path_name.file_name().unwrap().to_str().unwrap(); 

        if final_name.ends_with(".png") {
            let change_name = final_name.split(" ").collect::<Vec<_>>().join("");
        
            fs::rename(curr_directory.to_owned() + "/" + final_name,  curr_directory.to_owned() + "/" + &change_name).unwrap();
        

        }
    

    }

    Ok(())

}