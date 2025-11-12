# UI Components Library

A collection of reusable, well-documented React components designed for building modern dashboards and web applications. All components are built with Tailwind CSS and support extensive customization.

## Components Overview

### 1. Badge Component (`Badge.jsx`)

A flexible badge component for displaying labels, status indicators, or tags.

**Variants:**
- `default` - Gray background (neutral)
- `completed` - Green background (success)
- `running` - Blue background (in-progress)
- `pending` - Yellow background (warning)
- `failed` - Red background (error)
- `action` - Light blue background (actionable)

**Usage:**
```jsx
import Badge from './Badge'

// Basic usage
<Badge>New</Badge>

// With variant
<Badge variant="completed">✓ Completed</Badge>
<Badge variant="pending">⏳ Pending</Badge>
<Badge variant="failed">✗ Failed</Badge>

// With custom styling
<Badge variant="running" className="text-lg">In Progress</Badge>
```

**Props:**
- `children` (React.ReactNode) - The content to display
- `variant` (string) - Style variant (see above)
- `className` (string) - Additional CSS classes

---

### 2. Button Component (`Button.jsx`)

A versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Blue background (main actions)
- `secondary` - Gray background (secondary actions)
- `outline` - Bordered style (tertiary actions)
- `danger` - Red background (destructive actions)
- `success` - Green background (positive actions)

**Sizes:**
- `sm` - Small (text-xs, px-3 py-1)
- `md` - Medium (text-sm, px-4 py-2) [default]
- `lg` - Large (text-base, px-6 py-3)
- `full` - Full width (w-full)

**Usage:**
```jsx
import Button from './Button'
import { FaDownload } from 'react-icons/fa'

// Basic button
<Button>Click Me</Button>

// With variant and size
<Button variant="primary" size="lg">Large Primary Button</Button>
<Button variant="secondary" size="sm">Small Secondary</Button>

// With icon
<Button>
  <FaDownload /> Download File
</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>Delete</Button>

// Full width button
<Button size="full" variant="success">Submit Form</Button>
```

**Props:**
- `children` (React.ReactNode) - The content to display
- `variant` (string) - Style variant (see above)
- `size` (string) - Button size (see above)
- `className` (string) - Additional CSS classes
- `...props` - All standard HTML button attributes (onClick, disabled, type, etc.)

---

### 3. Card Component (`Card.jsx`)

A container component for grouping content with consistent styling.

**Variants:**
- `default` - White background with border and subtle shadow
- `light` - Light blue background (for highlighting)
- `elevated` - White background with stronger shadow

**Usage:**
```jsx
import Card from './Card'

// Basic card
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>

// With light variant
<Card variant="light">
  <div className="space-y-4">
    <p>This card has a light blue background</p>
    <Button variant="primary">Action</Button>
  </div>
</Card>

// Elevated card
<Card variant="elevated" className="p-6">
  <h3>Important Information</h3>
  <p>This card stands out with stronger shadow</p>
</Card>
```

**Props:**
- `children` (React.ReactNode) - The content to display
- `variant` (string) - Style variant (see above)
- `className` (string) - Additional CSS classes

---

### 4. Input Component (`Input.jsx`)

A controlled text input field with optional label and error handling.

**Usage:**
```jsx
import { useState } from 'react'
import Input from './Input'

function MyForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('') // Clear error on change
  }

  return (
    <>
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="user@example.com"
        error={error}
      />
      {/* Input styling changes to red when error is provided */}
    </>
  )
}
```

**Props:**
- `label` (string) - Optional label text
- `error` (string) - Error message (when provided, input shows error styling)
- `...props` - All standard HTML input attributes (type, placeholder, value, onChange, disabled, etc.)

---

### 5. Select Component (`Select.jsx`)

A dropdown select field with optional label and error handling.

**Usage:**
```jsx
import { useState } from 'react'
import Select from './Select'

function FilterForm() {
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  return (
    <Select
      label="Select a Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      error={error}
    >
      <option value="">Choose a category</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
    </Select>
  )
}
```

**Props:**
- `label` (string) - Optional label text
- `error` (string) - Error message (when provided, select shows error styling)
- `children` (React.ReactNode) - Option elements
- `...props` - All standard HTML select attributes (value, onChange, disabled, multiple, etc.)

---

### 6. Table Component (`Table.jsx`)

A flexible, responsive table component for displaying tabular data.

**Usage:**
```jsx
import Table from './Table'
import Badge from './Badge'
import Button from './Button'

function DataTable() {
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { 
      key: 'status', 
      title: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'completed' : 'pending'}>
          {row.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <Button size="sm" onClick={() => handleEdit(row)}>
          Edit
        </Button>
      )
    }
  ]

  const data = [
    { name: 'John Doe', email: 'john@example.com', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
  ]

  return <Table columns={columns} data={data} />
}
```

**Props:**
- `columns` (Array) - Array of column definitions
  - `key` - Unique identifier for the column
  - `title` - Display title for the header
  - `render` - (Optional) Custom render function `(row) => JSX`
- `data` (Array) - Array of row data objects

---

### 7. Toast Component (`Toast.jsx`)

A notification component that displays temporary messages to the user.

**Usage:**
```jsx
import { useState } from 'react'
import Toast from './Toast'
import Button from './Button'

function Page() {
  const [toast, setToast] = useState({ open: false, message: '' })

  const showNotification = () => {
    setToast({ open: true, message: 'Success! Your changes have been saved.' })
  }

  return (
    <>
      <Button onClick={showNotification}>Save Changes</Button>
      
      <Toast
        open={toast.open}
        message={toast.message}
        onClose={() => setToast({ open: false, message: '' })}
        duration={3000} // Close after 3 seconds
      />
    </>
  )
}
```

**Props:**
- `open` (boolean) - Controls visibility
- `message` (string) - The notification text
- `onClose` (Function) - Callback when toast closes
- `duration` (number) - Time in milliseconds before auto-close (default: 1800ms)

---

## Layout Components

In addition to UI components, the project includes reusable layout components:

### Sidebar (`src/components/layout/Sidebar.jsx`)
Main navigation sidebar with collapsible menu. Uses React Icons for navigation icons.

### Topbar (`src/components/layout/Topbar.jsx`)
Header bar with menu toggle button.

### DashboardLayout (`src/components/layout/DashboardLayout.jsx`)
Main layout wrapper combining sidebar and topbar.

### PageWrapper (`src/components/layout/PageWrapper.jsx`)
Wrapper for consistent page styling.

---

## Design System

All components follow a consistent design system:

**Color Palette:**
- Primary: Blue (`bg-blue-600`, `text-blue-600`)
- Success: Green (`bg-green-500`, `text-green-700`)
- Warning: Yellow (`bg-yellow-100`, `text-yellow-700`)
- Danger: Red (`bg-red-500`, `text-red-700`)
- Neutral: Gray (`bg-gray-*`, `text-gray-*`)

**Spacing:**
- Uses Tailwind CSS spacing scale (px-3, py-2, etc.)
- Consistent padding and margins throughout

**Typography:**
- Base font size: 1rem (16px)
- Responsive text sizes with Tailwind classes

**Rounded Corners:**
- Buttons and inputs: `rounded-lg`
- Cards and badges: `rounded-lg` or `rounded-full`

---

## Styling & Customization

All components accept a `className` prop for additional styling:

```jsx
<Button 
  className="my-custom-class"
>
  Custom Button
</Button>

<Card className="p-8 mb-4">
  Content
</Card>
```

You can also override Tailwind styles:
```jsx
<Button className="bg-purple-600! hover:bg-purple-700!">
  Purple Button
</Button>
```

---

## React Icons Integration

The project uses [react-icons](https://react-icons.github.io/react-icons/) for all icon needs. Common icon libraries included:

- **FontAwesome** (`react-icons/fa`) - Most comprehensive icon library
- **Heroicons** (`react-icons/hi`) - Clean, modern icons

**Examples:**
```jsx
import { FaChartBar, FaPlus, FaEnvelope } from 'react-icons/fa'
import { HiChevronRight } from 'react-icons/hi'

<Button>
  <FaPlus /> Add New
</Button>

<span className="text-xl"><FaChartBar /></span>
```

---

## Usage in New Projects

To use these components in a new dashboard project:

1. **Copy the components folder** to your new project
2. **Ensure Tailwind CSS is configured** in your project
3. **Install react-icons**: `npm install react-icons`
4. **Import and use components**:

```jsx
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import Table from './components/ui/Table'

function NewDashboard() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <h1 className="text-2xl font-bold">Welcome</h1>
        <Button variant="primary">Get Started</Button>
      </Card>
    </div>
  )
}
```

---

## Best Practices

1. **Use semantic variants** - Choose the appropriate variant for the context
2. **Keep components focused** - Each component has a single responsibility
3. **Leverage composition** - Combine components to create complex UI
4. **Maintain consistency** - Use the same component styles throughout your app
5. **Extend thoughtfully** - Add new variants as needed, but keep the API clean
6. **Test accessibility** - Ensure components work with keyboard navigation and screen readers

---

## Contributing

When adding new components or variants:

1. Add comprehensive JSDoc comments
2. Include usage examples
3. Support all relevant HTML attributes via `...props`
4. Use Tailwind CSS classes for styling
5. Follow the existing component structure and naming conventions
6. Update this README with documentation

---

## Component Checklist

- [x] Badge - Status and tag display
- [x] Button - Interactive actions
- [x] Card - Content containers
- [x] Input - Text field with validation
- [x] Select - Dropdown selection
- [x] Table - Tabular data display
- [x] Toast - Temporary notifications

All components are production-ready and tested for reusability across projects.
