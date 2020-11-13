jest.mock('../../../utils/utils');

import { newSpecPage } from '@stencil/core/testing';
import { QAndA } from '../q-and-a';
import state, { disposeStore } from '../../../store';
import { QaQuestionForm } from '../../qa-question-form/qa-question-form';

describe('q-and-a', () => {
  beforeEach(() => {
    disposeStore();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [QAndA, QaQuestionForm],
      html: `<q-and-a></q-and-a>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('should set the state according to the properties supplied', async () => {
    const page = await newSpecPage({
      components: [QAndA, QaQuestionForm],
      html: `<q-and-a ask-endpoint="/test-endpoint"
                      retrieve-endpoint="/test-retrieve"
                      user-id="abc123"
                      correlation-id="corr123"
                      primary-color="#585859"
                      secondary-color="#72d373"
                      polling-interval="3000" ></q-and-a>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(state).toMatchSnapshot();
  });

  it('should update the correlation id if it changes', async () => {
    const page = await newSpecPage({
      components: [QAndA, QaQuestionForm],
      html: `<q-and-a></q-and-a>`,
    });
    expect(state).toMatchSnapshot();
    page.rootInstance.correlationId = 'corr1234';
    await page.waitForChanges();
    expect(state).toMatchSnapshot();
  });
});
