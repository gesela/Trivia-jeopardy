import './App.css';
import { useState } from 'react';
import Question from '../Question/Question';
import React from 'react';


function App() {

  const [showQuestion, setShowQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [questionObj, setQuestionObj] = useState({
    question: "",
    answer: "",
    category: "",
    points: 0,
    showQuestion: false

  });

  
  const handleScore = (e) => {
    console.log(e.target.name);
    console.log(e.target.name === "inc" ? questionObj.points :  questionObj.points*-1)
    let temp = questionObj.points;
    const tempScore = score + (e.target.name === "inc" ? temp :  temp*-1);
    setScore(tempScore);
  }

  const handleToggle = (e) => {
    setShowQuestion(!showQuestion);
    setQuestionObj({ ...questionObj, showQuestion: !showQuestion })
  }

  const handleClick = async () => {
      const URL = "http://jservice.io/api/random?count=10";
      setShowQuestion(false);
      try {
        const result = await fetch(URL);
        const data = await result.json();
        console.log(data);
        if (!data[0].value || !data[0].answer || !data[0].question || !data[0].category.title) {
          console.log("try again");
          handleClick();
        } else {
        const obj = {
          question: data[0].question,
          answer: data[0].answer,
          category: data[0].category.title,
          points: data[0].value,
          showQuestion: false
        }
        setQuestionObj(obj);
      }
      } catch (e) {
        console.log(e);
      }
  }
  return (
    <div className="App">
      <h1>Welcome To Jeopardy!!</h1>
      <h1>Score: {score}</h1>
      {
        showQuestion ?
          <React.Fragment>
            <button className='button1' onClick={handleScore} name="inc">Correct</button>
            <button className='button2' onClick={handleScore} name="dec">Not Correct</button>
          </React.Fragment>
        :
        
          <React.Fragment>
          </React.Fragment>
      }
      <button onClick={handleClick}>Random Trivia Question</button>
      <Question questionObj={questionObj} handleToggle={handleToggle} />
    </div>
  );
}

export default App;