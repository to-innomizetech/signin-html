document.addEventListener('DOMContentLoaded', function () {
  var observer = new MutationObserver(function (mutations, obs) {
    var submitButtons = document.querySelectorAll("button[type='submit']");
    if (submitButtons.length >= 2) {
      obs.disconnect();
      var continueButton = submitButtons[1];

      var checkboxContainer = document.createElement('div');
      checkboxContainer.innerHTML = `
              <div style="margin-top: 15px;">
                  <input type="checkbox" id="termsCheckbox">
                  <label for="termsCheckbox">
                      I agree to the <a href="https://policies.google.com/" target="_blank">Terms & Privacy</a>
                  </label>
              </div>
          `;

      continueButton.parentNode.insertBefore(checkboxContainer, continueButton);

      continueButton.disabled = true;
      document
        .getElementById('termsCheckbox')
        .addEventListener('change', function () {
          continueButton.disabled = !this.checked;
        });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
