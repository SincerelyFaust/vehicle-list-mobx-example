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
          label: "Novi naziv marke",
          placeholder: "Unesite novi naziv marke vozila",
          rules: "required|string|between:2,50",
        },
        {
          name: "makeAbrv",
          label: "Nova skraćenica marke",
          placeholder: "Unesite novu skraćenicu marke vozila",
          rules: "required|string|between:1,10",
        },
        {
          name: "modelName",
          label: "Novi naziv modela",
          placeholder: "Unesite novi naziv modela vozila",
          rules: "required|string|between:2,50",
        },
        {
          name: "modelAbrv",
          label: "Nova skraćenica modela",
          placeholder: "Unesite novu skraćenicu modela vozila",
          rules: "required|string|between:1,10",
        },
      ],
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        alert(`Uspješno uređeno!`);
        console.log("Form Values!", form.values());
      },
      onError(form) {
        alert("Pronađena je greška u obrascu!");
        console.error("All form errors", form.errors());
      },
    };
  }
}
