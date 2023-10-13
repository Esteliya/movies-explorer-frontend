// ТЕКСТ ОШИБКИ
// поиск 
const SEND_TEXT = "Введите текст запроса";
const END_RESULT = "Результат запрса уже на странице. Задайте новые параметры поиска";
const ENTER_NAME = "Поле 'имя' должно быть не менее 2 символов и может содержать только русские, латинские буквы, цифры, тире и нижнее подчеркивание";
const ENTER_EMAIL = "Поле 'email' должно быть заполнено и иметь форму ***@***.**";
const ENTER_PASSWORD = "Пароль должен быть не менее 8 символов и содержать цифру, прописную и строчную буквы";
// сообщение на странице
const START_SEARCH = "Запустите поиск интересующих Вас фильмов";
const NOT_MOVIES = "Фильмы по запросу не найдены";
// информационные (в попап)
const REG_SUCCESFUL = "Регистрация прошла успешно";
const UPPDATA_SUCCESFUL = "Данные пользователя обновлены";
const NOT_VALID = "Данные формы невалидны. Проверьте корректность заполнения полей";

// числовые данные 
// количество отображаемых карточек по дефолту
const DESKTOP_DEFAULT_CARD = 12;
const TABLET_DEFAULT_CARD = 8;
const MOBILE_DEFAULT_CARD = 5;
// количество добавляемых карточек по клику на кнопку ЕЩЕ
const DESKTOP_ELSE_CARD = 3;
const TABLET_ELSE_CARD = 2;
const MOBILE_ELSE_CARD = 2;
// длина короткометражки 
const LENGTH_SHORT_MOVIE = 40;

// ЭКСПОРТ
export {
    SEND_TEXT,
    END_RESULT,
    ENTER_NAME,
    ENTER_EMAIL,
    ENTER_PASSWORD,
    START_SEARCH,
    NOT_MOVIES,
    REG_SUCCESFUL,
    UPPDATA_SUCCESFUL,
    NOT_VALID,
    DESKTOP_DEFAULT_CARD,
    TABLET_DEFAULT_CARD,
    MOBILE_DEFAULT_CARD,
    DESKTOP_ELSE_CARD,
    TABLET_ELSE_CARD,
    MOBILE_ELSE_CARD,
    LENGTH_SHORT_MOVIE,
};