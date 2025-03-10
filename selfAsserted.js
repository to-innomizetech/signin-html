// document.addEventListener('DOMContentLoaded', function () {
//   console.log('===========================================');
//   console.log('Start custom');
//   console.log('===========================================');

//   var observer = new MutationObserver(function (mutations, obs) {
//     var continueButton = document.querySelector("button[type='submit']");
//     console.log('===========================================');
//     console.log('continueButton: ', continueButton);
//     console.log('===========================================');
//     if (continueButton) {
//       obs.disconnect();

//       var checkboxContainer = document.createElement('div');
//       checkboxContainer.innerHTML = `
//               <div style="margin-top: 15px;">
//                   <input type="checkbox" id="termsCheckbox">
//                   <label for="termsCheckbox">
//                       I agree to the <a href="https://policies.google.com/" target="_blank">Terms & Privacy</a>
//                   </label>
//               </div>
//           `;

//       continueButton.parentNode.insertBefore(checkboxContainer, continueButton);

//       continueButton.disabled = true;
//       document
//         .getElementById('termsCheckbox')
//         .addEventListener('change', function () {
//           continueButton.disabled = !this.checked;
//         });
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
// });


function setupPwdTogglers(){
    console.log('===========================================');
    console.log('Start custom');
    console.log('===========================================');
    while (!continueButton) {
      console.log('querySelector button submit');
      var continueButton = document.querySelector("button[type='submit']");
    }
    console.log('===========================================');
    console.log('continueButton: ', continueButton);
    console.log('===========================================');
    if (continueButton) {

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

      continueButton.setAttribute("aria-disabled", "true");
      continueButton.style.pointerEvents = "none"
      continueButton.style.opacity = "0.3"; 

      document
        .getElementById('termsCheckbox')
        .addEventListener('change', function () {
          if (this.checked) {
            continueButton.setAttribute("aria-disabled", "false");
            continueButton.style.pointerEvents = "auto"
            continueButton.style.opacity = "1";
          } else {
            continueButton.setAttribute("aria-disabled", "true");
            continueButton.style.pointerEvents = "none"
            continueButton.style.opacity = "0.3"; 
          }  
        });
    }
}

setupPwdTogglers();
