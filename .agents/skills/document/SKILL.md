# Document Skill

Generates clear, structured documentation for code, APIs, and components.

## Purpose

The `document` skill analyzes existing code and produces high-quality documentation including JSDoc comments, README sections, API references, and inline explanations.

## Usage

```
skill: document
target: <file or component>
style: <jsdoc|markdown|inline>
```

## Behaviors

### JSDoc Generation
- Infers parameter types from TypeScript signatures
- Documents return values and thrown errors
- Adds `@example` blocks where usage is non-obvious
- Preserves existing documentation, only filling gaps

### Markdown Output
- Produces README-compatible sections
- Includes usage examples with realistic data
- Documents props/options tables for components
- Links related functions and modules

### Inline Comments
- Explains *why*, not just *what*
- Flags complex logic with plain-language summaries
- Avoids redundant comments (e.g., `// increment i` above `i++`)

## Rules

1. **Never hallucinate behavior** — only document what the code actually does.
2. **Match project tone** — formal for libraries, conversational for internal tools.
3. **Keep it concise** — prefer one clear sentence over three vague ones.
4. **Update on change** — if code is modified, regenerate affected docs.

## Examples

### Input
```typescript
export function paginate<T>(items: T[], page: number, size: number): T[] {
  return items.slice((page - 1) * size, page * size);
}
```

### Output (JSDoc)
```typescript
/**
 * Returns a single page of items from an array.
 *
 * @param items - The full list of items to paginate.
 * @param page  - The 1-based page number to retrieve.
 * @param size  - The number of items per page.
 * @returns     A slice of `items` corresponding to the requested page.
 *
 * @example
 * paginate(['a', 'b', 'c', 'd'], 2, 2); // ['c', 'd']
 */
export function paginate<T>(items: T[], page: number, size: number): T[] {
  return items.slice((page - 1) * size, page * size);
}
```

## Integration Notes

- Works well after `audit` to fill documentation gaps flagged in reports.
- Combine with `clarify` when the intent of a function is ambiguous before documenting.
- Use `bolder` after `document` to strengthen weak or hedging descriptions.

## Limitations

- Cannot document runtime behavior that depends on external state.
- Does not generate end-to-end usage guides — use `clarify` for narrative docs.
