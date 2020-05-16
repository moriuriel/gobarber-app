interface ITemplateVariables {
  [key: string]: string | Number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
