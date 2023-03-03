import { Folder } from './../../folders/folder.schema';

export const buildBreadcrumbTree = (
  list: Folder[],
  folder: Folder,
): Folder[] => {
  if (folder?.folder_id) {
    return getParents(list, folder);
  }
  return [];
};

export const getParents = (list: Folder[], folder: Folder): Folder[] => {
  const result = [];

  const parent = list.find(
    (item) => item._id.toString() === folder.folder_id.toString(),
  );

  if (parent.folder_id) {
    result.push(parent);
    const parents = getParents(list, parent);
    return parents.concat(result);
  } else {
    return [...result, parent];
  }
};
