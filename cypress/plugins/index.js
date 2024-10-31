const path = require("path");
const gmail = require("gmail-tester");
const { verifyDownloadTasks } = require('cy-verify-downloads');
const { removeDirectory } = require('cypress-delete-downloads-folder');
const fs = require('fs')
const { GoogleSocialLogin, baseLoginConnect } = require('cypress-social-logins').pluginsconst 
data = require("../fixtures/signupData")
module.exports = (on, config) => {  
    on("task", {    
        "gmail:get-messages": async args => {      
            const messages = await gmail.get_messages(        
            path.resolve(_dirname, "credentials.json"),        
            path.resolve(dirname, "token.json"),        
            args.options      
        );      
        return messages;    
    }  
})  
on("task", {    
    "gmail:check": async args => {      
        const { from, to, subject } = args;      
        const email = await gmail.check_inbox(        
            path.resolve(dirname, "credentials.json"), 
            // Assuming credentials.json is in the current directory.        
            path.resolve(_dirname, "token.json"), 
            //Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).        
            {          
                subject: subject,          
                from: from,          
                to: to,          
                wait_time_sec: 10, 
                // Poll interval (in seconds).          
                max_wait_time_sec: 30, 
                // Maximum poll time (in seconds), after which we'll giveup.          
                include_body: true,        
            }      
        );      
        return email;    
    }  
});  
on('task', verifyDownloadTasks)  
on('task', { removeDirectory })  
on('task', {    getFileExtension(folderName) {      
    return new Promise((resolve, reject) => {        
        fs.readdir(folderName, (err, files) => {          
            if (err)            
                return reject(err)          
            else {            
                console.log("\nCurrent directory filenames:");            
                files.forEach(file => {              
                    console.log(file)              
                    const extension = file.split('.').pop();              
                    console.log(extension)              
                    resolve(extension)            
                })          
            }        
        })      
    })    
},  
})  
on('task', {    
    GoogleSocialLogin: GoogleSocialLogin,  
})  
on('task', {    
    customSignUp(options) {      
        async function typeUsername({ page, options } = {}) {        
            // await page.waitForSelector([data-cy="tos-agreement-checkbox"])        
            // await page.click([data-cy="tos-agreement-checkbox"])        
            await page.waitForSelector(config.env.googleSignupElement)        
            await page.click(config.env.googleSignupElement)        
            await page.waitForSelector('input#identifierId[type="email"]')        
            await page.type('input#identifierId[type="email"]', options.username)        
            await page.click('#identifierNext')      
        }      
        async function racePromises(promises) {        
            const wrappedPromises = []        
            let resolved = false        
            promises.map((promise, index) => {          
                wrappedPromises.push(           
                     new Promise(resolve => {              
                        promise.then(                
                            () => {                  
                                resolve(index)                
                            },                
                            error => {                  
                                if (!resolved) {                    
                                    throw error                  
                                }                
                            }              
                        )            
                    })          
                )        
            })        
            return Promise.race(wrappedPromises).then(index => {          
                resolved = true          
                return index        
            })      
        }      
        async function waitForMultipleSelectors(selectors, options, page) {        
            const navigationOutcome = await racePromises(          
                selectors.map(selector => page.waitForSelector(selector, options))        
            )        
            return selectors[parseInt(navigationOutcome)]      
        }      
        async function typePassword({ page, options } = {}) {        
            let buttonSelectors = ['#signIn', '#passwordNext', '#submit']        
            await page.waitForSelector('input[type="password"]', { visible: true })        
            await page.type('input[type="password"]', options.password)        
            const buttonSelector = await waitForMultipleSelectors(buttonSelectors, { visible: true }, page)        
            await page.click(buttonSelector)        
            await page.waitForSelector('button[type="submit"]>span', { visible: true ,setTimeout:60000 })    
        }      return baseLoginConnect(typeUsername, typePassword, null, null, null, options)    
    }  
})  
on('task', {    
    customLogin(options) {      
        async function typeUsername({ page, options } = {}) {        
            await page.waitForSelector(config.env.googleloginElement)        
            await page.click(config.env.googleloginElement)        
            await page.waitForSelector('input#identifierId[type="email"]')        
            await page.type('input#identifierId[type="email"]', options.username)        
            await page.click('#identifierNext')      
        }      
        async function racePromises(promises) {        
            const wrappedPromises = []        
            let resolved = false        
            promises.map((promise, index) => {          
                wrappedPromises.push(            
                    new Promise(resolve => {              
                        promise.then(                
                            () => {                  
                                resolve(index)                
                            },                
                                error => {                  
                                    if (!resolved) {                    
                                        throw error                  
                                    }                
                                }              
                            )            
                        })          
                    )        
                })        
                return Promise.race(wrappedPromises).then(index => {          
                    resolved = true          
                    return index        
                })      
            }      
            async function waitForMultipleSelectors(selectors, options, page) {        
                const navigationOutcome = await racePromises(         
                    selectors.map(selector => page.waitForSelector(selector, options))        
                )        
                return selectors[parseInt(navigationOutcome)]      
            }      
            async function typePassword({ page, options } = {}) {        
                let buttonSelectors = ['#signIn', '#passwordNext', '#submit']        
                await page.waitForSelector('input[type="password"]', { visible: true })        
                await page.type('input[type="password"]', options.password)        
                const buttonSelector = await waitForMultipleSelectors(buttonSelectors, { visible: true }, page)        
                await page.click(buttonSelector)      
            }      
            return baseLoginConnect(typeUsername, typePassword, null, null, null, options)    
        }  
    })};