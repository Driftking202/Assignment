import {defineConfig} from "cypress";

export default defineConfig({
  waitForAnimations: false,
  animationDistanceThreshold: 50, 
  video: false,  
  viewportHeight: 900,
  viewportWidth: 1600,  
  numTestsKeptInMemory: 100,  
  requestTimeout: 45000,  
  responseTimeout: 45000,  
  pageLoadTimeout: 60000,  
  taskTimeout: 90000,  

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      defaultCommandTimeout: 60000
      // require('cypress-mochawesome-reporter/plugin')(on);
    },

    specPattern: [      
            "cypress/e2e/login/*.spec.ts"   
            ],
  },
});
