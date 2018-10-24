import React from 'react';
import renderer from 'react-test-renderer';

import { prefixURL, Image, Link } from '../src';

const render = element => renderer.create(element).toJSON();

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { assetPrefix: 'my_prefix' }
}));

test('prefixURL', () => {
  expect(prefixURL('/blog')).toBe('my_prefix/blog');
});

test('Image', () => {
  expect(render(<Image src="static/foo.png" alt="Cabo" />)).toMatchSnapshot();
});

test('Link', () => {
  expect(
    render(
      <Link to="blog/first">
        <a>First Post</a>
      </Link>
    )
  ).toMatchSnapshot();
  expect(
    render(
      <Link href="blog/second">
        <a>Second Post</a>
      </Link>
    )
  ).toMatchSnapshot();
  expect(
    render(
      <Link to="blog/first" as="bananas">
        <a>First Post</a>
      </Link>
    )
  ).toMatchSnapshot();
});
