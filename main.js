"use strict";

function makeid(){
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const len = possible.length;

        function randomCharacter(){
            return possible.charAt(Math.floor(Math.random() * len));
        }
        
        return Array.apply(null, {length: 10}).map(randomCharacter).join("");
}

class Output{

    constructor(result, error){
        this.result = result;
        this.error = error;
    }

    isError(){
        return this.error != "";

    }
}

class File {
    constructor(name, type, children, content){
        this.name = name;
        this.type = type;
        this.children = children;
        this.content = content;
        this.uniqueID = `${name}${makeid()}`;
    }

    fileInfo(){
        console.log([this.name,this.type, this.uniqueID]);
    }

    getNames (){
        return this.children.map((x) => x.name);
    }

    fileExists(name){
        return this.getNames().indexOf(name) != -1;
    }

    getFile(name){
        console.log(name);
        console.log(this.children);
        console.log(this.children[this.children.indexOf(name)]);

        return this.children[this.getNames().indexOf(name)];
    }

    followPath(path){

        let current = this;
        let error = false;

        while (path.length){
            let next = path.shift();
            let name = next.name;
            if (!next.fileExists(name)){
                error = "File does not exist";
                break;
            } else {
                let file = current.getFile(name);
                if (file.type == 'folder'){
                    error = "Folder does not exist";
                    break;
                }
                current = file;
            }
        }

        return new Output(current, error);
    }
}

let ID = 0;
let currentID = 0;

let currentDir = new File('Home', 'Dir', [

    new File('about.txt', 'file', null, 
            "Hi! My name is Nasr. I'm a CS major at UChicago.\n" + 
            "I'm interested in education, programming and a couple of other things too.\n" +
            'If you are interested in reaching out type &nbsp;<mark class="code">cat contact.txt</mark> &nbsp; to see my info'
    ),
    new File('contact.txt', 'file', null, 'personal: nasrmaswood@gmail.com\nschool: nmaswood@uchicago.edu\n github:<a href = "https://github.com/nmaswood">https://github.com/nmaswood</a>'),
    new File('skills.txt', 'file', null, "Python\nJavascript\nAngularJs\nRails\nGolang\nFree style Rapping ;)"),
    new File('misc.txt', 'file', null, 'Programming Interview Questions: <a href = "#">https://www.youtube.com/user/TheNasrmaswood</a>')
]);

const files = ['about.txt', 'contact.txt', "skills.txt", "misc.txt"];

let rootDir = currentDir;

const commands= ['ls', 'cat', 'pwd', 'clear', 'echo', 'whoami', 'date'];
const manuals = {
    'cat':'cat arg_0, arg_1 ... will print the contents of arg_0 arg_1',
    'ls':'list all the files in a directory',
    'pwd':'Print the current working directory',
    'clear':'clear the page of all previous output',
    'echo':'echo arg_0, arg_1 will echo back the args you put in',
    'whoami':'Simple answer to a deep philosophical question',
    'cmds': 'What commands are implemented'
}

const blurbs  = {
    'about.txt': "Hi! My name is Nasr. I'm a CS major at UChicago\n" +
                 "I'm interested in education, programming and a couple of other things too.\n" +
                 "If you are interested in reaching out " + 
                 'type &nbsp;<mark class="code">cat contact.txt</mark> &nbsp; to see my info',

    'contact.txt': 'personal: nasrmaswood@gmail.com\nschool: nmaswood@uchicago.edu\n github:<a href = "https://github.com/nmaswood">https://github.com/nmaswood</a>',
    'skills.txt': "Python\nJavascript\nAngularJs\nRails\nGolang\nFree style Rapping ;)",
    'misc.txt': 'Programming Interview Questions: <a href = "#">https://www.youtube.com/user/TheNasrmaswood</a>'
}

const handlers = {
    '': () => {},
    clear: () => {
        const lines = document.getElementById('root');
        while (lines.firstChild) {
            lines.removeChild(lines.firstChild);
        }
    },
    cat: (input) => {

        for (let i = 0; i < input.length;i++){

            let output = (function(){

                const token = input[i];

                if (currentDir.getNames().indexOf(token) != -1){
                    return currentDir.getFile(token).content;
                }
                console.log(token);
                console.log(token in currentDir.getNames());
                console.log(currentDir.getNames());
                

                return  `cat ${token}: No such file or directory`;
            })();

            functions.insertOutput(output);
        }

    },
    ls: (input) => {


        currentDir.fileInfo();
        for (let i = 0; i< currentDir.children.length; i++){

            functions.insertOutput(currentDir.children[i].name);

        }
    },
    pwd: (input) => {

        const desiredID = currentDir.uniqueID;

        let finished = false;
        let value = [];

        function recurse(rootNode, path){

            if (!rootNode || finished){
                return;
            }

            console.log(path);
            const pathPrime = path.slice();
            pathPrime.push(rootNode.name);

            if (rootNode.uniqueID === desiredID){
                finished = true;
                value = pathPrime;
                return;
            }

            const name = rootNode.name;
            for (let i = 0; i < rootNode.children;i++){
                let node = rootNode.children[i];
                recurse(node, pathPrime)
            }
        }
        recurse(rootDir, []);
        const finalPrime = value.join("/");
        functions.insertOutput(finalPrime);
    },
    cmds : (input) => {
        for (let i = 0; i< commands.length; i++){

            functions.insertOutput(commands[i]);
        }
    },
    echo: (input) => {
        for (let i = 0; i< input.length; i++){

            functions.insertOutput(input[i]);
        }
    }, 
    whoami: (input) => {

        functions.insertOutput('Nasr Syed Maswood');

    },
    man : (input) => {

        for (let index = 0; index < input.length; input ++){
            let token = input[length];
            let output = token in manuals? `${token}\n--->${manuals[token]}`: `No manual entry for ${token}`;
            functions.insertOutput(output);
        }

    },

    mkdir: (input) => {

        for (let index = 0; index < input.length; i++){

            let token = foo;

            const newFile = File();

        }
    },
    cd: (input) => {

        console.log(input);
        if (input.length == 0 ){
            currentDir = rootDir;
            return
        }

        const tokenized = input.join("").split("/");

        const result = currentDir;

        if (error){
            functions.insertOutput(`bash: cd: ${input}: No such file or directory`);
            return;
        } 
    }, 
    blog : (input) => {
        window.location.href = 'blog.html';
    }, 
    date: (input) => {
        const time = new Date();
        const isoString = time.toISOString();
        functions.insertOutput(isoString);
    }
}

function setAttributes(div, dict){
    for (let key in dict){
        div.setAttribute(key, dict[key]);
    }
}

const functions = {

    executeFunction : (input) => {
        const doc = document;
        const lines = doc.getElementById("root");

        const newLine = functions.createNewLine();

        const tokenized = input.split(" ");

        if (tokenized.length == 0){

            lines.appendChild(newLine);
            functions.focus();
            return;
        }

        const cmd = tokenized[0];
        const tokens = tokenized.slice(1,tokenized.length);

        if (cmd in handlers){
            handlers[cmd](tokens)
        } else {
            functions.insertOutput(`-bash: ${input}: command not found`);
        }

        lines.appendChild(newLine);
        functions.focus();
    },

    focus: () => {
        document.getElementById(`line-input-${currentID}`).focus();
    },

    createNewLine: () => {

        const doc = document;

        const line = doc.createElement('div');
        line.innerHTML = "Nasr's Mac Book Pro:~ Guest$";
        const inputBar = doc.createElement('input');

        line.setAttribute('class', 'line');

        setAttributes(line, {
            'class':'line font',
            'id':`line-${ID}`,
        });

        setAttributes(inputBar,{
            'class': 'shell-box font',
            'type': 'text',
            'status': 'active',
            'autofocus':'',
            'id' : `line-input-${ID}`
        });

        line.appendChild(inputBar);

        inputBar.onkeyup = function (event){

            if (event.which === 13){
                functions.executeFunction(inputBar.value);
            }
        }

        removeLastInput();

        currentID = ID;
        ID += 1;

        return line;
    },

    inputBarLine: (idNumber) => {
        document.getElementById(`line-input-${currentID}`);
    },

    insertOutput: (output) => {

        const lineNumber = document.getElementById(`root`);

        const tokenized = output.split("\n");

        for (let i = 0; i < tokenized.length; i++){

            let div = document.createElement('div');
            div.innerHTML = tokenized[i];
            setAttributes(div, {
                'class':'output font',
                'id':`output-${currentID}-{i}`,
            });

            lineNumber.appendChild(div);

        }
    }
}

function removeLastInput(){

    const doc = document;
    const line = doc.getElementById(`line-${currentID}`);

    if (line != null){
        line.removeChild(line.childNodes[1])
    }
}

function filePresentInDir(name, directory){
    return name in directory.getNames();
}

function returnFileInDir(name, directory){

}



function init(){
    const doc = document;
    const lines = doc.getElementById("root");
    lines.appendChild(functions.createNewLine());

    const body = doc.getElementById('main');
    body.onclick = function(){
        functions.focus();
    }
}

init();
