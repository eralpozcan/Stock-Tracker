# Vue Stock-D3.js


This is the solution for Reengen Full Stack Bootcamp with Vuejs and Nodejs Week-3 Project. It is built with Vuejs by using 
[Vue CLI](https://cli.vuejs.org/), 
[Vuex](https://vuex.vuejs.org/) 
[Vue Router](https://router.vuejs.org/) and Desing [Vuetify](https://vuetifyjs.com).


## Table of contents

- [Overview](#overview)
  - [The Features](#the-features)
  - [Built with](#built-with)
- [Project Setup](#project-setup)

## Overview

### The Features


- User must search for a stock symbol in Home Page
- After searching the symbol route must change as "/symbol/:symbol" (e.g. symbol/GOOGL)
- Related stock information (open high, low, close and volume) must be displayed in a Candlestick Chart
- There must be a user/admin switch in Header Component
- Only Admin must be able to display routes' log data
- If normall user tries to navigate to display logs, there must appear a warning
- Unauthorized navigation attemps to router change logs must also be displayed in logs with different styling


### Built with

- [Vuejs](https://vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com)



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
