import React, { useState } from 'react'
import useSound from 'use-sound';
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'

function Answer({ answer, question, setStop, setQuestionNumber }) {

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClasName] = useState('');

    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)


    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClasName('answer active')

        delay(3000, () => {
            if (answer === question.correctAnswer) {
                setClasName('answer correct')
            } else {
                setClasName('answer wrong')
            }

        })
        delay(5000, () => {
            if (answer === question.correctAnswer) {
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

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    }


    return (
        <div className={selectedAnswer === answer ? className : "answer"} key={answer.id} onClick={() => handleClick(answer)}>{answer}</div>
    )
}

export default Answer