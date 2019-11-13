module.exports = function(schema, options) {
  schema.pre(["save", "updateOne"], function(next) {
    for (const moduleKey in this._doc)
      if (moduleKey != "_id") {
        const moduleApps = this._doc[moduleKey];
        for (const appKey in moduleApps) {
          const appObj = moduleApps[appKey];
          if (appObj.numberingSystem == "auto") {
            if (appObj.numberingType == "connected") {
              delete appObj.fiscalYears;
              delete appObj.fiscalYearsWithAccountingPeriods;
            } else if (appObj.numberingType == "fiscalYear") {
              delete appObj.fiscalYearsWithAccountingPeriods;
              delete appObj.deletedFromTheMiddle;
            } else if (appObj.numberingType == "accountingPeriod") {
              delete appObj.fiscalYears;
              delete appObj.deletedFromTheMiddle;
            }
          } else if (appObj.numberingSystem == "manual") {
            delete appObj.fiscalYears;
            delete appObj.fiscalYearsWithAccountingPeriods;
            delete appObj.deletedFromTheMiddle;
          }
        }
      }

    next();
  });
};
