let lives;
let currentQuestion;
let score = 0;
let correctAnswers = 0;
let timerInterval;
let timeLeft = 30;
let maxTimeLeft = 30;
let difficultyLevel = 1;

function startGame() {
  lives = parseInt(document.getElementById("livesInput").value);
  score = 0;
  correctAnswers = 0;
  timeLeft = 30;
  maxTimeLeft = 30;
  difficultyLevel = 1;
  if (isNaN(lives) || lives < 1) 
  {
    alert("Введите корректное количество жизней (целое число больше 0)");
    return;
  }
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("lives").textContent = "Жизней: " + lives;
  document.getElementById("score").textContent = "Счёт: " + score;
  document.getElementById("checkButton").textContent = "Проверить";
  document.getElementById("checkButton").onclick = checkAnswer;
  document.getElementById("answerInput").style.display = "block";
  generateQuestion();
  startTimer();
}

function generateQuestion() 
{
  let operators;
  switch (difficultyLevel) 
  {
    case 1:
      operators = ['+'];
      break;
    case 2:
      operators = ['+', '-'];
      break;
    case 3:
      operators = ['+', '-', '*', '/'];
      break;
  }
  const num1 = Math.floor(Math.random() * 100) + 1;
  const num2 = Math.floor(Math.random() * 100) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  currentQuestion = `${num1} ${operator} ${num2}`;
  let questionText = currentQuestion;
  if (operator === '/') {
    questionText += " (Результат будет округлен вниз)";
  }
  document.getElementById("question").textContent = questionText;
  document.getElementById("answerInput").value = "";
  document.getElementById("result").textContent = "";
  timeLeft = maxTimeLeft;
  document.getElementById("timer").textContent = timeLeft;
}

function checkAnswer() 
{
  const answerInput = parseInt(document.getElementById("answerInput").value);
  const resultElement = document.getElementById("result");
  let correctAnswer;

  try 
  {
    if (currentQuestion.includes('/')) 
    {
      const parts = currentQuestion.split('/');
      correctAnswer = Math.floor(parseInt(parts[0]) / parseInt(parts[1]));
    } 
    else 
    {
      correctAnswer = eval(currentQuestion);
    }
  } 
  catch (error) 
  {
    resultElement.textContent = "Ошибка в выражении!";
    return;
  }

  if (correctAnswer === answerInput) 
  {
    resultElement.textContent = "Правильно!";
    score++;
    correctAnswers++;
    document.getElementById("score").textContent = "Счёт: " + score;
    if (score % 5 === 0) 
    {
      lives++;
      alert("Поздравляем! Получена дополнительная жизнь!");
      document.getElementById("lives").textContent = "Жизней: " + lives;
    }
    if (correctAnswers % 1 === 0) 
    {
      // maxTimeLeft -= 5;
      if (maxTimeLeft <= 30) 
      {
        maxTimeLeft = 30;
      }
      timeLeft = maxTimeLeft;
      document.getElementById("timer").textContent = timeLeft;
      difficultyLevel++;
      if (difficultyLevel > 3) 
      {
        difficultyLevel = 3;
      }
    }
    generateQuestion();
    startTimer();
  } 
  else 
  {
    lives--;
    resultElement.textContent = "Неправильно!";
    document.getElementById("lives").textContent = "Жизней: " + lives;
    if (lives === 0) 
    {
      gameOver();
    }
  }
}

function gameOver() 
{
  document.getElementById("result").textContent = "Игра окончена! Вы проиграли. Ваш счёт: " + score + " правильных ответов.";
  document.getElementById("checkButton").textContent = "Начать заново";
  document.getElementById("checkButton").onclick = restartGame;
  document.getElementById("answerInput").style.display = "none";
  clearInterval(timerInterval);
}

function restartGame() 
{
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("livesInput").value = "";
  document.getElementById("checkButton").textContent = "Проверить";
  document.getElementById("checkButton").onclick = checkAnswer;
  document.getElementById("answerInput").style.display = "block";
  timeLeft = 30;
  maxTimeLeft = 30;
  startGame();
}

function startTimer() 
{
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) 
    {
      clearInterval(timerInterval);
      lives--;
      document.getElementById("result").textContent = "Время вышло! Неправильно!";
      document.getElementById("lives").textContent = "Жизней: " + lives;
      if (lives === 0) 
      {
        gameOver();
      } 
      else 
      {
        generateQuestion();
        startTimer();
      }
    }
  }, 1000);
}


