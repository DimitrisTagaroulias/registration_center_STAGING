"usestrict";

function validation(student_Name, student_Age, selected_School_Id) {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/g;
  const nameHasInvalidCharacters = regex.test(student_Name);
  let invalidNameOccured = false;
  let invalidAgeOccured = false;
  let invalidSchoolOccured = false;
  let invalidNameMessage;
  let invalidAgeMessage;
  let invalidSchoolMessage;

  if (!student_Name) {
    invalidNameMessage = "Name is required!";
    invalidNameOccured = true;
  } else if (nameHasInvalidCharacters) {
    invalidNameMessage = "Enter a valid Name!";
    invalidNameOccured = true;
  }

  if (invalidNameOccured) {
    const invalidName = document.querySelector("#invalid-name");
    invalidName.classList.remove("hidden");
    invalidName.innerHTML = invalidNameMessage;
  }

  if (!student_Age) {
    invalidAgeMessage = "Age is required!";
    invalidAgeOccured = true;
  } else if (student_Age < 1 || isNaN(student_Age)) {
    invalidAgeMessage = "Enter a valid age!";
    invalidAgeOccured = true;
  }

  if (invalidAgeOccured) {
    const invalidAge = document.querySelector("#invalid-age");
    invalidAge.classList.remove("hidden");
    invalidAge.innerHTML = invalidAgeMessage;
  }

  if (
    selected_School_Id == null ||
    selected_School_Id == undefined ||
    selected_School_Id == ""
  ) {
    invalidSchoolMessage = "Select a school!";
    invalidSchoolOccured = true;
  }

  if (invalidSchoolOccured) {
    const invalidSchool = document.querySelector("#invalid-school");
    invalidSchool.classList.remove("hidden");
    invalidSchool.innerHTML = invalidSchoolMessage;
  }
  if (!invalidNameOccured && !invalidAgeOccured && !invalidSchoolOccured) {
    return true;
  }

  throw new Error(
    `Error message: ${invalidNameMessage ? "1." + invalidNameMessage : ""}, ${
      invalidAgeMessage ? "2." + invalidAgeMessage : ""
    }, ${invalidSchoolMessage ? "3." + invalidSchoolMessage : ""}`
  );
  return false;
}

export { validation };
