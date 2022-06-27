const category = document.querySelector('.category');
const difficulty = document.querySelector('.difficulty');
const question = document.querySelector('.question');
const BtnEvent = document.querySelector('.btn-quiz');
const body = document.querySelector('body');
const btnStorage = document.querySelector('.btn-storage');

BtnEvent.addEventListener('click', () => getQuiz())

async function getQuiz() {
    const response = await fetch('https://opentdb.com/api.php?amount=1')
    const result = await response.json();
    console.log(result);    

    result.results.map(element => {
        console.log(element.category);
        category.innerHTML = element.category;
        difficulty.innerHTML = element.difficulty
        question.innerHTML = element.question  
        const rightAnswer = document.createElement('div');
        const areaAnswer = document.createElement('div');
        const showStorage = document.createElement('div');
        areaAnswer.innerHTML = 
            `<div class="areaAnswer d-flex flex-column">
            <label for="answer">Answer:  </label>
            <textarea name="areaAnswer" id="areaAnswer" style="resize: none; width: 100vh;"></textarea>
            <button type="button" class="correctAnswer btn-lg btn btn-success w-auto ml-3 mt-3">Show Correct Answer</button>
            <button type ="butto" class= "delete btn-lg btn btn-outline-warning w-auto ml-3 mt-3">Next question</button>
            </div>`;
        body.appendChild(areaAnswer)
        const correctAnswer = areaAnswer.querySelector('.correctAnswer');
        correctAnswer.addEventListener('click', () => {
            rightAnswer.innerHTML = 
            `<div class="container d-flex flex-column justify-content-center align-items-center">
            <h2 class="font-weight-bold text-uppercase text-success text-center mt-3 d-flex justify-content-center align-items-center">${element.correct_answer}</h2>
            </div>`;
            areaAnswer.appendChild(rightAnswer); 
            const textValue = areaAnswer.querySelector('textarea');
            if (textValue.value === element.correct_answer) {
                textValue.classList.add('green')
            }else {
                textValue.classList.remove('green');
                textValue.classList.add('red')
            }
        })
        const Delete = areaAnswer.querySelector('.delete');
        Delete.addEventListener('click', () =>{
        body.removeChild(areaAnswer);
        BtnEvent.removeEventListener('click', getQuiz());
        rightAnswer.remove();
        body.removeChild(showStorage)
        })
    

        const storage = areaAnswer.querySelector('#areaAnswer');

        btnStorage.addEventListener('click', () => {
           const save = localStorage.setItem('quiz', storage.value);
           console.log(storage.value,'textarea');
           
           showStorage.innerHTML = `<div class="continer-storage d-flex flex-column justify-content-center align-items-center bg-white w-100 h-auto mt-3 text-lg-start align-">
           <div class="question mb-2">
               <h4>Question: ${element.question}</h4>
           </div>
           <div class="answer">
               <p>Answer: ${storage.value}</p>
           </div>
           <div class="coorect-answer text-success">
               <p>Correct Answer: ${element.correct_answer}</p>
           </div>
       </div>`

           body.appendChild(showStorage)
        })      

        
    
})}






