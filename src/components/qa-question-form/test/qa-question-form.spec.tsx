import { newSpecPage } from '@stencil/core/testing';
import { QaQuestionForm } from '../qa-question-form';

describe('qa-question-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QaQuestionForm],
      html: `<qa-question-form></qa-question-form>`,
    });
    expect(page.root).toEqualHtml(`
      <qa-question-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </qa-question-form>
    `);
  });
});
