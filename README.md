# yipEditor

This is an online HTML / javascript editor (made with Javascript) and fully functional.  
This repository provides two examples of use, but the important part is on `YipEditor.js`.  
  
It's necesary to install ***CodeMirror*** in the root folder of the poject for a correct display and operation.
The project currently uses the CodeMirror version ***5.65.3***.

## Usage

You need to import the `YipEditor.js` in the HTML file where it's used.  
To create an editor, write the line:  
```
let myEditor = new YipEditor();
myEditor.runEditor();
```
Were *myEditor* can be any name you choose.  
Now, the editor is created (on the first line), and working (on the second line), but it won't show on the page because is not inserted.  


### Parameters
To insert it, we need to append it into another element. And for that, we need to know the parameters that our editor receives:  

> YipEditor(*identifier*, *editable*, *putIn*, *typeOfCode*, *fromServerCode*)  

Where:  
  
 `identifier`: Set the id (the one you want) of your new editor.  
 `editable`: Set the editor textarea as editable (*true*), or non editable / only read (*false*). If it's false, we have to give to the function a fifth argument.  
 `putIn`: The id of the element where you will append the editor.   
 `typeofCode`: What type of the editor will use: *javascript* for javascript, or *htmlmixed* for HTML and CSS. Only supports one of these strings.  
 `fromCodeServer`: When the editor textarea is only read, generally the code comes from server. We have to put that code as a string in this argument.  
  
All parameters are required (except for `fromCodeServer`, which is **only required if** `editable` **is** ***false***).  

### Methods
You can also access the method:  
```
myEditor.getCode();
```
Which extracts the code inserted in the editor as plain text, to work with it later.  
(Only works after running the code in the editor, clicking the button with the ▶).
