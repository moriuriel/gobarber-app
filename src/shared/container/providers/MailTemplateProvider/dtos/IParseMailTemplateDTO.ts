interface ITemplateVariables {
  [key: string]: string | Number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
