const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#scoreText");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question : 'HTML adalah sngkatan dari ?',
        choice1 : 'Hyper Text Markup Language',
        choice2 : 'Hyper Text Markup L',
        choice3 : 'Hyper Text M Language',
        choice4 : 'Hyper T Markup Language',
        answer : 1
    },
    {
        question : 'Tag penutup <body> adalah',
        choice1 : '</html>',
        choice2 : '</body>',
        choice3 : '</title>',
        choice4 : '<body>',
        answer : 2
    },
    {
        question : 'Tag <h1> berfungsi untuk ?',
        choice1 : 'Membuat teks paragraf',
        choice2 : 'Membuat tombol',
        choice3 : 'Membuat Heading',
        choice4 : 'Menampilkan gambar',
        answer : 3
    },
    {
        question : 'CSS singkatan dari ?',
        choice1 : 'Hyper Text Markup Language',
        choice2 : 'Cache Style Sheet',
        choice3 : 'Cascading Show Sheet',
        choice4 : 'Cascading Style Sheet',
        answer : 4
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS =4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()