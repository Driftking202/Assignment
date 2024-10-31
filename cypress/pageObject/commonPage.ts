import { runInThisContext } from "vm";
import * as cartData from "../fixtures/cartData"

class commonPage{

/**
 * To get element by text attribute
 * @param value: Text element
 * @returns 
 */
elementByText(value: string){
    return cy.xpath(`//*[text()="${value}"]`)
}

/**
 * To perform actions on element by text attribute
 * @param condition: visible/notVisible/click
 * @param value: Text element
 */
actionsOnElementByText(condition: string, value: string){
    switch (condition) {
        case "visible":
            cy.wait(1000)
            this.elementByText(value).should("be.visible")
            break;
        case "notVisible":
            cy.wait(1000)
            this.elementByText(value).should("not.be.visible")
            break;
        case "click":
            cy.wait(1000)
            this.elementByText(value).should("be.visible").scrollIntoView().click({force : true})
            break;
        default:
    }
}

/**
 * To click on element by HREF attribute
 * @param value: href element
 * @returns 
 */
clickOnElementByHref(value: string) {
    return cy.xpath(`//*[@href='${value}']`).should("be.visible").scrollIntoView().click({force: true})
}
/**
 * To get element by ID attribute
 * @param value: ID element
 * @returns 
 */
getElementById(value: string) {
    return cy.xpath(`//*[@id='${value}']`).should("be.visible")
}

/**
 * To click on element by ID attribute
 * @param value: ID element
 */
clickOnElementById(value: string) {
    this.getElementById(value).scrollIntoView().click({force: true})
}

/**
 * To get element by Type attribute
 * @param value: Type element
 * @returns 
 */
getElementByType(value: string) {
    return cy.xpath(`//*[@type='${value}']`)
}

/**
 * To click on element by Type attribute
 * @param value: Type element
 */
clickOnElementByType(value: string) {
    this.getElementByType(value).should('be.visible').click({force: true})
}

/**
 * Get element by text contains attribute
 * @param value: Text element
 * @returns 
 */
elementByTextContains(value: string) {
    return cy.xpath(`//*[contains(text(),'${value}')]`)
}

/**
 * To perform actions on element by text contains attribute
 * @param value: Text element
 */
actionsOnElementByTextContains(condition: string, value: string){
    switch (condition) {
        case "visible":
            cy.wait(1000)
            this.elementByTextContains(value).should("be.visible")
            break;
        case "notVisible":
            cy.wait(1000)
            this.elementByTextContains(value).should("not.be.visible")
            break;
        case "click":
            cy.wait(1000)
            this.elementByTextContains(value).should("be.visible").click({force : true})
            break;
        default:
    }
}

/**
 * To get element by placeholder attribute
 * @param value: Placeholder element
 * @returns 
 */
elementByPlaceholder(value: string) {
    return cy.xpath(`//*[@placeholder="${value}"]`)
}

/**
 * To click on element by placeholder attribute
 * @param value: Placeholder element
 * @returns 
 */
clickOnElementByPlaceholder(value: string) {
    this.elementByPlaceholder(value).should('be.visible').click({force: true})
}

/**
 * To click on element by data action by attribute
 * @param value: Data action element
 * @returns 
 */
clickElementByDataAction(value: string) {
    return cy.xpath(`//*[@data-action="${value}"]`).should('be.visible').click({force: true})
}

/**
 * To select sorting options from sorting dropdown
 * @param option: Featured/Low to High/High to Low/Avg Customer Review/Newest Arrival/Best Arrival
 */
selectOptionsFromSortingDropdown(option: string) {
    cy.xpath(`//*[@class="a-button-text a-declarative"]`).click({force: true})
    cy.wait(2000)
    this.clickOnElementById(option)
    cy.wait(3000)
}

/**
 * To click on Add to card button 
 * @param value: Add to cart text
 * @param index: Indexing which product to choose
 * @returns 
 */
clickOnAddToCartByIndex(value: string, index: number) {
    return cy.xpath(`(//*[@class="a-button-text"][contains(text(),"${value}")])[${index}]`).scrollIntoView().click({force: true})
    // cy.wait(2000)
}

/**
 * To click on decrease quantity by one in cart icon
 */
decreaseQuantityByOneInCart(){
    return cy.xpath(`//*[@aria-label="Decrease quantity by one"]`).should('be.visible').click({force: true})
}

/**
 * To click on checkout button in cart page
 */
clickOnCheckoutButton(value: string) {
    return cy.xpath(`//*[@name="${value}"]`).should('be.visible').should('be.visible').click({force: true})
}

/**
 * Get details in order summary in checkout page
 * @param option: Items:/Delivery:
 * @param price: Product price
 * @returns 
 */
getDetailsInOrderSummary(option: string, price: string) {
    return cy.xpath(`(//*[contains(text(),"${option}")]//following-sibling::td[contains(text(),"${price}")])[2]`)
}

/**
 * To verify the product price at order summary
 * @param price: Product price
 */
verifyOrderSummary(condition: string, price: string) {
    // Verify order summary heading
    this.actionsOnElementByText(cartData.elements.orderSummaryText, 'visible')
    cy.wait(500)
    switch (condition) {
        case "delivery":
            // Verify details in order summary
            this.getDetailsInOrderSummary(cartData.elements.deliveryText, price).should('be.visible')
            break;
        case "item":
            this.getDetailsInOrderSummary(cartData.elements.itemsText, price).should('be.visible')
            break;
        default:
    }   
}

/**
 * To click on submit button in price range slider
 */
goPriceRangeButton() {
    return cy.xpath(`//*[@aria-label="Go - Submit price range"]`).should('be.visible').click({force: true})
}
// To get minimum price handle in price range slider
minPriceHandle(){
    return cy.xpath(`//*[@id="p_36/range-slider_slider-item_lower-bound-slider"]`)
}

// To get maximum price handle in price range slider
maxPriceHandle(){
    return cy.xpath(`//*[@id="p_36/range-slider_slider-item_upper-bound-slider"]`)
}

moveMinPriceHandle() {
// Move minimum price handle
   this.minPriceHandle().trigger('mousedown', { which: 1, force: true })
  .trigger('mousemove', { clientX: 100, force: true }) // Adjust clientX based on target value
  .trigger('mouseup', {force: true});
}

moveMaxPriceHandle(){
// Move maximum price handle
   this.maxPriceHandle().trigger('mousedown', { which: 1, force: true })
  .trigger('mousemove', { clientX: 300, force: true }) // Adjust clientX based on target value
  .trigger('mouseup', {force: true});
}

}
export default new commonPage