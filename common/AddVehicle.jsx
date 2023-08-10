export default function addVehicle(
  vehicleMakeData,
  vehicleModelData,
  newVehicleData
) {
  if (!newVehicleData) return;

  const { newMake, newModel } = newVehicleData;
  const vehicleMakeLength = vehicleMakeData.length;
  const vehicleModelLength = vehicleModelData.length;
  const vehicleMake = vehicleMakeData.find(
    (make) =>
      make.name.toLowerCase() === newMake.name.toLowerCase() &&
      make.abrv.toLowerCase() === newMake.abrv.toLowerCase()
  );
  const vehicleModel = vehicleModelData.find(
    (model) =>
      model.name.toLowerCase() === newModel.name.toLowerCase() &&
      model.abrv.toLowerCase() === newModel.abrv.toLowerCase()
  );

  /* the reason for this boolean check is not to add a vehicle make that already exists */

  vehicleMake
    ? null
    : vehicleMakeData.push({
        id: vehicleMakeLength + 1,
        name: newMake.name,
        abrv: newMake.abrv,
      });

  /* the reason for this if statement check is not to add a vehicle model that already exists unless the model name only shares the same name as some other model that's under a different vehicle make in which case we want to add it */

  if (vehicleMake && vehicleModel) {
    const isDuplicate = vehicleModelData.some(
      (model) =>
        model.makeid === vehicleMake.id &&
        model.name.toLowerCase() === newModel.name.toLowerCase() &&
        model.abrv.toLowerCase() === newModel.abrv.toLowerCase()
    );

    if (!isDuplicate) {
      vehicleModelData.push({
        id: vehicleModelLength + 1,
        makeid: vehicleMake.id,
        name: newModel.name,
        abrv: newModel.abrv,
      });
    }
  } else if (vehicleMake && !vehicleModel) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMake.id,
      name: newModel.name,
      abrv: newModel.abrv,
    });
  } else if (
    (vehicleModel && !vehicleMake) ||
    (!vehicleMake && !vehicleModel)
  ) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMakeLength + 1,
      name: newModel.name,
      abrv: newModel.abrv,
    });
  }
}
