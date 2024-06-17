import copy from 'copy-to-clipboard';

export function copyToClipboard(text: string) {
  return copy(text);
}
