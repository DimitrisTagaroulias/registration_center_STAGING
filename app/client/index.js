"use strict";
import { io } from "socket.io-client";
import { School } from "./classes/School/School.js";
import { colorResponse } from "./helpers/makeResponseBoxGreen.js";
import { setSwitchModeButtonHandler } from "./switch-mode/setSwitchModeButtonHandler.js";
import { setMediaQueries, mqHandler } from "./media-queries/setMediaQueries.js";
import "@fontsource/roboto";

const switchModeButtonCloudContainer = document.querySelector(
  ".switch-mode-button-container"
);
const switchModeButton = switchModeButtonCloudContainer.querySelector(
  "#switch-mode-button"
);

// Pass in the Port of Application into School class
const appURL = "http://localhost:3200";
School.set_appURL(appURL);

// Initialize sockets URL
const socket = io(appURL);

// SCRIPT ACTIONS

mqHandler(); // Check Media Queries
setMediaQueries();
setSwitchModeButtonHandler();
showSchools();

// SHOW SCHOOLS on LOAD
export async function showSchools() {
  // GET ALL SCHOOLS AND STUDENTS
  const { schools, students } = await School.get_Schools_And_Students();
  School.set_allSchools(schools);

  // CLASSIFY STUDENTS TO SCHOOLS // school:students:[jim,george...]
  School.classifyStudentsToSchools(schools, students);

  // GET SCHOOLS & STUDENTS LIST as <option>
  School.get_schoolList_options(schools);

  // GET WEBHOOKS FOR EVERY SCHOOL (checkbox)
  School.get_every_school_webhook(schools);

  // CREATE SCHOOL LIST MARKUP
  School.createSchoolsMarkup(schools);

  const loadingContainer = document.querySelector(".loading-container");
  loadingContainer.style.display = "none";
}

// MODAL HANDLING
const modal = document.querySelector("#modal-overflow");
const modalButton = document.querySelector("#modal-button");

window.addEventListener("click", (e) => {
  if (e.target == modal || e.target == modalButton) {
    modal.style.display = "none";
  }
});

// ADD STUDENT
const addStudent_Form = document.querySelector("#addStudent_Form");
addStudent_Form.addEventListener("submit", School.addStudent);

// ADD WEBHOOK EVENT **
const formsContainer = document.querySelector(".forms-container");
formsContainer.addEventListener("submit", School.addWebhookEvent);

// ---- **checkbox on click submits form ----
formsContainer.addEventListener("click", (e) => {
  if (e.target.type == "checkbox") {
    const submitBtnOfTargetForm = e.target
      .closest("form")
      .querySelector("button[type='submit']");

    // This does not preventDefault
    // addWebhook_Form.submit();
    // So this works

    // This is an invisible submit button
    submitBtnOfTargetForm.click();
  }
});

// REFRESH SCHOOL LIST (BUTTON)
const schoolsU_Ul_Wrapper = document.querySelector(".schools-ul-wrapper");
schoolsU_Ul_Wrapper.addEventListener("click", (e) => {
  if (e.target.id == "refresh-button") {
    showSchools();
  }
});

// WEBSOCKET EVENT
socket.on("connect", () => {
  console.log(`You have been connected with SOCKET / id: ${socket.id}`);
  const databaseResponseColor = new colorResponse();

  socket.on("school-message", async (data) => {
    const refreshButton = document.querySelector("#refresh-button");
    const waitForStudentMessage = document.querySelector(
      "#wait-for-student-message"
    );

    try {
      console.log("ws:", data);
      let { schoolId } = await data.result;
      const school = document.querySelector(`#school-${schoolId}`);
      const email_inbox = school.querySelector(".email-inbox");
      const email_content = school.querySelector(".email-content");
      email_content.innerHTML = data.message;
      databaseResponseColor.makeResponseBoxGreen(email_inbox);
    } catch (error) {
      console.error(error);
    } finally {
      waitForStudentMessage.style.display = "none";
      refreshButton.style.display = "block";
    }
  });
});

export { switchModeButtonCloudContainer, switchModeButton };
