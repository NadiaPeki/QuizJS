const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];
// Находим элементы

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')
// Создаем переменные игры

let score = 0 // количество правильных ответов
let questionIndex = 0 // текущий вопрос, первый вопрос имеет индекс 0 т к это массив

// Пишем функцию для очистки страницы
// Очищаем внутренний текст дивов с вопросом и ответами
clearPage()
showQuestion()
// Проверяем ответ
// По клику по кнопке ответить будет срабатывать функция checkAnswer
submitBtn.onclick = checkAnswer

function clearPage() {
	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}

// Пишем функцию, которая отображает вопрос
function showQuestion() {
// Нашли вопрос
// присваиваем переменной ту шаблонную строку, с которой нужно поработать(где лежит вопрос) 
const headerTemplate = `<h2 class="title">%title%</h2>`
// используем метод replace и присваиваем новую строку переменной
const title = headerTemplate.replace('%title%', questions[questionIndex]['question']) 
// Отображаем вопрос на странице
// Во внутренний html headerContainer записываем содержимое переменной title
headerContainer.innerHTML = title
// Варианты ответов
// Обходим массив с ответами на вопрос, чтобы на каждой итерации получить отдельно каждый ответ
//for ([index, answerText] of questions[questionIndex]['answers'].entries())  {}
//Объявляем переменную для номеров ответов
let answerNumber = 1
for (answerText of questions[questionIndex]['answers']) {
// Создаем шаблон для ответа, копируем кусок html с ответом
	 const questionTemplate =  
		`<li>
		<label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	    </li>` 
		// Используем метод replace чтобы заменить метку нужным элементом
const answerHTML = questionTemplate
.replace('%answer%', answerText)
.replace('%number%', answerNumber)
// чтобы внутренний html не перезаписывался, а добавлялся к существующему на каждой итерации массива
listContainer.innerHTML += answerHTML
answerNumber++
} 
}

function checkAnswer() {
	// Нашли выбранную кнопку по тегу input с типом radio и псевдоклассом checked
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	//Проверяем существует ли выбранная кнопка checkedRadio, но наоборот. Т е НЕ сушествует это true
	if(!checkedRadio) {
		submitBtn.blur() // блюрим кнопку
		// если ответ не выбран, то ничего не делаем, выходим из функции
		return
	} 
  //получаем значение выбранной кнопки и переводим строку в число
   const userAnswer = parseInt(checkedRadio.value)
   // Проверяем правильный ли ответ. Если да, то увелич счет
   // Добираемся до свойства с правильным ответом
   if (userAnswer === questions[questionIndex]['correct']) {
	score++
   }
   // Проверяем НЕ последний ли это вопрос
   if (questionIndex !== questions.length - 1) {
	//Не последний вопрос
	//Увеличиваем индекс на 1
   questionIndex++
   // очищаем страницу вызывая функцию clearPage
   clearPage()
   // Показываем следуюший вопрос вызывая функцию showQuestion
   showQuestion()
   return
   // Последний вопрос
   } else {
	//очищаем страницу
	clearPage()
	// запускаем функцию показывающую результат
	showResults()
   }
}   

function showResults() {
	console.log('showresults started')
	console.log(score)
// Создаем шаблон с результатами
const resultsTemplate = `<h2 class="title">%title%</h2> 
<h3 class="summary">%message%</h3> 
<p class="result">%result%</p> `

let title, message
// Варианты заголовков и текста
if (score === questions.length) {
title = 'Поздравляем!Йухуууу'
message = 'Вы ответили верно на все вопросы!Так держать!'
// Проверяем если ответили больше чем на половину вопросов, проводим рассчет в процентах
} else if ((score * 100) / questions.length >= 50) {
	title = 'Неплохой результат!'
	message = 'Вы дали более половины правильных ответов!'
} else {
	title = 'Ну что же вы так!'
	message = 'Пока у вас меньше половины правильных ответов!'
}

// Результат

let result = `${score} из ${questions.length}`

// Финальный ответ, подставляем данные в шаблон
const finalMessage = resultsTemplate
.replace('%title%', title)
.replace('%message%', message)
.replace('%result%', result)

// Выводим финальное сообщение на страницу
headerContainer.innerHTML = finalMessage
// Меняем кнопку на Играть снова
submitBtn.blur()
submitBtn.innerText = 'Начать заново'
// По клику на кнопку запускается функция
// history.go() без аргументов обновляет страницу. Нам нужно чтобы history.go() сработало только после клика, поэтому помещаем в функцию, кот запустится только по клику
submitBtn.onclick = () =>{history.go()} //стрелочная функция 
// function() {
//	history.go()
//}
}