export function removeElement(elements, elementIdToRemove) {
  return elements.filter((element) => {
    if (element.type === 'personNode') return element.id !== elementIdToRemove;
    else return element.source !== elementIdToRemove && element.target !== elementIdToRemove;
  });
}
