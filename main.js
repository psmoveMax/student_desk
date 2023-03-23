document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#btn_add").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#main_add_form").classList.add("visible");
  });

  document.querySelector("#btn_form_close").addEventListener("click", () => {
    document.querySelector("#main_add_form").classList.remove("visible");
    document.querySelectorAll("input").forEach((el) => (el.value = ""));
  });

  // studentsList.push({ fio: 'Аввакумов Максим Игоревич', fakultet: 'Лингвистика', date_birth: `${new Date('1997,12,03').getDay()}.${new Date('1997,12,03').getMonth() + 1}.${new Date('1997,12,03').getFullYear()}`, learn_start: `${new Date('2020').getFullYear()} - ${new Date('2020').getFullYear() + 4}` });

  renderStudentsTable(studentsList);


  document.querySelector('#main_add_form').addEventListener("submit", function (e) {
    e.preventDefault();
    let fio = document.getElementById('fio').value.trim();
    let fakultet = document.getElementById('fakultet').value.trim();
    let date_birth = document.getElementById('date_birth').value.trim();

    let date_learn = document.getElementById('date_learn').value.trim();
    let date_now = new Date();
    let date_student = new Date(date_birth);
    date_learn = new Date(date_learn);

    console.log(date_student.getFullYear());
    //Валидация даты рождения
    if (date_student.getFullYear() >= 1900) {
      //Валидация года обучения
      if (date_learn.getFullYear() >= 2000 && date_learn.getFullYear() <= date_now.getFullYear()) {
        console.log('valid');
        studentsList.push({ fio: fio, fakultet: fakultet, date_birth: `${date_student.toLocaleDateString('ru-RU')}`, learn_start: `${date_learn.getFullYear()} - ${date_learn.getFullYear() + 4}` });
        renderStudentsTable(studentsList);
      }
    }

  });

});

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  { fio: 'Аввакумов Максим Игоревич', fakultet: 'Лингвистика', date_birth: `${new Date('1997,12,03').toLocaleDateString('ru-RU')}`, learn_start: `${new Date('2020').getFullYear()} - ${new Date('2020').getFullYear() + 4}` },
  { fio: 'Иванов Иван Иванович', fakultet: 'Журналистика', date_birth: `${new Date('2000,03,12').toLocaleDateString('ru-RU')}`, learn_start: `${new Date('2019').getFullYear()} - ${new Date('2019').getFullYear() + 4}` },
  { fio: 'Форсенко Дмитрий Федорович', fakultet: 'Журналистика', date_birth: `${new Date('1999,05,30').toLocaleDateString('ru-RU')}`, learn_start: `${new Date('2022').getFullYear()} - ${new Date('2022').getFullYear() + 4}` },
  { fio: 'Зязин Алексей Сергеевич', fakultet: 'Товароведение', date_birth: `${new Date('1989,03,15').toLocaleDateString('ru-RU')}`, learn_start: `${new Date('2021').getFullYear()} - ${new Date('2021').getFullYear() + 4}` },
  { fio: 'Григоренко Ян Алексеевич', fakultet: 'Товароведение', date_birth: `${new Date('1995,07,28').toLocaleDateString('ru-RU')}`, learn_start: `${new Date('2015').getFullYear()} - ${new Date('2015').getFullYear() + 4}` },
  // Добавьте сюда объекты студентов
];

console.log(studentsList);
// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
  let table = document.querySelector('#table_main')['tBodies'][0];

  let table_list = document.createElement("tr");
  let fio_student = document.createElement("th");
  let fakultet_student = document.createElement("td");
  let date_birth = document.createElement("td");
  let learn_start = document.createElement("td");
  // console.log(fio_student);

  fio_student.innerHTML = `${studentObj.fio}`;
  fakultet_student.innerHTML = `${studentObj.fakultet}`;
  date_birth.innerHTML = `${studentObj.date_birth}`;
  learn_start.innerHTML = `${studentObj.learn_start}`;

  table_list.append(fio_student);
  table_list.append(fakultet_student);
  table_list.append(date_birth);
  table_list.append(learn_start);


  table.appendChild(table_list);


}



// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {
  console.log(document.querySelector('#table_main')['tBodies'][0].childElementCount);
  let count_current = document.querySelector('#table_main')['tBodies'][0].childElementCount;

  if (count_current != 1) {
    console.log('Очистка');
    while (count_current != 1) {
      document.querySelector('#table_main')['tBodies'][0].children[count_current - 1].remove();
      count_current = document.querySelector('#table_main')['tBodies'][0].childElementCount;
    }
  }

  for (let i = 0; i < studentsArray.length; i++) {
    getStudentItem(studentsList[i]);
  }
}
// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
