const REDACTED = "[REDACTED]";
const SECRET_KEYS = new Set([
  "api_key",
  "apikey",
  "secret",
  "token",
  "authorization",
]);

function shouldRedactKey(key: string): boolean {
  return SECRET_KEYS.has(key.toLowerCase());
}

export function redactSecrets(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => redactSecrets(item));
  }

  if (typeof value !== "object" || value === null) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      shouldRedactKey(key) ? REDACTED : redactSecrets(child),
    ]),
  );
}
