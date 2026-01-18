function ParseJSON(input) {
  if (typeof input === "string") {
    try {
      let normalized = input.trim();

      // 1. Replace single quotes with double quotes
      normalized = normalized.replace(/'/g, '"');

      // 2. Quote unquoted keys
      normalized = normalized.replace(
        /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
        '$1"$2":'
      );

      // 3. Remove trailing commas
      normalized = normalized.replace(/,(\s*[}\]])/g, "$1");

      // Validate JSON
      const parsed = JSON.parse(normalized);

      // Return clean JSON string
      return JSON.stringify(parsed);
    } catch {
      throw new Error("Unable to normalize input to valid JSON");
    }
  }

  throw new Error("Input must be an object or string");
}

export default ParseJSON;
