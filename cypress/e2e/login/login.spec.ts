import commonPage from "../../pageObject/commonPage"
import * as homeData from "../../fixtures/homeData"
import * as loginData from "../../fixtures/loginData"
import * as cartData from "../../fixtures/cartData"

let validEmail = "mohammadshahiknawaze@gmail.com"
let validPassword = "Mohammad@1234"
let invalidEmail = "mdnawaz12qwerty@gmail.com"
let productName = "Bluetooth Speakers"
let itemPrice = "329.00"
let deliveryPrice = "0.00"

describe('Automated test script for the Amazon website', () => {

  beforeEach(() => {
    
    // Visit the URL of amazon
    cy.visit('https://www.amazon.in')
    cy.wait(1000)
  })

  afterEach(() => {
    cy.wait(2000)
    commonPage.clickOnElementByHref(cartData.elements.amazonHomePageLink)
    cy.wait(2000)
    // Go to the cart page
    commonPage.clickOnElementById(homeData.elements.cartIcon)
    cy.wait(2000)
    commonPage.decreaseQuantityByOneInCart()
    cy.wait(2000)
  })


  it('To verify user is able to add product to cart', () => {
  
    // Verify the Amazon heading is visible on the topbar
    commonPage.actionsOnElementByText(homeData.elements.amazonLabel, "visible")

    // Click on the signin button on the topbar
    commonPage.clickOnElementById(homeData.elements.signInButton)
    cy.wait(2000)

    /**
     * To verify when user tries to signin using invalid email
     */
    // Click on email field
    commonPage.clickOnElementByType(loginData.elements.emailField)
    // Type the invalid email address into the field
    commonPage.getElementByType(loginData.elements.emailField).type(invalidEmail)
    // Click on the continue button
    commonPage.clickOnElementByType(loginData.elements.continueButton)
    // Verify invalid email validation message
    commonPage.actionsOnElementByTextContains(loginData.elements.invalidEmailValidation, "visible")
    
    /**
     * To verify when user tries to signin using valid email and valid password
     */
    // Click on email field
    commonPage.clickOnElementByType(loginData.elements.emailField)
    // Clear the email field 
    commonPage.getElementByType(loginData.elements.emailField).clear()
    // Type the valid email address into the field
    commonPage.getElementByType(loginData.elements.emailField).type(validEmail)
    // Click on the continue button
    commonPage.clickOnElementByType(loginData.elements.continueButton)
    // Click on the password field 
    commonPage.clickOnElementByType(loginData.elements.passwordField)
    // Type incorrect password into the password field
    commonPage.getElementByType(loginData.elements.passwordField).type(validPassword)
    // Click on continue button
    commonPage.clickOnElementByType(loginData.elements.continueButton)
    cy.wait(3000)

    // click on the search field
    commonPage.clickOnElementByPlaceholder(homeData.elements.searchField)
    // Search bluetooth speakers in the search field
    commonPage.elementByPlaceholder(homeData.elements.searchField).type(productName).type('{enter}')
    // Select customer rating 4 star and above
    commonPage.elementByText(homeData.elements.customerRating).click({force: true})
    // Select the price range
    commonPage.moveMinPriceHandle()
    cy.wait(2000)
    commonPage.moveMaxPriceHandle()
    cy.wait(2000)
    // Click on submit button in price range slider
    commonPage.goPriceRangeButton()
    cy.wait(2000)
    // Click on sorting dropdown (low to high)
    commonPage.selectOptionsFromSortingDropdown(homeData.elements.lowToHighSorting)
    // Select 5th search result and add to cart
    commonPage.clickOnAddToCartByIndex(homeData.elements.addToCartButton, 5)
    cy.wait(2000)
    // Go to the cart page
    commonPage.clickOnElementById(homeData.elements.cartIcon)
    cy.wait(2000)
    // Click on the checkout button
    commonPage.clickOnCheckoutButton(cartData.elements.checkoutButton)
    cy.wait(2000)
    // Click use this address button
    commonPage.clickElementByDataAction(cartData.elements.useThisAddressButton)
    cy.wait(5000)
    // Verify order summary heading and delivery price
    commonPage.verifyOrderSummary('delivery', deliveryPrice)
    // 
  })
})
