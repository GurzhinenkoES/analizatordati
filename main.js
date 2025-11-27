// Функция для определения дня недели
function getDayOfWeek(day, month, year) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
}

// Функция для определения високосного года
function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    if (year % 400 !== 0) return false;
    return true;
}

// Функция для вычисления возраста
function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Функция для создания цифр из звездочек (ASCII art)
function digitToStars(digit) {
    const patterns = {
        '0': [
            " *** ",
            "*   *",
            "*   *",
            "*   *",
            "*   *",
            "*   *",
            " *** "
        ],
        '1': [
            "  *  ",
            " **  ",
            "  *  ",
            "  *  ",
            "  *  ",
            "  *  ",
            " *** "
        ],
        '2': [
            " *** ",
            "*   *",
            "    *",
            " *** ",
            "*    ",
            "*    ",
            "*****"
        ],
        '3': [
            " *** ",
            "*   *",
            "    *",
            " *** ",
            "    *",
            "*   *",
            " *** "
        ],
        '4': [
            "*   *",
            "*   *",
            "*   *",
            "*****",
            "    *",
            "    *",
            "    *"
        ],
        '5': [
            "*****",
            "*    ",
            "*    ",
            "**** ",
            "    *",
            "*   *",
            " *** "
        ],
        '6': [
            " *** ",
            "*   *",
            "*    ",
            "**** ",
            "*   *",
            "*   *",
            " *** "
        ],
        '7': [
            "*****",
            "    *",
            "   * ",
            "  *  ",
            " *   ",
            "*    ",
            "*    "
        ],
        '8': [
            " *** ",
            "*   *",
            "*   *",
            " *** ",
            "*   *",
            "*   *",
            " *** "
        ],
        '9': [
            " *** ",
            "*   *",
            "*   *",
            " ****",
            "    *",
            "*   *",
            " *** "
        ],
        ' ': [
            "     ",
            "     ",
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ]
    };
    
    return patterns[digit] || patterns[' '];
}

// Функция для создания даты из звездочек
function createDigitalDate(day, month, year) {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString();
    
    const fullDate = `${dayStr} ${monthStr} ${yearStr}`;
    
    // Создаем массив для каждой строки
    let lines = ['', '', '', '', '', '', ''];
    
    for (let char of fullDate) {
        const pattern = digitToStars(char);
        for (let i = 0; i < 7; i++) {
            lines[i] += pattern[i] + ' ';
        }
    }
    
    return lines.join('\n');
}

// Функция валидации даты
function isValidDate(day, month, year) {
    if (!day || !month || !year) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Проверяем високосный год для февраля
    if (month === 2 && isLeapYear(year)) {
        daysInMonth[1] = 29;
    }
    
    if (day > daysInMonth[month - 1]) return false;
    
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return false;
    
    return true;
}

// Основная функция анализа
function analyzeBirthday() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    // Валидация
    if (!isValidDate(day, month, year)) {
        showError('Пожалуйста, введите корректную дату рождения!');
        return;
    }
    
    // Скрываем ошибку если она была
    hideError();
    
    // Показываем результаты с анимацией
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.add('show');
    
    // Заполняем результаты
    document.getElementById('dayOfWeek').textContent = getDayOfWeek(day, month, year);
    document.getElementById('leapYear').textContent = isLeapYear(year) ? 'Да' : 'Нет';
    document.getElementById('age').textContent = `${calculateAge(day, month, year)} лет`;
    
    // Анимация карточек
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Выводим в консоль
    console.log('=== АНАЛИЗ ДАТЫ РОЖДЕНИЯ ===');
    console.log(`Дата: ${day}.${month}.${year}`);
    console.log(`День недели: ${getDayOfWeek(day, month, year)}`);
    console.log(`Високосный год: ${isLeapYear(year) ? 'Да' : 'Нет'}`);
    console.log(`Возраст: ${calculateAge(day, month, year)} лет`);
    console.log('\nДата в электронном формате:');
    console.log(createDigitalDate(day, month, year));
}

// Функция показа ошибки
function showError(message) {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.className = 'error-message';
        document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.results'));
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Автоматически скрыть через 3 секунды
    setTimeout(() => {
        hideError();
    }, 3000);
}

// Функция скрытия ошибки
function hideError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Обработка Enter в полях ввода
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                analyzeBirthday();
            }
        });
        
        // Добавляем ограничения на ввод
        input.addEventListener('input', function(e) {
            const id = e.target.id;
            const value = parseInt(e.target.value);
            
            if (id === 'day' && value > 31) {
                e.target.value = 31;
            } else if (id === 'month' && value > 12) {
                e.target.value = 12;
            } else if (id === 'year' && value > 2024) {
                e.target.value = 2024;
            }
        });
    });
    
    // Добавляем эффект печатной машинки для заголовка
    const title = document.querySelector('.neon');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
});