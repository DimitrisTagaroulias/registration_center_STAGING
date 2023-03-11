"usestrict";
import { setInnerHtml } from "../../helpers/setInnerHtml.js";
import { Fetch } from "../Fetch/Fetch.js";
import { validation } from "../../helpers/validation.js";

class School extends Fetch {
  static #appURL;
  static #allSchools;
  // School.#allSchools = schools_object; It's being used but still it's being showed as unused(gray color)

  // ---------------- SHOW SCHOOLS & STUDENTS ----------------

  // GET ALL SCHOOLS AND STUDENTS

  static set_appURL(app_URL) {
    School.#appURL = app_URL;
  }

  static async set_allSchools(schools_object) {
    School.#allSchools = schools_object;
  }

  static async get_School_By_Id(school_Id) {
    if (school_Id != null) {
      // SELECTED SCHOOL URL by ID
      const selectedSchool_URL = `${School.#appURL}/schools/${school_Id}`;

      // FETCH SELECTED SCHOOL DATA
      const selectedSchool_Response = await fetch(selectedSchool_URL);

      if (!selectedSchool_Response.ok) {
        throw new Error(
          `Request Status:${selectedSchool_Response.status} , Something went wrong`
        );
      }
      const selectedSchoolDetails = await selectedSchool_Response.json();
      return selectedSchoolDetails.result;
    } else {
      throw new Error("No school is selected.");
    }
  }

  static async get_Schools_And_Students() {
    try {
      const responsesJSON = await Promise.all([
        fetch(`${School.#appURL}/schools`),
        fetch(`${School.#appURL}/students`),
      ]);

      for (let i = 0; i < responsesJSON.length; i++) {
        if (!responsesJSON[i].ok) {
          throw new Error("Failed to fetch. Check API's Endpoint.");
        }
      }

      const [{ result: schools }, { result: students }] = await Promise.all(
        responsesJSON.map((r) => r.json())
      );

      return { schools, students };
    } catch (error) {
      throw new Error(error);
    }
  }

  // CLASSIFY STUDENTS TO SCHOOLS // school:students:[jim,george...]
  static classifyStudentsToSchools(schools, students) {
    try {
      if (schools && schools.length > 0) {
        schools.forEach((school) => {
          school.studentsList = [];
          // students.forEach((student, student_index)
          for (let i = 0; i < students.length; i++)
            if (students[i].schoolId === school.schoolId) {
              const removedStudent = students.splice(i, 1);
              school.studentsList.push(removedStudent);
              //   The array is being re-indexed when you do a .splice(), which means you'll skip over an index when one is removed, and your cached. SO WE USE i--
              i--;
            }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // GET SCHOOLS & STUDENTS LIST as <option>
  static get_schoolList_options(schools) {
    try {
      const studentSchoolList = document.querySelector("#student-school-list");
      let markup = `<option value=null disabled selected hidden>Select school</option>`;
      if (schools && schools.length > 0) {
        schools.forEach((school, index) => {
          const { schoolName } = school;
          // index + 1 because DB ID indexing
          markup += `<option value=${index + 1} >${schoolName}</option>`;
        });
      }
      // setInnerHtml([webhookSchoolList, studentSchoolList], markup);
      setInnerHtml([studentSchoolList], markup);
    } catch (error) {
      console.log(error);
    }
  }

  // GET WEBHOOK LIST
  static get_every_school_webhook(schools) {
    const formsContainer = document.querySelector(".forms-container");

    formsContainer.innerHTML = "";

    try {
      if (schools && schools.length > 0) {
        schools.forEach((school, index) => {
          const { schoolName, schoolId, webhookDetails } = school;

          // IF THERE IS WEBHOOK LIST
          if (webhookDetails && webhookDetails.length > 0) {
            webhookDetails.forEach((webhook, webhook_index) => {
              formsContainer.innerHTML += School.get_Webhook_List_Markup(
                schoolName,
                webhook_index,
                schoolId,
                webhook.eventName,
                webhook.checked
              );
            });
          } else {
            formsContainer.innerHTML += `The school that's named ${schoolName} doesn't have any Webhook.`;
            return;
          }
        });
      } else {
        formsContainer.innerHTML += `There are no Schools in order to show Webhook options.`;
      }
    } catch (error) {
      console.error(error);
    }
  }
  // CREATE WEBHOOK LIST MARKUP (for checkbox)
  static get_Webhook_List_Markup(
    school_Name,
    webhook_Index,
    school_Id,
    webhook_Event_Name,
    checked
  ) {
    const webhook_List_Markup = `
        <form action="" id="addWebhook-Form-${school_Id}-${webhook_Index}" class="webhook-form">
          <input type="checkbox" id="webhook-${school_Id}-${webhook_Index}" name="webhook-${school_Id}-${webhook_Index}" value=${webhook_Event_Name} ${
      checked ? "checked" : ""
    }/>
          <label for="webhook-${school_Id}-${webhook_Index}">
          Add / Remove "${webhook_Event_Name}" Webhook from <br> <strong>${school_Name}</strong></label>
          <button
          type="submit"
          id="submit-webhook-form-btn-${webhook_Index}"
          class="hidden"
          ></button>
        </form>
        `;

    return webhook_List_Markup;
  }

  // CREATE SCHOOL LIST MARKUP
  static createSchoolsMarkup(schools) {
    try {
      const schools_ul_wrapper = document.querySelector(".schools-ul-wrapper");
      let school_List_HTML;

      // IF NO SCHOOLS
      if (!schools || schools.length <= 0) {
        school_List_HTML = `
          <div>There are no Registered schools yet.</div>`;
        schools_ul_wrapper.innerHTML = school_List_HTML;
      }
      // IF SCHOOLS
      if (schools && schools.length > 0) {
        school_List_HTML = `
        <ul class="schools-list"></ul>`;
        schools_ul_wrapper.innerHTML = school_List_HTML;

        const schoolList = document.querySelector("ul.schools-list");

        // CREATE STUDENTS MARKUP -- START
        schools.forEach((school, school_index) => {
          let studentsMarkup =
            "<tr><td colspan='3' class='no-students'>This school has no students.</td></tr>";
          // IF STUDENTS
          if (school.studentsList && school.studentsList.length > 0) {
            studentsMarkup = "";
            school.studentsList.forEach((student, student_index) => {
              const [{ name, age }] = student;
              studentsMarkup += School.getStudentListMarkup(
                name,
                age,
                student_index
              );
            });
          }

          // CREATE STUDENTS MARKUP -- END

          schoolList.innerHTML += School.getSchoolListMarkup(
            school.schoolId,
            school.schoolName,
            studentsMarkup
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static getStudentListMarkup(name, age, student_index) {
    const studentMarkup = `
  <tr class="student-info">
  <td>${student_index + 1}</td>
  <td>${name}</td>
  <td>${age}</td>
  </tr>
`;
    return studentMarkup;
  }
  static getSchoolListMarkup(school_Id, schoolName, studentsMarkup) {
    const HTML = document.querySelector("HTML");
    const businessTheme = HTML.classList.contains("html-business");

    const schoolListMarkup = `
    <li id="school-${school_Id}" class="new-school ${
      businessTheme ? "new-school-business" : ""
    }">
    <div class="students-wrapper ${
      businessTheme ? "students-wrapper-business" : ""
    }">
      <h2 class="${businessTheme ? "h2-business" : ""}">Students</h2>
      <div class="table-container-wrapper ${
        businessTheme ? "table-container-wrapper-business" : ""
      }">
        <div class="table-header ${
          businessTheme ? "table-header-business" : ""
        }">
          <div class="td-Id ${businessTheme ? "td-Id-business" : ""}">Id</div>
          <div class="td-Name ${
            businessTheme ? "td-Name-business" : ""
          }">Name</div>
          <div class="td-Age ${
            businessTheme ? "td-Id-Age-business" : ""
          }">Age</div>
        </div> 
        <div class="table-container">
          

          <table class="student-list ${
            businessTheme ? "student-list-business" : ""
          }">
          
            <tbody>
                ${studentsMarkup}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button type="button" id="refresh-button" class="${
      businessTheme ? "button-business refresh-button-business" : ""
    }">
      Refresh List
    </button>
    <button type="button" id="wait-for-student-message" class="${
      businessTheme ? "button-business" : ""
    }">
    <div class="loading-container" style='margin:0;'>
      <span>Student is being added</span>
      <div class="loading-animation">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  </div>
    </button>
    <div class="email-container ${
      businessTheme ? "email-container-business" : ""
    }">
      <h2 class="${businessTheme ? "h2-business" : ""}">Email Inbox</h2>
      <div class="email-inbox ${businessTheme ? "email-inbox-business" : ""}">
        <div class="email-content">empty</div>
      </div>
    </div>
  </li>
            `;
    return schoolListMarkup;
  }

  // ---------------- ADD STUDENT ----------------
  static async addStudent(e) {
    e.preventDefault();
    const refreshButton = document.querySelector("#refresh-button");
    const waitForStudentMessage = document.querySelector(
      "#wait-for-student-message"
    );
    try {
      refreshButton.style.display = "none";
      waitForStudentMessage.style.display = "block";

      const data = new FormData(addStudent_Form);
      const student_Name = data.get("name");
      const student_Age = data.get("age");
      const selected_School_Id = data.get("student-school-list");

      if (validation(student_Name, student_Age, selected_School_Id)) {
        addStudent_Form.reset();
        const errorMessageElements =
          document.querySelectorAll(".validation-error");

        errorMessageElements.forEach((errorMessageElement) => {
          errorMessageElement.classList.add("hidden");
        });

        // SET FETCH POST OPTIONS
        const URL = `${School.#appURL}/addstudent`;
        const OPTIONS = School.setFetchOptions(
          "POST",
          { "Content-Type": "application/json" },
          {
            name: student_Name,
            age: student_Age,
            schoolId: selected_School_Id,
          }
        );

        // CALL FETCH
        School.asyncFetch(URL, OPTIONS, "addStudent_IsLoading");

        const selectedSchoolResponse = await School.get_School_By_Id(
          selected_School_Id
        );
        const selectedSchoolDetails = await selectedSchoolResponse;

        if (selectedSchoolDetails.webhookDetails) {
          const webhookList = selectedSchoolDetails.webhookDetails;
          let selectedSchool_Has_newStudentAdd_Webhook_Activated = false;
          for (let i = 0; i < webhookList.length; i++) {
            if (
              webhookList[i].eventName === "newStudentAdd" &&
              webhookList[i].checked === true
            ) {
              selectedSchool_Has_newStudentAdd_Webhook_Activated = true;
            }
          }
          if (!selectedSchool_Has_newStudentAdd_Webhook_Activated) {
            refreshButton.style.display = "block";
            waitForStudentMessage.style.display = "none";
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      refreshButton.style.display = "block";
      waitForStudentMessage.style.display = "none";
    }
  }
  // ---------------- ADD WEBHOOK EVENT (newStudentAdd) ----------------
  static async addWebhookEvent(e) {
    const addWebhook_Form = e.target;
    const idPartsArr = addWebhook_Form.id.split("-");
    const [, , selected_School_Id, selected_Webhook_Index] = idPartsArr;
    const webhookInput = addWebhook_Form.querySelector("INPUT");
    const webhookInputName = webhookInput.name;

    e.preventDefault();
    // return;
    try {
      const data = new FormData(addWebhook_Form);
      const webhookCheckboxValue = data.get(webhookInputName); //returns webhook name if clicked || null

      if (selected_School_Id != null) {
        try {
          // GET SELECTED SCHOOL
          const selectedSchoolDetails = await School.get_School_By_Id(
            selected_School_Id
          );
          const { schoolId } = selectedSchoolDetails;

          // SET FETCH OPTIONS FOR CALLING THE ADDWEBHOOK EVENT ENDPOINT and set the webhook to school(by ID)
          const URL = `${School.#appURL}/addwebhookevent`;
          const OPTIONS = School.setFetchOptions(
            "POST",
            { "Content-Type": "application/json" },
            {
              schoolId: schoolId,
              eventName: "newStudentAdd",
              endpointUrl: `http://localhost:1001/webhook/studentadded`,
              checked: `${webhookCheckboxValue ? true : false}`,
            }
          );

          // FETCH
          webhookInput.setAttribute("disabled", true);
          await School.asyncFetch(URL, OPTIONS, "addWebhook_IsLoading");
          //
        } catch (error) {
          console.error(error);
        }
      } else {
        //
        throw new Error("Something went erong with webhook selection.");
        //
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      webhookInput.removeAttribute("disabled");
      const selectedSchoolDetails = await School.get_School_By_Id(
        selected_School_Id
      );

      const checked =
        selectedSchoolDetails.webhookDetails[selected_Webhook_Index].checked;

      let actionMessage = `${checked == true ? "added to" : "removed from"}`;

      if (checked) {
        webhookInput.checked = true;
        webhookInput.setAttribute("checked", "true");
      } else {
        webhookInput.checked = null;
        webhookInput.removeAttribute("checked");
      }
    }
  }
}

export { School };
