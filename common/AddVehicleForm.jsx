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
          label: "Naziv marke",
          placeholder: "Unesite naziv marke vozila",
          rules: "required|string|between:2,50",
        },
        {
          name: "makeAbrv",
          label: "Skraćenica marke",
          placeholder: "Unesite skraćenicu marke vozila",
          rules: "required|string|between:1,10",
        },
        {
          name: "modelName",
          label: "Naziv modela",
          placeholder: "Unesite naziv modela vozila",
          rules: "required|string|between:2,50",
        },
        {
          name: "modelAbrv",
          label: "Skraćenica modela",
          placeholder: "Unesite skraćenicu modela vozila",
          rules: "required|string|between:1,10",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert(`Uspješno dodano!`);
        console.log("Form Values!", form.values());
      },
      onError(form) {
        alert("Form has errors!");
        console.error("All form errors", form.errors());
      },
    };
  }
}
