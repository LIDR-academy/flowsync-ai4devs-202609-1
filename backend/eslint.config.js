import { configApp } from '@adonisjs/eslint-config'

export default [
  ...configApp(),
  {
    // Generado por "node ace migration:run". Igual que en .prettierignore:
    // la regla prettier/prettier lo marcaría después de cada migración.
    ignores: ['database/schema.ts'],
  },
]
