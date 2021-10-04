const fs = require('fs');
const readLine = require('readline');

var filenames = [];

function main() {
    try {
        var data = fs.readFileSync('filenames.txt', 'utf8');
        var readFilenames = data.toString();
        if(readFilenames !== '') {
            readFilenames = readFilenames.split('\n');
            readFilenames = readFilenames.map(filename => {
                filenames.push(filename.replace('\r', ''));
            });
            userInput();
        }
        else {
            userInput();
        }
    }
    catch(e) {
        console.log("Error : ", e.stack);
    }
}

main();

function userInput() {
    const rl = readLine.createInterface({
        input : process.stdin,
        output : process.stdout
    });
    rl.question("Enter filename : ", function(filename) {
        if(filenames.includes(filename)) {
            console.log("Filename already exists");
            rl.close();
            return userInput();
        }
        else {
            filenames.push(filename);
            editFileNames(filenames);
            createNewFile(filename);
            rl.close();
        }
    });
}

function editFileNames(files) {
    var str = "";
    for(let i=0 ; i<files.length ; i++) {
        str = str + files[i] + "\n";
    }
    fs.writeFile('./filenames.txt', str, function(error) {
        if(error) {
            return console.log(error);
        }
    });
}

function createNewFile(filename) {
    fs.writeFile(filename + '.txt', "You are awesome", function(error) {
        if(error) throw error;
    });
}