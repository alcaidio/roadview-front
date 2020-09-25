export const debounce = (callback: any, interval: number) => {
  let debounceTimeoutId;
  // tslint:disable-next-line: space-before-function-paren
  return function (...args) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval);
  };
};

export const throttle = (callback: any, interval: number) => {
  let enableCall = true;
  // tslint:disable-next-line: space-before-function-paren
  return function (...args) {
    if (!enableCall) {
      return;
    }
    enableCall = false;
    callback.apply(this, args);
    setTimeout(() => (enableCall = true), interval);
  };
};
