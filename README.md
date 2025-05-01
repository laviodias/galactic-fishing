# Galactic Fishing Stats

A web application to display statistics for the game Galactic Fishing. This project aims to provide players with real-time rankings and marketplace information to enhance their gaming experience.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running in Development Mode](#running-in-development-mode)
    -   [Previewing the Production Build](#previewing-the-production-build)
-   [Bundle Size Optimization](#bundle-size-optimization)
-   [Offline Support (PWA)](#offline-support-pwa)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Leaderboard:** Real-time ranking of players based on their progress in the game.
-   **Space Market:** Up-to-date information on items available in the game's marketplace, including prices and descriptions.
-   **Offline Support:** Progressive Web App (PWA) features allow the application to load and function even when there is no internet connection.
-   **Responsive Design:** The user interface adapts to different screen sizes.
-   **Clear and Engaging UI:** Cosmic-themed design to match the game's atmosphere.

## Technologies Used

-   **Vue.js 3:** A progressive JavaScript framework for building user interfaces.
-   **Vite:** A build tool that offers a fast and performant development experience.
-   **TypeScript:** A statically typed superset of JavaScript that improves code maintainability and reduces errors.
-   **oh-vue-icons:** A library to easily use various open-source icons as Vue components.
-   **Workbox (via vite-plugin-pwa):** A set of libraries that power Progressive Web Apps, enabling offline support and more.

## Getting Started

### Prerequisites

-   **Node.js:** Make sure you have Node.js (version >= 18.0) installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).
-   **npm** or **yarn:** You will need a package manager to install dependencies. npm comes with Node.js, or you can install yarn from [https://yarnpkg.com/](https://yarnpkg.com/).

### Installation

1.  Clone the repository to your local machine:

    ```
    git clone <repository_url>
    cd galactic-fishing
    ```

2.  Install the project dependencies using npm or yarn:

    ```
    npm install
    # or
    yarn install
    ```

### Running in Development Mode

To run the application in development mode with hot-reloading, use the following command:

```
npm run dev
# or
yarn dev
```

This will start a development server. Open your browser and navigate to the address provided in the console (usually `http://localhost:5173/`).

### Previewing the Production Build

To preview the production build locally, first build the application:

```
npm run build
# or
yarn build
```

Then, you can serve the built files using a simple HTTP server. You can use `npx serve dist` if you have the `serve` package installed globally, or use `npm` or `yarn` to run Vite's preview server:

```
npx serve dist
# or
npm run preview
# or
yarn preview
```

Open your browser and navigate to the address provided in the console (usually `http://localhost:3000/` for `serve` or `http://localhost:4173/` for Vite's preview). This will allow you to test the application as it would be in a production environment, including the PWA features.

### Production deploy

This application is deployed on https://laviovale.com

## Bundle Size Optimization

Several strategies have been employed to minimize the application's bundle size:

-   **Component-Based Architecture (Vue.js):** Vue's component system promotes code reusability and modularity, helping to avoid unnecessary code duplication.
-   **Tree Shaking (Vite):** Vite uses Rollup for production builds, which performs tree shaking to eliminate unused code from imported modules.
-   **Code Splitting (Vite):** Vite automatically handles code splitting to divide the application into smaller chunks, improving initial load time.
-   **Icon Optimization (oh-vue-icons):** Using a library like `oh-vue-icons` allows importing only the specific icons needed, rather than entire icon sets.


## Offline Support (PWA)

This application is configured as a Progressive Web App (PWA) using `vite-plugin-pwa`. This enables several benefits, including:

-   **Installation:** Users can install the application to their home screen or app drawer.
-   **Offline Functionality:** The Service Worker caches essential assets (HTML, CSS, JavaScript, images) and API data, allowing the application to load and function even when there is no network connection.

**API Caching Strategy:**

The application uses a "Network First, falling back to Cache" strategy for API data (`/game/market` and `/game/leaderboard`). This means the application will try to fetch the latest data from the network first. If the network request fails (e.g., due to no internet connection), the application will serve the cached data.

**Cache Expiration and Management:**

-   **`ExpirationPlugin`:** Configured to limit the lifespan of cached API responses to 5 minutes (`maxAgeSeconds`) and to maintain a maximum of 50 entries in the cache (`maxEntries`). Older entries are removed when the limit is reached.
-   **`CacheableResponsePlugin`:** Ensures that only successful (status 200) or offline (status 0) responses from the API are cached.

## License

MIT License