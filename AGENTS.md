## Dev environment tips

- Use `npx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
- Run `npm install --workspace=<project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- Use `npm create next-app@latest <project_name>` to spin up a new Next.js package.
- Check the name field inside each package's package.json to confirm the right name—skip the top-level one.

## Testing instructions

- Find the CI plan in the .github/workflows folder.
- Run `npm test --workspace=<project_name>` to run every check defined for that package.
- From the package root you can just call `npm test`. The commit should pass all tests before you merge.
- To focus on one step, add the Vitest pattern: `npx vitest run -t "<test name>"`.
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `npm run lint --workspace=<project_name>` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions

- Title format: [<project_name>] <Title>
- Always run `npm run lint` and `npm test` before committing

## Coding Principles

### Do's

- **Write Small, Focused Components:** Each component should have a single responsibility.
- **Use ShadCN UI Library to write Components:** Only use ShadCN UI Library and their components, only write your own components if shadcn don't has this component already built
- **Use TypeScript:** Define clear types for props, state, and API responses.
- **Embrace Immutability:** Treat state as immutable. Use methods that return new objects/arrays instead of mutating existing ones.
- **Keep It DRY (Don't Repeat Yourself):** Abstract repeated logic into reusable hooks or utility functions.
- **Write Tests:** Every new feature or bug fix should be accompanied by tests.
- **Do use the clsx:** library for all conditional class name logic. It improves readability and prevents errors.

### Don'ts

- **Avoid `any`:** Only use `any` as a last resort. Take the time to define proper types.
- **Always avoid hardcoded api keys:** Only use .env variables
- **Don't Mutate State Directly:** In React, this can lead to unpredictable behavior and bugs.
- **Avoid Prop Drilling:** For state that's needed in many components, use Context API or a state management library.
- **Don't Leave Commented-Out Code:** Remove it. Version control has the history if you need it.
- **Avoid Large Components:** If a component is getting too big, break it down into smaller ones.
- **Don't manually construct class names:** using template literals, ternaries, or Array.join().

## Project Structure: Feature Colocation

### The /features Directory

We use a feature-based folder structure to improve code organization and maintainability. The `/src/features` directory houses code that is specific to a particular feature or page, promoting better code colocation and modularity.

### Directory Structure

```
/src
├── /components          # Global, reusable components
├── /hooks              # Global, reusable hooks
├── /lib                # Utility functions and configurations
├── /types              # Global type definitions
└── /features           # Feature-specific code
    ├── /settings
    │   ├── /components # Components used only by settings
    │   ├── /hooks      # Hooks used only by settings
    │   └── /types      # Types used only by settings
    ├── /dashboard
    │   ├── /components
    │   ├── /hooks
    │   └── /utils
    └── /auth
        ├── /components
        ├── /hooks
        └── /services
```

### The Golden Rule

**A component, hook, or utility should be placed inside a specific feature's folder (e.g., `/features/settings/components`) if and only if it is used exclusively by that feature and is not shared with any other part of the application.**

### When to Use Feature Folders

✅ **DO place in `/features/[feature-name]/`:**

- Components that are only used within a specific feature
- Hooks that contain feature-specific business logic
- Utilities that are specific to one feature's requirements
- Types that are only relevant to one feature

**Examples:**

- `ProfileSettings` component → `/features/settings/components/`
- `useUserPreferences` hook → `/features/settings/hooks/`
- `SettingsCard` component → `/features/settings/components/`

### When to Use Global Folders

✅ **DO place in global `/components` or `/hooks`:**

- Components that are reusable across multiple features
- Hooks that provide shared functionality
- UI components from your design system
- Utilities used by multiple features

**Examples:**

- `Button`, `Card`, `Input` → `/components/ui/`
- `useAuth`, `useApi` → `/hooks/`
- `Sidebar`, `Header` → `/components/`

### Migration Strategy

When refactoring existing code:

1. **Identify the scope:** Is this component/hook used by only one feature?
2. **Move carefully:** Update all import paths when relocating files
3. **Test thoroughly:** Ensure all imports resolve correctly after moving
4. **Update consistently:** Follow the same pattern for related files

### Examples of Good Structure

```typescript
// ❌ Bad: Generic component in feature folder
/features/eginsstt /
  components /
  Button.tsx /
  // ✅ Good: Feature-specific component
  features /
  settings /
  components /
  ProfileSettings.tsx /
  // ❌ Bad: Shared hook in feature folder
  features /
  dashboard /
  hooks /
  useAuth.tsx /
  // ✅ Good: Feature-specific hook
  features /
  dashboard /
  hooks /
  useDashboardData.tsx;
```

## Patterns & Practices

### Good Patterns

- **Component Composition:** Build complex UIs by combining small, reusable components.
- **Custom Hooks:** Encapsulate and reuse stateful logic between components.
- **Controlled Components:** Let React state control form elements for predictable behavior.
- **Code Colocation:** Keep related files together (e.g., component, styles, and tests in the same folder).
- **Feature Isolation:** Keep feature-specific code within feature folders to improve maintainability.

### Bad Patterns to Avoid

- **God Components:** monolithic components that do too much. They are hard to test, reuse, and maintain.
- **Using Indexes as Keys:** When rendering lists, avoid using the array index as a `key`. This can lead to issues with state and performance.
- **Hardcoding Values:** Use constants or configuration files for values like API endpoints, keys, or magic numbers.
- **Misplaced Components:** Putting reusable components in feature folders or feature-specific components in global folders.


## Restricted Commands

- **NEVER run `npm run dev` or `npm run build`** - These commands are reserved for the user to execute manually
- **NEVER run long-running development servers** - These can interfere with the user's workflow  
- **NEVER run commands that start background processes** unless explicitly requested by the user
- Use alternative approaches like `npm run lint`, `npm test`, or file-based analysis instead