describe('人口チャートテスト', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('クリックしてチャートが表示されるかどうか', () => {
    it('いくつかの都道府県をチェックしてみる', () => {
      // 以下の都道府県が表示されているか確認
      cy.contains('北海道').click();
      cy.contains('東京都').click();
      cy.contains('佐賀').click();

      cy.wait(1000);

      // 最終状態のチャートの確認
      cy.get('.recharts-surface').should('be.visible');
      cy.wait(1000);
    });
  });

  // 人口カテゴリの変更とチャート表示
  describe('カテゴリの変更', () => {
    beforeEach(() => {
      cy.contains('北海道').click();
      cy.contains('東京').click();
      cy.contains('佐賀').click();
      cy.wait(1000);
    });

    it('セレクトボタンを変更した際にチャートがアップデートされるか', () => {
      // 初期状態のチャートの確認
      cy.get('.recharts-surface').should('be.visible');

      // 人口カテゴリの変更
      cy.get('.chakra-select').select('年少人口');
      cy.wait(1000);

      // 最終状態のチャートの確認
      cy.get('.recharts-surface').should('be.visible');
      cy.wait(1000);
    });
  });

  // 都道府県の選択解除とチャート表示
  describe('都道府県の選択解除', () => {
    beforeEach(() => {
      cy.contains('北海道').click();
      cy.contains('東京').click();
      cy.contains('佐賀').click();
      cy.wait(1000);
    });

    it('選択した都道府県のチェックを外す', () => {
      // 初期状態のチャートの確認
      cy.get('.recharts-surface').should('be.visible');

      // 都道府県の選択解除
      cy.contains('北海道').click();
      cy.contains('東京').click();
      cy.wait(1000);

      // 最終状態のチャートの確認
      cy.get('.recharts-surface').should('be.visible');
      cy.wait(1000);
    });
  });
});
