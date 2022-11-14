import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from '../assets/play.mp3'
import Answer from './Answer';


function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    console.log("DATA", data)

    const [question, setQuestion] = useState('');

    const [letsPlay] = useSound(play)


    const incorrect_answers = question.incorrect_answers;
    const correct_answer = question.correct_answer;

    // const answers = [incorrect_answers + correct_answer];
    console.log("incorrect_answers", incorrect_answers)
    console.log("correct_answer", correct_answer)

    // console.log("here is working")
    const answers = (incorrect_answers + `,${correct_answer}`).split(',').sort(() => Math.random() - 0.5)
    // const answers = incorrect_answers
    // console.log(answers)


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
                    <Answer answer={answer} question={question} setStop={setStop} setQuestionNumber={setQuestionNumber}/>
                ))}
            </div>
        </div>

    )
}

export default Trivia