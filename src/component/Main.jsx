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
    props.renderAlert("success", "Text has been cleared.")
  }
  function upperCase() {
    let newText = textInput.replace(/\s+/g, ' ').trim().toUpperCase().trim();
    setTextOutput(newText);
    props.renderAlert("success", "Text has been converted into uppercase.")
  }

  function lowerCase() {
    let newText = textInput.replace(/\s+/g, ' ').toLowerCase().trim();
    setTextOutput(newText);
    props.renderAlert("success", "Text has been converted into lowercase.")
  }


  function speak() {
    let msg = new SpeechSynthesisUtterance();
    msg.text = textInput;
    window.speechSynthesis.speak(msg);
    props.renderAlert("success", "Text speaking enabled.")
  }
  //TODO : add to recognize `!` and `?`
  function correct() {
    let paragraph = textInput.replace(/\.{2,}/g, '.').replace(/\. /g, ' ');
    let paragraph2 = paragraph.replace(/\s+/g, ' ').trim();   //remove extra spaces // remove trailling and extra starting white space

    let listSenteces = paragraph2.split(/\.{1,}/);        // split by `.`
    let newlist = listSenteces.map((e) => {
      console.log(e)
      let sentence = e.trim();
      return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
    });
    let newText = newlist.join('. ')
    setTextOutput(newText);
    props.renderAlert("success", "Text has been formatted correctly (limited).")
  }
  function reverse() {
    if (textInput !== '') {
      let newText = ' ';
      for (let index = textInput.length; index >= 0; index--) {
        const element = textInput.charAt(index);
        newText += element;
      }
      setTextOutput(newText)
      props.renderAlert("success", "Text has been reversed")
    } else { };
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
    props.renderAlert("success", "Text's case has been toggle")
  };
  //TODO : add to recognize `!` and `?`
  function capitalize() {
    let listSenteces = textInput.split(" ");
    let newlist = listSenteces.map((e) => {
      return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
    });
    let newText = newlist.join(' ')
    setTextOutput(newText);
    props.renderAlert("success", "Text has capitalized")
  }

  const [copyIn, setCopyIn] = useState("Copy Input");
  const [copyOut, setCopyOut] = useState("Copy Output");

  function copyOutput(e) {
    navigator.clipboard.writeText(textOutput);
    e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-success');
    props.renderAlert("success", "Text Output has been copied")
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
    props.renderAlert("success", "Text Input has been copied")
    setCopyIn("Copied Input");

    setTimeout(() => {
      e.target.classList.add('btn-primary');
      e.target.classList.remove('btn-success');
      setCopyIn("Copy Input"); // Corrected state update
    }, 1000);
  }

  const millisecondsPerWord = 250;
  const words = textInput.split(/\s+/).filter(word => word.length > 0).length;
  const totalMilliseconds = millisecondsPerWord * words;

  const milliSeconds = Math.floor((totalMilliseconds % 1000));  // max 1000
  const seconds = Math.floor((totalMilliseconds / (1000)) % 60);    // max 60
  const minutes = Math.floor(totalMilliseconds / (1000 * 60)) % 60;   // max 60
  const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));    // max infinite

  return (
    <div className='box' style={props.theme2}>
      {textInput.length === 0 ?
        <h1 className='p-1'>{props.heading}</h1>
        :
        <div className='text-center p-0' style={props.theme}>
          {/*will filter out " " since it is false  */}
          <p className='p-0 m-0'><b>{textInput.split(/\s+/).filter((e) => e !== " ").length}</b> words | <b>{textInput.length}</b> characters</p>
          <p className='p-0 m-0'>
            {hours > 0 && <span>{hours} Hr : </span>}
            {minutes > 0 && <span>{minutes} Min : </span>}
            {seconds > 0 && <span>{seconds} Sec : </span>}
            {milliSeconds} MiliSec Read
          </p>
        </div>}
      <div className='div'>
        <textarea id="input" className='textArea' rows={10} aria-label="With textarea" value={textInput} placeholder='Input here' onChange={renderInput} style={props.theme}></textarea>
        <button disabled={textInput.length == 0} className="copyBtn copyInput btn btn-primary" onClick={copyInput}>{copyIn}</button>
        <button disabled={textInput.length == 0} className="btn btn-danger copyBtn clearText" onClick={() => { clearText() }}>Clear Text</button>
        <textarea id="output" className='textArea' rows={10} aria-label="With textarea" value={textOutput} placeholder='Output here' readOnly style={props.theme}></textarea>
        <button disabled={textOutput.length == 0} className="copyBtn copyOutput btn btn-primary" onClick={copyOutput}>{copyOut}</button>
      </div>

      <div className="btnContainer">
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { upperCase() }}>UPPER CASE</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { lowerCase() }}>lower case</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { correct() }}>Correct</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { speak() }}>Speak</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { reverse() }}>Reverse</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { toggleCase() }}>Toggle Case</button>
        <button disabled={textInput.length == 0} className="btn btn-dark featureBtn" onClick={() => { capitalize() }}>Capitalize</button>
      </div>

    </div>
  )
}
