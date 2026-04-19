# Skill: Refactor

Improve code structure, readability, and maintainability without changing external behavior.

## When to Use

- Code has grown complex or hard to follow
- Functions are too long or doing too many things
- Repeated logic that could be extracted
- Naming is unclear or inconsistent
- Types are weak or missing

## Principles

1. **Preserve behavior** — refactoring must not change what the code does
2. **Small steps** — one concern at a time
3. **Name things clearly** — variables, functions, and types should reveal intent
4. **Reduce nesting** — early returns, guard clauses, flat structures
5. **Extract, don't duplicate** — shared logic belongs in a shared place

## Patterns

### Extract Function

Before:
```ts
function processApplication(app: Application) {
  // validate
  if (!app.title || app.title.length < 2) throw new Error('Invalid title');
  if (!app.company) throw new Error('Missing company');

  // transform
  const slug = app.title.toLowerCase().replace(/\s+/g, '-');
  return { ...app, slug };
}
```

After:
```ts
function validateApplication(app: Application): void {
  if (!app.title || app.title.length < 2) throw new Error('Invalid title');
  if (!app.company) throw new Error('Missing company');
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}

function processApplication(app: Application) {
  validateApplication(app);
  return { ...app, slug: slugify(app.title) };
}
```

### Replace Magic Values

Before:
```ts
if (status === 3) { ... }
```

After:
```ts
const APPLICATION_STATUS = {
  REJECTED: 3,
} as const;

if (status === APPLICATION_STATUS.REJECTED) { ... }
```

### Flatten Nested Conditionals

Before:
```ts
function getLabel(app: Application) {
  if (app) {
    if (app.status) {
      if (app.status === 'active') {
        return 'Active';
      }
    }
  }
  return 'Unknown';
}
```

After:
```ts
function getLabel(app: Application | null): string {
  if (!app?.status) return 'Unknown';
  if (app.status === 'active') return 'Active';
  return 'Unknown';
}
```

### Strengthen Types

Before:
```ts
function updateStatus(id: string, status: string) { ... }
```

After:
```ts
type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected';

function updateStatus(id: string, status: ApplicationStatus) { ... }
```

## Checklist

- [ ] Behavior is unchanged (tests pass or logic is verified)
- [ ] Functions have a single responsibility
- [ ] No magic numbers or strings
- [ ] Types are explicit and accurate
- [ ] Nesting depth is 3 or fewer levels
- [ ] No dead code left behind
- [ ] Names read like plain English

## Anti-Patterns to Avoid

- Refactoring and adding features at the same time
- Renaming things without updating all references
- Over-abstracting simple logic into unnecessary utilities
- Changing public API shape during a refactor
