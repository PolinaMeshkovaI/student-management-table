window.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  let savedStubentsJSON = localStorage.getItem("studentData");

  //База данных студенто›в
  let listData = [
    {
      name: "Лаврентий",
      surname: "Гуменных",
      middleName: "Александрович",
      birthday: new Date(2000, 01, 10),
      startDate: 2017,
      faculty: "Лечебное дело",
    },
    {
      name: "Фёдор",
      surname: "Мешков",
      middleName: "Александрович",
      birthday: new Date(2003, 09, 05),
      startDate: 2020,
      faculty: "Хирургия",
    },
    {
      name: "Матвей",
      surname: "Мартынов",
      middleName: "Алексеевич",
      birthday: new Date(2003, 06, 10),
      startDate: 2020,
      faculty: "Педиатрия",
    },
    {
      name: "Данил",
      surname: "Денисович",
      middleName: "Алексеевич",
      birthday: new Date(2005, 05, 15),
      startDate: 2022,
      faculty: "Хирургия",
    },
    {
      name: "Алиса",
      surname: "Леднева",
      middleName: "Владимировна",
      birthday: new Date(2004, 08, 10),
      startDate: 2021,
      faculty: "Стоматология",
    },
  ];

  if (savedStubentsJSON !== "" && savedStubentsJSON !== null) {
    listData = JSON.parse(savedStubentsJSON);
  }

  //Cоздание элементов
  let $app = document.getElementById("app"),
    $table = document.createElement("table"),
    $tableHead = document.createElement("thead"),
    $tableBody = document.createElement("tbody"),
    $tableHeadTr = document.createElement("tr"),
    $tableHeadThName = document.createElement("th"),
    $tableHeadThFaculty = document.createElement("th"),
    $tableHeadThAge = document.createElement("th"),
    $tableHeadThStart = document.createElement("th");

  $form = document.createElement("form");
  $inputSurname = document.createElement("input");
  $inputName = document.createElement("input");
  $inputMiddleName = document.createElement("input");
  $inputBirthday = document.createElement("input");
  $inputStartDate = document.createElement("input");
  $inputFaculty = document.createElement("input");
  $inputBtn = document.createElement("button");
  $alert = document.createElement("div");

  $inputSurname.placeholder = "Введите фамилию";
  $inputName.placeholder = "Введите имя";
  $inputMiddleName.placeholder = "Введите отчество";
  $inputBirthday.placeholder = "Введите дату рождения";
  $inputStartDate.placeholder = "Введите год начала обучения";
  $inputFaculty.placeholder = "Введите факультет";
  $inputSurname.type = "text";
  $inputName.type = "text";
  $inputMiddleName.type = "text";
  $inputBirthday.type = "date";
  $inputStartDate.type = "number";
  $inputFaculty.type = "text";
  $inputBtn.type = "submit";
  $inputBirthday.min = "1900-01-01";
  $inputBirthday.max = `${today.getFullYear()}-0${
    today.getMonth() + 1
  }-0${today.getDate()}`;
  $inputBirthday.setAttribute("required", true);
  $inputStartDate.min = 2000;
  $inputStartDate.max = today.getFullYear();
  $inputStartDate.setAttribute("required", true);

  $inputSurname.classList.add("form-control", "mb-3");
  $inputName.classList.add("form-control", "mb-3");
  $inputMiddleName.classList.add("form-control", "mb-3");
  $inputBirthday.classList.add("form-control", "mb-3");
  $inputStartDate.classList.add("form-control", "mb-3");
  $inputFaculty.classList.add("form-control", "mb-3");
  $inputBtn.classList.add("btn", "btn-dark", "btn-lg", "btn-block", "mb-3");
  $table.classList.add("table");
  $tableHead.classList.add("thead-dark");
  $alert.classList.add("alert", "alert-danger", "alert-invisible");
  $alert.role = "alert";

  $filterForm = document.createElement("form");
  $filterFullName = document.createElement("input");
  $filterFaculty = document.createElement("input");
  $filterStartEducation = document.createElement("input");
  $filterEndEducation = document.createElement("input");
  $filterFullName.placeholder = "Введите ФИО";
  $filterFaculty.placeholder = "Введите факультет";
  $filterStartEducation.placeholder = "Введите год начала обучения";
  $filterEndEducation.placeholder = "Введите год окончания обучения";
  $filterFullName.type = "text";
  $filterFaculty.type = "text";
  $filterStartEducation.type = "number";
  $filterEndEducation.type = "number";
  $filterFullName.classList.add("form-control", "mb-3");
  $filterFaculty.classList.add("form-control", "mb-3");
  $filterEndEducation.classList.add("form-control", "mb-3");
  $filterStartEducation.classList.add("form-control", "mb-3");

  $tableHeadThName.textContent = "ФИО";
  $tableHeadThFaculty.textContent = "Факультет";
  $tableHeadThAge.textContent = "Дата рождения и возраст";
  $tableHeadThStart.textContent = "Годы обучения";
  $inputBtn.textContent = "Добавить студента";

  $form.append($inputSurname);
  $form.append($inputName);
  $form.append($inputMiddleName);
  $form.append($inputBirthday);
  $form.append($inputStartDate);
  $form.append($inputFaculty);
  $form.append($alert);
  $form.append($inputBtn);
  $app.append($form);

  $filterForm.append($filterFullName);
  $filterForm.append($filterFaculty);
  $filterForm.append($filterStartEducation);
  $filterForm.append($filterEndEducation);
  $app.append($filterForm);

  $tableHeadTr.append($tableHeadThName);
  $tableHeadTr.append($tableHeadThFaculty);
  $tableHeadTr.append($tableHeadThAge);
  $tableHeadTr.append($tableHeadThStart);
  $tableHead.append($tableHeadTr);
  $table.append($tableHead);
  $table.append($tableBody);
  $app.append($table);

  let sortColumnFlag = "fullName";
  let sortDirFlag = true;

  //Создаем студента
  function createStudentTr(student) {
    function calculateAge(birthday) {
      const toDate = new Date(birthday);
      let ageDifMs = Date.now() - toDate.getTime();
      let ageDate = new Date(ageDifMs);
      let age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age;
    }

    console.log(student.birthday);

    function formatDate(birthday) {
      const toDate = new Date(birthday);
      let dd = toDate.getDate();
      if (dd < 10) dd = "0" + dd;

      const toMonth = new Date(birthday);
      let mm = toMonth.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      const toYear = new Date(birthday);
      let yy = toYear.getFullYear();
      if (yy < 10) yy = "0" + yy;
      return dd + "." + mm + "." + yy;
    }
    function calculateCourse() {
      let course;
      let yyyy = today.getFullYear();
      let mm = today.getMonth();
      if (yyyy - student.startDate === 0 && mm > 8) course = "(1 курс)";
      if (yyyy - student.startDate === 1 && mm <= 8) course = "(1 курс)";
      if (yyyy - student.startDate === 1 && mm > 8) course = "(2 курс)";
      if (yyyy - student.startDate === 2 && mm <= 8) course = "(2 курс)";
      if (yyyy - student.startDate === 2 && mm > 8) course = "(3 курс)";
      if (yyyy - student.startDate === 3 && mm <= 8) course = "(3 курс)";
      if (yyyy - student.startDate === 3 && mm > 8) course = "(4 курс)";
      if (yyyy - student.startDate === 4 && mm <= 8) course = "(4 курс)";
      if (yyyy - student.startDate === 4 && mm > 8) course = "(закончил)";
      if (yyyy - student.startDate > 4) course = "(закончил)";
      return course;
    }

    let $studentTr = document.createElement("tr"),
      $studentThName = document.createElement("th"),
      $studentThFaculty = document.createElement("th"),
      $studentThAge = document.createElement("th"),
      $studentThStart = document.createElement("th");

    $studentThName.textContent = student.fullName;
    $studentThFaculty.textContent = student.faculty;
    $studentThAge.textContent = `${formatDate(
      student.birthday
    )} (${calculateAge(student.birthday)})`;
    $studentThStart.textContent = `${student.startDate} - ${
      student.startDate + 4
    } ${calculateCourse(student.startDate)};`;

    $studentTr.append($studentThName);
    $studentTr.append($studentThFaculty);
    $studentTr.append($studentThAge);
    $studentTr.append($studentThStart);

    return $studentTr;
  }

  //Рендер
  function render(arrDate) {
    $tableBody.innerHTML = "";
    let copyListDate = [...arrDate];
    //Подготовка
    for (const student of copyListDate) {
      student.fullName =
        student.surname + " " + student.name + " " + student.middleName;
    }
    //Сортировка
    copyListDate = copyListDate.sort(function (a, b) {
      let sort = a[sortColumnFlag] < b[sortColumnFlag];
      if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag];
      if (sort) return -1;
    });

    //   // Фильтрация
    if ($filterFullName.value.trim() !== "") {
      copyListDate = copyListDate.filter(function (student) {
        if (student.fullName.includes($filterFullName.value)) return true;
      });
    }

    if ($filterFaculty.value.trim() !== "") {
      copyListDate = copyListDate.filter(function (student) {
        if (student.faculty.includes($filterFaculty.value)) return true;
      });
    }

    if ($filterStartEducation.value.trim() !== "") {
      copyListDate = copyListDate.filter(function (student) {
        if (student.startDate == $filterStartEducation.value) return true;
      });
    }

    if ($filterEndEducation.value.trim() !== "") {
      copyListDate = copyListDate.filter(function (student) {
        if (student.startDate + 4 == $filterEndEducation.value) return true;
      });
    }

    //Отрисовка
    for (const student of copyListDate) {
      let $newTr = createStudentTr(student);

      $tableBody.append($newTr);
    }
  }

  render(listData);

  //Добавление
  $form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Валидация
    let regexp = /[0-9!#$%&'*+/=?^_`{|}~-]/gi;

    if ($inputSurname.value.trim() == "") {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Фамилия не введена. Введите фамилию, пожалуйста.";
      return;
    } else if (regexp.test($inputSurname.value)) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Для ввода фамилии допускаются только буквы.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    if ($inputName.value.trim() == "") {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Имя не введено. Введите имя, пожалуйста.";
      return;
    } else if (regexp.test($inputName.value)) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Для ввода имени допускаются только буквы.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    if ($inputMiddleName.value.trim() == "") {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Отчество не введено. Введите отчество, пожалуйста.";
      return;
    } else if (regexp.test($inputMiddleName.value)) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Для ввода отчества допускаются только буквы.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    if (!$inputBirthday.valueAsDate) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent =
        "Дата рождения не введена. Введите дату рождения, пожалуйста.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    if (!$inputStartDate.value) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent =
        "Год начала обучения не введён. Введите год начала обучения, пожалуйста.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    if ($inputFaculty.value.trim() == "") {
      $alert.classList.remove("alert-invisible");
      $alert.textContent =
        "Факультет не введён. Введите факультет, пожалуйста.";
      return;
    } else if (regexp.test($inputFaculty.value)) {
      $alert.classList.remove("alert-invisible");
      $alert.textContent = "Для ввода факультета допускаются только буквы.";
      return;
    } else {
      $alert.classList.add("alert-invisible");
    }

    listData.push({
      name: $inputName.value,
      surname: $inputSurname.value,
      middleName: $inputMiddleName.value,
      birthday: $inputBirthday.valueAsDate,
      startDate: parseInt($inputStartDate.value),
      faculty: $inputFaculty.value,
    });

    localStorage.setItem("studentData", JSON.stringify(listData));

    // console.log(savedStudentData);

    $inputName.value = "";
    $inputSurname.value = "";
    $inputMiddleName.value = "";
    $inputBirthday.value = "";
    $inputStartDate.value = "";
    $inputFaculty.value = "";

    render(listData);
  });

  //Фильтрация
  $filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  $filterFullName.addEventListener("input", function () {
    render(listData);
  });

  $filterFaculty.addEventListener("input", function () {
    render(listData);
  });

  $filterStartEducation.addEventListener("input", function () {
    render(listData);
  });

  $filterEndEducation.addEventListener("input", function () {
    render(listData);
  });

  // Выбор сортировки
  $tableHeadThName.addEventListener("click", function () {
    sortColumnFlag = "fullName";
    sortDirFlag = !sortDirFlag;
    render(listData);
  });

  $tableHeadThFaculty.addEventListener("click", function () {
    sortColumnFlag = "faculty";
    sortDirFlag = !sortDirFlag;
    render(listData);
  });

  $tableHeadThAge.addEventListener("click", function () {
    sortColumnFlag = "birthday";
    sortDirFlag = !sortDirFlag;
    render(listData);
  });

  $tableHeadThStart.addEventListener("click", function () {
    sortColumnFlag = "startDate";
    sortDirFlag = !sortDirFlag;
    render(listData);
  });
});
