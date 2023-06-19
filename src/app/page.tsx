// @ts-nocheck
"use client";

import { useCallback, useEffect, useState } from "react";

const ADDI_AUTHENTICATION_TEST_URL = "https://api.staging.addi.com";

const ADDI_API_TEST_URL = "https://api.addi-staging.com";

type AddiToken = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
};

export default function Home() {
  const [jwt, setJwt] = useState<AddiToken>({
    access_token: "",
    scope: "",
    expires_in: 0,
    token_type: "",
  });
  const [price, setPrice] = useState<number>(0);

  const getAddiAuthorization = async () => {
    const body = {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
    };

    fetch(`${ADDI_AUTHENTICATION_TEST_URL}/oauth/token`, {
      body: JSON.stringify(body),
      method: "POST",
    })
      .then(async (response) => {
        let info = await response.json();
        debugger;
        setJwt(info);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createApplication = useCallback(() => {
    // change todo
    const body = {
      orderId: "",
      totalAmount: price,
      shippingAmount: 0,
      currency: "COP", // only supported COP
      items: [],
      suppliers: [],
      client: {},
      allyUrlRedirection: {
        logoUrl: "",
        useCallbackUrl: "",
        redirectionUrl: "",
      },
      // optional
      // totalTaxesAmount: 0,
      // shippingAddress: {},
      // billingAddress: {},
      // pickUpAddress: {},
      // geoLocation: {}
    };

    if (!jwt || !jwt.access_token) return;

    fetch(`${ADDI_AUTHENTICATION_TEST_URL}/v2/online-applications`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        Authorization: `Bearer: ${jwt}`,
      },
    })
      .then((response) => {
        let info = response.json();
        // debugger;
      })
      .catch((err) => {
        // debugger;
      });
  }, [jwt]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24 dark:text-white text-black">
      <div className="flex gap-2">
        <label>Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <div>JWT</div>
        <p>{jwt.access_token || ""}</p>
      </div>
      <div className="flex gap-5">
        <button
          className="border border-purple-400 p-2"
          onClick={() => getAddiAuthorization()}
        >
          Get Authorization
        </button>
        <button
          className="border border-purple-400 p-2"
          onClick={() => createApplication()}
        >
          Do application
        </button>
      </div>
      <div>
        {/* tslint:disable-next-line */}
        <addi-widget
          price={price}
          ally-slug="tennis-ecommerce"
          custom-widget-styles='{"widget":{"borderColor":"#000","borderRadius":"0px","fontColor":"#000","fontFamily":"Lato-Regular","fontSize":"14px","badgeBackgroundColor":"#fff","infoBackgroundColor":"#fff","margin":"15px%200"},"modal":{"backgroundColor":"#fff","fontColor":"#000","fontFamily":"Lato-Regular","priceColor":"#000","badgeBackgroundColor":"#fff","badgeFontColor":"#000","badgeBorderRadius":"0px","cardColor":"#fff","buttonBorderColor":"#000","buttonBorderRadius":"0px","buttonBackgroundColor":"#000","buttonFontColor":"#fff"}}'
        >
          <addi-product-widget
            ally-slug="tennis-ecommerce"
            price="239900"
            country="co"
            custom-widget-styles='{"widget":{"borderColor":"#000","borderRadius":"0px","fontColor":"#000","fontFamily":"Lato-Regular","fontSize":"14px","badgeBackgroundColor":"#fff","infoBackgroundColor":"#fff","iconType":"filled","iconSize":"28px","margin":"15px%200"},"modal":{"backgroundColor":"#fff","fontColor":"#000","fontFamily":"Lato-Regular","priceColor":"#000","badgeBorderRadius":"0px","badgeBackgroundColor":"#fff","badgeFontColor":"#000","cardColor":"#fff","buttonBorderColor":"#000","buttonBorderRadius":"0px","buttonBackgroundColor":"#000","buttonFontColor":"#fff"}}'
            id="addi-product-widget_nnpa3x3wg"
            class="hydrated"
          ></addi-product-widget>
        </addi-widget>
      </div>
      {/* <div>
        <addi-widget
          price="239900"
          ally-slug="jumpseller-ecommerce"
        ></addi-widget>
      </div> */}
    </main>
  );
}
