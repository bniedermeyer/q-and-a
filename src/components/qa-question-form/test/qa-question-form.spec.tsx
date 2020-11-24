import { newSpecPage } from '@stencil/core/testing';
import { QaQuestionForm } from '../qa-question-form';
import state, { disposeStore } from '../../../store';

describe('qa-question-form', () => {
  beforeEach(() => {
    disposeStore();
    state.primaryColor = '#10915b';
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [QaQuestionForm],
      html: `<qa-question-form></qa-question-form>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
