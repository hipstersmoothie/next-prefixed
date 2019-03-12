import React from 'react';
import renderer from 'react-test-renderer';

const render = element => renderer.create(element).toJSON();

['my_prefix', 'a-prefix/', 'a/path', 'some-prefix////'].forEach(prefix => {
  describe(`[with prefix ${prefix}]`, () => {
    beforeEach(() => {
      jest.resetModules();
      jest.doMock('next/config', () => () => ({
        publicRuntimeConfig: { assetPrefix: prefix }
      }));
    });

    test('prefixURL relative URLs', () => {
      const { prefixURL } = require('../src');
      expect(prefixURL('/blog')).toBe(`${prefix.replace(/\/+$/, '')}/blog`);
      expect(prefixURL('blog')).toBe(`${prefix.replace(/\/+$/, '')}/blog`);
      expect(prefixURL('/myfolder/test.txt')).toBe(
        `${prefix.replace(/\/+$/, '')}/myfolder/test.txt`
      );
      expect(prefixURL('www.stuff.com')).toBe(
        `${prefix.replace(/\/+$/, '')}/www.stuff.com`
      );
      expect(prefixURL('#//foobar')).toBe(
        `${prefix.replace(/\/+$/, '')}/#//foobar`
      );
    });

    test('prefixURL absolute URLs', () => {
      const { prefixURL } = require('../src');
      expect(prefixURL('http://example.com')).toBe('http://example.com');
      expect(prefixURL('HTTP://EXAMPLE.COM')).toBe('HTTP://EXAMPLE.COM');
      expect(prefixURL('https://www.example.com')).toBe(
        'https://www.example.com'
      );
      expect(prefixURL('ftp://example.com/file.txt')).toBe(
        'ftp://example.com/file.txt'
      );
      expect(prefixURL('//cdn.example.com/lib.js')).toBe(
        '//cdn.example.com/lib.js'
      );
      expect(prefixURL('mailto:evan@nylas.com')).toBe('mailto:evan@nylas.com');
      expect(prefixURL('C://something')).toBe('C://something');
      expect(prefixURL('tel:12345')).toBe('tel:12345');
    });

    test('prefixURL object URLs', () => {
      const { prefixURL } = require('../src');
      expect(prefixURL({ pathname: 'blog' })).toEqual({
        pathname: `${prefix.replace(/\/+$/, '')}/blog`
      });
      expect(prefixURL({})).toEqual({
        pathname: `${prefix.replace(/\/+$/, '')}/`
      });
    });

    test('Image', () => {
      const { Image } = require('../src');
      expect(
        render(<Image src="static/foo.png" alt="Cabo" />)
      ).toMatchSnapshot();
    });

    test('Link', () => {
      const { Link } = require('../src');
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
  });
});
