import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const magicPublicKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;
if (!magicPublicKey) {
  throw Error('Magic publishable key not defined');
}

export const createClientMagicInstance = () => {
  if (typeof window === 'undefined') {
    throw Error('Creating magic instance without browser window');
  }
  return new Magic(magicPublicKey, {
    extensions: [new OAuthExtension()],
  });
};
