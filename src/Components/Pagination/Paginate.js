import _ from "lodash";
export function Paginate(items, pageNumber, pagSize) {
  const index = (pageNumber - 1) * pagSize;
  return _(items).slice(index).take(pagSize).value();
}