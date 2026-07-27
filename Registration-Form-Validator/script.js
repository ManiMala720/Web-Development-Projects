const registerationForm = document.getElementById("registeration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

registerationForm.addEventListener("submit",function(e){
  e.preventDefault();
  const isRequired = checkRequired([usernameInput,emailInput,passwordInput,confirmPasswordInput]);
  const isValidate = isRequired;
  if(isValidate){
    const validateUsername = checkLength(usernameInput,3,15);
    const validateEmail = checkEmail(emailInput);
    const validatePassword = checkLength(passwordInput,6,25);
    const validateConfirmPassword = matchPassword(validatePassword,confirmPasswordInput);
    if(validateUsername && validateEmail && validatePassword && validateConfirmPassword){
      alert("Registeration Successful");
      registerationForm.reset();
      document.querySelectorAll(".form-elements").forEach((group) =>{
      group.className = "form-elements";
    });
  }
  }
});

function checkRequired(inputArray){
  let isRequired = true;
  inputArray.forEach((input)=>{
    if(input.value.trim() === ""){
      showError(input, `${formatFieldName(input)} is required`);
      isRequired = false;
    }
    else{
      showSuccess(input);
    }
  });
  return isRequired;
}

function formatFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input,message){
  const formElement = input.parentElement;
  formElement.className = "form-elements error";
  const small = formElement.querySelectorAll("small");
  small.innerText = message;
}

function showSuccess(input){
  const formElement = input.parentElement;
  formElement.className = "form-elements success";
}


function checkLength(input,min,max){
  if(input.value.trim()<min){
    showError(input,`${formatFieldName(input)} must be atleast ${min} characters`);
    return false;
  }
  else if(input.value.trim()>max){
    showError(input,`${formatFieldName(input)} must be less than ${max} characters`);
    return false;
  }
  else{
    showSuccess(input);
    return true;
  }
}

function checkEmail(input){
  const regex = /^[[^\s@]+@[^\s@]+\.[^\s@]]$/;
  if(regex.test(input.value.trim())){
    showSuccess(input);
    return true;
  }
  else{
    showError(input,`${formatFieldName(input)} is not valid`);
    return false;
  }
}

function matchPassword(input1,input2){
  if(input1.value.trim() === input2.value.trim()){
    showSuccess(input);
    return true;
  }
  else{
    showError(input,"Passwords do not match");
    return false;
  }
}