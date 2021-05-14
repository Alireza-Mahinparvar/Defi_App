import React, { useEffect } from 'react'
import './App.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uniswapLogo from '../uniswap-logo.png'
import daiLogo from '../dai-logo.png'
import mkrLogo from '../mkr-logo.png'
import uniLogo from '../uniswap-logo.png'
import linkLogo from '../chainlink.png'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`
const MKR_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`
const UNI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`


const LINK_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`
const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

function App() {
  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  })

  const { loading: mkrLoading, data: mkrData } = useQuery(MKR_QUERY, {
    variables: {
      tokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
    }
  })

  const { loading: uniLoading, data: uniData } = useQuery(UNI_QUERY, {
    variables: {
      tokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
    }
  })

  const { loading: linkLoading, data: linkData } = useQuery(LINK_QUERY, {
    variables: {
      tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca'
    }
  })


  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  const mkrPriceInEth = mkrData && mkrData.tokens[0].derivedETH
  const mkrTotalLiquidity = mkrData && mkrData.tokens[0].totalLiquidity
  const uniPriceInEth = uniData && uniData.tokens[0].derivedETH
  const uniTotalLiquidity = uniData && uniData.tokens[0].totalLiquidity
  const linkPriceInEth = linkData && linkData.tokens[0].derivedETH
  const linkTotalLiquidity = linkData && linkData.tokens[0].totalLiquidity
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={uniswapLogo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; Uniswap Explorer
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <div>
                <img src={daiLogo} width="150" height="150" className="mb-4" alt="" />
                <h2>
                  Dai price:{' '}
                  {ethLoading || daiLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2>
                <h2>
                  Dai total liquidity:{' '}
                  {daiLoading
                    ? 'Loading token data...'
                    : // display the total amount of DAI spread across all pools
                      parseFloat(daiTotalLiquidity).toFixed(0)}
                </h2>
              </div>

              <div>
                <img src={mkrLogo} width="150" height="150" className="mb-4" alt="" />
                <h2>
                  mkr price:{' '}
                  {ethLoading || mkrLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(mkrPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2>
                <h2>
                  mkr total liquidity:{' '}
                  {mkrLoading
                    ? 'Loading token data...'
                    : // display the total amount of mkr spread across all pools
                      parseFloat(mkrTotalLiquidity).toFixed(0)}
                </h2>
              </div>

              <div>
                <img src={uniLogo} width="150" height="150" className="mb-4" alt="" />
                <h2>
                  mkr price:{' '}
                  {ethLoading || uniLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(uniPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2>
                <h2>
                  uni total liquidity:{' '}
                  {uniLoading
                    ? 'Loading token data...'
                    : // display the total amount of uni spread across all pools
                      parseFloat(uniTotalLiquidity).toFixed(0)}
                </h2>
              </div>

              <div>
                <img src={linkLogo} width="150" height="150" className="mb-4" alt="" />
                <h2>
                  link price:{' '}
                  {ethLoading || linkLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(linkPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h2>
                <h2>
                  link total liquidity:{' '}
                  {linkLoading
                    ? 'Loading token data...'
                    : // display the total amount of link spread across all pools
                      parseFloat(linkTotalLiquidity).toFixed(0)}
                </h2>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App
