import React from 'react'
import Footer from '../components/Footer'
import Date from '../components/Date'
import Quote from '../components/Quote'
import Times from '../components/Times'
import ProgressBar from '../components/ProgressBar'

import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import CSSPlugin from 'gsap/CSSPlugin'

gsap.registerPlugin(ScrollTrigger, CSSPlugin, CSSRulePlugin)

const btcUsdPrice = 58763;
const usdArsPrice = 165;
const btcArsPrice = btcUsdPrice * usdArsPrice;

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.timeline = new gsap.timeline({});

    this.date = null;
    this.mainQuote = null;
    this.usdArsQuote = null;
    this.progressBar = null;
  }

  componentDidMount () {
    const timeline = this.timeline;
    timeline.addLabel('start');
    // timeline.add(this.date.getShowTween(2), 'start');
    timeline.add(this.mainQuote.getShowTween(1), '+=0');
    timeline.add(this.mainQuote.rightSide.getChangeQtyTween(btcUsdPrice, 2), '-=0.7');

    timeline.addLabel('usd_ars_in', '+=0.1');
    timeline.add(this.usdArsQuote.getShowTween(1));
    timeline.add(this.usdArsQuote.rightSide.getChangeQtyTween(usdArsPrice, 2), '-=0.7');

    timeline.addLabel('usd_label', '+=0.1');
    timeline.to(this.usdArsQuote.leftSide.element, 1, { x: -300, opacity: 0 });
    timeline.to(this.usdArsQuote.equal, 1, { x: -300, opacity: 0 }, '-=0.7');

    timeline.addLabel('usd_change_label', '-=1.2');
    timeline.add(this.mainQuote.rightSide.getChangeSymbolTween('ARS', 0.1), 'usd_change_label+=0.3');
    timeline.fromTo(this.mainQuote.rightSide.symbolElement, 1, { x: 20, opacity: 0 }, { x: 0, opacity: 1 });
    timeline.fromTo(this.mainQuote.rightSide.symbolElement, 1, { x: 0, opacity: 1 }, { x: 300, opacity: 0 }, 'usd_change_label');

    timeline.addLabel('usd_ars_merge', '-=1.5');
    timeline.to(this.usdArsQuote.element, 0.4, { y: -800, opacity: 0 }, 'usd_ars_merge');
    timeline.to(this.mainQuote.rightSide.qtyElement, 0.6, { scaleX: 1.3, scaleY: 1.3, ease: 'elastic' }, 'usd_ars_merge+=0.3');
    timeline.to(this.mainQuote.rightSide.qtyElement, 0.3, { scaleX: 1, scaleY: 1 }, 'usd_ars_merge+=0.9');
    timeline.add(this.mainQuote.rightSide.getChangeQtyTween(btcArsPrice, 2), 'usd_ars_merge+=0.5');

    // timeline.play('usd_ars_merge');
    timeline.play();
  }

  render () {
    return (
      <main role="main">

        <Date ref={comp => { this.date = comp }} />

        <section id="start">
          <Quote ref={comp => { this.mainQuote = comp }} left={{ qty: 1, symbol: 'Bitcoin' }} right={{ qty: 1, symbol: 'USD' }} />

          <Times />

          <Quote ref={comp => { this.usdArsQuote = comp }} left={{ qty: 1, symbol: 'USD' }} right={{ qty: 1, symbol: 'ARS' }} />

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

        <ProgressBar opacity={1} ref={comp => { this.progressBar = comp }} progress={ 9.6 } />

        <Footer />
      </main>
    );
  }
}

export default Home
