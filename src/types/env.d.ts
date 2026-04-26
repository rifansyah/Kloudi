declare module "react-native-config" {
  interface Env {
    APP_NAME: string;
    APP_ENV: string;
    API_URL: string;
  }

  const Config: Env;
  export default Config;
}
