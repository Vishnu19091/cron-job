const MAX_LEN = 30000;

export function serializeResponseBody(body) {
  if (body === null || body === undefined) {
    return null;
  }

  let serialized;

  if (typeof body === "string") {
    serialized = body;
  } else {
    try {
      serialized = JSON.stringify(body);
    } catch {
      serialized = "[UNSERIALIZABLE_RESPONSE]";
    }
  }

  if (serialized.length > MAX_LEN) {
    return serialized.slice(0, MAX_LEN) + "...[TRUNCATED]";
  }

  return serialized;
}
