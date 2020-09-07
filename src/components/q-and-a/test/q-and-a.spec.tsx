import { newSpecPage } from '@stencil/core/testing';
import { QAndA } from '../q-and-a';
import { resetStore } from '../../../store';
import { QaQuestionForm } from '../../qa-question-form/qa-question-form';

describe('q-and-a', () => {
  beforeEach(() => {
    resetStore();
  });
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QAndA, QaQuestionForm],
      html: `<q-and-a></q-and-a>`,
    });
    expect(page.root).toEqualHtml(`
      <q-and-a>
       <qa-question-form></qa-question-form>
      </q-and-a>
    `);
  });
});
