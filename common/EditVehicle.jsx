export default function editVehicle(
  vehicleMakeData,
  vehicleModelData,
  selectedVehicleMakeName,
  selectedVehicleMakeAbrv,
  selectedVehicleModelName,
  selectedVehicleModelAbrv,
  editedVehicleMakeName,
  editedVehicleMakeAbrv,
  editedVehicleModelName,
  editedVehicleModelAbrv
) {
  if (
    selectedVehicleMakeName === editedVehicleMakeName &&
    selectedVehicleMakeAbrv === editedVehicleMakeAbrv &&
    selectedVehicleModelName === editedVehicleModelName &&
    selectedVehicleModelAbrv === editedVehicleModelAbrv
  )
    return;

  const vehicleMake = vehicleMakeData.find(
    (make) =>
      make.name === selectedVehicleMakeName &&
      make.abrv === selectedVehicleMakeAbrv
  );

  const vehicleModelIndex = vehicleModelData.findIndex(
    (model) =>
      model.name === selectedVehicleModelName &&
      model.abrv === selectedVehicleModelAbrv &&
      model.makeid == vehicleMake.id
  );

  if (
    selectedVehicleMakeName !== editedVehicleMakeName ||
    selectedVehicleMakeAbrv !== editedVehicleMakeAbrv
  ) {
    const findVehicleMake = vehicleMakeData.find(
      (make) =>
        make.abrv === editedVehicleMakeAbrv &&
        make.name === editedVehicleMakeName
    );
    const vehicleMakeLength = vehicleMakeData.length;

    // if the vehicle make doesn't exist, create a new one and assign to the model

    if (!findVehicleMake) {
      vehicleMakeData.push({
        id: vehicleMakeLength + 1,
        name: editedVehicleMakeName,
        abrv: editedVehicleMakeAbrv,
      });
      vehicleModelData[vehicleModelIndex].makeid = vehicleMakeLength + 1;
      // else assign the existing make's id to the selected model
    } else {
      vehicleModelData[vehicleModelIndex].makeid = findVehicleMake.id;
    }
  }

  if (selectedVehicleModelName !== editedVehicleModelName)
    vehicleModelData[vehicleModelIndex].name = editedVehicleModelName;
  if (selectedVehicleModelAbrv !== editedVehicleModelAbrv)
    vehicleModelData[vehicleModelIndex].abrv = editedVehicleModelAbrv;
}
