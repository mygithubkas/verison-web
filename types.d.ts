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