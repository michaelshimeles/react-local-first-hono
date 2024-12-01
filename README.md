# Local-First React App with TanStack Query + Hono RPC Backend

A modern React application demonstrating local-first architecture using IndexedDB for offline support and real-time synchronization.

## Features

- ✨ Offline-first architecture
- 🔄 Real-time synchronization
- 📱 Immediate local updates
- 🚀 Optimistic UI updates
- 🔒 Conflict resolution
- 🎯 TypeScript support

## Why Local-First?

Local-first architecture provides several key advantages that significantly enhance the user experience:

### Instant Responsiveness
- **Zero-Latency Operations**: All user actions (create, update, delete) happen instantly in the local database
- **No Network Waiting**: Users never wait for server responses to see their changes
- **Smooth UI**: Interface updates immediately, creating a native app-like experience

### Offline Resilience
- **Always Available**: App works seamlessly without internet connection
- **Background Sync**: Changes are automatically synchronized when connection is restored
- **No Data Loss**: All operations are safely stored locally until successful sync

### Performance Benefits
- **Reduced Server Load**: Batched synchronization reduces the number of server requests
- **Optimized Network Usage**: Only changed data is synchronized
- **Efficient Caching**: Local database acts as a high-performance cache

### Better User Experience
- **No Loading States**: Users see their changes instantly
- **Works Everywhere**: Reliable operation regardless of network conditions
- **Reduced Frustration**: No failed operations due to network issues

The sync engine complements this architecture by:
1. **Intelligent Batching**: Groups multiple changes for efficient server updates
2. **Conflict Resolution**: Handles concurrent changes gracefully
3. **Automatic Retry**: Ensures reliable data synchronization
4. **Real-time Updates**: Keeps local and server data in sync automatically

This combination of local-first architecture and a robust sync engine creates an application that feels instantaneous while maintaining data consistency across all users.

## Tech Stack

- Frontend:
  - React
  - TanStack Query (React Query)
  - Dexie.js (IndexedDB wrapper)
  - TypeScript
  - Tailwind CSS

- Backend:
  - Hono (TypeScript-first web framework)
  - PostgreSQL with Drizzle ORM
  - RPC-style API endpoints

## Getting Started

### Prerequisites

- Node.js
- Bun
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
```sh
bun install
```