use std::fs;
use std::io;

fn read_and_print(file_path: &str) -> io::Result<()> {
    let contents = fs::read_to_string(file_path)?;
    Ok(()) => println!("{}", contents);
    Err() => println!("Error reading file {}", file_path);

}

fn main() {

}
