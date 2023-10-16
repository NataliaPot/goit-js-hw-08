import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const keyLocalStorage = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(saveInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

let formData = {
  email: '',
  message: '',
};

reloadPage();

const { email, message } = feedbackForm.elements;

function saveInput() {
  formData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(keyLocalStorage, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();

  formData = {
    email: email.value,
    message: message.value,
  };

  console.log(formData);

  localStorage.removeItem(keyLocalStorage);
  event.currentTarget.reset();
}

function reloadPage() {
  const savedData = JSON.parse(localStorage.getItem(keyLocalStorage));

  if (savedData) {
    feedbackForm.email.value = savedData.email;
    feedbackForm.message.value = savedData.message;
  }
}
