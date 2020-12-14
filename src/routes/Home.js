import React from 'react'
import Footer from '../components/Footer'
import Date from '../components/Date'
import Quote from '../components/Quote'
import Times from '../components/Times'

const btcUsdPrice = 18627
const usdArsPrice = 165
const btcArsPrice = btcUsdPrice * usdArsPrice

const Home = () => (
  <main role="main">

    <div className="container">

      <Date />

      <section id="start">
        <Quote left={{ qty: 1, symbol: 'Bitcoin' }} right={{ qty: btcUsdPrice, symbol: 'USD' }} />

        <Times />

        <Quote left={{ qty: 1, symbol: 'USD' }} right={{ qty: usdArsPrice, symbol: 'ARS' }} />

      </section>

      <section className="hidden" id="decimals">
        <div>1 Bitcoin = 2.970.000 ARS</div>
        <div>0,1 Bitcoin = 297.000 ARS</div>
        <div>0,01 Bitcoin = 29.700 ARS</div>
        <div>0,001 Bitcoin = 2.970 ARS</div>
        <div>0,0001 Bitcoin = 297 ARS</div>
        <div>0,00001 Bitcoin = 29,7 ARS</div>
        <div>0,000001 Bitcoin = 2,97 ARS</div>
        <div>0,0000001 Bitcoin = 0,297 ARS</div>
        <div>0,00000001 Bitcoin = 0,0297 ARS</div>
      </section>

      <section id="sat_ars">
        <div>0,00000001 Bitcoin = 0,0297 ARS</div>
        <div>1 Satoshi = 0,0297 ARS</div>
      </section>

      <section id="progress">
        <div>Progreso</div>
        <div className="progress" style={{ height: '50px' } }>
          <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: '2.97%' } }>2.97%</div>
        </div>
      </section>

    </div>

    <Footer />
  </main>
)

export default Home
