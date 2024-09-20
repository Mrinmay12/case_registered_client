function getDateDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

const filterCasesWithValidStringOrNA = (arr) => {

  const grouped = arr.reduce((acc, item) => {
    if (!acc[item.caseNumber]) {
      acc[item.caseNumber] = [];
    }
    acc[item.caseNumber].push(item);
    return acc;
  }, {});


  const result = [];
  for (const key in grouped) {
    const group = grouped[key];
    const hasValidAverage = group.some(item => typeof item.average === 'string' && item.average !== 'N/A');
    if (hasValidAverage) {

      result.push(...group.filter(item => item.average !== 'N/A'));
    } else {
      result.push(...group);
    }
  }
console.log(result,"result2");

  return result;
};

const addCountToCases = (arr) => {
  const countMap = arr.reduce((acc, item) => {
    acc[item.caseNumber] = (acc[item.caseNumber] || 0) + 1;
    return acc;
  }, {});

  const result = arr.map(item => ({
    ...item,
    count: countMap[item.caseNumber]
  }));
console.log(result,"2");

  filterCasesWithValidStringOrNA( result);
};
export function calculateCaseAverages(cases) { 
  console.log(cases,"mm2");
  
  const groupedCases = cases.reduce((acc, currentCase) => {
    if (!acc[currentCase.case]) {
      acc[currentCase.case] = [];
    }
    acc[currentCase.case].push(currentCase);
    return acc;
  }, {});

  const result = [];

  Object.keys(groupedCases).forEach(caseNumber => {
    const caseGroup = groupedCases[caseNumber];

    let totalDifference = 0;
    let validCasesCount = 0;
    let hasNACase = false;

    caseGroup.forEach(currentCase => {
      if (currentCase.end) {
        const difference = getDateDifference(currentCase.start, currentCase.end);
        totalDifference += difference;
        validCasesCount++;
      } else {
        hasNACase = true;
      }
    });

    if (validCasesCount > 0) {
      const averageDifference = Math.round(totalDifference / validCasesCount);
      result.push({ caseNumber, average: `${averageDifference.toFixed(2)}` });
    }

    if (hasNACase) {
      result.push({ caseNumber, average: 'N/A' });
    }
  });
return result.reduce((acc, current) => {
  const existing = acc.find(item => item.caseNumber === current.caseNumber);
  
  if (!existing) {
    acc.push(current);
  } else if (current.average !== 'N/A') {
    existing.average = current.average;
  }

  return acc;
}, [])

//  return addCountToCases(result);
}


export const Number_Registered_Case=(case_number,reports_data)=>{
let filter_data=Array.isArray(reports_data)&& reports_data.filter((item)=>item.case===case_number)
return filter_data.length

}
export const Number_Disposed_Case=(case_number,reports_data)=>{
let filter_data=Array.isArray(reports_data)&& reports_data.filter(item => item.case === case_number && item.end);
return filter_data.length

}



export const DateFormate=(date)=>{
  if(date){
    let day=date.slice(8,10)
    let year=date.slice(0,4)
    let month=date.slice(5,7)
    let full_date=  `${day}/${month}/${year}`
    return full_date
    
  }
}


export function getDateDifference2(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return String(diffDays);
}