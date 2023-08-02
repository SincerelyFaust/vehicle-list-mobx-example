export default function addVehicle(
  vehicleMakeData,
  vehicleModelData,
  newVehicleMakeName,
  newVehicleMakeAbrv,
  newVehicleModelName,
  newVehicleModelAbrv
) {
  if (
    !newVehicleMakeName &&
    !newVehicleMakeAbrv &&
    !newVehicleModelName &&
    !newVehicleModelAbrv
  )
    return;

  const vehicleMakeLength = vehicleMakeData.length;
  const vehicleModelLength = vehicleModelData.length;
  const vehicleMake = vehicleMakeData.find(
    (make) => make.abrv.toLowerCase() === newVehicleMakeAbrv.toLowerCase()
  );
  const vehicleModel = vehicleModelData.find(
    (model) => model.name.toLowerCase() === newVehicleModelName.toLowerCase()
  );

  /* the reason for this boolean check is not to add a vehicle make that already exists */

  vehicleMake
    ? null
    : vehicleMakeData.push({
        id: vehicleMakeLength + 1,
        name: newVehicleMakeName,
        abrv: newVehicleMakeAbrv,
      });

  /* the reason for this if statement check is not to add a vehicle model that already exists unless the model name only shares the same name as some other model that's under a different vehicle make in which case we want to add it */

  if (vehicleMake && vehicleModel) {
    const isDuplicate = vehicleModelData.some(
      (model) =>
        model.makeid === vehicleMake.id &&
        model.name.toLowerCase() === newVehicleModelName.toLowerCase()
    );

    if (!isDuplicate) {
      vehicleModelData.push({
        id: vehicleModelLength + 1,
        makeid: vehicleMake.id,
        name: newVehicleModelName,
        abrv: newVehicleModelAbrv,
      });
    }
  } else if (vehicleMake && !vehicleModel) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMake.id,
      name: newVehicleModelName,
      abrv: newVehicleModelAbrv,
    });
  } else if (
    (vehicleModel && !vehicleMake) ||
    (!vehicleMake && !vehicleModel)
  ) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMakeLength + 1,
      name: newVehicleModelName,
      abrv: newVehicleModelAbrv,
    });
  }
}
