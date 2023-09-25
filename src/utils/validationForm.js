import React from "react";

// валидируем инпуты
function ValidationForm() {
  // стейт заполнения
  const [values, setValues] = React.useState({});
  // стейт ошибки
  const [errors, setErrors] = React.useState({});
  // стейт валидности: да/нет 
  const [isValid, setIsValid] = React.useState(false);

  //обработчкик поля инпута: инпут + имя инпута + заполнение
  function handleChange(e) {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validMessage});
    setIsValid(input.closest('form').checkValidity());
  };

  return {
    values, 
    errors, 
    isValid, 
    handleChange, 
    setValues, 
    setIsValid, 
    setErrors};
};

export default ValidationForm;