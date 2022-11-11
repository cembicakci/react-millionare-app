import React, { useEffect, useState } from 'react'


function Trivia({ data, setStop, setQuestionNumber, questionNumber }) {

    const [question, setQuestion] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [className, setClasName] = useState('');

    console.log(data)

    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber])

    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClasName('active answer')
        setTimeout(() => {
            setClasName(answer.correct ? 'answer correct' : 'answer wrong')
        }, 3000)
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