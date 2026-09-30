/**
 * The `action` of a form that submits through its own `onSubmit` handler, so a press
 * before hydration can never become the browser's own submission.
 *
 * Until React attaches `onSubmit`, a form with `onSubmit` and no `action` is a plain
 * HTML form: pressing its button sends a GET to the current page with every named
 * field in the query string — a client's name, a date of birth, an authenticator
 * code — where browser history, server logs, and Referer headers keep it. Give the form a function
 * `action` and React's server render writes an inert `javascript:` action instead,
 * plus a small script that holds a press made before hydration: nothing leaves the
 * browser. (useNonResettingFormAction does the same for forms it manages.)
 *
 * After hydration `onSubmit` calls `preventDefault()`, and React never runs this
 * action. The one time React does run it is to replay a press it held before
 * hydration: then nothing is sent, React returns the fields to their defaults, and
 * the person presses again now that the page is ready. So `onSubmit` must call
 * `preventDefault()` on every path.
 *
 * Leave `encType`, `method`, and `target` off such a form: a function action
 * overrides them (React warns in development), and `onSubmit` builds its FormData
 * itself.
 *
 *   <form action={submitsThroughOnSubmit} onSubmit={(event) => { event.preventDefault(); … }}>
 *
 * src/components/shared/__tests__/form-native-submission.test.tsx fails on any
 * `<form>` with `onSubmit` and neither an `action` nor `method="post"`.
 */
export function submitsThroughOnSubmit(): void {
  // Intentionally empty (see above): the form's onSubmit does the work.
}
