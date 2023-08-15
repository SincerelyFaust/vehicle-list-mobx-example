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
      try {
        addVehicle(
          vehiclesData.VehicleMake,
          vehiclesData.VehicleModel,
          body.newVehicleData
        );
        res
          .status(200)
          .json({ success: true, message: "Car added successfully." });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
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
      try {
        editVehicle(
          vehiclesData.VehicleMake,
          vehiclesData.VehicleModel,
          body.rawCurrentVehicle,
          body.editedVehicleData
        );
        res
          .status(200)
          .json({ success: true, message: "Car edited successfully." });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, error: "Method is not allowed." });
      break;
  }
}
