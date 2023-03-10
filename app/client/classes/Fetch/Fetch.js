"usestrict";
import { colorResponse } from "../../helpers/makeResponseBoxGreen";

class Fetch {
  static addSchool_IsLoading = false;
  static addStudent_IsLoading = false;
  static addWebhook_IsLoading = false;
  static greenResponseTimer = null;
  static databaseResponseColor = new colorResponse();

  static async asyncFetch(
    URL,
    OPTIONS,
    addThis_isLoading,
    ARRAY_OF_FUNCTIONS_TO_EXECUTE
  ) {
    if (!Fetch[addThis_isLoading]) {
      Fetch[addThis_isLoading] = true;

      try {
        const response = await fetch(URL, OPTIONS);
        const data = await response.json();

        if (response.status == 200) {
          const databaseResponseBox =
            document.querySelector(".database-response");
          if (
            ARRAY_OF_FUNCTIONS_TO_EXECUTE &&
            ARRAY_OF_FUNCTIONS_TO_EXECUTE.length > 0
          ) {
            ARRAY_OF_FUNCTIONS_TO_EXECUTE.forEach((_function) => {
              _function();
            });
          }
          console.warn("asyncFetch data ======= ", data);
          const { message: respone_message } = data;

          databaseResponseBox.innerHTML = respone_message;

          Fetch.databaseResponseColor.makeResponseBoxGreen(databaseResponseBox);
        }
      } catch (error) {
        console.log(error);
      } finally {
        Fetch[addThis_isLoading] = false;
      }
    }
  }

  // Helpers

  static setFetchOptions(method, headers_object, body_object) {
    const options = {
      method: method,
      headers: headers_object,
      body: JSON.stringify(body_object),
    };
    return options;
  }
}

export { Fetch };
