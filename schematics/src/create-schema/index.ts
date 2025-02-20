import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  applyTemplates,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';

export function createSchema(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(path.join('src', 'common', 'schemas')),
    ]);

    return mergeWith(templateSource);
  };
}
