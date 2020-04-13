const covid19ImpactEstimator = (data) => {
// Determin factors
let myFactor;
    if(data.periodType === 'days')
    {
     myFactor = Math.trunc(data.timeToElapse / 3);   
    }
    else if(data.periodType === 'weeks')
    {
        myFactor = Math.trunc((data.timeToElapse * 7)/3);
    }
    else if(data.periodType === 'months')
    {
        myFactor = Math.trunc((data.timeToElapse * 30)/3);
    }
let impact = {};
let severeImpact = {};
impact.currentlyInfected = data.reportedCases * 10;
severeImpact.currentlyInfected = data.reportedCases * 50;
impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, myFactor);
severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, myFactor);

  return {
    data: data,
    impact: impact,
    severeImpact: severeImpact
  };
};

//export default 
console.log(covid19ImpactEstimator({
    region : {
        name:"africa",
        avgAge: 17.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
}));

