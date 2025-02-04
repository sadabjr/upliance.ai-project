# Project Name: User Data Dashboard

## Overview

This project is a user data dashboard that includes authentication, a counter, a rich text editor, a user form, and a bar chart. The app allows users to log in, update their information, and see their data persist across sessions.

## Components

### AuthPage

- A simple page that contains a SignInButton from Clerk for user authentication.
- The sign-in button is rendered in a centered position within a flex container.
- Handles user authentication using Clerk's built-in features.

### Dashboard

- The main page displayed after successful authentication.
- Contains the following components:
  - **Counter**: Displays a counter with increment and reset functionality.
  - **RichTextEditor**: A rich text editor that shows and allows editing of user data (name, email, phone, address).
  - **UserForm**: A form where users can input their personal details such as name, email, phone, and address.
  - **BarChart**: Displays trends in user activity, such as the counter value over time.

### Counter

- A presentational component that shows the counter value and provides buttons to increase, decrease, or reset the counter.
- Takes `count` and `setCount` as props to manage and update the counter state.

### RichTextEditor

- A component that integrates with ReactQuill to display and edit user information in a rich text format.
- Manages content with `useState` and updates when `userData` changes through `useEffect`.

### UserForm

- A form component that captures user details such as name, email, phone, and address.
- Uses local state (`formData`) to manage form inputs.
- Provides basic form validation to ensure all fields are completed before submission.
- Lifts state up to the `Dashboard` component by calling `setUserData` prop to update the parent state.

## State Management

### useState

- **userData (Dashboard, UserForm)**: Stores user information such as name, email, phone, and address. This data is updated through `setUserData` in the parent component (`Dashboard`).
- **count (Dashboard, Counter)**: Manages the state of the counter, updating when the user interacts with the counter buttons.
- **formData (UserForm)**: Manages the form input data and ensures user updates are stored and validated.
- **isDirty (UserForm)**: Tracks unsaved changes in the form to prevent accidental navigation away from the form without saving.
- **error (UserForm)**: Stores validation error messages to be displayed if the form is incomplete.

### useEffect

- In `Dashboard`: Fetches `userData` from localStorage when the component mounts and updates the state accordingly.
- In `UserForm`: Listens for changes to the `isDirty` state and shows a browser warning if the user tries to leave the page without saving their form data.

### State Lifting

- `UserForm` lifts its state to `Dashboard` via the `setUserData` function. This ensures that any updates made in the form are passed back to the parent.
- `Dashboard` passes both `userData` and `setUserData` as props to `UserForm` to enable state synchronization between the two components.

### Local Storage

- `Dashboard` reads user data from `localStorage` on mount to ensure data persistence between sessions.
- `UserForm` writes the updated data back to `localStorage` when the form is successfully submitted.

## Considerations

### State Management Choices

- Local state (`useState`) is used throughout to manage data within components, making it suitable for this simple app structure.
- Parent-child state passing ensures user data is shared across components and updated in real-time.

### Component Reusability

- Components like `Counter`, `UserForm`, and `RichTextEditor` are modular and can be reused in different contexts or with different props as needed.

### Error Handling

- `UserForm` ensures all required fields are filled before submission and provides error messages if validation fails.

### Persistence

- The use of `localStorage` ensures that user data persists between sessions, even after a page reload or if the user leaves and returns later.

---

