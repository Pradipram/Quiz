import React from 'react'
import { AnswerObject } from '../App'
import './QuestionCard.css'
import { ButtonWrapper } from './QuestionCardStyle'

type props = {
  question :string,
  answers : string[],
  callback : (e: React.MouseEvent<HTMLButtonElement>) => void,
  userAnswer : AnswerObject|undefined,
  questionNr:number,
  totalQuestion : number
}

const QuestionCard:React.FC<props> = ({question,answers,callback,userAnswer,questionNr,totalQuestion}) => {

  // const handleClick = (e : any)=>{
  //   console.log(e.target.outerText);
  // }

  return (
    <div className='QuestionCard'>
      <p className="number">
        Question: {questionNr}/{totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{__html:question}}/>
      <div>
        {answers.map(answer =>(
          <ButtonWrapper key={answer} correct = {userAnswer?.correctAnswer === answer} userClicked = {userAnswer?.answer === answer}>
            <button disabled={userAnswer?true:false} onClick={(e) => callback(e)}>
              <span dangerouslySetInnerHTML={{__html:answer}}/>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard