const activePlots = (plots) => {
  let active = [];

  plots.forEach((plot) => {
    if (plot.properties && plot.properties.OCCUPIED) active.push(plot);
  });

  return active;
};

export const getPlantedSeed = (plot, seeds) => {
  //console.log(plot, seeds);
  try {
    const seedID = plot.properties ? plot.properties.SEEDID : 1;
    const seed = seeds.filter((seed) => seed.id == seedID)[0];
    if(seed.properties.WATER){

    }
    return seed;
  } catch (e) {
    return {
        properties: {
        WATER: "NA",
      },
    };
  }
};

export default activePlots;
