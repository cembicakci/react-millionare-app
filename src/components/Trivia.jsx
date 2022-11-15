import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from '../assets/play.mp3'
import Answer from './Answer';


function Trivia({ data, setStop, setQuestionNumber, questionNumber, setCountCorrectAnswer, countCorrectAnswer }) {

    console.log("DATA", data)

    const [question, setQuestion] = useState('');
    const [letsPlay] = useSound(play)


    const incorrect_answers = question?.incorrectAnswers;
    const correct_answer = question?.correctAnswer;

    console.log("incorrect_answers", incorrect_answers)
    console.log("correct_answer", correct_answer)

    const answers = (incorrect_answers + `,${correct_answer}`).split(',').sort(() => Math.random() - 0.5)

    console.log(answers)

    useEffect(() => {
        letsPlay()
    }, [letsPlay])


    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])


    return (
        <div className='trivia'>
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question && answers.map(answer => (
                    <Answer answer={answer} question={question} setStop={setStop} setQuestionNumber={setQuestionNumber} setCountCorrectAnswer={setCountCorrectAnswer} countCorrectAnswer={countCorrectAnswer} />
                ))}
            </div>
        </div>

    )
}

export default Trivia