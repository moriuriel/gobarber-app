import handlesbars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandleBarsTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTempalte = handlesbars.compile(template);

    return parseTempalte(variables);
  }
}

export default HandleBarsTemplateProvider;
