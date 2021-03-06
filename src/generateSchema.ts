import extractProperties from "./extractProperties";
import initalizeNewFile from "./utilityFuncs/initializeNewFile";

export type GenerateSchema = {
  configPath: string;
  identifier: string;
  filePath: string;
  resolveCustomGenerics?: { [key: string]: (params: any) => any };
  extension: ".tsx" | ".ts";
};

export const generateSchema = ({
  configPath,
  filePath,
  identifier,
  resolveCustomGenerics,
  extension
}: GenerateSchema) => {
  const { idParent, imports, identifiers } = initalizeNewFile({
    configPath,
    filePath,
    identifier,
    extension
  });
  if (!idParent) return {};
  const properties = extractProperties({
    imports: imports,
    ids: identifiers,
    node: idParent,
    paths: {
      configPath,
      filePath,
      identifier,
    },
    props: {},
    resolveCustomGenerics: resolveCustomGenerics,
    extension
  });
  return properties;
};
