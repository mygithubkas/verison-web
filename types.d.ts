// Additional type declarations for the project

// Declare JSX namespace to fix JSX element type errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Declare NodeJS namespace to fix NodeJS.Timeout errors
declare namespace NodeJS {
  interface Timeout {}
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
} 