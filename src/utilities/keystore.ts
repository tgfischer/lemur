const sanitize = (value: string): string =>
  value.replace(/[&/\\#@,+()$~%.'":*?<>^{}`!-=;]/g, "_");

export const getKeystoreKey = (
  instanceUrl: string,
  username: string,
): string => {
  return `${sanitize(instanceUrl)}.${sanitize(username)}`;
};
