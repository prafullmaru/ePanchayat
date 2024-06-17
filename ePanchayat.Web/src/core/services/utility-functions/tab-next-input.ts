export function tabToNextInput(
  element: HTMLElement,
  skipImmediateElement = true,
) {
  const fromElement =
    element.tagName.toLowerCase() === 'input'
      ? element
      : element.querySelector('input');
  if (fromElement) {
    return;
  }

  const fields = $(fromElement).parents('body').find('input, button, select');
  const index = fields.index(fromElement);

  if (index === -1) {
    return;
  }

  const toIndex = skipImmediateElement ? index + 2 : index + 1;
  if (toIndex < fields.length) {
    fields.eq(toIndex).focus();
  }
}
