import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from '@theme-ui/core'
import { ColorModeProvider } from '@theme-ui/color-modes'
import whyDidYouRender from '@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js'
import MenuProvider from '~/context/menu'
import theme from '~/theme'
import GlobalStyle from '~/theme/global'
import { getLayout as getDefaultLayout } from '~@/layout/DefaultLayout'

import SEO from '../next-seo.config'

// Vivify css animations
import '~/css/vivify-lite.css'

// Custom fonts
import 'fontsource-sen/latin.css'
import 'fontsource-manrope/latin.css'

// For debugging reasons for re-rendering components we use whyDidYouRender in dev mode
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    whyDidYouRender(React)
}

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props

        const getLayout = Component.getLayout || getDefaultLayout

        return (
            <>
                <Head>
                    <link rel="shortcut icon" href="/favicons/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#fccc3e" />
                    <meta name="apple-mobile-web-app-title" content="Eateri" />
                    <meta name="application-name" content="Eateri" />
                    <meta name="msapplication-TileColor" content="#fccc3e" />
                    <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
                    <meta name="theme-color" content="#fccc3e" />
                </Head>
                <DefaultSeo {...SEO} />
                <ThemeProvider theme={theme}>
                    <MenuProvider>
                        <ColorModeProvider>
                            <GlobalStyle />
                            {getLayout(<Component {...pageProps} />)}
                        </ColorModeProvider>
                    </MenuProvider>
                </ThemeProvider>
            </>
        )
    }
}
