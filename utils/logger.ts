const IS_DEV = __DEV__;

const formatMessage = (level: string, message: string, context?: string) => {
  const timestamp = new Date().toLocaleTimeString();
  const contextString = context ? `[${context}]` : "";
  return `${timestamp} [${level.toUpperCase()}]${contextString}: ${message}`;
};

/**
 * Logs an informational message. (Синий цвет в консоли)
 * @param message The message to log.
 * @param context Optional context (e.g., component or function name).
 */
export const logInfo = (message: string, context?: string) => {
  if (IS_DEV) {
    console.log(`\x1b[34m${formatMessage("info", message, context)}\x1b[0m`);
  }
};

/**
 * Logs a warning message. (Желтый цвет в консоли)
 * @param message The message to log.
 * @param context Optional context (e.g., component or function name).
 */
export const logWarn = (message: string, context?: string) => {
  if (IS_DEV) {
    console.warn(`\x1b[33m${formatMessage("warn", message, context)}\x1b[0m`);
  }
};

/**
 * Logs a debug message. Only visible in development. (Серый цвет)
 * @param message The message to log.
 * @param data Optional data to log.
 * @param context Optional context.
 */
export const logDebug = (message: string, data?: any, context?: string) => {
  if (IS_DEV) {
    console.debug(
      `\x1b[90m${formatMessage("debug", message, context)}\x1b[0m`,
      data ? JSON.stringify(data, null, 2) : ""
    );
  }
};

/**
 * Logs an error. (Красный цвет)
 * @param e The error object.
 * @param context Optional context where the error occurred.
 */
export function logError(e: unknown, context?: string) {
  const errorMessage = e instanceof Error ? e.message : String(e);
  console.error(`\x1b[31m${formatMessage("error", errorMessage, context)}\x1b[0m`);

  if (e instanceof Error && e.stack) {
    console.error(e.stack);
  }

  // console.trace(); // Можно раскомментировать для дополнительного стека вызовов
}
