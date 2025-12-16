// Typing for the global stylesheet so side-effect imports don't error in TS.
// Otherwise the import of a css file would error in app/layout.tsx
declare const stylesheet: string
export default stylesheet
