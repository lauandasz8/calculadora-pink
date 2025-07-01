import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (value) => {
    if (value === '*') {
      setDisplay((prev) => prev + '×');
    } else if (value === '/') {
      setDisplay((prev) => prev + '÷');
    } else {
      setDisplay((prev) => prev + value);
    }
  };

  const calculate = () => {
    try {
      const expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(',', '.');

      const result = eval(expression).toString();
      setDisplay(result.replace('.', ','));
      setHistory([...history, `${display} = ${result.replace('.', ',')}`]);
    } catch {
      setDisplay('Erro');
    }
  };

  const clear = () => setDisplay('');
  const backspace = () => setDisplay(display.slice(0, -1));
  const invertSign = () => {
    try {
      const value = parseFloat(display.replace(',', '.'));
      if (!isNaN(value)) {
        setDisplay((-value).toString().replace('.', ','));
      }
    } catch {
      setDisplay('Erro');
    }
  };

  const handleSpecial = (type) => {
    try {
      const value = parseFloat(display.replace(',', '.'));
      let result;

      switch (type) {
        case '1/x':
          result = 1 / value;
          break;
        case 'x²':
          result = value * value;
          break;
        case '√':
          result = Math.sqrt(value);
          break;
        case '%':
          result = value / 100;
          break;
        default:
          return;
      }
      setDisplay(result.toString().replace('.', ','));
    } catch {
      setDisplay('Erro');
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);
  const clearHistory = () => setHistory([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (!isNaN(key) || ['+', '-', '*', '/', ','].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={`calculator ${darkMode ? 'dark' : ''}`}>
      <h1>BarbieMath🎀</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
      </button>
      <input type="text" value={display} readOnly className="display" />

      <div className="buttons">
        <div className="row-6">
          <button>MC</button>
          <button>MR</button>
          <button>M+</button>
          <button>M−</button>
          <button>MS</button>
          <button>Mv</button>
        </div>

        <div className="row-4">
          <button onClick={() => handleSpecial('%')}>%</button>
          <button onClick={() => setDisplay('')}>CE</button>
          <button onClick={clear}>C</button>
          <button onClick={backspace}>⌫</button>

          <button onClick={() => handleSpecial('1/x')}>1/x</button>
          <button onClick={() => handleSpecial('x²')}>x²</button>
          <button onClick={() => handleSpecial('√')}>√</button>
          <button onClick={() => handleClick('/')}>÷</button>

          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('*')}>×</button>

          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')}>−</button>

          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('+')}>+</button>

          <button onClick={invertSign}>+/-</button>
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick(',')}>,</button>
          <button onClick={calculate} className="equal">=</button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>Histórico</h3>
          <ul>
            {history.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button className="clear-history" onClick={clearHistory}>🗑 Limpar Histórico</button>
        </div>
      )}
    </div>
  );
}

export default App;
