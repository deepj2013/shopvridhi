import { api } from './api.js';

const form = document.getElementById('login-form');
const errorBox = document.getElementById('error');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await api.login(email, password);
    localStorage.setItem('sv_auth', JSON.stringify(response));
    window.location.href = './dashboard.html';
  } catch (error) {
    errorBox.textContent = error.message;
  }
});
