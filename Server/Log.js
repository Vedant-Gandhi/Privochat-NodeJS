function logData(TAG, data) {
  if (typeof data == "object") {
    console.log(`${TAG}:${JSON.stringify(data)}`);
  } else {
    console.log(`${TAG}:${data}`);
  }
}
function logError(TAG, data) {
  console.error(`${TAG}:${data}`);
}
module.exports = { logData, logError };
