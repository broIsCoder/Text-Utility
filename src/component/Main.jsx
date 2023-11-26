import React, { useState } from 'react'
import main from "./main.css"

export const Main = (props) => {
  
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  // console.log(text)
  // console.log(setText)

  function renderInput(event) {
    // console.log(event)   // event is passed as an obj
    // console.log(event.target)   // target is textarea
    setTextInput(event.target.value)
  }
  function renderOuput() {
    console.log('render ouput')
  }

  function clearText() {
    let newText = "";
    setTextOutput(newText);
    setTextInput(newText);
    props.renderAlert("success","Text has been cleared.")
  }
  function upperCase() {
    let newText = textInput.replace(/\s+/g, ' ').trim().toUpperCase().trim();
    setTextOutput(newText);
    props.renderAlert("success","Text has been converted into uppercase.")
  }
  
  function lowerCase() {
    let newText = textInput.replace(/\s+/g, ' ').toLowerCase().trim();
    setTextOutput(newText);
    props.renderAlert("success","Text has been converted into lowercase.")
  }
  
  
  function speak() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = textInput;
    window.speechSynthesis.speak(msg);
    props.renderAlert("success","Text speaking enabled.")
  }
  //TODO : add to recognize `!` and `?`
  function correct() {
    let paragraph = textInput.replace(/\.{2,}/g, '.').replace(/\. /g, ' ');
    let paragraph2 = paragraph.replace(/\s+/g, ' ').trim();   //remove extra spaces // remove trailling and extra starting white space
    
    let listSenteces =  paragraph2.split(/\.{1,}/);        // split by `.`
    let newlist = listSenteces.map((e) => {
      console.log(e)
      let sentence = e.trim();
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    });
    let newText = newlist.join('. ')
    setTextOutput(newText);
    props.renderAlert("success","Text has been formatted correctly (limited).")
  }
  function reverse() {
    let newText = ' ';
    for (let index = textInput.length; index >= 0; index--) {
      const element = textInput.charAt(index);
      newText += element;
    }
    setTextOutput(newText)
    props.renderAlert("success","Text has been reversed")
  }
  function toggleCase() {
    let paragraph = textInput.replace(/\s+/g, ' ').trim();    //remove extra spaces
    let list = paragraph.split('').map((e) => {
      console.log(e);
      if (e == e.toUpperCase()) {
        return e.toLowerCase();
      }
      else {
        return e.toUpperCase();
      }
    });
    let newText = list.join('').trim();
    setTextOutput(newText);
    props.renderAlert("success","Text's case has been toggle")
  };
  //TODO : add to recognize `!` and `?`
  function capitalize(){
    let listSenteces =  textInput.split(" ");
    let newlist = listSenteces.map((e) => {
      return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    });
    let newText = newlist.join(' ')
    setTextOutput(newText);
    props.renderAlert("success","Text has capitalized")
  }
  
  const [copyIn, setCopyIn] = useState("Copy Input");
  const [copyOut, setCopyOut] = useState("Copy Output");
  
  function copyOutput(e) {
    navigator.clipboard.writeText(textOutput);
    e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-success');
    props.renderAlert("success","Text Output has been copied")
    setCopyOut("Copied Output");
    
    setTimeout(() => {
      e.target.classList.add('btn-primary');
      e.target.classList.remove('btn-success');
      setCopyOut("Copy Output"); // Corrected state update
    }, 1000);
  }
  
  function copyInput(e) {
    navigator.clipboard.writeText(textInput);
    e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-success');
    props.renderAlert("success","Text Input has been copied")
    setCopyIn("Copied Input");
    
    setTimeout(() => {
      e.target.classList.add('btn-primary');
      e.target.classList.remove('btn-success');
      setCopyIn("Copy Input"); // Corrected state update
    }, 1000);
  }

  return (
    <div className='box' style={props.theme2}>
      <h1>{props.heading}</h1>
      <form>
        <textarea id="input" className='textArea' rows={10} aria-label="With textarea" value={textInput} placeholder='Input here' onChange={renderInput} style={props.theme}></textarea>
        <button className="copyBtn copyInput btn btn-primary" onClick={copyInput}>{copyIn}</button>
        <button className="btn btn-danger copyBtn clearText" onClick={() => { clearText() }}>Clear Text</button>
        <textarea id="output" className='textArea' rows={10} aria-label="With textarea" value={textOutput} placeholder='Output here' readOnly  style={props.theme}></textarea>
        <button className="copyBtn copyOutput btn btn-primary" onClick={copyOutput}>{copyOut}</button>

      </form>
      
      <div className="btnContainer">
        <button className="btn btn-secondary featureBtn" onClick={() => { upperCase() }}>
          UPPER CASE
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { lowerCase() }}>
          lower case
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { correct() }}>
         Correct
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { speak() }}>
          Speak
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { reverse() }}>
          Reverse
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { toggleCase() }}>
          Toggle Case
        </button>
        <button className="btn btn-secondary featureBtn" onClick={() => { capitalize() }}>
          Capitalize
        </button>
      </div>

      <div>
        <h1>Your text Summary</h1>
        {/*will filter out " " since it is false  */}
        <p><b>{textInput.split(/\s+/).filter(Boolean).length}</b> words | <b>{textInput.length}</b> characters</p>
        <p>{0.008 * textInput.length >= 0 ? 0 : 0.008 * textInput.length} Min : {0.008 * 60 * textInput.length} Sec read</p>
      </div>

    </div>
  )
}
