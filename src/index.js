import React from 'react';
import NextLink from 'next/link';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const prefixURL = url => publicRuntimeConfig.assetPrefix.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');

export const Image = props => <img {...props} src={prefixURL(props.src)} />;

export const Link = props => (
  <NextLink {...props} as={prefixURL(props.as || props.to || props.href)} />
);
