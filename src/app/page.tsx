"use client";

import { useEffect } from "react";

// ts-ignore

const ADDI_AUTHENTICATION_TEST_URL = "https://api.staging.addi.com";

const ADDI_API_TEST_URL = "https://api.addi-staging.com";

export default function Home() {
  useEffect(() => {
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
        .then((response) => {
          let info = response.json();
          // debugger;
        })
        .catch((err) => {
          // debugger;
        });
    };

    getAddiAuthorization();
  }, []);

  const createApplication = () => {
    // change todo
    const body = {
      grant_type: "client_credentials",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
    };
    fetch(`${ADDI_AUTHENTICATION_TEST_URL}/oauth/token`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        // Authorization: `Beater ${JWT}`,
      },
    })
      .then((response) => {
        let info = response.json();
        // debugger;
      })
      .catch((err) => {
        // debugger;
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white dark:bg-white">
      <div>here</div>
      <div>
        <addi-widget
          price="239900"
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
