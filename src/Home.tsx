/* eslint-disable new-cap */
import React from "react";
import Footer from "./components/Footer";
import Date from "./components/Date";
import Quote from "./components/Quote";
import Times from "./components/Times";
import ProgressBar from "./components/ProgressBar";

import { gsap } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import CSSPlugin from "gsap/CSSPlugin";

gsap.registerPlugin(ScrollTrigger, CSSPlugin, CSSRulePlugin);

const btcUsdPrice = 58763;
const usdArsPrice = 165;
const btcArsPrice = btcUsdPrice * usdArsPrice;

interface IHomeProps {}

class Home extends React.Component {
  timeline: gsap.core.Timeline;
  date: Date | null;
  mainQuote: Quote;
  finalQuote: Quote;
  usdArsQuote: Quote;
  satBtcQuote: Quote;
  progressBar: ProgressBar | null;

  constructor(props: IHomeProps) {
    super(props);

    this.timeline = gsap.timeline({});

    this.date = null;
    this.progressBar = null;
  }

  componentDidMount() {
    const timeline = this.timeline;
    timeline.addLabel("start");

    timeline.set(".finalQuote", {
      display: "none",
    });
    timeline.add(this.date.getShowTween(2), "start");
    timeline.add(this.mainQuote.getShowTween(1), "+=0");

    timeline.addLabel("main_quote", "-=0.7");
    timeline.add(this.mainQuote.rightSide.getChangeQtyTween(btcUsdPrice, 2));

    timeline.addLabel("usd_ars_in", "+=0.1");
    timeline.add(this.usdArsQuote.getShowTween(1));
    timeline.add(
      this.usdArsQuote.rightSide.getChangeQtyTween(usdArsPrice, 2),
      "-=0.7"
    );

    timeline.addLabel("usd_label", "+=0.1");
    timeline.to(this.usdArsQuote.leftSide.element, 1, { x: -300, opacity: 0 });
    timeline.to(this.usdArsQuote.equal, 1, { x: -300, opacity: 0 }, "-=0.7");

    timeline.addLabel("usd_change_label", "-=1.2");

    timeline.add(
      gsap.to(".mainQuote .side.right .symbol .usd", {
        duration: 1,
        marginTop: "-50%",
        ease: "elastic",
      }),
      "usd_change_label+=0.3"
    );

    timeline.addLabel("usd_ars_merge", "-=1.5");
    timeline.to(
      this.usdArsQuote.element,
      0.4,
      { y: -800, opacity: 0 },
      "usd_ars_merge"
    );
    timeline.to(
      this.mainQuote.rightSide.qtyElement,
      0.6,
      { scaleX: 1.3, scaleY: 1.3, ease: "elastic" },
      "usd_ars_merge+=0.3"
    );
    timeline.to(
      this.mainQuote.rightSide.qtyElement,
      0.3,
      { scaleX: 1, scaleY: 1 },
      "usd_ars_merge+=0.9"
    );
    timeline.add(
      this.mainQuote.rightSide.getChangeQtyTween(btcArsPrice, 2),
      "usd_ars_merge+=0.5"
    );

    timeline.addLabel("show_sat_btc");

    timeline.set(
      ".satBtc .right .digits.visible .digit",
      {
        scaleX: 0,
        display: "inline-block",
        width: "0px",
      },
      "show_sat_btc"
    );

    timeline.add(this.satBtcQuote.getShowTween(1), "+=0");

    let list: Element[] = [];
    const belowZero = Array.from(
      document.querySelectorAll(
        ".satBtc .right .digits.visible .digit.belowzero"
      )
    );
    list.push(belowZero.pop());
    list.push(
      document.querySelector(".satBtc .right .digits.visible .digit.comma")
    );
    list.push(
      document.querySelector(".satBtc .right .digits.visible .digit.integer")
    );
    list = list.concat(belowZero);

    timeline.add(
      gsap.to(list, {
        duration: 0.25,
        scale: 1,
        width: "auto",
        ease: "power4",
        stagger: {
          amount: 2,
          ease: "slow",
        },
      }),
      "-=0.8"
    );

    timeline.addLabel("bounce_sat_up");

    timeline.add(
      gsap.to(".satBtc .left", {
        position: "relative",
        duration: 0.7,
        top: "-6vh",
        ease: "elastic",
      }),
      "+=0.8"
    );

    timeline.addLabel("bounce_sat_hit", "-=0.6");

    timeline.add(
      gsap.to(".satBtc .left", {
        duration: 1,
        top: "0",
        ease: "bounce",
      }),
      "-=0.4"
    );

    timeline.addLabel("bounce_sat_up_out", "-=1");

    timeline.add(
      gsap.to(".mainQuote .side.left .symbol .bitcoin", {
        duration: 1.2,
        marginTop: "-33%",
        ease: "elastic",
      }),
      "bounce_sat_hit"
    );

    timeline.addLabel("ars_to_sat");

    timeline.set(
      ".finalQuote",
      {
        display: "flex",
      },
      "ars_to_sat"
    );

    timeline.set(
      ".mainQuote",
      {
        display: "none",
      },
      "ars_to_sat"
    );

    timeline.set(
      ".finalQuote .side.right .digits.prefix .digit",
      {
        width: "0vw",
        scale: "0vw",
      },
      "ars_to_sat"
    );

    timeline.add(
      gsap.to(".finalQuote .side.right .digits.visible .delimiter", {
        duration: 0.6,
        css: {
          scaleX: 0,
          width: 0,
          opacity: 0,
        },
        // ease: "elastic",
        stagger: {
          amount: 0.4,
          ease: "slow",
        },
      })
    );

    timeline.add(
      gsap.to(".finalQuote .side.right .digits.visible", {
        duration: 0.8,
        paddingLeft: "2vw",
      }),
      "ars_to_sat"
    );

    timeline.add(
      this.mainQuote.rightSide.getCommaTimeline({
        commaElement: ".finalQuote .side.right .digits.prefix .digit.comma",
        digitsElements: ".finalQuote .side.right .digits.visible .digit.number",
        finalVal: btcArsPrice,
      })
    );

    // timeline.play("ars_to_sat");
    timeline.play();
  }

  render() {
    return (
      <div>
        <Date
          ref={(comp) => {
            this.date = comp;
          }}
        />
        <section id="start">
          <Quote
            className="mainQuote"
            ref={(comp) => {
              this.mainQuote = comp;
            }}
            left={{
              qty: 1,
              symbols: ["Bitcoin", "Satoshi"],
            }}
            right={{ qty: 1, symbols: ["USD", "ARS"] }}
          />

          <Quote
            className="finalQuote"
            ref={(comp) => {
              this.finalQuote = comp;
            }}
            opacity={1}
            left={{
              qty: 1,
              symbols: ["Satoshi"],
            }}
            right={{ qty: btcArsPrice, symbols: ["ARS"], prefix: "0,0" }}
          />

          <Times />

          <Quote
            ref={(comp) => {
              this.usdArsQuote = comp;
            }}
            left={{ qty: 1, symbols: ["USD"] }}
            right={{ qty: 1, symbols: ["ARS"] }}
          />

          <Quote
            className="satBtc"
            ref={(comp) => {
              this.satBtcQuote = comp;
            }}
            left={{ qty: 1, symbols: ["Satoshi"] }}
            right={{ qty: 0.00000001, symbols: ["Bitcoin"] }}
          />
        </section>

        <ProgressBar
          opacity={1}
          ref={(comp) => {
            this.progressBar = comp;
          }}
          progress={9.6}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
