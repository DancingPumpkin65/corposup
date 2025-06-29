# REACT'S LAYOUTS

## Directory Layouts
Each component folder holds everything it needs:

### Structure example
```text
  components/
    └── FilterSlider/
        ├── FilterSlider.jsx      ← the component’s code
        ├── FilterSlider.scss     ← only the styles for this component
        └── __tests__/FilterSlider-test.js  ← its tests
```

### Why
  - Self-contained
  - Easy to Share
  - Scalable
  - Maintanable

---

## Components Importing
Inside `components/FilterSlider/`, add a tiny file named `index.js`:

```javascript
  // components/FilterSlider/index.js
  export { default } from './FilterSlider';
```

 - BEFORE:

```javascript
  import FilterSlider from 'components/FilterSlider/FilterSlider'
```

 - AFTER: using `index.js` re-export

```javascript
  import FilterSlider from 'components/FilterSlider'
```

### Structure example
```text
  components/
  └── FilterSlider/
      ├── __tests__/FilterSlider-test.js
      ├── FilterSlider.jsx
      ├── FilterSlider.scss
      └── index.js
```

---

## Custom Hooks (DRY METHOD)
When a component does “too many things” (talks to APIs, handles auth, decides what to render, manages its own styling, etc.), it gets hard to read, hard to test, and hard to reuse.
Instead, we aim for each piece of our UI to have one clear job:
 * Presentation: “Here’s how things look.”
 * Behavior/Logic: “Here’s how things work.”
By separating those, your components become small, predictable, and composable.

> **Custom Hook** = a JavaScript function prefixed with `use` that can call other hooks (`useState`, `useEffect`, etc.) and package up logic you want to reuse across components.

### Authentification example
 - **Hook**
```javascript
  import { useEffect } from 'react';
  import { useAuth }   from './use-auth-from-context-or-state-management.js';
  import { useHistory } from 'react-router-dom';

  function useRequireAuth(redirectUrl = "/signup") {
    const auth    = useAuth();
    const history = useHistory();

    useEffect(() => {
      // if there is no logged-in user, redirect
      if (auth.user === false) {
        history.push(redirectUrl);
      }
    }, [auth, history, redirectUrl]);

    return auth;  // let the caller still access auth.user, auth.token, etc.
  }
```

 - **Usage**
 ```javascript
  function Dashboard() {
    const auth = useRequireAuth("/login");
    //—if not logged in, user is already redirected away

    return (
      <div>
        <h1>Welcome back, {auth.user.name}!</h1>
        {/* … */}
      </div>
    );
  }
```

