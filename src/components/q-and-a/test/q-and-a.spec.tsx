import { newSpecPage } from '@stencil/core/testing';
import { QAndA } from '../q-and-a';

describe('q-and-a', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QAndA],
      html: `<q-and-a></q-and-a>`,
    });
    expect(page.root).toEqualHtml(`
      <q-and-a>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </q-and-a>
    `);
  });
});
