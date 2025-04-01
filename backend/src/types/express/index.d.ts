import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number,
      role?: string
    }
  }
}

// TypeScript declaration merging
// Specifically, it is extending the Request interface provided by the express module to include custom properties, userId and role.