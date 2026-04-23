import { test, expect, type Locator } from '@playwright/test';

test.describe('Burger constructor test', () => {
  let firstBun: Locator;
  let firstBunName: Locator;
  let secondBun: Locator;
  let burgerConstructor: Locator;
  let ingredientsScroll: Locator;
  let ingredientsDragScroll: Locator;
  let firstBunCounter: Locator;
  let secondBunCounter: Locator;
  let firstIngredient: Locator;
  let secondIngredient: Locator;
  let firstDragItem: Locator;
  let secondDragItem: Locator;
  let modal: Locator;

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.com', name: 'test' },
        }),
      });
    });

    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          order: {
            number: 500,
          },
          name: 'Бурегр',
        }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'fake-token');
    });

    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false,
    });

    await page.goto('http://localhost:5173');

    firstBun = page.getByTestId('bun-0');
    firstBunName = firstBun.getByTestId('bun-0-name');

    secondBun = page.getByTestId('bun-1');

    burgerConstructor = page.getByTestId('burger-constructor');
    ingredientsScroll = page.getByTestId('ingredients-scroll');
    ingredientsDragScroll = page.getByTestId('ingredients-drag-scroll');

    firstBunCounter = firstBun.locator('.counter');
    secondBunCounter = secondBun.locator('.counter');

    firstIngredient = page.getByTestId('main-0');
    secondIngredient = page.getByTestId('main-1');

    firstDragItem = page.getByTestId('drag-ingredient-0');
    secondDragItem = page.getByTestId('drag-ingredient-1');

    modal = page.getByTestId('modal');
  });

  test('should use HAR-file and get ingredients', async () => {
    await expect(ingredientsScroll).toBeVisible();

    await expect(firstBun).toBeVisible();
    await expect(firstBunName).toContainText('Краторная булка N-200i');
  });

  test('bun DND work', async () => {
    // проверка перетаскивания булочки
    await firstBun.dragTo(burgerConstructor);
    const constructorElementTop = burgerConstructor.locator(
      '.constructor-element_pos_top'
    );
    const constructorElementBottom = burgerConstructor.locator(
      '.constructor-element_pos_bottom'
    );

    await expect(constructorElementTop).toBeVisible();
    await expect(constructorElementTop).toContainText('Краторная булка N-200i');

    await expect(constructorElementBottom).toBeVisible();
    await expect(constructorElementBottom).toContainText('Краторная булка N-200i');

    await expect(firstBunCounter).toBeVisible();
    await expect(firstBunCounter).toHaveText('2');

    // проверка замены булочки
    await secondBun.dragTo(burgerConstructor);
    await expect(constructorElementTop).toContainText('Флюоресцентная булка R2-D3');

    await expect(constructorElementBottom).toContainText('Флюоресцентная булка R2-D3');
    await expect(firstBunCounter).not.toBeVisible();

    await expect(secondBunCounter).toBeVisible();
    await expect(secondBunCounter).toHaveText('2');
  });

  test('ingredients and constructor elements DND work', async ({ page }) => {
    // Перетаскивание внутрь конструктора
    const ingredients = ingredientsDragScroll.locator('li');
    await firstIngredient.dragTo(ingredientsDragScroll);
    await secondIngredient.dragTo(ingredientsDragScroll);

    await expect(ingredients.nth(0)).toContainText('Хрустящие минеральные кольца');
    await expect(ingredients.nth(1)).toContainText('Плоды Фалленианского дерева');

    // Перетаскивание внутри конструктора
    const firstItemBox = await firstDragItem.boundingBox();
    const secondItemBox = await secondDragItem.boundingBox();

    if (!firstItemBox || !secondItemBox) {
      throw new Error('Не удалось получить координаты элементов для DnD');
    }

    await page.mouse.move(
      secondItemBox.x + secondItemBox.width / 2,
      secondItemBox?.y + secondItemBox.height / 2
    );
    await page.mouse.down();
    await page.waitForTimeout(100);

    await page.mouse.move(
      firstItemBox.x + firstItemBox.width / 2,
      firstItemBox.y + firstItemBox.height / 2,
      { steps: 5 }
    );
    await page.waitForTimeout(100);

    await page.mouse.up();
    await page.waitForTimeout(500);

    await expect(ingredients.nth(0)).toContainText('Плоды Фалленианского дерева');
    await expect(ingredients.nth(1)).toContainText('Хрустящие минеральные кольца');

    // Перетаскивание вне конструктора
    await page.mouse.move(
      secondItemBox.x + secondItemBox.width / 2,
      secondItemBox.y + secondItemBox.height / 2
    );
    await page.mouse.down();
    await page.waitForTimeout(100);

    await page.mouse.move(0, 0, { steps: 10 });
    await page.waitForTimeout(100);
    await page.mouse.up();
    await page.waitForTimeout(500);

    await expect(ingredients.nth(0)).toContainText('Плоды Фалленианского дерева');
    await expect(ingredients.nth(1)).toContainText('Хрустящие минеральные кольца');
  });

  test('ingredient modal open and close', async ({ page }) => {
    // Проверка открытия
    await firstBun.click();
    await expect(modal).toBeVisible();
    await expect(page.getByTestId('ingredient-details-name')).toHaveText(
      'Краторная булка N-200i'
    );

    // Проверка закрытия
    await modal.locator('svg').click();
    await expect(modal).not.toBeVisible();

    await firstBun.click();
    await expect(modal).toBeVisible();
    await modal.focus();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    await firstBun.click();
    await expect(modal).toBeVisible();
    await modal.focus();

    await page
      .getByTestId('modal-overlay')
      .click({ position: { x: 5, y: 5 }, force: true });
    await expect(modal).not.toBeVisible();
  });

  test('create order and order modal open', async ({ page }) => {
    const button = page.getByTestId('create-order').getByRole('button');
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();

    await firstIngredient.dragTo(ingredientsDragScroll);
    await expect(button).toBeDisabled();

    await firstBun.dragTo(burgerConstructor);
    await expect(button).toBeEnabled();

    await button.click();
    await expect(modal).toBeVisible();
    await expect(page.getByTestId('order-number')).toContainText('500');
  });

  test('price summary', async ({ page }) => {
    const bunPrice = await firstBun.getByTestId('bun-0-price').textContent();
    const firstIngredientPrice = await firstIngredient
      .getByTestId('main-0-price')
      .textContent();
    const secondIngredientPrice = await secondIngredient
      .getByTestId('main-1-price')
      .textContent();

    await firstBun.dragTo(burgerConstructor);
    await firstIngredient.dragTo(ingredientsDragScroll);
    await secondIngredient.dragTo(ingredientsDragScroll);

    const orderPrice = await page.getByTestId('order-price').textContent();
    if (!bunPrice && !firstIngredientPrice && !secondIngredientPrice) {
      throw new Error('Не удалось получить цену ингредиентов');
    }
    const ingredientsSumPrice =
      Number(bunPrice) * 2 +
      Number(firstIngredientPrice) +
      Number(secondIngredientPrice);

    expect(Number(orderPrice)).toBe(Number(ingredientsSumPrice));
  });
});
