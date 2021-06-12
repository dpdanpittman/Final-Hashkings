const activePlots = (plots, seeds) => {
  let active = [];

  plots.forEach((plot) => {
    if (plot.properties && plot.properties.OCCUPIED) {
      if (getPlantedSeed(plot, seeds)) {
        active.push(plot);
      }
    }
  });

  return active;
};

export const getPlantedSeed = (plot, seeds) => {
  //console.log(plot, seeds);
  try {
    const seedID = plot.properties ? plot.properties.SEEDID : 1;
    const seed = seeds.filter((seed) => seed.id == seedID)[0];
    if (seed.properties.WATER > 0) {
      return seed;
    } else {
      return null;
    }
  } catch (e) {
    return {
      properties: {
        WATER: "SEED NEED REPAIR",
      },
    };
  }
};

export default activePlots;
