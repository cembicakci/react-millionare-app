import { useContext, useEffect, useState } from 'react';
import './App.css'
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from './components/Start';
import Confetti from 'react-confetti'
// import { data } from './data';

import DataContext from './context/DataContext';



function App() {

  const [userName, setUserName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('$ 0');
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);

  const { data } = useContext(DataContext)
  const { fetchDatas } = useContext(DataContext)

  useEffect(() => {
    fetchDatas()
  }, [])

  console.log(data)

  const moneyPyramid = [
    { id: 1, amount: '$ 100' },
    { id: 2, amount: '$ 200' },
    { id: 3, amount: '$ 300' },
    { id: 4, amount: '$ 500' },
    { id: 5, amount: '$ 1000' },
    { id: 6, amount: '$ 2000' },
    { id: 7, amount: '$ 4000' },
    { id: 8, amount: '$ 8000' },
    { id: 9, amount: '$ 16000' },
    { id: 10, amount: '$ 32000' },
    { id: 11, amount: '$ 64000' },
    { id: 12, amount: '$ 125000' },
    { id: 13, amount: '$ 256000' },
    { id: 14, amount: '$ 500000' },
    { id: 15, amount: '$ 1000000' },
  ].reverse();

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
  }, [moneyPyramid, questionNumber])


  return (
    <div className="App">

      {countCorrectAnswer === 15 ?
        <>
          <Confetti width='1000px' height='1000px' />
        </>
        : ''}
      {userName ? (
        <>
          <div className="main">
            {stop ? (<h1 className='endText'>{countCorrectAnswer === 3 ? 'Congrats! You are a millionare🎉' : `You earned: ${earned} money`}</h1>) : (
              <>
                <div className='top'>
                  <div className='timer'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className='bottom'>
                 { questionNumber &&
                   <Trivia data={data} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setCountCorrectAnswer={setCountCorrectAnswer} countCorrectAnswer={countCorrectAnswer}/>
                 }
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
            <ul className='moneyList'>
              {moneyPyramid.map(money => (
                <li className={questionNumber === money.id ? 'moneyListItem active' : 'moneyListItem'} key={money.id}>
                  <span className='moneyListItemNumber'>{money.id}</span>
                  <span className='moneyListItemAmount'>{money.amount}</span>
                </li>
              ))}
            </ul>
          </div>

        </>
      ) : <Start setUserName={setUserName} />}

    </div>
  );
}

export default App;
