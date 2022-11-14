import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from '../assets/play.mp3'
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'


function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    console.log("DATA", data)

    const [question, setQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClasName] = useState('');
    const [letsPlay] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)


    const incorrect_answers = question.incorrect_answers;
    const correct_answer = question.correct_answer;

    // const answers = [incorrect_answers + correct_answer];
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

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    }

    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClasName('answer active')

        delay(3000, () => {
            if (answer === question.correct_answer) {
                console.log("HEREEEE IS WORKINNG")
                setClasName('answer correct')
            } else {
                console.log("ANOTHERRRRR IS WOKINGGG")
                setClasName('answer wrong')
            }

        })
        delay(5000, () => {
            if (answer === question.correct_answer) {
                console.log("HERE IS WORKINNG")
                correctAnswer()
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer('')
                })

            } else {
                console.log("ANOTHER IS WOKINGGG")
                wrongAnswer()
                delay(1000, () => {
                    setStop(true)
                })

            }
        })
    }

    return (
        <div className='trivia'>
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question && answers.map(answer => (
                    <div className={selectedAnswer === answer ? className : "answer"} key={answer.id} onClick={() => handleClick(answer)}>{answer}</div>
                ))}
            </div>
        </div>

    )
}

export default Trivia