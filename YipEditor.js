/**
 * Use: let myEditor = new YipEditor(); to create a new HTML editor.
 * @author Alexa N <alexa.nc.kitsune@gmail.com>
 * @param {string} identifier - Set the id (the one you want) of your new editor.
 * @param {Boolean} editable - Set the editor textarea as editable (true), or non editable / only read (false). If it's false, we have to give to the function a fifth argument.
 * @param {getElementById} putIn - The id of the element where you will append the editor.
 * @param {string} typeOfCode - What type of the editor will use: "javascript" for javascript, or "htmlmixed" for HTML and CSS. Only supports one of these strings.
 * @param {string} fromServerCode - When the editor textarea is only read, generally the code comes from server. We have to put that code as a string in this argument.
 * 
 * myEditor.runEditor(); sets the editor in HTML.
 *
 * myEditor.getCode(); extracts the code, returns a string.
 */

class YipEditor{

    constructor(identifier, editable, putIn, typeOfCode, fromServerCode="🦊>> Err: No code from server."){
        this.identifier = identifier;
        this.editable = editable;
        this.putIn = putIn;
        this.typeOfCode =typeOfCode;
        this.fromServerCode = fromServerCode;
    }

	runEditor(){
        //Creating elements:
        let yipMasterContainer = document.createElement("div");
		let yipCode = document.createElement("textarea");
        let yipRun = document.createElement("button");
        let yipConsole = document.createElement("div");
        let yipInvisible = document.createElement("div");
        let yipImg = document.createElement("img");

        //Setting "id"s:
        yipMasterContainer.setAttribute("id", this.identifier);
        yipCode.setAttribute("id", `${this.identifier}_Code`);
        yipRun.setAttribute("id", `${this.identifier}_Run`);
        yipConsole.setAttribute("id", `${this.identifier}_Console`);
        yipInvisible.setAttribute("id", `${this.identifier}_Invisible`);
        
        //Setting classes(for CSS): 
        yipMasterContainer.setAttribute("class", 'yipMaster');
        yipRun.setAttribute("class", 'yipRun');
        yipConsole.setAttribute("class", 'yipConsole');
        yipInvisible.setAttribute("class", 'yipInvisible');
        
        //Putting elements:
        document.getElementById(this.putIn).appendChild(yipMasterContainer);
        document.getElementById(this.identifier).appendChild(yipCode);
        document.getElementById(this.identifier).appendChild(yipRun);
        document.getElementById(this.identifier).appendChild(yipConsole);
        document.getElementById(this.identifier).appendChild(yipInvisible);
        document.getElementById(this.identifier).appendChild(yipImg);

        yipRun.innerHTML = '▶';
        yipImg.setAttribute("src", `./assets/${this.typeOfCode}.png`);
        yipImg.setAttribute(
            "class",
            this.typeOfCode=="javascript" ? "yipImg-js" : "yipImg-html"
        );
        
        //Setting codemirror:
        var editor = CodeMirror.fromTextArea(
            document.getElementById(`${this.identifier}_Code`),
            {
                mode: this.typeOfCode,
                theme:"dracula",
                matchBrackets:true,
                autoCloseBrackets: true,
                lineNumbers: true,
                readOnly: !this.editable
            }
        );

        if(!this.editable){
            editor.getDoc().setValue(this.fromServerCode);
        }
		
        //Working YipEditor:
        //The following variables for yipRun.onclick can access to this._variables.
        let _fromServerCode = this.fromServerCode;
        let _editable = this.editable;
        let _typeOfCode = this.typeOfCode;

        yipRun.onclick = function(){

            let inCode = _editable ? editor.getValue() : _fromServerCode;    
            function display(x){return x};
            
            setTimeout(function () {
                //Setting HTML run mode:
                if(_typeOfCode == "htmlmixed"){
                    inCode = "display(`\n" + inCode + "\n`);";
                }
                inCode = transformCode(inCode);
                yipInvisible.innerHTML = inCode; //Aquí se guarda en Invisible
                return yipConsole.innerHTML = "🦊>> "+eval(inCode);
            });

        };

	}

    getCode(){
        return document.getElementById(`${this.identifier}_Invisible`).innerHTML;
    }

}

function transformCode(input){

    input = input.replaceAll("eval","display");  //<- Eliminando valores nativos JS...
    input = input.replaceAll("instanceof","");
    input = input.replaceAll("document.","");
    input = input.replaceAll("getElementById","");
    input = input.replaceAll("getElementsBy","");
    input = input.replaceAll("set","");
    input = input.replaceAll("onclick","");
    input = input.replaceAll("onclic","");
    input = input.replaceAll("HTML","");
    input = input.replaceAll("import","");
    input = input.replaceAll("./","");
    input = input.replaceAll("http","");
    input = input.replaceAll("https","");
    input = input.replaceAll("href","");
    input = input.replaceAll("iframe","");
    input = input.replaceAll("src","");
    input = input.replaceAll("execute",""); //<- Eliminando valores del proyecto...
    input = input.replaceAll("setTime","");
    input = input.replaceAll("identifier","");
    input = input.replaceAll("editable","");
    input = input.replaceAll("putIn","");
    input = input.replaceAll("console.log","display"); //<- Agregando (+mod) características propias...
    input = input.replaceAll("document.write","display");
    input = input.replaceAll("print","display");

    return input;
}