export default function SortVehicle(vehicleMakeData, vehicleModelData, choice) {
  switch (choice) {
    case "alphabetical-make":
      vehicleModelData.sort((modelA, modelB) => {
        const makeA = vehicleMakeData.find((make) => make.id === modelA.makeid);
        const makeB = vehicleMakeData.find((make) => make.id === modelB.makeid);

        if (makeA && makeB) {
          return makeA.name.localeCompare(makeB.name);
        }
      });
      break;
    case "alphabetical-model":
      vehicleModelData.sort((modelA, modelB) =>
        modelA.name.localeCompare(modelB.name)
      );
      break;
  }
}
