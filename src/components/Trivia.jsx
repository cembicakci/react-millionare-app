import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from '../assets/play.mp3'
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'


function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    const [question, setQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClasName] = useState('');
    const [letsPlay] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)

    useEffect(() => {
        letsPlay()
    }, [letsPlay])

    console.log(data)

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
        setClasName('active answer')
        delay(3000, () => {
            setClasName(answer.correct ? 'answer correct' : 'answer wrong')
        })
        delay(5000, () => {
            if (answer.correct) {
                correctAnswer()
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer('')
                })

            } else {
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
                {question && question.answers.map(answer => (
                    <div className={selectedAnswer === answer ? className : "answer"} key={answer.id} onClick={() => handleClick(answer)}>{answer.text}</div>
                ))}
            </div>
        </div>

    )
}

export default Trivia