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


  document.querySelector("#form_filter").addEventListener("input", () => {
    let mass = Array();
    let value_fio = document.querySelector('#search_fio').value.trim();
    let value_fak = document.querySelector('#search_fakultet').value.trim();
    let value_start = document.querySelector('#search_year_start').value.trim();
    let value_end = document.querySelector('#search_year_end').value.trim();

    let vision_mass = Array();
    let table_data = document.querySelector('#table_data').children;


    //Узнаем что на экране
    for (let i = 1; i < table_data.length; i++) {
      vision_mass.push(table_data[i].children[0].innerText);
    }


    if (value_fio != '') {
      mass['fio'] = new RegExp(`${value_fio}`, 'i');
    }
    if (value_fak != '') {
      mass['fak'] = new RegExp(`${value_fak}`, 'i');
    }

    if (value_start != '') {
      mass['start'] = new RegExp(`${value_start}`);
    }

    if (value_end != '') {
      mass['end'] = new RegExp(`${value_end}`);
    }

    renderStudentsTable(studentsList, mass, 'filter', vision_mass);

  });


  document.querySelector("#sort_fio").addEventListener("click", () => {
    let mass = Array();
    let vision_mass = Array();

    let table_data = document.querySelector('#table_data').children;

    //Узнаем что на экране
    for (let i = 1; i < table_data.length; i++) {
      vision_mass.push(table_data[i].children[0].innerText);
    }
    renderStudentsTable(studentsList, mass, 'sort_fio', vision_mass);

  });


  document.querySelector("#sort_fak").addEventListener("click", () => {
    let mass = Array();
    let vision_mass = Array();

    let table_data = document.querySelector('#table_data').children;

    //Узнаем что на экране
    for (let i = 1; i < table_data.length; i++) {
      vision_mass.push(table_data[i].children[0].innerText);
    }
    renderStudentsTable(studentsList, mass, 'sort_fak', vision_mass);

  });
});

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  { fio: 'Аввакумов Максим Игоревич', fakultet: 'Лингвистика', date_birth: `03.12.1997 (25 лет)`, learn_start: 'закончил' },
  { fio: 'Иванов Иван Иванович', fakultet: 'Журналистика', date_birth: '01.01.1997 (26 лет)', learn_start: `${new Date('2019').getFullYear()}-${new Date('2019').getFullYear() + 4}` },
  { fio: 'Форсенко Дмитрий Федорович', fakultet: 'Журналистика', date_birth: '03.01.2001 (22 лет)', learn_start: `${new Date('2022').getFullYear()}-${new Date('2022').getFullYear() + 4}` },
  { fio: 'Зязин Алексей Сергеевич', fakultet: 'Товароведение', date_birth: '02.06.1995 (27 лет)', learn_start: `${new Date('2021').getFullYear()}-${new Date('2021').getFullYear() + 4}` },
  { fio: 'Григоренко Ян Алексеевич', fakultet: 'Товароведение', date_birth: '10.02.1998 (25 лет)', learn_start: 'закончил' },
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

function renderStudentsTable(studentsArray, mass_regex, option = 'not', vision_mass) {
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

    let is_fio = -1;
    let is_fak = -1;

    let current_mass = Array();

    const regex_year_start = /\d{4}/;
    const regex_end_year = /\d{4}-(\d{4})/;

    for (let i = 0; i < studentsArray.length; i++) {


      if (mass_regex['fio'] != undefined) {
        is_fio = studentsArray[i].fio.search(mass_regex['fio']);
      }
      if (mass_regex['fak'] != undefined) {
        is_fak = studentsArray[i].fakultet.search(mass_regex['fak']);
      }

      let match_start = null;
      let match_end = null;

      if (mass_regex['start'] != undefined) {
        is_start = studentsArray[i].learn_start.match(regex_year_start);
        if (is_start != null) {
          match_start = is_start[0].match(mass_regex['start']);
        }

      }
      if (mass_regex['end'] != undefined) {
        is_end = studentsArray[i].learn_start.match(regex_end_year);


        if (is_end != null) {
          match_end = is_end[1].match(mass_regex['end']);
        }
      }




      //ФИО
      if (is_fio != -1) {
        if (vision_mass.includes(studentsArray[i].fio) == true) {
          if (current_mass.includes(studentsArray[i].fio) == false) {
            current_mass.push(studentsList[i].fio);
            getStudentItem(studentsList[i]);
          }

        }
      }

      //Факультет
      if (is_fak != -1) {
        if (vision_mass.includes(studentsArray[i].fio) == true) {
          if (current_mass.includes(studentsArray[i].fio) == false) {
            current_mass.push(studentsList[i].fio);
            getStudentItem(studentsList[i]);
          }
        }
      }

      //Год начала 
      if (match_start != null) {
        if (match_start[0] != '') {
          if (vision_mass.includes(studentsArray[i].fio) == true) {
            if (current_mass.includes(studentsArray[i].fio) == false) {
              getStudentItem(studentsList[i]);
            }
          }
        }
      }

      //Год окончания
      if (match_end != null) {
        if (match_end[0] != '') {
          if (vision_mass.includes(studentsArray[i].fio) == true) {
            if (current_mass.includes(studentsArray[i].fio) == false) {
              getStudentItem(studentsList[i]);
            }
          }
        }
      }



      if (mass_regex['fak'] == undefined && mass_regex['fio'] == undefined && mass_regex['start'] == undefined && mass_regex['end'] == undefined) {

        getStudentItem(studentsList[i]);
      }


    }

  } else if (option == 'sort_fio') {
    if (document.querySelector('#sort_fio_activity').innerText == 'ᐁ') {

      function find(studentsList, vision_mass) {
        for (var i = 0; i < studentsList.length; i++)
          if (studentsList[i]['fio'] == vision_mass)
            return i;
      }


      vision_mass.sort();
      for (let i = 0; i < vision_mass.length; i++) {
        let finder = find(studentsArray, vision_mass[i]);
        getStudentItem(studentsList[finder]);
      }

      document.querySelector('#sort_fio_activity').innerText = '▼';
    } else {
      for (let i = 0; i < studentsArray.length; i++) {
        getStudentItem(studentsList[i]);
      }
      document.querySelector('#sort_fio_activity').innerText = 'ᐁ';
    }

  } else if (option == 'sort_fak') {
    for (let i = 0; i < studentsArray.length; i++) {
      getStudentItem(studentsList[i]);
    }
    console.log('заглушка');
  }


}

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
