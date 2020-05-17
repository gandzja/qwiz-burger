// обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', function () {
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  //const modalWrap = document.querySelector(".modal")
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');
  const sendButton = document.querySelector('#send');

  // объект содержащий вопросы и ответы
  const questions = [
    {
      question: 'Какого цвета бургер?',
      answers: [
        {
          title: 'Стандарт',
          url: './image/burger.png',
        },
        {
          title: 'Черный',
          url: './image/burgerBlack.png',
        },
      ],
      type: 'radio',
    },
    {
      question: 'Из какого мяса котлета?',
      answers: [
        {
          title: 'Курица',
          url: './image/chickenMeat.png',
        },
        {
          title: 'Говядина',
          url: './image/beefMeat.png',
        },
        {
          title: 'Свинина',
          url: './image/porkMeat.png',
        },
      ],
      type: 'radio',
    },
    {
      question: 'Дополнительные ингредиенты?',
      answers: [
        {
          title: 'Помидор',
          url: './image/tomato.png',
        },
        {
          title: 'Огурец',
          url: './image/cucumber.png',
        },
        {
          title: 'Салат',
          url: './image/salad.png',
        },
        {
          title: 'Лук',
          url: './image/onion.png',
        },
      ],
      type: 'checkbox',
    },
    {
      question: 'Добавить соус?',
      answers: [
        {
          title: 'Чесночный',
          url: './image/sauce1.png',
        },
        {
          title: 'Томатный',
          url: './image/sauce2.png',
        },
        {
          title: 'Горчичный',
          url: './image/sauce3.png',
        },
      ],
      type: 'radio',
    },
  ];

  let clientWidth = document.documentElement.clientWidth;

  // проверяем размеры окна
  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  // отслеживаем изменение нашего окна
  window.addEventListener('resize', function () {
    clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  // обработчик событий на burger
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');

    playTest();
  });

  // обработчики событий открытий/закрытия окна
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    burgerBtn.classList.add('active');

    playTest();
  });
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active'); // убираем класс active y burgerBtn
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.modal-dialog') && !event.target.closest('.openModalButton') && !event.target.closest('.burger')) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active'); // убираем класс active y burgerBtn
    }
  });

  // функция тестирования
  const playTest = () => {
    const finalAnswers = [];

    // переменная с номером вопроса
    let numberQuestion = 0;

    //функция рендеринга ответов
    const renderAnswers = index => {
      questions[index].answers.forEach(answer => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${answer.url}" alt="burger">
              <span>${answer.title}</span>
            </label>
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    //функция рендеринга вопросов + ответов
    const renderQuestion = indexQuestion => {
      formAnswers.innerHTML = '';

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;

        renderAnswers(indexQuestion);

        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      }
      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      }

      if (numberQuestion === questions.length) {
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');

        formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Введите ваш номер телефона</label>
            <input type="phone" class="form-control" id='numberPhone'>
          </div>
        `;
      }
      if (numberQuestion === questions.length + 1) {
        formAnswers.textContent = `Спасибо за тест`;
        setTimeout(() => {
          modalBlock.classList.remove('d-block');
        }, 2000);
      }
    };

    // запуск  функции рендеринга вопросов + ответов
    renderQuestion(numberQuestion);

    const checkAnswer = () => {
      const obj = {};

      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj[`Номер телефона`] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    // обработчики событий кнопок вперед и назад
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestion(numberQuestion);
    };

    // обработчик отправки номера телефона
    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestion(numberQuestion);
      console.log(finalAnswers);
    };
  };
});
