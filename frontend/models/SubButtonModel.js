export default function createSubButton(id, prevId, subButtonText, icon) {
  return {
    id: id,
    prevId: prevId,
    subButtonText: subButtonText,
    icon: icon,
  };
}