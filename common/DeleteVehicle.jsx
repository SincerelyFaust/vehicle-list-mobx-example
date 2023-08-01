export default function deleteVehicle(
  vehicleModelData,
  vehicleMakeData,
  newVehicleModel,
  newVehicleMake
) {
  const vehicleMake = vehicleMakeData.find(
    (make) => make.abrv === newVehicleMake
  );

  const findModelMatch = vehicleModelData.find(
    (model) => model.makeid === vehicleMake.id && model.name === newVehicleModel
  );

  const vehicleModelIndex = vehicleModelData.indexOf(findModelMatch);

  if (vehicleModelIndex > -1) {
    vehicleModelData.splice(vehicleModelIndex, 1);
  }
}
