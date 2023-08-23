let body = document.querySelector("body");
let form = document.querySelector("form");
let span = document.querySelector("h1 span");
let submit = document.createElement("button");
submit.className = "submit";
submit.innerHTML = "Submit";
var nqc = 0;
let answered = [];

// some variables
let numQues = 0;
let level = 0;
let category = parseInt(span.innerText);
//  console.log(category);

let idx = 0;
//question array
let questions = [];

let StartQuiz = () => {
  body.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("questions");
  let div1 = document.createElement("div");
  const random = Math.floor(Math.random() * 3) + 1;
  if (random == 1) {
    div.innerHTML = ` <label for="agree" id="agree">${questions[idx].text}</label>
<p class="option">
    <input type="radio" class = "options" name="option"  value="1">${questions[idx].correct}<br></input>
    <input type="radio" class = "options" name="option" value="2">${questions[idx].incorrect[0]}<br></input>
    <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
    <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
</p>
<button id="btn_two">Previous</button>
<button id="btn_one">Next</button>
`;
  } else if (random == 2) {
    div.innerHTML = ` <label for="agree" id="agree">${questions[idx].text}</label>
    <p class="option">
        <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}<br></input>
        <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}<br></input>
        <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
        <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
    </p>
    <button id="btn_two">Previous</button>
    <button id="btn_one">Next</button>
    `;
  } else if (random == 3) {
    div.innerHTML = ` <label for="agree" id="agree">${questions[idx].text}</label>
        <p class="option">
            <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}<br></input>
            <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}<br></input>
            <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}<br></input>
            <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}<br></input>
        </p>
        <button id="btn_two">Previous</button>
        <button id="btn_one">Next</button>
        `;
  } else if (random == 4) {
    div.innerHTML = ` <label for="agree" id="agree">${questions[idx].text}</label>
            <p class="option">
                <input type="radio" class = "options" name="option"  value="2">${questions[idx].incorrect[0]}</input><br>
                <input type="radio" class = "options" name="option" value="4">${questions[idx].incorrect[2]}</input><br>
                <input type="radio" class = "options" name="option" value="3">${questions[idx].incorrect[1]}</input><br>
                <input type="radio" class = "options" name="option" value="1">${questions[idx].correct}</input><br>
            </p>
            <button id="btn_two">Previous</button>
            <button id="btn_one">Next</button>
            `;
  }
  body.append(div);
  let nxtbtn = document.getElementById("btn_one");
  let prevbtn = document.getElementById("btn_two");

  // var checked =document.querySelector('input[name="agree"]:checked').value;
  //if(checked==1)nqc++;

  nxtbtn.addEventListener("click", () => {
    let radio = document.querySelectorAll("input[type='radio']");
    idx++;
    for (var i=0;i< radio.length;i++) {
      if (radio[i].checked && radio[i].value === "1") {
        nqc++;
      }
      if (radio[i].checked){
      answered.push(radio[i].value);
      } 
      console.log(answered);
    }
    if (idx < questions.length) StartQuiz();
    else {
      body.append(submit);
    }
  });
  prevbtn.addEventListener("click", () => {
    idx--;
    if (idx >= 0) StartQuiz();
    else alert("No previous questions");
  });

  submit.addEventListener("click", () => {
    var ansarr=[];
    for (var i=0; i < answered.length; i++) {
      if(answered[i]==1)ansarr.push(questions[i].correct);
      else{
        ansarr.push(questions[i].incorrect[answered[i]-2]);
      }
    }
    body.innerHTML = `<h2>your questions are submitted and you have done ${nqc} correct questions. answers are shown below</h2>`;
    let ques = document.createElement("div");
    ques.className="ques";
    for (let idx = 0; idx < questions.length; idx++) {
      let que = document.createElement("div");
      que.className="que";
      que.innerHTML = ` <div id="agree">${idx+1} ${questions[idx].text}</div>
        <p class="option">correct answer: ${questions[idx].correct}</p>
        <p class="option">chosen option:${ansarr[idx]}</p>
        `;
      ques.append(que);
    }
    body.append(ques);
  });
};

let fetchData = async () => {
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=${numQues}&category=${category}&difficulty=${level}&type=multiple`
  );
  let data = response.data.results;
  for (let q of data) {
    questions.push({
      text: q.question,
      correct: q.correct_answer,
      incorrect: q.incorrect_answers,
    });
  }
  StartQuiz();
};

//taking the difficulty and the number of question from the form
let fillData = (e) => {
  e.preventDefault(); //to stop the refreshing of the page on submitting the form
  let numQ = document.querySelector("#num_ques");
  let diffi = document.querySelector("#diff_level");
  numQues = numQ.value;
  level = diffi.value;
  //   console.log(numQues, level);
  fetchData();
};
form.addEventListener("submit", fillData);


