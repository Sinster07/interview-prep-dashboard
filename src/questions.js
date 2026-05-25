const QUESTIONS = [
        {
          id: "js-closure",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "What is a closure in JavaScript?",
          answer:
            "A closure is created when a function remembers variables from its lexical scope even after the outer function has finished running. It is commonly used for private state, callbacks, function factories, and debouncing.",
          code: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
counter(); // 1
counter(); // 2`
        },
        {
          id: "js-hoisting",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "Explain hoisting with var, let, const, and functions.",
          answer:
            "Hoisting means declarations are processed before code execution. var is hoisted and initialized as undefined. let and const are hoisted but stay in the temporal dead zone until their declaration runs. Function declarations are fully hoisted.",
          code: `console.log(a); // undefined
var a = 10;

// console.log(b); // ReferenceError
let b = 20;

sayHi(); // works
function sayHi() {
  console.log("Hi");
}`
        },
        {
          id: "js-var-let-const",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "What is the difference between var, let, and const?",
          answer:
            "var is function scoped and can be redeclared. let and const are block scoped. let can be reassigned, while const cannot be reassigned. const objects can still have their properties mutated."
        },
        {
          id: "js-event-loop",
          track: "JavaScript",
          category: "Async JS",
          difficulty: "Medium",
          question: "What is the event loop?",
          answer:
            "The event loop coordinates the call stack, web APIs, task queue, and microtask queue. Synchronous code runs first. Promise microtasks run before timer callbacks and other macrotasks once the call stack is empty.",
          code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// A, D, C, B`
        },
        {
          id: "js-promise",
          track: "JavaScript",
          category: "Async JS",
          difficulty: "Easy",
          question: "What is a Promise?",
          answer:
            "A Promise represents the eventual result of an asynchronous operation. It can be pending, fulfilled, or rejected. We handle results with then/catch or async/await.",
          code: `fetch("/api/users")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));`
        },
        {
          id: "js-async-await",
          track: "JavaScript",
          category: "Async JS",
          difficulty: "Easy",
          question: "What is the difference between Promise and async/await?",
          answer:
            "async/await is syntax built on top of Promises. Promises use then/catch chains, while async/await makes asynchronous code read more like synchronous code and handles errors with try/catch.",
          code: `async function loadUsers() {
  try {
    const res = await fetch("/api/users");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}`
        },
        {
          id: "js-callback-hell",
          track: "JavaScript",
          category: "Async JS",
          difficulty: "Easy",
          question: "What is callback hell?",
          answer:
            "Callback hell is deeply nested callback code that becomes hard to read, debug, and handle errors in. It is usually improved with Promises, async/await, or splitting logic into smaller named functions."
        },
        {
          id: "js-debounce",
          track: "JavaScript",
          category: "Performance",
          difficulty: "Medium",
          question: "What is debounce and where is it used?",
          answer:
            "Debounce delays a function until a quiet period has passed since the last call. It is useful for search inputs, resize handlers, and preventing duplicate submissions. It relies on closures and timers.",
          code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`
        },
        {
          id: "js-throttle",
          track: "JavaScript",
          category: "Performance",
          difficulty: "Medium",
          question: "What is throttling?",
          answer:
            "Throttling limits a function to run at most once in a fixed time interval. It is useful for scroll, mousemove, and resize events where frequent calls can hurt performance."
        },
        {
          id: "js-this",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Medium",
          question: "How does this work in JavaScript?",
          answer:
            "this depends on how a function is called. In a method call, it points to the object before the dot. In arrow functions, this is lexically captured from the surrounding scope. bind, call, and apply can set this explicitly."
        },
        {
          id: "js-arrow",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "How are arrow functions different from normal functions?",
          answer:
            "Arrow functions have shorter syntax, do not have their own this, do not have arguments, and cannot be used as constructors. They are useful for callbacks and preserving lexical this."
        },
        {
          id: "js-equality",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "What is the difference between == and ===?",
          answer:
            "== compares after type coercion. === compares both value and type without coercion. In most production code, prefer === to avoid unexpected conversions.",
          code: `5 == "5";  // true
5 === "5"; // false`
        },
        {
          id: "js-map-filter-reduce",
          track: "JavaScript",
          category: "Arrays",
          difficulty: "Easy",
          question: "Explain map, filter, and reduce.",
          answer:
            "map transforms each item and returns a new array. filter keeps items that match a condition. reduce accumulates the array into one result such as a sum, object, or grouped structure.",
          code: `const nums = [1, 2, 3, 4];
nums.map((n) => n * 2);       // [2, 4, 6, 8]
nums.filter((n) => n > 2);    // [3, 4]
nums.reduce((sum, n) => sum + n, 0); // 10`
        },
        {
          id: "js-destructure-spread",
          track: "JavaScript",
          category: "Modern JS",
          difficulty: "Easy",
          question: "What are destructuring and spread syntax?",
          answer:
            "Destructuring extracts values from arrays or objects. Spread expands arrays or objects into another array/object or function call. Both are common in React props and immutable state updates.",
          code: `const user = { name: "Asha", role: "Frontend" };
const { name } = user;
const updated = { ...user, role: "React Developer" };`
        },
        {
          id: "js-null-undefined",
          track: "JavaScript",
          category: "Core JS",
          difficulty: "Easy",
          question: "What is the difference between null and undefined?",
          answer:
            "undefined usually means a variable or property has not been assigned a value. null is an intentional empty value set by the developer."
        },
        {
          id: "js-prototype",
          track: "JavaScript",
          category: "Objects",
          difficulty: "Medium",
          question: "What is prototypal inheritance?",
          answer:
            "Objects in JavaScript can inherit properties and methods from another object through the prototype chain. When a property is not found on the object, JavaScript looks up its prototype chain."
        },
        {
          id: "js-call-apply-bind",
          track: "JavaScript",
          category: "Functions",
          difficulty: "Medium",
          question: "What is the difference between call, apply, and bind?",
          answer:
            "call invokes a function with a given this and comma-separated arguments. apply does the same with an array of arguments. bind returns a new function with this permanently set."
        },
        {
          id: "js-shallow-deep",
          track: "JavaScript",
          category: "Objects",
          difficulty: "Medium",
          question: "What is the difference between shallow copy and deep copy?",
          answer:
            "A shallow copy copies only the top level, so nested objects still share references. A deep copy recursively copies nested structures. In React state, shallow copying is often enough only if you also copy the nested level being changed."
        },
        {
          id: "js-dom-event-delegation",
          track: "JavaScript",
          category: "Browser",
          difficulty: "Medium",
          question: "What is event delegation?",
          answer:
            "Event delegation means attaching one listener to a parent and using event bubbling to handle events from child elements. It reduces many listeners and works well for dynamic lists."
        },
        {
          id: "js-storage",
          track: "JavaScript",
          category: "Browser",
          difficulty: "Easy",
          question: "Compare localStorage, sessionStorage, and cookies.",
          answer:
            "localStorage persists until cleared. sessionStorage lasts for a tab session. Cookies can be sent automatically with requests and can be httpOnly, Secure, and SameSite, which makes them useful for auth."
        },
        {
          id: "js-cors",
          track: "JavaScript",
          category: "Browser",
          difficulty: "Medium",
          question: "What is CORS?",
          answer:
            "CORS is a browser security mechanism that controls cross-origin requests. The server must allow the requesting origin using response headers like Access-Control-Allow-Origin."
        },
        {
          id: "js-modules",
          track: "JavaScript",
          category: "Modern JS",
          difficulty: "Easy",
          question: "What are ES modules?",
          answer:
            "ES modules let JavaScript files export and import values. They help split code into reusable files and enable bundlers to tree-shake unused exports.",
          code: `export function add(a, b) {
  return a + b;
}

import { add } from "./math.js";`
        },
        {
          id: "react-intro",
          track: "React",
          category: "React Basics",
          difficulty: "Easy",
          question: "What is React?",
          answer:
            "React is a JavaScript library for building user interfaces. It uses components, state, props, and declarative rendering to create interactive UI efficiently."
        },
        {
          id: "react-jsx",
          track: "React",
          category: "React Basics",
          difficulty: "Easy",
          question: "What is JSX?",
          answer:
            "JSX is a JavaScript syntax extension that looks like HTML. It allows us to describe UI inside JavaScript and gets compiled to React element creation calls."
        },
        {
          id: "react-props-state",
          track: "React",
          category: "React Basics",
          difficulty: "Easy",
          question: "What is the difference between props and state?",
          answer:
            "Props are passed from parent to child and should be treated as read-only. State is owned by a component and changes over time. Updating state triggers a re-render."
        },
        {
          id: "react-vdom",
          track: "React",
          category: "Rendering",
          difficulty: "Easy",
          question: "What is the Virtual DOM?",
          answer:
            "The Virtual DOM is React's lightweight in-memory representation of the UI. React compares the previous and next trees during reconciliation and updates the real DOM efficiently."
        },
        {
          id: "react-keys",
          track: "React",
          category: "Rendering",
          difficulty: "Easy",
          question: "Why should we use unique keys in lists?",
          answer:
            "Keys help React identify which list items changed, moved, were added, or removed. Stable unique keys prevent incorrect UI reuse and reduce unnecessary DOM work."
        },
        {
          id: "react-use-state",
          track: "React",
          category: "Hooks",
          difficulty: "Easy",
          question: "What is useState?",
          answer:
            "useState adds state to a functional component. It returns the current value and a setter function. Calling the setter schedules a re-render with the new state.",
          code: `const [count, setCount] = useState(0);
setCount((prev) => prev + 1);`
        },
        {
          id: "react-use-effect",
          track: "React",
          category: "Hooks",
          difficulty: "Easy",
          question: "What is useEffect and when does it run?",
          answer:
            "useEffect runs side effects after render, such as API calls, subscriptions, timers, and DOM sync. Its dependency array controls when it re-runs. Cleanup runs before the next effect or unmount.",
          code: `useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);`
        },
        {
          id: "react-use-ref",
          track: "React",
          category: "Hooks",
          difficulty: "Easy",
          question: "What is useRef?",
          answer:
            "useRef stores a mutable value that persists between renders without causing re-renders. It is also used to access DOM nodes, such as focusing an input."
        },
        {
          id: "react-use-memo-callback",
          track: "React",
          category: "Hooks",
          difficulty: "Medium",
          question: "What is the difference between useMemo and useCallback?",
          answer:
            "useMemo memoizes a computed value. useCallback memoizes a function reference. Both are performance tools and should be used when identity or expensive work actually matters."
        },
        {
          id: "react-custom-hook",
          track: "React",
          category: "Hooks",
          difficulty: "Medium",
          question: "What is a custom hook?",
          answer:
            "A custom hook is a reusable function that starts with use and can call other hooks. It extracts stateful logic from components without changing the component tree."
        },
        {
          id: "react-controlled",
          track: "React",
          category: "Forms",
          difficulty: "Easy",
          question: "What are controlled and uncontrolled components?",
          answer:
            "In a controlled component, form value is managed by React state. In an uncontrolled component, the DOM owns the value and React reads it through refs when needed."
        },
        {
          id: "react-context",
          track: "React",
          category: "State Management",
          difficulty: "Medium",
          question: "What is Context API?",
          answer:
            "Context lets us pass data through the component tree without manually passing props at every level. It is useful for theme, auth user, locale, and other app-wide values."
        },
        {
          id: "react-prop-drilling",
          track: "React",
          category: "State Management",
          difficulty: "Easy",
          question: "What is prop drilling and how do you avoid it?",
          answer:
            "Prop drilling is passing props through many intermediate components that do not need them. It can be reduced with component composition, Context, or a state management library."
        },
        {
          id: "react-redux",
          track: "React",
          category: "State Management",
          difficulty: "Medium",
          question: "How does Redux architecture work?",
          answer:
            "Redux has a single store, actions that describe events, reducers that produce new state, dispatch to send actions, selectors to read state, and middleware for async logic or logging."
        },
        {
          id: "react-middleware",
          track: "React",
          category: "State Management",
          difficulty: "Medium",
          question: "What is middleware and why is it used?",
          answer:
            "Middleware sits between dispatching an action and the reducer. In Redux, it is used for async API calls, logging, analytics, error handling, and modifying or delaying actions."
        },
        {
          id: "react-rtk-query",
          track: "React",
          category: "API Handling",
          difficulty: "Medium",
          question: "What are common approaches for API handling in React?",
          answer:
            "Common approaches include fetch, Axios, a service layer, Redux Thunk/Saga, RTK Query, and TanStack Query. For real apps, keep API logic separate from UI and handle loading, error, success, and caching."
        },
        {
          id: "react-jwt",
          track: "React",
          category: "API Handling",
          difficulty: "Medium",
          question: "Explain JWT authentication flow.",
          answer:
            "The user logs in, the server validates credentials, returns an access token, and the client sends it with future requests. The server verifies the token for protected APIs. Prefer httpOnly Secure cookies when possible."
        },
        {
          id: "react-performance",
          track: "React",
          category: "Performance",
          difficulty: "Medium",
          question: "How do you improve React application performance?",
          answer:
            "Prevent unnecessary re-renders, keep state close to where it is used, memoize only where useful, split code with lazy loading, virtualize long lists, optimize assets, debounce expensive events, and profile before over-optimizing."
        },
        {
          id: "react-forward-ref",
          track: "React",
          category: "Advanced React",
          difficulty: "Medium",
          question: "What is forwardRef in React?",
          answer:
            "forwardRef allows a parent to pass a ref through a custom component to a child DOM element or component. It is often used in reusable input, modal, and UI library components.",
          code: `const Input = React.forwardRef(function Input(props, ref) {
  return <input ref={ref} {...props} />;
});`
        },
        {
          id: "react-portals",
          track: "React",
          category: "Advanced React",
          difficulty: "Medium",
          question: "What are React portals?",
          answer:
            "Portals render React children into a DOM node outside the parent hierarchy. They are useful for modals, tooltips, dropdowns, and to avoid overflow or z-index issues."
        },
        {
          id: "react-children",
          track: "React",
          category: "Patterns",
          difficulty: "Easy",
          question: "What are children props in React?",
          answer:
            "children is a special prop containing whatever is placed between a component's opening and closing tags. It is useful for reusable wrappers, layout components, and composition."
        },
        {
          id: "react-compound",
          track: "React",
          category: "Patterns",
          difficulty: "Medium",
          question: "Explain the compound components pattern.",
          answer:
            "Compound components are related components designed to work together, such as Tabs, Tabs.List, Tabs.Tab, and Tabs.Panel. The pattern gives flexible composition while sharing internal state through context."
        },
        {
          id: "react-error-boundary",
          track: "React",
          category: "Advanced React",
          difficulty: "Medium",
          question: "What are error boundaries?",
          answer:
            "Error boundaries catch rendering errors in their child tree and show fallback UI instead of crashing the whole app. Traditionally they are implemented with class components using componentDidCatch and getDerivedStateFromError."
        },
        {
          id: "react-router",
          track: "React",
          category: "Routing",
          difficulty: "Easy",
          question: "What is React Router used for?",
          answer:
            "React Router enables client-side routing. It maps URL paths to components, supports nested routes, route params, navigation, and protected route patterns."
        },
        {
          id: "react-lazy",
          track: "React",
          category: "Performance",
          difficulty: "Medium",
          question: "What are lazy loading and code splitting?",
          answer:
            "Lazy loading delays loading a component until it is needed. Code splitting creates smaller bundles so users do not download the entire app upfront. React.lazy and Suspense are common tools for this."
        },
        {
          id: "react-project",
          track: "React",
          category: "Project Round",
          difficulty: "Hard",
          question: "How would you explain your current project architecture?",
          answer:
            "Start with the business purpose, then explain the frontend structure: routes/pages, reusable components, service layer for APIs, state management, auth flow, styling approach, performance choices, testing, and your personal contribution."
        },
        {
          id: "kunal-js-promise-combinators",
          track: "JavaScript",
          category: "Promises",
          difficulty: "Medium",
          question: "Compare Promise.all, Promise.race, Promise.any, and Promise.allSettled.",
          answer:
            "Promise.all resolves when every promise resolves and rejects on the first rejection. Promise.race settles as soon as the first promise settles. Promise.any resolves on the first fulfilled promise and rejects only if all reject. Promise.allSettled waits for every promise and returns each result status.",
          code: `Promise.all([a, b]);        // all must fulfill
Promise.race([a, b]);       // first settled wins
Promise.any([a, b]);        // first fulfilled wins
Promise.allSettled([a, b]); // collect all outcomes`
        },
        {
          id: "kunal-js-async-output",
          track: "JavaScript",
          category: "Output Based",
          difficulty: "Hard",
          question: "In async/await output questions, what happens after an await?",
          answer:
            "The code before await runs synchronously until the awaited expression is reached. The rest of the async function is scheduled as a microtask after the current call stack finishes. This is why normal synchronous logs after the async call can appear before logs placed after await.",
          code: `console.log("first");

async function run() {
  console.log("start");
  await console.log("middle");
  console.log("end");
}

run();
console.log("last");

// first, start, middle, last, end`
        },
        {
          id: "kunal-js-map-limit",
          track: "JavaScript",
          category: "Async JS",
          difficulty: "Hard",
          question: "What is mapLimit and why is it asked in interviews?",
          answer:
            "mapLimit maps over async work while allowing only a fixed number of tasks to run at the same time. Interviewers use it to test async control flow, result ordering, queues, and concurrency limits.",
          code: `function mapLimit(items, limit, iteratee, done) {
  const result = [];
  let index = 0;
  let completed = 0;

  function runNext() {
    if (completed === items.length) return done(result);
    while (index < items.length && limit > 0) {
      const current = index++;
      limit--;
      iteratee(items[current], (value) => {
        result[current] = value;
        completed++;
        limit++;
        runNext();
      });
    }
  }

  runNext();
}`
        },
        {
          id: "kunal-js-promise-polyfill",
          track: "JavaScript",
          category: "Polyfills",
          difficulty: "Hard",
          question: "How would you approach writing a Promise.all polyfill?",
          answer:
            "Return a new Promise, preserve result order by index, resolve only after all input promises resolve, reject immediately on the first rejection, and handle non-promise values with Promise.resolve.",
          code: `function promiseAll(values) {
  return new Promise((resolve, reject) => {
    const result = [];
    let completed = 0;

    if (values.length === 0) resolve([]);

    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((data) => {
          result[index] = data;
          completed++;
          if (completed === values.length) resolve(result);
        })
        .catch(reject);
    });
  });
}`
        },
        {
          id: "kunal-js-bind-polyfill",
          track: "JavaScript",
          category: "Polyfills",
          difficulty: "Medium",
          question: "How does a bind polyfill work?",
          answer:
            "bind returns a new function with this fixed to the provided context and can also store initial arguments. When the returned function is called, it invokes the original function with combined arguments.",
          code: `Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...nextArgs) {
    return fn.apply(context, [...args, ...nextArgs]);
  };
};`
        },
        {
          id: "kunal-js-deep-clone",
          track: "JavaScript",
          category: "Objects",
          difficulty: "Medium",
          question: "How do you implement deep clone for objects and arrays?",
          answer:
            "Handle primitive values directly, recursively clone arrays, and recursively clone object properties. In a production-level answer, mention Date, Map, Set, functions, circular references, and structuredClone.",
          code: `function deepClone(value) {
  if (typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map(deepClone);

  const result = {};
  for (const key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}`
        },
        {
          id: "kunal-js-flatten-object",
          track: "JavaScript",
          category: "Objects",
          difficulty: "Medium",
          question: "How do you flatten a nested object?",
          answer:
            "Use recursion to walk object keys and build a path string. When the value is a nested plain object, recurse. When it is a primitive or array, assign it to the flattened result.",
          code: `function flattenObject(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const path = prefix ? \`\${prefix}.\${key}\` : key;
    const value = obj[key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, path, result);
    } else {
      result[path] = value;
    }
  }
  return result;
}`
        },
        {
          id: "kunal-js-event-emitter",
          track: "JavaScript",
          category: "Browser",
          difficulty: "Medium",
          question: "How would you build a simple EventEmitter?",
          answer:
            "Maintain a map of event names to listener arrays. on adds a listener, off removes it, emit calls all listeners with arguments, and once wraps a listener so it removes itself after the first call.",
          code: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(name, fn) {
    this.events.set(name, [...(this.events.get(name) || []), fn]);
  }

  emit(name, ...args) {
    (this.events.get(name) || []).forEach((fn) => fn(...args));
  }
}`
        },
        {
          id: "kunal-js-weakmap",
          track: "JavaScript",
          category: "Memory",
          difficulty: "Medium",
          question: "Why is WeakMap useful for memory-efficient caching?",
          answer:
            "WeakMap keys must be objects and are held weakly, meaning they do not prevent garbage collection. It is useful for attaching metadata or cache entries to objects without creating memory leaks."
        },
        {
          id: "kunal-js-api-cache",
          track: "JavaScript",
          category: "API Handling",
          difficulty: "Medium",
          question: "How can you cache API responses on the frontend?",
          answer:
            "Use a cache key based on URL and options, store data with an expiry time, return cached data while it is valid, and refetch when expired. For larger apps, use HTTP caching headers, service workers, RTK Query, or TanStack Query.",
          code: `const cache = new Map();

async function fetchWithCache(url, ttl = 5000) {
  const cached = cache.get(url);
  if (cached && Date.now() < cached.expiresAt) return cached.data;

  const data = await fetch(url).then((res) => res.json());
  cache.set(url, { data, expiresAt: Date.now() + ttl });
  return data;
}`
        },
        {
          id: "kunal-js-websocket-sse-webhook",
          track: "JavaScript",
          category: "Browser",
          difficulty: "Medium",
          question: "Compare WebSocket, Server-Sent Events, and webhooks.",
          answer:
            "WebSocket is full-duplex communication between client and server, good for chat or live collaboration. Server-Sent Events are one-way server-to-client streams, good for notifications or feeds. Webhooks are server-to-server HTTP callbacks triggered by events."
        },
        {
          id: "kunal-react-stale-closure",
          track: "React",
          category: "Hooks",
          difficulty: "Hard",
          question: "What is a stale closure in React?",
          answer:
            "A stale closure happens when an async callback or effect captures an old state value. Use functional state updates, correct dependency arrays, or refs when you need the latest value.",
          code: `setTimeout(() => {
  setCount(count + 1); // may use stale count
}, 1000);

setTimeout(() => {
  setCount((prev) => prev + 1); // safer
}, 1000);`
        },
        {
          id: "kunal-react-use-transition",
          track: "React",
          category: "Performance",
          difficulty: "Medium",
          question: "What is useTransition used for?",
          answer:
            "useTransition marks some state updates as non-urgent so React can keep the UI responsive during expensive rendering. It is useful for search filtering, tab changes, and large UI updates where immediate input feedback matters."
        },
        {
          id: "kunal-react-windowing",
          track: "React",
          category: "Performance",
          difficulty: "Medium",
          question: "What is list virtualization or windowing?",
          answer:
            "Windowing renders only the visible part of a large list plus a small buffer. It avoids mounting thousands of DOM nodes and improves scroll performance. Common libraries include react-window and react-virtualized."
        },
        {
          id: "kunal-react-security",
          track: "React",
          category: "Security",
          difficulty: "Medium",
          question: "What frontend security issues should a React developer know?",
          answer:
            "Know XSS, unsafe dynamic HTML, CSRF, clickjacking, session hijacking, and insecure links. React escapes normal JSX values by default, but dangerouslySetInnerHTML should only be used with sanitized HTML, and external target blank links should use rel='noopener noreferrer'."
        },
        {
          id: "kunal-web-critical-rendering-path",
          track: "JavaScript",
          category: "Performance",
          difficulty: "Hard",
          question: "How do you optimize the critical rendering path?",
          answer:
            "Reduce render-blocking work before first paint. Inline critical CSS for above-the-fold content, defer or async non-critical JavaScript, code split large bundles, optimize fonts and images, and prioritize important resources."
        },
        {
          id: "kunal-web-performance-bottlenecks",
          track: "JavaScript",
          category: "Performance",
          difficulty: "Medium",
          question: "What are common web application performance bottlenecks?",
          answer:
            "Slow server response, unoptimized database queries, large JavaScript bundles, render-blocking CSS/JS, unoptimized images, too many network requests, missing browser caching, memory leaks, and unnecessary re-renders."
        },
        {
          id: "kunal-web-resource-hints",
          track: "JavaScript",
          category: "Performance",
          difficulty: "Medium",
          question: "What are preload, prefetch, preconnect, and modulepreload?",
          answer:
            "preload fetches a critical resource needed soon. prefetch fetches likely future resources when the browser is idle. preconnect warms up DNS/TCP/TLS for another origin. modulepreload fetches JavaScript modules and dependencies early.",
          code: `<link rel="preload" href="/app.css" as="style" />
<link rel="prefetch" href="/next-page.js" />
<link rel="preconnect" href="https://api.example.com" />
<link rel="modulepreload" href="/feature.js" />`
        },
        {
          id: "kunal-web-babel",
          track: "JavaScript",
          category: "Build Tools",
          difficulty: "Medium",
          question: "What does Babel do internally?",
          answer:
            "Babel parses JavaScript into an AST, transforms the AST using plugins and presets, then generates compatible output code. It allows developers to write modern JavaScript while supporting older environments."
        },
        {
          id: "kunal-web-webpack",
          track: "JavaScript",
          category: "Build Tools",
          difficulty: "Medium",
          question: "What does Webpack do?",
          answer:
            "Webpack starts from an entry file, resolves dependencies, builds a dependency graph, applies loaders and plugins, bundles modules into output assets, and supports optimizations like code splitting, tree shaking, minification, caching, and hot module replacement."
        },
        {
          id: "kunal-react-lifecycle",
          track: "React",
          category: "React Basics",
          difficulty: "Easy",
          question: "What are React component lifecycle phases?",
          answer:
            "The main phases are mounting, updating, and unmounting. In function components, useEffect can model side effects for these phases: run on mount, re-run when dependencies update, and clean up on unmount."
        },
        {
          id: "kunal-js-priority-api",
          track: "JavaScript",
          category: "API Handling",
          difficulty: "Hard",
          question: "How would you fetch from multiple endpoints and return the first successful usable response?",
          answer:
            "Start all requests, inspect settled results, return the first fulfilled response that is valid, and reject if all fail. Depending on the requirement, use Promise.any for first fulfillment or Promise.allSettled when you need to check response.ok.",
          code: `async function getPreferredResponse(urls) {
  const results = await Promise.allSettled(urls.map((url) => fetch(url)));

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.ok) {
      return result.value.json();
    }
  }

  throw new Error("All API calls failed");
}`
        },
        {
          id: "dsa-two-sum",
          track: "DSA",
          category: "Arrays",
          difficulty: "Easy",
          question: "Solve Two Sum.",
          answer:
            "Use a hash map to store seen numbers and their indexes. For each number, check whether target - current already exists. This gives O(n) time and O(n) space.",
          code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`
        },
        {
          id: "dsa-buy-sell-stock",
          track: "DSA",
          category: "Arrays",
          difficulty: "Easy",
          question: "Best Time to Buy and Sell Stock.",
          answer:
            "Track the minimum price seen so far and the best profit at each step. The key idea is selling today after buying at the lowest earlier price."
        },
        {
          id: "dsa-maximum-subarray",
          track: "DSA",
          category: "Arrays",
          difficulty: "Medium",
          question: "Find the maximum subarray sum.",
          answer:
            "Use Kadane's algorithm. At each index, decide whether to extend the previous subarray or start a new one. Track the best sum globally.",
          code: `function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`
        },
        {
          id: "dsa-product-except-self",
          track: "DSA",
          category: "Arrays",
          difficulty: "Medium",
          question: "Product of Array Except Self.",
          answer:
            "Compute prefix products from the left and suffix products from the right without using division. The result for each index is left product multiplied by right product."
        },
        {
          id: "dsa-valid-anagram",
          track: "DSA",
          category: "Strings",
          difficulty: "Easy",
          question: "Check whether two strings are anagrams.",
          answer:
            "Count character frequencies in one string and subtract using the other. If any count goes negative or lengths differ, they are not anagrams. Sorting also works but costs O(n log n)."
        },
        {
          id: "dsa-valid-palindrome",
          track: "DSA",
          category: "Strings",
          difficulty: "Easy",
          question: "Validate a palindrome string.",
          answer:
            "Use two pointers from both ends, skip non-alphanumeric characters, compare lowercase characters, and move inward. This is O(n) time and O(1) space."
        },
        {
          id: "dsa-longest-substring",
          track: "DSA",
          category: "Strings",
          difficulty: "Medium",
          question: "Longest Substring Without Repeating Characters.",
          answer:
            "Use a sliding window and a map/set. Move the right pointer through the string, and when a duplicate appears, move the left pointer until the window is valid again."
        },
        {
          id: "dsa-valid-parentheses",
          track: "DSA",
          category: "Stack",
          difficulty: "Easy",
          question: "Validate balanced parentheses.",
          answer:
            "Use a stack. Push opening brackets. For closing brackets, pop and verify the matching opener. At the end, the stack should be empty."
        },
        {
          id: "dsa-min-stack",
          track: "DSA",
          category: "Stack",
          difficulty: "Medium",
          question: "Design a Min Stack.",
          answer:
            "Use one normal stack and one min stack, or store pairs of value and current minimum. That allows push, pop, top, and getMin in O(1)."
        },
        {
          id: "dsa-reverse-linked-list",
          track: "DSA",
          category: "Linked List",
          difficulty: "Easy",
          question: "Reverse a linked list.",
          answer:
            "Use three pointers: previous, current, and next. Iterate through the list, reverse current.next to previous, then move forward."
        },
        {
          id: "dsa-cycle-linked-list",
          track: "DSA",
          category: "Linked List",
          difficulty: "Medium",
          question: "Detect a cycle in a linked list.",
          answer:
            "Use Floyd's slow and fast pointer algorithm. If fast and slow meet, there is a cycle. If fast reaches null, there is no cycle."
        },
        {
          id: "dsa-binary-search",
          track: "DSA",
          category: "Binary Search",
          difficulty: "Easy",
          question: "Implement binary search.",
          answer:
            "Keep left and right boundaries. Check the middle. If target is larger, move left to mid + 1; if smaller, move right to mid - 1. Time complexity is O(log n)."
        },
        {
          id: "dsa-kth-largest",
          track: "DSA",
          category: "Heap",
          difficulty: "Medium",
          question: "Find the kth largest element in an array.",
          answer:
            "Common approaches are sorting, min heap of size k, or quickselect. For interviews, explain tradeoffs: sorting is simple O(n log n), heap is O(n log k), quickselect averages O(n)."
        },
        {
          id: "dsa-tree-level-order",
          track: "DSA",
          category: "Trees",
          difficulty: "Medium",
          question: "Binary Tree Level Order Traversal.",
          answer:
            "Use BFS with a queue. Process nodes level by level by recording the queue size before each level, then push children for the next level."
        },
        {
          id: "dsa-number-of-islands",
          track: "DSA",
          category: "Graphs",
          difficulty: "Medium",
          question: "Number of Islands.",
          answer:
            "Scan the grid. When you find land, increment the count and run DFS/BFS to mark the whole connected island as visited. This is a classic graph traversal problem."
        },
        {
          id: "dsa-climbing-stairs",
          track: "DSA",
          category: "Dynamic Programming",
          difficulty: "Easy",
          question: "Climbing Stairs.",
          answer:
            "This follows Fibonacci logic. Ways to reach step n equals ways to reach n - 1 plus ways to reach n - 2. Use two variables for O(1) space."
        },
        {
          id: "dsa-coin-change",
          track: "DSA",
          category: "Dynamic Programming",
          difficulty: "Medium",
          question: "Coin Change.",
          answer:
            "Use DP where dp[amount] stores the minimum coins needed. Initialize dp[0] = 0 and others as Infinity, then try every coin for every amount."
        },
        {
          id: "system-autocomplete",
          track: "System Design",
          category: "Search",
          difficulty: "Medium",
          question: "Design an autocomplete search box.",
          answer:
            "Clarify scale, latency, ranking, and typo tolerance. Use debouncing, request cancellation, caching, keyboard navigation, loading/error states, and a backend endpoint that returns ranked suggestions. Discuss accessibility and performance."
        },
        {
          id: "system-news-feed",
          track: "System Design",
          category: "Feeds",
          difficulty: "Hard",
          question: "Design a social media news feed frontend.",
          answer:
            "Cover data pagination, infinite scroll, optimistic updates, feed item components, media lazy loading, cache invalidation, real-time updates, moderation states, skeleton UI, and analytics."
        },
        {
          id: "system-chat",
          track: "System Design",
          category: "Realtime",
          difficulty: "Hard",
          question: "Design a real-time chat UI.",
          answer:
            "Use WebSockets for live messages, REST for history, optimistic sending, delivery/read states, reconnection, local queue for failed sends, virtualization for long threads, and careful scroll position management."
        },
        {
          id: "system-dashboard",
          track: "System Design",
          category: "Realtime",
          difficulty: "Medium",
          question: "Design a real-time analytics dashboard.",
          answer:
            "Clarify refresh rate and data volume. Use polling, SSE, or WebSockets depending on freshness needs. Discuss chart rendering, caching, aggregation, permissions, loading states, and graceful stale data handling."
        },
        {
          id: "system-youtube",
          track: "System Design",
          category: "Media",
          difficulty: "Hard",
          question: "Design a video streaming frontend like YouTube.",
          answer:
            "Discuss routing, player controls, adaptive streaming, CDN usage, thumbnail lazy loading, recommendations, watch history, comments, accessibility, performance metrics, and error recovery."
        },
        {
          id: "system-infinite-scroll",
          track: "System Design",
          category: "Performance",
          difficulty: "Medium",
          question: "Design an infinite scroll list.",
          answer:
            "Use cursor pagination, IntersectionObserver, loading and empty states, duplicate prevention, virtualization for large lists, preserving scroll position, and an accessible fallback for pagination."
        },
        {
          id: "system-design-system",
          track: "System Design",
          category: "Frontend Architecture",
          difficulty: "Hard",
          question: "Design a reusable component library or design system.",
          answer:
            "Cover tokens, theming, accessibility, component APIs, documentation, Storybook, versioning, visual regression tests, release process, and how teams consume components safely."
        },
        {
          id: "system-file-upload",
          track: "System Design",
          category: "Files",
          difficulty: "Medium",
          question: "Design a file upload system.",
          answer:
            "Discuss drag-and-drop, validation, progress, chunked uploads, retry/resume, signed URLs, virus scanning status, previews, cancellation, and handling large files or poor networks."
        },
        {
          id: "system-auth-flow",
          track: "System Design",
          category: "Auth",
          difficulty: "Medium",
          question: "Design a frontend authentication flow.",
          answer:
            "Cover login, signup, protected routes, token refresh, httpOnly cookies, logout, session expiry, role-based UI, redirect handling, CSRF/XSS concerns, and error states."
        },
        {
          id: "system-offline-first",
          track: "System Design",
          category: "Caching",
          difficulty: "Hard",
          question: "Design offline-first frontend behavior.",
          answer:
            "Use service workers, local persistence, cache strategies, optimistic updates, background sync, conflict resolution, stale indicators, and clear UX for offline/online transitions."
        },
        {
          id: "system-error-monitoring",
          track: "System Design",
          category: "Monitoring",
          difficulty: "Medium",
          question: "Design frontend error logging and monitoring.",
          answer:
            "Capture runtime errors, promise rejections, API failures, performance metrics, user/session context, source maps, privacy-safe breadcrumbs, sampling, alerting, and dashboards."
        },
        {
          id: "system-react-architecture",
          track: "System Design",
          category: "Frontend Architecture",
          difficulty: "Medium",
          question: "Design a scalable React project architecture.",
          answer:
            "Discuss feature-based folders, route boundaries, shared UI, hooks, service layer, state strategy, API caching, auth guards, testing, code splitting, linting, and ownership conventions."
        }
      ];
