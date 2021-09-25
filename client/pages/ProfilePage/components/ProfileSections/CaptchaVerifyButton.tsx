import React, { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { getLogger } from '../../../../../util/logger';
import { ButtonProps } from '@mui/material';
import LoaderButton from '../../../../components/LoaderButton';

type Props = {
  onCaptchaVerified(token: string): void;
  loading: boolean;
} & ButtonProps;

const hCaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
if (!hCaptchaSiteKey) {
  throw Error('HCaptcha site key not defined');
}

const logger = getLogger('CaptchaVerifyButton');

const CaptchaVerifyButton: React.FC<Props> = ({
  onCaptchaVerified,
  loading,
  disabled,
  ...rest
}) => {
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string>();

  const disableButton = loading || disabled;

  const onStartVerificationClicked = () => {
    if (captchaRef.current == null) {
      logger.warn('No Captcha Ref');
      return;
    }
    captchaRef.current.execute();
  };

  // Execute callback on token change
  useEffect(() => {
    if (captchaToken != null && !disableButton) {
      // Execute verified callback
      onCaptchaVerified(captchaToken);

      // Reset captcha state
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(undefined);
    }
  }, [captchaToken, setCaptchaToken, onCaptchaVerified, disableButton]);

  const onExpire = () => {
    logger.debug('hCaptcha Token Expired');
  };

  const onError = (event: string) => {
    logger.debug(`hCaptcha Error: ${event}`);
  };

  return (
    <LoaderButton
      variant="outlined"
      loading={loading}
      progressProps={{
        color: 'primary',
      }}
      onClick={onStartVerificationClicked}
      disabled={disableButton}
      {...rest}
    >
      Verify Now
      <HCaptcha
        ref={captchaRef}
        sitekey={hCaptchaSiteKey}
        onVerify={setCaptchaToken}
        onError={onError}
        onExpire={onExpire}
        size="invisible"
      />
    </LoaderButton>
  );
};

export default CaptchaVerifyButton;
