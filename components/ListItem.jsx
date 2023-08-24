import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";
import { Edit, XCircle } from "lucide-react";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";

export default function ListItem({
  vehicle,
  setOpenEditVehicleDialog,
  openEditVehicleDialog,
}) {
  const { make, model } = vehicle;

  const store = useStore();
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);

  async function handleClick() {
    const modelResponse = await modelService.deleteModel(model);

    if (modelResponse) {
      return console.error(modelResponse);
    }

    store.deleteModelToStore(model);
  }

  return (
    <li className={styles["list-item"]}>
      <p>
        <span className={styles["make-model-span"]}>Marka</span>
        {make.name} <span>({make.abrv})</span>
      </p>
      <p>
        <span className={styles["make-model-span"]}>Model</span>
        {model.name} <span>({model.abrv})</span>
      </p>
      <div className={styles["button-div"]}>
        <button
          onClick={() => {
            store.setCurrentVehicle(make, model);
            setOpenEditVehicleDialog(!openEditVehicleDialog);
          }}
        >
          <Edit size={16} /> <p>Uredi</p>
        </button>
        <button onClick={() => handleClick()}>
          <XCircle size={16} /> <p>Izbriši</p>
        </button>
      </div>
    </li>
  );
}
