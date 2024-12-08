const refinePath = (basePath: string) => {
  const isRootPath = basePath === "/";
  const comparePath = (
    isRootPath ? basePath : basePath.split("/")[1]
  ).toLowerCase();

  return comparePath;
};

export const getIsSidebarItemCurrentPath = (
  currentPath: string,
  itemPath: string,
) => {
  const refinedCurrentPath = refinePath(currentPath);
  const refinedItemPath = refinePath(itemPath);

  return refinedCurrentPath === refinedItemPath;
};
