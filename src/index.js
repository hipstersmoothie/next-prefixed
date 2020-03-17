import React from 'react';
import NextLink from 'next/link';
import getConfig from 'next/config';

const getAssetPrefix = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  return publicRuntimeConfig.assetPrefix || '';
};

const assetPrefix = getAssetPrefix();

const prefixPath = path =>
  assetPrefix.replace(/\/+$/, '') + '/' + (path || '').replace(/^\/+/, '');

export const prefixURL = url => {
  if (typeof url === 'object') {
    return Object.assign({}, url, { pathname: prefixPath(url.pathname) });
  }

  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url) ? url : prefixPath(url);
};

export const Image = props => <img {...props} src={prefixURL(props.src)} />;

export const Link = props => (
  <NextLink {...props} as={prefixURL(props.as || props.to || props.href)} />
);
