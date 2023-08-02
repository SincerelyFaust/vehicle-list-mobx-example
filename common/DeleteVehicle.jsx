export default function deleteVehicle(
  vehicleModelData,
  vehicleMakeData,
  selectedVehicleMakeAbrv,
  selectedVehicleModelAbrv
) {
  const vehicleMake = vehicleMakeData.find(
    (make) => make.abrv === selectedVehicleMakeAbrv
  );

  const findModelMatch = vehicleModelData.find(
    (model) =>
      model.makeid === vehicleMake.id && model.abrv === selectedVehicleModelAbrv
  );

  const vehicleModelIndex = vehicleModelData.indexOf(findModelMatch);

  if (vehicleModelIndex > -1) {
    vehicleModelData.splice(vehicleModelIndex, 1);
  }
}
