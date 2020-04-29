const codeEditor = document.querySelector('#editor');
const codeOutput = document.querySelector('#output');
const resizeHandle = document.querySelector('#resizer');



resizeHandle.addEventListener('click', (e) => {
    console.log(e);
});

const editor = CodeMirror(codeEditor, {
    value: "function myScript(){return 100;}\n",
    lineNumbers: true,
    theme: "dracula",
    mode:  "javascript"
});

codeOutput.addEventListener('click', (e) => {
    codeOutput.innerHTML = '<h4 style="color: #55ff55">💨 Running ...</h4>';
    setTimeout(() => {
        executeCode();
    }, 1);
    
});

codeEditor.addEventListener('keydown', (e) => {
    if (event.ctrlKey && event.keyCode === 13) {
        codeOutput.click();
    }
});

async function executeCode()  {
    console.log = function(value) {
        output += value + '<br/>';
    };
    let output = '';
    const code = editor.getValue();
        try {
            const startTime = new Date();
            const returnValue = eval(code);
            const endTime = new Date();
            const totalTime = endTime - startTime;
            codeOutput.innerHTML = output;
            codeOutput.innerHTML += '</br><h4 style="color: #55ff55">🚀 Execution took ' + totalTime + 'ms</h4>';
            codeOutput.innerHTML += '<h4 style="color: #55ff55">💻 Code Returned: ' + returnValue + '</h4>';
            codeOutput.scrollTo(0,codeOutput.scrollHeight);
        } catch (e) {
            codeOutput.innerHTML = '<h4 style="color: #ff5555">' + e + '</h4>';
        }
}