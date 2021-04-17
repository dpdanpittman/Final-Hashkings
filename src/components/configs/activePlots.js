const activePlots = plots => {
    let active = [];

    plots.forEach(plot => {
        if ((plot.properties) && (plot.properties.OCCUPIED)) active.push(plot);
    });

    return active;
};

export const getPlantedSeed = (plot, seeds) => {
    const seedID = plot.properties ? plot.properties.SEEDID : 1;
    const seed = seeds.filter(seed => seed.id == seedID)[0];

    return seed;
};


export default activePlots;