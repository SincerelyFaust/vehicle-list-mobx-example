import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

export class AddVehicleForm extends Form {
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
          label: "Make name",
          placeholder: "Enter the name of the vehicle make",
          rules: "required|string|between:2,50",
        },
        {
          name: "makeAbrv",
          label: "Abbreviation of vehicle make",
          placeholder: "Enter the abbreviation of vehicle make",
          rules: "required|string|between:1,10",
        },
        {
          name: "modelName",
          label: "Model name",
          placeholder: "Enter the name of the vehicle model",
          rules: "required|string|between:2,50",
        },
        {
          name: "modelAbrv",
          label: "Abbreviation of vehicle model",
          placeholder: "Enter the abbreviation of vehicle model",
          rules: "required|string|between:1,10",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert(`Successfully added!`);
        console.log("Form Values!", form.values());
      },
      onError(form) {
        alert("A form error was found!");
        console.error("All form errors", form.errors());
      },
    };
  }
}
