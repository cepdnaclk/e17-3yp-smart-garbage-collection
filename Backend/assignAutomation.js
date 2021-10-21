
// function to find the eligible collectors from criteria1 (tasks)
const criteriaTasks = (maxTasks, ...collectors) => {
    let length = collectors.length;
    let min_rounds = 0;
    let eligibleCollectorsFromCriteria1 = [];
    //let roundsAll = []; // to store rounds for each collector
    for (let i = 0; i < length; i++) {
        let rounds = Math.floor(collectors[i].tasks / maxTasks);
        //roundsAll.push(rounds);
        collectors[i].tasks = rounds;
        if (min_rounds > rounds) {
            min_rounds = rounds;
        }
    }

    for (let i = 0; i < length; i++) {

        if (collectors[i].tasks == min_rounds) {
            eligibleCollectorsFromCriteria1.push(collectors[i].id);
            console.log('hi')
        }
    }

    return eligibleCollectorsFromCriteria1;
}

module.exports = { criteriaTasks };