import { newSpecPage } from '@stencil/core/testing';
import { QaQuestionList } from '../QuestionList';

describe('qa-question-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QaQuestionList],
      html: `<qa-question-list></qa-question-list>`,
    });
    expect(page.root).toEqualHtml(`
      <qa-question-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </qa-question-list>
    `);
  });
});
