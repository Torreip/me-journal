# The Project's Bible

## Coding format

### You should put ONE single return after
```ts
// Multiples or Single imports
import "./globals.css"
import { example } from "example.ts"

// Multiples or Single variable declaration
const first: string = "first"
const second: string = "second"

// A Single type declaration
type = {
    name: string,
    age: number
}

// A Single enum
enum Connection {
    Connected,
    Guest
}

```

### You should put TWO returns after
```ts
// A Single class declaration
class Example {
    //...
}


// A Single component declaration
function Component({}) {
    //...
}


```

### Declaration Order

1. Imports
2. Constantes
3. Variables
4. Class | Component | Function 

### Global rules

- Variables must be in `lowerCamelCase`.
- However, classes and components should be in `PascalCase`.
- Use `const` by default, then `let` if needed, but never `var`.
- Avoid using synonyms like `button` and `btn` (choose one and stick to it!).
- Use English only for naming.
- Only one Class | Component | Function per file
- Utilisation de `ES6` (async/await, import, ...)

Ressources about [CamelCase](https://en.wikipedia.org/wiki/Camel_case) in general

## Commits rules

All commits should be named accodenly to the following format :

```
{type}: {title} {finished?}

{description}
```

Differents possible `types`

- `feat`: when adding a feature
- `fix`: bug fix
- `test`: testing
- `docs`: documentation
- `chore`: code maintenance
- `ci`: continuous integration
- `style`: code formatting (whitespace, removing semicolons)
- `perf`: performance improvement
- `revert`: reverts a commit

The commit `title` should be the same as the task in Trello. If what you are doing is not a Trello task, you should create one. If it is urgent, create it after pushing these changes.

The commit `description` should be an enumeration (- ... - ...) of the changes you've made or the things you've added. Every feature should be detailed as much as possible, and the enumeration must be exhaustive.

The `finished?` determines if you need to make further changes to complete this feature (e.g., if you need to stop but still want to save your work). The value should be either `(WIP)` or `(Finished)` (~~almost~~, ~~not at all~~, ~~maybe~~).

## Branches
- Every task should have its own branch.

- Every branch is administered by one person (but others can help).

- When merging features, you should create a **new branch** and test the merge on that branch (the git master should do this).

- After validation, the git master can merge this new branch to the **main** (unit testing + app testing).


## Source Tree


### Files organisation
```

root
├── docs/
│   ├── BIBLE.md
│   └── {doc}.md
│ 
├── src/
│   ├── classes/
│   │   ├── {class}.ts
│   │   └── __test__
│   │       └── {class}.test.ts
│   │
│   ├── widgets/
│   │   └── {widget}.tsx
│   │
│   ├── components/
│   │   └── {commponent}.tsx
│   │ 
│   ├── style/
│   │   └── globals.css
│   │ 
│   ├── utils/
│   │   ├── {util}.ts
│   │   └── __test__
│   │       └── {util}.test.ts
│   │ 
│   ├── enums/
│   │   └── {enum}.ts
│   │
│   ├── types/
│   │   └── {type}.ts
│   │
│   ├── apis/
│   │   └── {api}.ts
│   │
│   │ 
│   └── app/
│       ├── fonts/
│       ├── global.css
│       ├── favicon.ico
│       └── ... (follow next.js app router)
│ 
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json

```
### Rules

- Files/Folders must be named in `lowerCamelCase`
- Like Files and Folders, variables must be in `lowerCamelCase`
- However Classes and Components should be in `PascalCase`

Ressources about [CamelCase](https://en.wikipedia.org/wiki/Camel_case) in general

### Definitions

- `docs`: where whe should put all our documentation (.md)
- `classes`: where we put all the project's classes
- `utils`: simple pure function
- `components`: for generic components or to split more complexe ones.
- `widgets`: widget components (header/footer/menu/...)
- `style/global.css`: the only css file we should use for the project (tailwind loaders and some execptions)
- `enums`: typescript enums of the project
- `types`: typescript types of the project
- `apis`: apis of the project
- `app`: [Next.js app router](https://nextjs.org/docs/app)
- `.next-env.d.ts`: [typescript in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- `next.config.mjs`: [Next.js config](https://nextjs.org/docs/app/api-reference/next-config-js)
- `tsconfig.json`: [Typescript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- `tailwind.config.ts`: [Tailwindcss config](https://tailwindcss.com/docs/configuration#using-a-different-file-name)
- `postcss.config.mjs`: [Postcss config for tailwindcss](https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor)
- `package.json`: the node package.json (scripts/depdencies/dev-dep)
- `pnpm-lock.yaml`: the version manifest for pnpm (don't touch this)
- `README.md`: the README file of the project