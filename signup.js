function setupPwdTogglers() {
  while (!continueButton) {
    var continueButton = document.querySelector("button[type='submit']");
  }

  if (continueButton) {
    var checkboxContainer = document.createElement('div');
    checkboxContainer.innerHTML = `
    <div style="margin-top: 15px; display: flex; justify-content: center; align-items: flex-start; gap: 8px;">
      <input type="checkbox" id="termsCheckbox" disabled title="You must read terms and condition first"
          style="cursor: not-allowed" />
      I agree to the
      <span id="openTerms" style="color: blue; text-decoration: underline; cursor: pointer;">
          Terms & Conditions
      </span>
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
    const display = fieldId === 'termsCheckbox' ? 'flex' : 'inline';
    if (el) el.closest('div').style.display = display;
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

function setupTermsAgreementFlow() {
  const openTerms = document.getElementById("openTerms");
  const termsModal = document.getElementById("termsModal");
  const termsContent = document.getElementById("termsContent");
  const confirmRead = document.getElementById("confirmRead");
  const dismissModal = document.getElementById("dismissModal");
  const endMarker = document.getElementById("termsEndMarker");

  let hasReadTerms = false;

  openTerms.addEventListener("click", function () {
    termsModal.style.display = "flex";
    termsContent.scrollTop = 0;
    confirmRead.disabled = !hasReadTerms;
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          hasReadTerms = true;
          confirmRead.disabled = false;
          confirmRead.style.backgroundColor = "#296ec6";
          confirmRead.style.color = "#ffffff";
          confirmRead.style.border = "solid 2px";
          confirmRead.style.borderColor = "#e0e0e0";
          observer.disconnect();
        }
      });
    },
    {
      root: termsContent,
      threshold: 1.0,
    }
  );

  observer.observe(endMarker);

  // Confirm the user has read the terms
  confirmRead.addEventListener("click", function () {
    termsModal.style.display = "none";
    termsCheckbox.checked = true;
    termsCheckbox.disabled = false;

    // Make checkbox read-only via styling (not interactable)
    termsCheckbox.style.pointerEvents = "none";
    termsCheckbox.style.cursor = "default";
    termsCheckbox.title = "";

    termsCheckbox.dispatchEvent(new Event('change'));
  });

  // Allow dismissing modal without confirming
  dismissModal.addEventListener("click", function () {
    termsModal.style.display = "none";
  });
}

setupPwdTogglers();
observeSendCodeButton();
setupTermsAgreementFlow();
