var question = null;

var getQ = function () {
  var q = document.getElementById("qDisplay");
  var randNumb = Math.floor(Math.random() * 7);

  if (randNumb === 0) {
    q.textContent = "What do you eat if all you have is a pair of socks?";
    question = 0;
  } else if (randNumb === 1) {
    q.textContent = "What is the warmest spot in a room?";
    question = 1;
  } else if (randNumb === 2) {
    q.textContent = "What is a cow without legs?";
    question = 2;
  } else if (randNumb === 3) {
    q.textContent =
      "There’s a one-story house in which everything is yellow. Yellow walls, yellow doors, yellow furniture. What color are the stairs?";
    question = 3;
  } else if (randNumb === 4) {
    q.textContent =
      "I’m tall when I’m young, and I’m short when I’m old. What am I?";
    question = 4;
  } else if (randNumb === 5) {
    q.textContent =
      "The poor have me, the rich don't want me, and if you breath me in, you'll die.";
    question = 5;
  } else if (randNumb === 6) {
    q.textContent =
      "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?";
    question = 6;
  }

  document.getElementById("qRespond").textContent = "";
  document.getElementById("in").value = "";
};

var askQ = function () {
  var A = document.getElementById("in").value;
  var R = document.getElementById("qRespond");

  if (question === 0) {
    if (A == "The pear" || A == "the pear") {
      R.textContent = "Correct!!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "The pear".';
    }
  }

  if (question === 1) {
    if (A == "The corner" || A == "the corner") {
      R.textContent = "Correct!!, get it, the corner, like 90 degrees!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "The corner".';
    }
  }

  if (question === 2) {
    if (A == "Ground beef" || A == "ground beef") {
      R.textContent = "Correct!!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "Ground beef".';
    }
  }
  if (question === 3) {
    if (A == "there isn't any" || A == "there aren't any") {
      R.textContent = "Correct!! because it's a one story house!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "There aren’t any".';
    }
  }
  if (question === 4) {
    if (A == "a candle" || A == "A candle") {
      R.textContent = "Correct!!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "A candle".';
    }
  }
  if (question === 5) {
    if (A == "nothing" || A == "Nothing") {
      R.textContent = "Correct!!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "Nothing".';
    }
  }
  if (question === 6) {
    if (A == "Your breath" || A == "your breath") {
      R.textContent = "Correct!!";
    } else if (A === "") {
      R.textContent = "Please input an answer.";
    } else {
      R.textContent = 'Wrong!!, The answer was "Your breath".';
    }
  }

  document.getElementById("in").value = "";
};

var elem = document.getElementById("in");
elem.onkeyup = function (e) {
  if (e.keyCode == 13) {
    askQ();
  }
};

var yeet = function (event) {
  document.getElementById("body").style.left = event.offsetX;
  document.getElementById("body").style.top = event.offsetY;
};

document.addEventListener("mousemove", yeet(event));
