let _handler: (() => void) | null = null;

export function registerRestartHandler(fn: () => void) {
  _handler = fn;
}

export function triggerAppRestart() {
  _handler?.();
}
