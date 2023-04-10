function choice(event){
    const box=event.currentTarget;
    const questionNumber=box.dataset.questionId;
    const choiceId=box.dataset.choiceId;
    choices[questionNumber]=choiceId;
    for(const otherBox of allBoxes){
        if(otherBox.dataset.questionId===questionNumber && otherBox!==box){
            otherBox.classList.remove('chosen');
            const otherCheckbox=otherBox.querySelector('.checkbox');
            otherCheckbox.src="images/unchecked.png";
            otherBox.classList.add('unchosen');
            otherBox.addEventListener('click', choice);
        }
    }
    box.classList.remove('unchosen');
    box.classList.add('chosen');
    const checkbox=box.querySelector('.checkbox');
    checkbox.src="images/checked.png";
    box.removeEventListener('click', choice);
    if(isQuizComplete()){
        quizCompleted();
    }
}
function isQuizComplete(){
    const chosenBoxes=document.querySelectorAll('.choice-grid div.chosen');
    return chosenBoxes.length===3;
}
function quizCompleted(){
    for(const box of allBoxes){
        box.removeEventListener('click', choice);
    }
    if(choices["two"]===choices["three"])
        showResult(choices["two"]);
    else
        showResult(choices["one"]);
}
function showResult(choice){
    result=document.querySelector('#result');
    const resultTitle=result.querySelector('h1');
    const resultText=result.querySelector('p');
    const refreshButton=document.querySelector('#refresh');
    resultTitle.textContent=RESULTS_MAP[choice].title;
    resultText.textContent=RESULTS_MAP[choice].contents;
    result.classList.remove('hidden');
    window.scrollTo(0, document.body.scrollHeight);
    refreshButton.addEventListener('click', refresh);
}
function refresh(event){
    for(const box of allBoxes){
        box.classList.remove('chosen');
        box.classList.remove('unchosen');
        const checkbox=box.querySelector('.checkbox');
        checkbox.src="images/unchecked.png";
        box.addEventListener('click', choice);
    }
    result.classList.add('hidden');
    window.scrollTo(0,0);
}
let choices={};
//const boxs=document.querySelectorAll('.choice-grid div');
const allBoxes=document.querySelectorAll('.choice-grid div');
for(const box of allBoxes){
    box.addEventListener('click', choice);
}