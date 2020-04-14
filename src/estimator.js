const covid19ImpactEstimator = (data) => {
  let myFactor;
  if (data.periodType === 'days') {
    myFactor = Math.trunc(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    myFactor = Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    myFactor = Math.trunc((data.timeToElapse * 30) / 3);
  }
  const impact = {
    currentlyInfected: data.reportedCases * 10
  };
  const severeImpact = {
    currentlyInfected: data.reportedCases * 50
  };
  const infect = impact.currentlyInfected * (2 ** myFactor);
  const sInfect = severeImpact.currentlyInfected * (2 ** myFactor);
  impact.infectionsByRequestedTime = infect;
  severeImpact.infectionsByRequestedTime = sInfect;
  const imSC = (15 / 100) * impact.infectionsByRequestedTime;
  const sSC = (15 / 100) * severeImpact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = imSC;
  severeImpact.severeCasesByRequestedTime = sSC;
  const impactBed = (35 / 100) * data.totalHospitalBeds;
  const iHbs = Math.trunc(impactBed - impact.severeCasesByRequestedTime);
  impact.hospitalBedsByRequestedTime = iHbs;
  const scrt = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(impactBed - scrt);
  const impactICU = (5 / 100) * impact.infectionsByRequestedTime;
  const severeICU = (5 / 100) * severeImpact.infectionsByRequestedTime;
  impact.casesForICUByRequestedTime = Math.trunc(impactICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeICU);
  const impactV = ((2 / 100) * impact.infectionsByRequestedTime);
  const severeV = ((2 / 100) * severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(impactV);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeV);
  const Pop = data.region.avgDailyIncomePopulation;
  const Inc = data.region.avgDailyIncomeInUSD;
  const period = data.timeToElapse;
  const imDol = Math.trunc((impact.infectionsByRequestedTime * Pop * Inc) / period);
  const sDol = Math.trunc((severeImpact.infectionsByRequestedTime * Pop * Inc) / period);
  impact.dollarsInFlight = imDol;
  severeImpact.dollarsInFlight = sDol;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
