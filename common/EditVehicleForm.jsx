import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

export class EditVehicleForm extends Form {
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "makeName",
          label: "New make name",
          placeholder: "Enter a new make name",
          rules: "required|string|between:2,50",
        },
        {
          name: "makeAbrv",
          label: "New make abbreviation",
          placeholder: "Enter a new vehicle make abbreviation",
          rules: "required|string|between:1,10",
        },
        {
          name: "modelName",
          label: "New model name",
          placeholder: "Enter a new model name",
          rules: "required|string|between:2,50",
        },
        {
          name: "modelAbrv",
          label: "New model abbreviation",
          placeholder: "Enter a new vehicle model abbreviation",
          rules: "required|string|between:1,10",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert(`Successfully edited!`);
        console.log("Form Values!", form.values());
      },
      onError(form) {
        alert("A form error was found!");
        console.error("All form errors", form.errors());
      },
    };
  }
}
