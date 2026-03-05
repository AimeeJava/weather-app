import { TextEncoder, TextDecoder } from "node:util";

// Polyfill for deps that expect these globals
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
