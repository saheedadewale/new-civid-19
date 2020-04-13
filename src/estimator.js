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
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(impactBed - severeImpact.severeCasesByRequestedTime)
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
