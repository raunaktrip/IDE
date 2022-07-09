import "../App.css";
import "../styles/Editor.css"
import React, { useState } from "react";

import AceEditor from "react-ace";

import $ from "jquery";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";

import "ace-builds/src-noconflict/ext-language_tools";

function Editor() {
  const [lang, setLang] = useState("c_cpp");
  const [val, setVal] = useState(code_cpp);
  const [theme, setTheme] = useState("monokai");
  return (
    <div className="root-grid">
      <div className="nav_code_bar">
        <div >
          <select 
            id="languages"
            class="btn-lang"
            onChange={chaneLang}
          >
            <option value="cpp"> C/C++ </option>
            <option value="java"> Java </option>
            <option value="javaScript"> JavaScript </option>
            <option value="py"> Python </option>
          </select>
        </div>
        <div >
          <select
            id="theme"
            class="btn-theme"
            onChange={chaneTheme}
          >
            <option value="monokai"> Monokai </option>
            <option value="github"> Github </option>
            <option value="solarized_dark"> Solarized-dark </option>
          </select>
        </div>
      </div>

      <div className="grid">
        <div className="editor">
          <AceEditor
            mode={lang}
            value={val}
            width={""}
            height={"inherit"}
            fontSize={14}
            theme={theme}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div className="grid2">
          <div className="input_container">
           <div className="input_text">Input</div>
           <div>
            <textarea id="input"></textarea>
           </div>
          </div>
          <div className="output_container">
            <div className="output_text">Output</div>
            <div className="output_box">
            <textarea id="output" disabled="disabled"></textarea>
            </div>
            <div className="run_button">
            <button className="btn btn-run" onClick={execute}>Run</button>
            </div>
          </div>
        </div>
      </div>
      
   
    </div>
  );

  function onChange(newValue) {
    setVal(newValue);
  }
  function chaneLang() {
    let language = $("#languages").val();

    if (language === "c" || language === "cpp") {
      setLang("c_cpp");
      setVal(code_cpp);
    } else if (language === "javaScript") {
      setLang("javascript");
      setVal(code_javaScript);
    } else if (language === "py") {
      setLang("python");
      setVal(code_py);
    } else if (language === "java") {
      setLang("java");
      setVal(code_java);
    }
  }

  function chaneTheme() {
    let _theme = $("#theme").val();

    if (_theme === "monokai") setTheme(_theme);
    else if (_theme === "github") setTheme(_theme);
    else if (_theme === "solarized_dark") setTheme(_theme);
  }
  function execute() {
    var _input=document.getElementById("input").value
    var _lang=lang;
    if (lang === "c_cpp") _lang = "cpp";
    
    $.ajax({
      url: "http://localhost:3001/",

      method: "POST",

      data: {
        language: _lang,
        code: val,
        input: _input,
      },

      success: function (response) {
         $("#output").text(response.output);
        //obj.html(obj.html().replace(/\n/g, "<br>"));
        console.log(response.output);
      },
    });
  }
}
const code_cpp =
  "\n#include<iostream>\nusing namespace std;\n\nint main(){\n  //write your code here\n\n  return 0;\n}";
const code_java =
  '\nimport java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\n/* Name of the class has to be "Main" only if the class is public. */\nclass Main\n{\n	public static void main (String[] args) throws java.lang.Exception\n	{\n		// your code goes here\n	}\n}';
const code_py =
  `print('Hello World')`;
const code_javaScript = '\nconsole.log("Hello World");';

export default Editor;
