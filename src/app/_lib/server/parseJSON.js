function ParseJSON(string) {
  // to remove \n
  let finalString = string.replace(/\\n/g, "");

  // to remove \
  finalString = finalString.replace(/\\/g, "");

  // to remove whitespace
  finalString = finalString.replace(/\s/g, "");

  return finalString;
}

export default ParseJSON;
