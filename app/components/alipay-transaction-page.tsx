import { useEffect, useState } from "react";
import { getHeaders } from "../client/api";

export function AlipayTransactionPage() {
  const [alipayData, setAlipayData] = useState({ alipayHtml: "", formId: "" });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/alipay", {
          method: "post",
          body: null,
          headers: {
            ...getHeaders(),
          },
        });
        const html = await response.json();
        const alipayHtml = html["alipay_fromdata"];

        const formIdMatch = alipayHtml.match(/id="alipaySDKSubmit(\d+)"/);
        const formId = formIdMatch ? `alipaySDKSubmit${formIdMatch[1]}` : "";
        console.log("alipay_fromdata: ", alipayHtml);
        setAlipayData({ alipayHtml, formId });
      } catch (error) {
        console.error("Error fetching the Alipay form data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (alipayData.alipayHtml && alipayData.formId) {
      const script = document.createElement("script");
      script.innerHTML = `document.forms["${alipayData.formId}"].submit();`;
      document.body.appendChild(script);
    }
  }, [alipayData]);

  return (
    <div>
      <h1>...</h1>
      <div dangerouslySetInnerHTML={{ __html: alipayData.alipayHtml }} />
    </div>
  );
}
