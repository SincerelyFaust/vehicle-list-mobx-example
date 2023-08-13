export default function editVehicle(
  vehicleMakeData,
  vehicleModelData,
  selectedVehicleData,
  editedVehicleData
) {
  const { make: selectedMake, model: selectedModel } = selectedVehicleData;
  const { editedMake, editedModel } = editedVehicleData;

  if (
    selectedMake.name === editedMake.name &&
    selectedMake.abrv === editedMake.abrv &&
    selectedModel.name === editedModel.name &&
    selectedModel.abrv === editedModel.abrv
  )
    return;

  const vehicleModelIndex = vehicleModelData.findIndex(
    (model) =>
      model.name === selectedModel.name && model.abrv === selectedModel.abrv
  );

  if (
    selectedMake.name !== editedMake.name ||
    selectedMake.abrv !== editedMake.abrv
  ) {
    const findVehicleMake = vehicleMakeData.find(
      (make) => make.name === editedMake.name && make.abrv === editedMake.abrv
    );
    const vehicleMakeLength = vehicleMakeData.length;

    // if the vehicle make doesn't exist, create a new one and assign to the model

    if (!findVehicleMake) {
      vehicleMakeData.push({
        id: vehicleMakeLength + 1,
        name: editedMake.name,
        abrv: editedMake.abrv,
      });
      vehicleModelData[vehicleModelIndex].makeid = vehicleMakeLength + 1;
      // else assign the existing make's id to the selected model
    } else {
      vehicleModelData[vehicleModelIndex].makeid = findVehicleMake.id;
    }
  }

  if (selectedModel.name !== editedModel.name) {
    vehicleModelData[vehicleModelIndex].name = editedModel.name;
  }

  if (selectedModel.abrv !== editedModel.abrv) {
    vehicleModelData[vehicleModelIndex].abrv = editedModel.abrv;
  }
}
