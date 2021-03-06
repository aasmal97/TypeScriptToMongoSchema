import path from "path";
import { ExtractProps } from "../extractProperties";
export type GenerateFilePathProps = Pick<ExtractProps, "imports" | "paths" | 'extension'> & {
  name: string;
};
const generateNewFilePath = ({
  name,
  imports,
  paths,
  extension
}: GenerateFilePathProps) => {
  const importRelative = imports[name].substring(1, imports[name].length - 1);
  const newPathRelative = importRelative + extension;
  const parsedRelative = newPathRelative.split(path.posix.sep);
  let newFilePath = paths.filePath;
  for (let segment of parsedRelative) {
    let newSegment = segment;
    if (segment === ".") newSegment = "..";
    else if (segment === "..") newSegment = "../../";
    newFilePath = path.resolve(newFilePath, newSegment);
  }
  return newFilePath;
};
export default generateNewFilePath;
