
// function to find the eligible collectors from criteria1 (tasks)
const criteriaTasks = (...collectors) => {

    let length = collectors.length;
    let min_rounds = 0;
    let eligibleCollectorsFromCriteria1 = [];

    // find the minimum rounds
    for (let i = 0; i < length; i++) {
        if (min_rounds > collectors[i].rounds) {
            min_rounds = collectors[i].rounds;
        }
    }

    // find collectors with minimum rounds
    for (let i = 0; i < length; i++) {

        if (collectors[i].rounds == min_rounds) {
            eligibleCollectorsFromCriteria1.push(collectors[i].id);
        }
    }

    return eligibleCollectorsFromCriteria1;
}

// function to find the eligible collectors from criteria2 (distance)
const criteriaDistance = (...collectors) => {

    let length = collectors.length;
    let eligibleCollectorsFromCriteria2 = [];
    let min_distance = collectors[1].distance;

    // find the minimum distance
    for (let i = 0; i < length; i++) {
        if (min_distance > collectors[i].distance) {
            min_distance = collectors[i].distance;
        }
    }

    // find collectors with minimum distance
    for (let i = 0; i < length; i++) {

        if (collectors[i].distance == min_distance) {
            eligibleCollectorsFromCriteria2.push(collectors[i].id);
        }
    }

    return eligibleCollectorsFromCriteria2;
}

module.exports = { criteriaTasks, criteriaDistance };