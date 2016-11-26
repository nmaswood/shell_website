let ID = 0;
let currentID = 0;

const files = ['about.txt', 'contact.txt', "skills.txt", "misc.txt"];

const blurbs  = {
    'about.txt': "Hi! My name is Nasr. I'm a CS major at UChicago\n" +
                 "I'm interested in education, programming and a couple of other things too.\n" +
                 "If you are interested in reaching out " + 
                 'type &nbsp;<mark class="code">cat contact.txt</mark> &nbsp; to see my info',

    'contact.txt': "personal: nasrmaswood@gmail.com\nschool: nmaswood@uchicago.edu\ngithub:",
    'skills.txt': "Python\nJavascript\nAngularJs\nRails\nGolang\n"
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
            let word = input[i];

            let output = word in blurbs? blurbs[input[i]]: `cat ${word}: No such file or directory`;
            functions.insertOutput(output);

        }

    },
    ls: (input) => {

        for (let i = 0; i< files.length; i++){

            functions.insertOutput(files[i]);

        }
    },
    pwd: (input) => {
        functions.insertOutput("Users/Nasr");
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

}

function createClickAble(){
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
