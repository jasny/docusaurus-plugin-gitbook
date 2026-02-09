# Task 2.3: Stepper Block

Steppers display sequential, numbered steps for tutorials or guides.

## Syntax

```markdown
{% stepper %}
{% step %}
## Step 1: Install dependencies

Run `npm install` to install all required packages.
{% endstep %}

{% step %}
## Step 2: Configure settings

Edit the config file with your preferences.
{% endstep %}
{% endstepper %}
```

## Attributes

- `stepper`: No attributes
- `step`: No attributes (step number is derived from order)

## Component Structure

```typescript
interface StepperProps {
  children: React.ReactNode; // Step components
}

interface StepProps {
  stepNumber: number; // Injected during transform
  children: React.ReactNode;
}
```

## Rendering

- Vertical layout with numbered circles/badges
- Connecting line between steps
- Step content indented from the number
- Each step's content rendered as markdown

## Files to Create

- `src/remark/transformers/stepper.ts`
- `src/theme/GitBookStepper/index.tsx`
- `src/theme/GitBookStep/index.tsx`
- `src/theme/GitBookStepper/styles.module.css`

## Test Cases

- Two steps
- Multiple steps (5+)
- Steps with complex content (code, images, lists)
- Steps with nested blocks
