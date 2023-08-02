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

  // if the last remaining model under a certain vehicle make is deleted also delete the vehicle make

  const remainingModels = vehicleModelData.some(
    (model) => model.makeid === vehicleMake.id
  );

  if (!remainingModels) {
    const vehicleMakeIndex = vehicleMakeData.indexOf(vehicleMake);
    if (vehicleMakeIndex > -1) {
      vehicleMakeData.splice(vehicleMakeIndex, 1);
    }
  }
}
