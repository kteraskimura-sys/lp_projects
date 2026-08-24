document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  if (!form) {
    return;
  }

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzrIJ0bdORbhpqLdyhHMe-CPYkaold1OgzUN2PaO1CsP0qX0D2Jop0gsHGanOUc146O/exec';

  const submitButton = form.querySelector('.submit-button');
  const userAgentInput = document.getElementById('user_agent');
  const pageUrlInput = document.getElementById('page_url');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (userAgentInput) {
      userAgentInput.value = window.navigator.userAgent;
    }

    if (pageUrlInput) {
      pageUrlInput.value = window.location.href;
    }

    const formData = new FormData(form);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add('is-sending');
      submitButton.querySelector('span').textContent = '送信中です';
    }

    fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
      .then(function () {
        window.location.href = 'thanks/';
      })
      .catch(function () {
        alert('送信中にエラーが発生しました。時間をおいて再度お試しください。');

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.classList.remove('is-sending');
          submitButton.querySelector('span').textContent = '送信する';
        }
      });
  });
});
