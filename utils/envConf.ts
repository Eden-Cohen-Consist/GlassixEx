// helper function to check if a variable is inside the env
const checkEnv = (name: string): string => {
  const value: string | undefined = process.env[name];
  if (!value) {
    console.error(`Missing required env variable: ${name}`);
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value ?? "";
};

export const envConf = {
  port: parseInt(checkEnv("PORT")) || 3000,
  apiUser: checkEnv("API_USER"),
  apiKey: checkEnv("API_KEY"),
  apiSecret: checkEnv("API_SECRET"),
  workspace: checkEnv("WORKSPACE"),
  consistToken: checkEnv("CONSIST_TOKEN"),
};
