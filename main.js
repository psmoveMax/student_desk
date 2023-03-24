document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#btn_add").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#main_add_form").classList.add("visible");
  });

  document.querySelector("#btn_form_close").addEventListener("click", () => {
    document.querySelector("#main_add_form").classList.remove("visible");
    document.querySelectorAll("input").forEach((el) => (el.value = ""));
  });





  renderStudentsTable(studentsList);

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
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
      if ((date_learn.getFullYear() >= 2000 && date_learn.getFullYear() <= date_now.getFullYear()) && (date_now.getFullYear() > date_learn.getFullYear())) {
        console.log('valid');
        let year = date_now.getFullYear() - date_student.getFullYear();

        //Сколько лет студенту
        if ((date_now.getMonth() < date_student.getMonth())
          || (date_now.getMonth() == date_student.getMonth() && date_now.getDay() > date_student.getDay())) {
          year = year - 1;
        }

        //Закончил или нет и какой курс
        let course = date_now.getFullYear() - date_learn.getFullYear() + 1;
        let learn_path;
        if (date_now.getMonth() < 9) {
          learn_path = `${date_learn.getFullYear()}-${date_learn.getFullYear() + 4} (${course - 1} курс)`;
        }


        if (course > 5) {
          learn_path = 'закончил';
        }

        studentsList.push({ fio: fio, fakultet: fakultet, date_birth: `${date_student.toLocaleDateString('ru-RU')} (${year} лет)`, learn_start: ` ${learn_path}` });
        renderStudentsTable(studentsList);
        e.target.reset();
      } else {
        alert('Год начала обучения должен начинаться с 2000 года и не быть больше текущего года');
      }
    } else {
      alert('Вы ввели некорректную дату рождения');
    }

  });
  /*
    document.querySelector('#search_fio').addEventListener("input", function () {
      let value_current = document.querySelector('#search_fio').value.trim();
      let value_search = new RegExp(`${value_current}`, 'i');
      renderStudentsTable(studentsList, value_search, 'filter');
    });
  
  
    document.querySelector('#search_fakultet').addEventListener("input", function () {
      let value_current = document.querySelector('#search_fakultet').value.trim();
      let value_search = new RegExp(`${value_current}`, 'i');
      renderStudentsTable(studentsList, value_search, 'filter');
    });
  
    document.querySelector('#search_year_start').addEventListener("input", function () {
      let value_current = document.querySelector('#search_year_start').value.trim();
      let value_search = new RegExp(`${value_current}`, 'i');
      renderStudentsTable(studentsList, value_search, 'filter');
    });
    */

  document.querySelector("#form_filter").addEventListener("input", () => {
    let mass = Array();
    let value_fio = document.querySelector('#search_fio').value.trim();
    let value_fak = document.querySelector('#search_fakultet').value.trim();
    console.log(value_fio);
    if (value_fio != '') {
      mass['fio'] = new RegExp(`${value_fio}`, 'i');
    }
    if (value_fak != '') {
      mass['fak'] = new RegExp(`${value_fak}`, 'i');
    }

    renderStudentsTable(studentsList, mass, 'filter');

  });
});

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  { fio: 'Аввакумов Максим Игоревич', fakultet: 'Лингвистика', date_birth: `${new Date('1997,01,03').toLocaleDateString('ru-RU')} (${new Date().getFullYear() - new Date('1997,01,03').getFullYear()} лет)`, learn_start: 'закончил' },
  { fio: 'Иванов Иван Иванович', fakultet: 'Журналистика', date_birth: `${new Date('2000,02,15').toLocaleDateString('ru-RU')} (${new Date().getFullYear() - new Date('2000,02,15').getFullYear()} лет)`, learn_start: `${new Date('2019').getFullYear()} - ${new Date('2019').getFullYear() + 4}` },
  { fio: 'Форсенко Дмитрий Федорович', fakultet: 'Журналистика', date_birth: `${new Date('1995,03,03').toLocaleDateString('ru-RU')} (${new Date().getFullYear() - new Date('1995,03,03').getFullYear()} лет)`, learn_start: `${new Date('2022').getFullYear()} - ${new Date('2022').getFullYear() + 4}` },
  { fio: 'Зязин Алексей Сергеевич', fakultet: 'Товароведение', date_birth: `${new Date('1996,01,01').toLocaleDateString('ru-RU')} (${new Date().getFullYear() - new Date('1996,01,01').getFullYear()} лет)`, learn_start: `${new Date('2021').getFullYear()} - ${new Date('2021').getFullYear() + 4}` },
  { fio: 'Григоренко Ян Алексеевич', fakultet: 'Товароведение', date_birth: `${new Date('1990,02,16').toLocaleDateString('ru-RU')} (${new Date().getFullYear() - new Date('1990,02,16').getFullYear()} лет)`, learn_start: 'закончил' },
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

function renderStudentsTable(studentsArray, mass_regex, option = 'not') {
  let count_current = document.querySelector('#table_main')['tBodies'][0].childElementCount;
  if (count_current != 1) {
    while (count_current != 1) {
      document.querySelector('#table_main')['tBodies'][0].children[count_current - 1].remove();
      count_current = document.querySelector('#table_main')['tBodies'][0].childElementCount;
    }
  }

  if (option == 'not') {
    for (let i = 0; i < studentsArray.length; i++) {
      getStudentItem(studentsList[i]);
    }
  } else if (option == 'filter') {
    console.log('test');
    if (mass_regex['fio'] != undefined) {
      let is_fio = studentsArray[i].fio.search(mass_regex['fio']);
    }
    if (mass_regex['fak'] != undefined) {
      let is_fak = studentsArray[i].fakultet.search(mass_regex['fak']);
    }

    for (let i = 0; i < studentsArray.length; i++) {
      //  console.log(studentsArray[i].fakultet, mass_regex['fak']);
      //   console.log(is_fio, is_fak);
      if (is_fio != -1) {
        getStudentItem(studentsList[i]);
      }



      /*
 */
    }
    /*
    if (document.querySelector('#search_fio').value == '' &&
      document.querySelector('#search_fakultet').value == '' &&
      document.querySelector('#search_year_start').value == '' &&
      document.querySelector('#search_year_end').value == '') {
      for (let i = 0; i < studentsArray.length; i++) {
        getStudentItem(studentsList[i]);
      }
    }
    */
  }








}

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
