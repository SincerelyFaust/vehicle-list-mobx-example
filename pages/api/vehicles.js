import { vehiclesData } from "@/common/VehiclesData";
import addVehicle from "@/common/AddVehicle";
import deleteVehicle from "@/common/DeleteVehicle";

export default function handler(req, res) {
  const { method, body } = req;
  const { newVehicleMake, newVehicleModel } = body;

  switch (method) {
    case "GET":
      res.status(200).json(vehiclesData);
      break;
    case "POST":
      addVehicle(
        vehiclesData.VehicleMake,
        vehiclesData.VehicleModel,
        newVehicleMake,
        newVehicleModel
      );
      res
        .status(200)
        .json({ success: true, message: "Car added successfully." });
      break;
    case "DELETE":
      deleteVehicle(
        vehiclesData.VehicleModel,
        vehiclesData.VehicleMake,
        newVehicleModel,
        newVehicleMake
      );
      res
        .status(200)
        .json({ success: true, message: "Car deleted successfully." });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
