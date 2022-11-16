import React, { useState } from 'react'
import useSound from 'use-sound';
import correct from '../assets/correct.mp3'
import wrong from '../assets/wrong.mp3'

function Answer({ answer, question, setStop, setQuestionNumber, setCountCorrectAnswer, countCorrectAnswer }) {

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClassName] = useState('');

    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)


    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClassName('answer active')


        delay(3000, () => {
            setClassName(answer === question.correctAnswer ? "answer correct" : "answer wrong");

        })
        delay(5000, () => {
            if (answer === question.correctAnswer) {
                correctAnswer()
                setCountCorrectAnswer(prev => prev + 1)
                
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer('')
                })

                if (countCorrectAnswer === 14) {
                    setStop(true)
                }

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
        <div className={selectedAnswer === answer ? className : "answer"} key={answer.id} onClick={() => !selectedAnswer && handleClick(answer)}>{answer}</div>
    )
}

export default Answer