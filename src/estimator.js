const covid19ImpactEstimator = (data) => {
  let myFactor;
  if (data.periodType === 'days') {
    myFactor = Math.trunc(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    myFactor = Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    myFactor = Math.trunc((data.timeToElapse * 30) / 3);
  }

  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** myFactor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** myFactor);
  impact.severeCasesByRequestedTime = (15 / 100) * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = (15 / 100) * severeImpact.infectionsByRequestedTime;
  const impactBed = (35 / 100) * data.totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = Math.trunc(impactBed - impact.severeCasesByRequestedTime);
  const scrt = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(impactBed - scrt);
  const impactICU = (0.05 * impact.infectionsByRequestedTime);
  const severeICU = (0.05 * severeImpact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime = Math.trunc(impactICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeICU);
  const impactV = (0.02 * impact.infectionsByRequestedTime);
  const severeV = (0.02 * severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impactV);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeV);
  const impactD = impact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation;
  const severeD = severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomePopulation;
  const iInc = data.region.avgDailyIncomeInUSD * data.timeToElapse;
  const sInc = data.region.avgDailyIncomeInUSD * data.timeToElapse;
  impact.dollarsInFlight = Math.trunc(impactD * iInc);
  severeImpact.dollarsInFlight = Math.trunc(severeD * sInc);
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
