export function truncateText(text, maxLength = 120) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function isValidPost({ title, body, userId }) {
  return Boolean(title && body && Number.isInteger(userId) && userId > 0);
}