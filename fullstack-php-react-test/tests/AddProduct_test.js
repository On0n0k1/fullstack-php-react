const { I } = inject();

Feature('Add Products');

Scenario('Add a disc', ({ I }) => {
  I.amOnPage('/');
  I.click('ADD');
  I.seeElement('#product_form');
  I.fillField('#sku', 'SKUTest000');
  I.fillField('#name', 'NameTest000');
  I.fillField('#price', '25');
  I.waitForElement('#productType');
  I.selectOption('#productType','DVD');
  I.waitForElement('#size');
  I.fillField('#size','200');
  I.click('Save');
});

Scenario('Add a book', ({ I }) => {
  I.amOnPage('/');
  I.click('ADD');
  I.seeElement('#product_form');
  I.fillField('#sku', 'SKUTest001');
  I.fillField('#name', 'NameTest001');
  I.fillField('#price', '25');
  I.waitForElement('#productType');
  I.selectOption('#productType','Book');
  I.waitForElement('#weight');
  I.fillField('#weight','200');
  I.click('Save');
});

Scenario('Add a furniture', ({ I }) => {
  I.amOnPage('/');
  I.click('ADD');
  I.seeElement('#product_form');
  I.fillField('#sku', 'SKUTest002');
  I.fillField('#name', 'NameTest002');
  I.fillField('#price', '25');
  I.waitForElement('#productType');
  I.selectOption('#productType','Furniture');
  I.waitForElement('#height');
  I.waitForElement('#width');
  I.waitForElement('#length');
  I.fillField('#height','200');
  I.fillField('#width','200');
  I.fillField('#length','200');
  I.click('Save');
});

Scenario('Check for Book product', ({ I }) => {
  I.amOnPage('/');
  I.waitForText('NameTest000');
});

Scenario('Check for Disc product', ({ I }) => {
  I.amOnPage('/');
  I.waitForText('NameTest001');
});

Scenario('Check for Furniture product', ({ I }) => {
  I.amOnPage('/');
  I.waitForText('NameTest002');
});