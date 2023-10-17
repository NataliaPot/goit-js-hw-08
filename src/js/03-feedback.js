import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const keyLocalStorage = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(saveInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

let formData = {};

reloadPage();

const { email, message } = feedbackForm.elements;

function saveInput(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(keyLocalStorage, JSON.stringify(formData));
}

function onSubmit(event) {
  event.preventDefault();

  console.log(formData);
  formData = {};
  localStorage.removeItem(keyLocalStorage);
  event.currentTarget.reset();
}

function reloadPage() {
  try {
    const savedData = localStorage.getItem(keyLocalStorage);
    if (!savedData) return;
    formState = JSON.parse(savedData);
    Object.entries(formState).forEach(([key, val]) => {
      feedbackForm.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
}
