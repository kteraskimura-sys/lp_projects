document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  if (!form) {
    return;
  }

  const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzrIJ0bdORbhpqLdyhHMe-CPYkaold1OgzUN2PaO1CsP0qX0D2Jop0gsHGanOUc146O/exec';
  const ERROR_MESSAGE = '送信中にエラーが発生しました。\n時間をおいて再度お試しいただくか、お電話（0120-949-017）でご相談ください。';

  const submitButton = form.querySelector('.submit-button');
  const submitLabel = submitButton ? submitButton.querySelector('span') : null;
  const userAgentInput = document.getElementById('user_agent');
  const pageUrlInput = document.getElementById('page_url');

  function setSending(isSending) {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isSending;
    submitButton.classList.toggle('is-sending', isSending);

    if (submitLabel) {
      submitLabel.textContent = isSending ? '送信中です' : '送信する';
    }
  }

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

    setSending(true);

    // GAS の e.parameter / e.parameters で確実に受け取れるよう、URLエンコード形式で送信する
    // （no-cors だと結果が読めず、エラー時もサンクスページへ進んでしまうため使わない）
    fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form))
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        return response.json();
      })
      .then(function (result) {
        if (!result || result.status !== 'success') {
          throw new Error(result && result.message ? result.message : 'unknown error');
        }

        window.location.href = 'thanks/';
      })
      .catch(function (error) {
        console.error(error);
        alert(ERROR_MESSAGE);
        setSending(false);
      });
  });
});
