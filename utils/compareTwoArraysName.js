function compareTwoArraysName(arr1, arr2) {
  const compareResult = [...arr1, ...arr2];

  for (let i = 0; arr1.length > i; i++) {
    arr2.forEach((element) => {
      if (element.name !== arr1[i].name && !compareResult.includes(element)) {
        compareResult.push(element);
        console.log(element.name, arr1[i].name);
      }
    });
  }

  return compareResult;
}

module.exports = compareTwoArraysName;
