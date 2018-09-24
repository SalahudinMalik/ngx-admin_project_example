export class Globals {
  // hostname: string = window.location.hostname;
  // hostname: string = "192.168.0.123";
  hostname: string = "35.240.250.237";
  // hostname: string = 'localhost';
  // port: string = window.location.port;
  weburl: string = "http://" + this.hostname + ":1337";
  // weburl: string = "https://shy-sheep-93.localtunnel.me/";
  fn_parseFloatIgnoreCommas(varString: String): any {
    const stringWithoutComma = varString.replace(",", "");
    return parseFloat(stringWithoutComma);
  }
}
