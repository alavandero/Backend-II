// /src/utils/getNextNumber.js

export async function getNextNumber(model) {
  try {
    const lastDoc = await model.findOne().sort({ num: -1 });
    const lastNum = lastDoc && typeof lastDoc.num === 'number' && !isNaN(lastDoc.num) ? lastDoc.num : 0;
    return lastNum + 1;
  } catch (error) {
    console.error("Error getting next number:", error);
    return 1;
  }
} 