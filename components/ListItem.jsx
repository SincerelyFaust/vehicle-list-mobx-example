import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";
import { Edit, XCircle } from "lucide-react";
import { ListItemStore } from "@/stores/ListItemStore";
import { useLocalObservable } from "mobx-react-lite";

export default function ListItem({ vehicle, setOpenEditVehicleDialog }) {
  const { make, model } = vehicle;

  const store = useStore();
  const listItemStore = useLocalObservable(
    () => new ListItemStore(store, setOpenEditVehicleDialog)
  );

  return (
    <li className={styles["list-item"]}>
      <p>
        <span className={styles["make-model-span"]}>Make</span>
        {make.name} <span>({make.abrv})</span>
      </p>
      <p>
        <span className={styles["make-model-span"]}>Model</span>
        {model.name} <span>({model.abrv})</span>
      </p>
      <div className={styles["button-div"]}>
        <button onClick={() => listItemStore.editVehicle(make, model)}>
          <Edit size={16} /> <p>Edit</p>
        </button>
        <button onClick={() => listItemStore.deleteVehicle(model)}>
          <XCircle size={16} /> <p>Delete</p>
        </button>
      </div>
    </li>
  );
}
