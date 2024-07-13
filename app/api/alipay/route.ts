import { NextResponse } from "next/server";

import { AlipaySdk } from "alipay-sdk";

const alipayAppId = "2021004159616308";

const privateKey =
  "MIIEpAIBAAKCAQEAmuJlU6lX9qSSgLSyoO5OKwbJ2cDGpi70LW/sDtPne/4e08WgufK23TOE2ja6sujprRYVpABJKyjVChrP53WnTY7LVRv1SEWxsp+PreB4jz49H2IkwQCaxRCtyG+sHm3AYuFSZ4YyzIn9YhMf4cAFL26+O+1MYiFMuyqKD+DkCm6PgzGOr7uiBBoSSG7pqBsHGo1m7wuzI59jVh4sz9CTxxIolDVqT5JyI4oBxORuj7MK9/GV57t7ezx3bEOuk5/xSQ99D4QuGasAf2Yx6AtbcDvevNqbh8CnMCpHEb9P+VmNhn9fUezSp7e032tmI9OLuAxzdeKDLZnSQdJKkbEkIQIDAQABAoIBAQCEu6hifinoMTlsG29KA2/x56tsdYzINk0D83q1alxjInCAxEjtklesUc50w5pUYM6Biv+YwLXzytZoBnpNvcJW8RzIH2GhQjj6/0s+k7Q97fSrxIwC6uW4JIcJ0soKebv6AWeBWLyIFWmUdxdHfCv1bk6RRNfE8Qy1Ccuvt+c2GBxekQe672EU97WXpR4ryg6Q6zFkqz55xnzdtMX1uy0+bnVx25mIQDTrlMSYjNhcB75ylFxXa78lp0lHCjBkHITdQJh216YWxy+yZBrCIu9/666oXtqE2T9ihI/SpJOnofMHaE+A4ewv71WG1zqogOAVtYPOH9f6jKdux8+68pfRAoGBAM4GRpufewIT67smthHHBKepKNyeuZ4eD2ah+NkWGfxRtZtzJjYlj2cEMvTpNXR0mZnhZN3WhVp44a37aCBfzwhN6W3ByYhhN8DOPxUp1cKBTc6nMttj6hJ3y4/epzrgCWKC822B78Iui7pjJJLMOjl5W4Wt4k4hlbGvSPLoZjmrAoGBAMB0akYFTIMcgAvDI357Z5r1OP2wQZX0v3O5ME3vM6IwoIWdsNYIBNfV+9VHr2kQUtgSZezxI/CKk0/bbY//Ni+o4LblzeonUKtGE0UwuAYhw+82I2zpKuwuhAIerAuipmBkU6qXcZBiAC2B/4fFO2K7vUPk5pAf7EU0JrZdmYVjAoGATf/6Q3kBrSu1l8l0LQ7YKFHW8o/1XnOrCQRRnn7Ln8efphbWZLGbtTjVwft5DXoHnUbEVWieXD5f0urX5UngrBgzRCaWElgcL5bmMzD/iQBDYPXUP1N4jz1jiDiXv6aKZw2E8/S5vR66L/rRIfLIKHJVwCqw/zuf3QGr8Ksj6LkCgYByQyvtkqvQlBU55oumRqJGkB1cEU9/NqaMkICrZL9lJjXH3s3k5THq63LvN/ZfDIADJTk6qhjKcZvwp7iu67lCJqP0MxBEWz870QkT5U785QMtfRkfSnhfbWaW05sV9WWOiUJbYDrenDC61BnghCsz/X7rVnXFUA65L7NkRsIlPQKBgQDHA4y5cF74kN9SdMxvEbina9U06KZhMEvIH87khOpD5N+5twawRyobHqLf+e/cEEsuVbkOiY21uoyqMnwTlHoLS0TKaXcI1/KiqlfqqTpFGLwyqRNiLHI0bZ01PCBB+vLSTJC4IywLahrHkCD6WH//iiORNXzhCLpt2a6GN/XgHw==";

const alipayPublicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgxchrHVVIBxI7QiFOg//yARhRfT+1Uf0RKJ+f0lFdiEL1/gd02fsmLNw5DZJDxU1d/SeQd8NB6+d1uuvh05gNL/ncXdD973wleAMPBJ4iV127YJyxeDLkSsS8edQdQT89ccAX6EG5ziX2LEEEggsHvSm71HzQowQkb+TKprUEKs66WMXis01G2+Crev0zZfjdSu5LpSKiMxSxn7qysYfb4x7Og/O7l0W5NXzL7OY2Rn9fcLsY+leAkF436IaL3ZfdUYOHRCKi7jtHjQtdE2rf18guZaWXNxOWV8EbYl5T8tSJUFtZsmtnqBoVxvhv9mczlwEGDCulMvDJMwuqOclxwIDAQAB";
// 实例化客户端
const alipaySdk = new AlipaySdk({
  // 设置应用 ID
  appId: alipayAppId,
  // 设置应用私钥
  privateKey: privateKey,
  // 设置支付宝公钥
  alipayPublicKey: alipayPublicKey,
  // 密钥类型，请与生成的密钥格式保持一致，参考平台配置一节
  keyType: "PKCS1",
  signType: "RSA2",
  gateway: "https://openapi.alipay.com/gateway.do",
  // 设置网关地址，默认是 https://openapi.alipay.com
  //endpoint: 'https://openapi.alipay.com/gateway.do',
});

async function handle() {
  console.log("david api/alipay");
  const result = await alipaySdk.curl(
    "POST",
    "/v3/alipay/user/deloauth/detail/query",
    {
      body: {
        date: "20230102",
        offset: 20,
        limit: 1,
      },
    },
  );

  console.log("alipaySdk ---", result);

  const timestamp = Math.floor(Date.now() / 1000);
  const bizContent = {
    out_trade_no: "geeks_pay_" + timestamp,
    product_code: "FAST_INSTANT_TRADE_PAY",
    subject: "geeks的第一笔入账",
    body: "234",
    total_amount: "0.1",
    qr_pay_mode: 2,
  };

  // 支付页面接口，返回 HTML 代码片段，内容为 Form 表单
  let result2 = alipaySdk.pageExecute("alipay.trade.page.pay", "POST", {
    bizContent,
    returnUrl: "http://x-geeks.com",
  });
  console.log("alipaySdk pay  ---", typeof result2);
  return NextResponse.json({ alipay_fromdata: result2 });
}

export const POST = handle;
