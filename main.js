var StartGame = (function()
{
  var playArr = [[,,],[,,],[,,]];
  var flagArr = [[0,0,0],[0,0,0],[0,0,0]];
  var userChar,computerChar,count=0,won=false;
  var getChars = () => 
  {
  var usersChar = document.querySelectorAll('input[type="radio"]');
  usersChar[0].checked ? userChar = usersChar[0].value : userChar = usersChar[1].value;
    //hide sign selection
  document.getElementById('selectCharacter').style.display = "none";
    //assign computer a sign to play - opposite of user
  computerChar = assignSign(userChar);
  playGame();

  };

  var assignSign = (sign) => 
  {
    sign === "X" ? computerSign = "O" : computerSign = "X";
    return computerSign;
  };

  var playGame = () => 
  {
    var playArea = document.getElementById('playArea');
    playArea.style.display = "block";
    playArea.addEventListener("click",function(e)
    {
    var row = Number(e.target.getAttribute('name').split('')[0]);
    var column = Number(e.target.getAttribute('name').split('')[1]);
    playArr[row][column] = userChar;
    flagArr[row][column] = 1;
    e.target.innerText = userChar;
    count++;
    document.getElementsByName(`${row}${column}`)[0].style.pointerEvents = 'none';
    if (!won)
    {
        checkWinner();
     }
      if (count < 9)
      {
        setTimeout(computerTurn,700);
      }
    });
  };

  var computerTurn = () => 
  {
    var flagChck = 0;
    while (flagChck === 0)
    {
      var row = Math.floor(Math.random() * flagArr.length);
      var column = Math.floor(Math.random() * flagArr.length);
      if (flagArr[row][column] === 0)
      {
        playArr[row][column] = computerChar;
        flagArr[row][column] = 1;
        document.getElementsByName(`${row}${column}`)[0].innerHTML = computerChar;
        document.getElementsByName(`${row}${column}`)[0].style.pointerEvents = 'none';
        count++;
        flagChck = 1;
        if (!won)
        {
          checkWinner();
        }
      }
    }
  };

  var checkWinner = () => 
  {
    for (var i=0;i<3;i++)
    {
      var winningCount = 0;
      for (var j=0;j<3;j++)
      {
        if (playArr[i][j] === 'X')
        {
          winningCount += 1;
        }
        else if (playArr[i][j] === 'O')
        {
          winningCount -= 1;
        }
      }
      winningAlert(winningCount);
    }
      
    for (var j=0;j<3;j++)
    {
      var winningCount = 0;
      for (var i=0;i<3;i++)
      {
        if (playArr[i][j] === 'X')
        {
          winningCount += 1;
        }
        else if (playArr[i][j] === 'O')
        {
          winningCount -= 1;
        }
      }
      winningAlert(winningCount);
    }

    var winningCount = 0;
    for (var i=0;i<3;i++)
    {
      if (playArr[i][i] === 'X')
      {
        winningCount += 1;
      }
      else if (playArr[i][i] === 'O')
      {
        winningCount -= 1;
      }
      winningAlert(winningCount);
    }

    var winningCount = 0;
    for (var i=0,j=2;i<3;i++,j--)
    {
      if (playArr[i][j] === 'X')
      {
        winningCount += 1;
      }
      else if (playArr[i][j] === 'O')
      {
        winningCount -= 1;
      }
      winningAlert(winningCount);
    }
  } ;

  var winningAlert = (winningCount) => 
  {
    var playArea = document.getElementById('playArea');
    if ((winningCount === 3) || (winningCount === -3))
    {
      won = true;
      var winner;
      if (winningCount === 3)
      {  
        userChar === 'X' ? winner = 'You' : winner = 'Computer';
      }else if (winningCount === -3)
      {
        userChar === 'O' ? winner = 'You' : winner = 'Computer';
      }
      alert(`${winner} won`);
      playArea.classList.add('disabledbutton');
      resetBtn.style.display = "block";
    }
  };

  return{
    getChars : getChars
  }
})();

var playBtn = document.querySelector('button');
playBtn.addEventListener('click',function(){
  //get both radio button
  StartGame.getChars();
});

//Reset Button reloads page
var resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener("click",function(){
  location.reload();
});