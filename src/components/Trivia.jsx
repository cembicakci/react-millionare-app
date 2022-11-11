import React, { useEffect, useState } from 'react'


function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    const [question, setQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClasName] = useState('');

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
        delay(6000, () => {
            if (answer.correct) {
                setQuestionNumber(prev => prev + 1)
                setSelectedAnswer('')
            } else {
                setStop(true)
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