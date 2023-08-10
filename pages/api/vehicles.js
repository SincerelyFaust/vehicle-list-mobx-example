import { vehiclesData } from "@/common/VehiclesData";
import addVehicle from "@/common/AddVehicle";
import deleteVehicle from "@/common/DeleteVehicle";
import editVehicle from "@/common/EditVehicle";

export default function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      res.status(200).json(vehiclesData);
      break;
    case "POST":
      addVehicle(
        vehiclesData.VehicleMake,
        vehiclesData.VehicleModel,
        body.newVehicleData
      );
      res
        .status(200)
        .json({ success: true, message: "Car added successfully." });
      break;
    case "DELETE":
      deleteVehicle(
        vehiclesData.VehicleMake,
        vehiclesData.VehicleModel,
        body.selectedVehicleData
      );
      res
        .status(200)
        .json({ success: true, message: "Car deleted successfully." });
      break;
    case "PATCH":
      editVehicle(
        vehiclesData.VehicleMake,
        vehiclesData.VehicleModel,
        body.initialData,
        body.editedVehicleData
      );
      res
        .status(200)
        .json({ success: true, message: "Car edited successfully." });
      break;
  }
}
