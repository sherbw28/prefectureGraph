// cypress/integration/populationChart.cy.ts
describe('グラフ描画', () => {
  it('チェックした時にグラフが描画されるか', () => {
    cy.visit('http://localhost:3000');

    // '北海道'のチェックボックスを取得し、クリックする
    cy.contains('北海道').click();

    // グラフが描画されるまで待つ
    cy.get('.recharts-surface').should('be.visible');
  });

  it('チェックを外した時にグラフが消えるか', () => {
    cy.visit('http://localhost:3000');

    // '北海道'のチェックボックスを取得し、クリックする
    cy.contains('北海道').click();

    // グラフが描画されるまで待つ
    cy.get('.recharts-surface').should('be.visible');

    // '北海道'のチェックボックスを取得し、クリックしてチェックを外す
    cy.contains('北海道').click();
  });
});
