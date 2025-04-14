function setupPwdTogglers() {
  while (!continueButton) {
    var continueButton = document.querySelector("button[type='submit']");
  }

  if (continueButton) {
    var checkboxContainer = document.createElement('div');
    checkboxContainer.innerHTML = `
      <div style="margin-top: 15px;">
          <input type="checkbox" id="termsCheckbox">
          <label for="termsCheckbox">
              I agree to the 
              <a href="https://baqa-frontend-dev.azurewebsites.net/terms-and-conditions" target="_blank">Terms & Conditions</a> 
              and 
              <a href="https://baqa-frontend-dev.azurewebsites.net/privacy-policy" target="_blank">Privacy Policy</a>.
          </label>
      </div>
    `;

    continueButton.parentNode.insertBefore(checkboxContainer, continueButton);

    continueButton.setAttribute('aria-disabled', 'true');
    continueButton.style.pointerEvents = 'none';
    continueButton.style.opacity = '0.3';
    hideFields();

    document
      .getElementById('termsCheckbox')
      .addEventListener('change', function () {
        if (this.checked) {
          continueButton.setAttribute('aria-disabled', 'false');
          continueButton.style.pointerEvents = 'auto';
          continueButton.style.opacity = '1';
        } else {
          continueButton.setAttribute('aria-disabled', 'true');
          continueButton.style.pointerEvents = 'none';
          continueButton.style.opacity = '0.3';
        }
      });
  }
}

const fieldsToHide = [
  'continue',
  'termsCheckbox',
  'newPassword',
  'reenterPassword',
  'givenName',
  'surname',
  'extension_PhoneNumber',
];

function hideFields() {
  fieldsToHide.forEach((fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) el.closest('div').style.display = 'none';
  });
}

function showFields() {
  fieldsToHide.forEach((fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) el.closest('div').style.display = 'inline';
  });
}

// Function to observe changes to the emailVerificationControl_but_send_code button
function observeSendCodeButton() {
  const sendCodeButton = document.getElementById("emailVerificationControl_but_change_claims");

  if (!sendCodeButton) return;  // Exit if button is not found

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
      // Check if button is visible or hidden based on the "style" attribute
      if (mutation.attributeName === "style") {
        if (sendCodeButton.style.display !== "none") {
          // If button is visible, show the hidden fields
          showFields();
        } else {
          // If button is hidden, hide the fields
          hideFields();
        }
      }
    });
  });

  // Start observing the sendCodeButton for changes in the "style" attribute
  observer.observe(sendCodeButton, { attributes: true });
}

setupPwdTogglers();
observeSendCodeButton();