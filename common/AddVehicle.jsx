export default function addVehicle(
  vehicleMakeData,
  vehicleModelData,
  newVehicleMake,
  newVehicleModel
) {
  if (!newVehicleMake && !newVehicleModel) return;

  const vehicleMakeLength = vehicleMakeData.length;
  const vehicleModelLength = vehicleModelData.length;
  const vehicleMake = vehicleMakeData.find(
    (make) => make.abrv === newVehicleMake
  );
  const vehicleModel = vehicleModelData.find(
    (model) => model.name === newVehicleModel
  );

  /* the reason for this boolean check is not to add a vehicle make that already exists */

  vehicleMake
    ? null
    : vehicleMakeData.push({
        id: vehicleMakeLength + 1,
        name: newVehicleMake,
        abrv: newVehicleMake,
      });

  /* the reason for this if statement check is not to add a vehicle model that already exists unless the model name only shares the same name as some other model that's under a different vehicle make in which case we want to add it */

  if (vehicleMake && vehicleModel) {
    const isDuplicate = vehicleModelData.some(
      (model) =>
        model.makeid === vehicleMake.id && model.name === newVehicleModel
    );

    if (!isDuplicate) {
      vehicleModelData.push({
        id: vehicleModelLength + 1,
        makeid: vehicleMake.id,
        name: newVehicleModel,
        abrv: newVehicleModel,
      });
    }
  } else if (vehicleMake && !vehicleModel) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMake.id,
      name: newVehicleModel,
      abrv: newVehicleModel,
    });
  } else if (
    (vehicleModel && !vehicleMake) ||
    (!vehicleMake && !vehicleModel)
  ) {
    vehicleModelData.push({
      id: vehicleModelLength + 1,
      makeid: vehicleMakeLength + 1,
      name: newVehicleModel,
      abrv: newVehicleModel,
    });
  }
}
