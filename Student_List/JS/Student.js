class Student {
    constructor(name, surname, lastname, birthDate, startDate, faculty) {
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.birthDate = birthDate;
        this.startDate = startDate;
        this.faculty = faculty
    }

    getFIO() {
        return this.surname + ' ' + this.name + ' ' + this.lastname;
    }

    get fio() {
        return this.surname + ' ' + this.name + ' ' + this.lastname;
    }

    getAge() {
        const today = new Date();
        let birtDate = this.birthDate;
        let age = today.getFullYear() - birtDate.getFullYear();
        let m = today.getMonth() - birtDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birtDate.getDate())) {
            age--;
        }
        return age;
    }

    getBirthDayStr() {
        let d = this.birthDate,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('.');
    }

    getYearStartLearn() {
        let d = this.startDate;
        let year = d.getFullYear();
        return year
    }


    getСourse() {
        const today = new Date();
        let startDate = this.startDate;
        let yearsLearn = today.getFullYear() - startDate.getFullYear();
        let m = today.getMonth() - startDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
            yearsLearn--;
        }

        if (yearsLearn < 5) {
            return (yearsLearn + 'курс');
        }
        else {
            return 'закончил'
        }
    }
}

