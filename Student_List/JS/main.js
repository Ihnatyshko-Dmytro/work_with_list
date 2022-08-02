let students = [
    new Student('Som', 'Talton', 'Jonsons', new Date(1989, 2, 14), new Date(2018, 2, 14), 'AnformTahnol'),
    new Student('Tom', 'Halton', 'Jonsons', new Date(1998, 4, 14), new Date(2019, 2, 14), 'VnformTahnol'),
    new Student('Gom', 'Aalton', 'Jonsons', new Date(1996, 5, 14), new Date(2020, 2, 14), 'BnformTahnol'),
    new Student('Aom', 'Balton', 'Jonsons', new Date(1999, 7, 14), new Date(2013, 2, 14), 'InformTahnol'),
    new Student('Rom', 'Salton', 'Jonsons', new Date(1999, 1, 14), new Date(2017, 2, 14), 'InformTahnol'),
]

let studentList = document.getElementById('student-list');
let studentListTH = document.querySelectorAll('#thead th');
let searchList = document.querySelectorAll('.search input')

function toToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("birthDate").setAttribute("max", today);
    document.getElementById("startDate").setAttribute("max", today);
}

toToday();

function newStudent(student) {
    let tr = document.createElement('tr');
    let fioTD = document.createElement('td');
    let facultyTD = document.createElement('td');
    let birthDateTD = document.createElement('td');
    let periodLearnTD = document.createElement('td');

    fioTD.textContent = student.getFIO();
    facultyTD.textContent = student.faculty;
    birthDateTD.textContent = student.getBirthDayStr() + ' (Возраст: ' + student.getAge() + ')';
    periodLearnTD.textContent = `${student.getYearStartLearn()}-${student.getYearStartLearn() + 4} (${student.getСourse()})`;



    tr.append(fioTD);
    tr.append(facultyTD);
    tr.append(birthDateTD);
    tr.append(periodLearnTD);

    return tr;
}
let column = 'fio',
    columnDir = true;

let searColumn = 'fio',
    searValue = '';

searchList.forEach(element => {
    element.addEventListener('input', function () {
        searColumn = this.dataset.column;
        searValue = this.value;
        render();
    })
});

studentListTH.forEach(element => {
    element.addEventListener('click', function () {
        column = this.dataset.column;
        columnDir = !columnDir;
        render();
    })
});

function render() {
    let studentsArr = [...students];

    studentsArr = sortArrStudents(column, columnDir);

    studentsArr = search(studentsArr, searColumn, searValue);

    studentList.innerHTML = '';

    for (student of studentsArr) {
        studentList.append(newStudent(student))
    }
}

function search(arr, prop, value) {
    let studentsArr = [...arr];
    if (prop == 'birthDate' || prop == 'startDate') {
       
        let studentsArrS = studentsArr.filter(student => ageEquals(new Date(student[prop]), new Date (value)));
        return studentsArrS;
    }
    else {

        let studentsArrS = studentsArr.filter(student => student[prop].includes(value))
        return studentsArrS;
    }
}

function ageEquals(first, second) {

    return first.getDate() === second.getDate()
        && first.getMonth() === second.getMonth()
        && first.getFullYear() === second.getFullYear()
}

function sortArrStudents(prop, dir) {

    let studentsArr = [...students];
    return studentsArr.sort(function (workerA, workerB) {
        if ((!dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]))
            return -1;
    })
}




document.getElementById('addStuent').addEventListener('submit', function (event) {
    event.preventDefault();
    let bul = true;
    let inputs = document.querySelectorAll('#addStuent input');
    for (input of inputs) {
        if (input.value.trim().length > 0) {
            bul = true
        }
        else {
            bul = false;
            break;
        }
    }
    if (bul == true) {
        students.push(new Student(
            document.getElementById('name').value,
            document.getElementById('surname').value,
            document.getElementById('lastname').value,
            new Date(document.getElementById('birthDate').value),
            new Date(document.getElementById('startDate').value),
            document.getElementById('faculty').value));

        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('birthDate').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('faculty').value = '';
        render();
    }
    else {
        let report = document.createElement('div');
        report.innerHTML = 'Введите все поля'
        document.getElementById('addStuent').append(report)

    }
})

render();