// 空文字判定
export function isEmpty(value) {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (typeof value === 'number' && isNaN(value)) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
}

// 配列判定
export function isTypeArray(value) {
  return Array.isArray(value);
}
