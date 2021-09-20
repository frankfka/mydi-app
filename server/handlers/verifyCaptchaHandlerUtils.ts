export type CaptchaVerificationResult = {
  success: boolean;
  challenge_ts: string; // ISO string for when the captcha was completed
  hostname: string; // Hostname of site where captcha was solved
  error_codes?: any[];
};

export const verifyCaptchaToken = async (
  captchaToken: string
): Promise<CaptchaVerificationResult> => {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    method: 'POST',
  });

  return response.json();
};
