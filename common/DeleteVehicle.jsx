export default function deleteVehicle(
  vehicleMakeData,
  vehicleModelData,
  selectedVehicleData
) {
  const { make: selectedMake, model: selectedModel } = selectedVehicleData;

  const vehicleModelIndex = vehicleModelData.indexOf(selectedModel);

  if (vehicleModelIndex > -1) {
    vehicleModelData.splice(vehicleModelIndex, 1);
  }

  // if the last remaining model under a certain vehicle make is deleted also delete the vehicle make

  const remainingModels = vehicleModelData.some(
    (model) => model.makeid === selectedMake.id
  );

  if (!remainingModels) {
    const vehicleMakeIndex = vehicleMakeData.indexOf(selectedMake);
    if (vehicleMakeIndex > -1) {
      vehicleMakeData.splice(vehicleMakeIndex, 1);
    }
  }
}
