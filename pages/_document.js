import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheets } from '@material-ui/styles'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T2G6SKJ');
            <!-- Google Tag Manager -->
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-593VS4Q');
            <!-- End Google Tag Manager -->
          `,
            }}
          />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap"
            rel="stylesheet"
          />
          <meta
            property="fb:app_id"
            content={process.env.REACT_APP_FACEBOOK_APP_ID}
          />
          <meta property="og:type" content="website" />
          <meta
            name="apple-itunes-app"
            content={process.env.REACT_APP_APPLE_ITUNES_APP}
          />
          <meta
            name="google-play-app"
            content={process.env.REACT_APP_GOOGLE_PLAY_APP}
          />
          <meta
            name="dmca-site-verification"
            content="SnRNWlNtMDErS2ZXVy80QzJjdW5udz090"
          />
          <link
            rel="shortcut icon"
            type="image"
            href="/static/images/layouts/favicon.png"
          />

          <script src="https://kit.fontawesome.com/2dbaaebee9.js" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
          />
        </Head>
        <body>
          {process.env.REACT_APP_BUILD === 'production' && (
            <React.Fragment>
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-T2G6SKJ"
                  height="0"
                  width="0"
                  style={{ display: `none`, visibility: `hidden` }}
                />
              </noscript>
              <noscript>
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-593VS4Q"
                  height="0"
                  width="0"
                  style={{ display: `none`, visibility: `hidden` }}
                />
              </noscript>
            </React.Fragment>
          )}
          <div id="fb-root" />
          {/* <MessengerCustomerChat
            pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID}
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            greetingDialogDisplay="show"
            loggedInGreeting="Xin chào, SpaceShare giúp gì được cho bạn?"
            loggedOutGreeting="Xin chào, SpaceShare giúp gì được cho bạn?"
          /> */}
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.fbAsyncInit = function () {
              FB.init({
                appId: '380083072736944',
                cookie: true,
                xfbml: true,
                version: 'v3.2',
              })
              FB.AppEvents.logPageView()
            };
            
            window.addEventListener('load', function () {
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            })

            AccountKit_OnInteractive = function () {
              AccountKit.init(
                {
                  appId: "380083072736944",
                  state: (new Date()).getTime().toString(),
                  version: "v1.0",
                  fbAppEventsEnabled: true,
                  redirect: "http://localhost:3033"
                }
              )
            };
          `,
            }}
          />
          <script src="https://sdk.accountkit.com/en_US/sdk.js" async />
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js">
            {' '}
          </script>
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const styledComponentSheet = new StyledComponentSheets()
  const materialUiSheets = new MaterialUiServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        styledComponentSheet.collectStyles(
          materialUiSheets.collect(<App {...props} />),
        ),
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {materialUiSheets.getStyleElement()}
        {styledComponentSheet.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  }
}

export default MyDocument
