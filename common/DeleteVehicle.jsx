export default function deleteVehicle(
  vehicleMakeData,
  vehicleModelData,
  selectedVehicleData
) {
  const { make: selectedMake, model: selectedModel } = selectedVehicleData;

  const vehicleMake = vehicleMakeData.find(
    (make) => make.name === selectedMake.name && make.abrv === selectedMake.abrv
  );

  const findModelMatch = vehicleModelData.find(
    (model) =>
      model.makeid === vehicleMake.id &&
      model.abrv === selectedModel.abrv &&
      model.name === selectedModel.name
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
