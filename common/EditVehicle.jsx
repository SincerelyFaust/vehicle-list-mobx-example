export default function editVehicle(
  vehicleMakeData,
  vehicleModelData,
  selectedVehicleMakeAbrv,
  selectedVehicleModelAbrv,
  editedVehicleMakeName,
  editedVehicleMakeAbrv,
  editedVehicleModelName,
  editedVehicleModelAbrv
) {
  const vehicleMake = vehicleMakeData.find(
    (make) => make.abrv === selectedVehicleMakeAbrv
  );

  const vehicleModel = vehicleModelData.find(
    (model) => model.abrv === selectedVehicleModelAbrv
  );

  if (
    selectedVehicleMakeAbrv === editedVehicleMakeAbrv &&
    vehicleMake.name === editedVehicleMakeName &&
    selectedVehicleModelAbrv === editedVehicleModelAbrv &&
    vehicleModel.name === editedVehicleModelName
  )
    return;

  const vehicleModelIndex = vehicleModelData.findIndex(
    (model) =>
      model.abrv === selectedVehicleModelAbrv && model.makeid == vehicleMake.id
  );

  if (editedVehicleMakeAbrv || editedVehicleMakeName) {
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

  if (editedVehicleModelName)
    vehicleModelData[vehicleModelIndex].name = editedVehicleModelName;
  if (editedVehicleModelAbrv)
    vehicleModelData[vehicleModelIndex].abrv = editedVehicleModelAbrv;
}
