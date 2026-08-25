import { HOURS } from "@/lib/hours";

/**
 * Runs before first paint so the page never flashes the wrong temperature.
 * Kept deliberately tiny and generated from the same HOURS table as the
 * React path, so the two can't drift.
 */
export const HEAT_BOOT = `(function(){try{
var H=${JSON.stringify(HOURS.map((w) => [w.open, w.close]))};
var p=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Oslo",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
var g=function(t){for(var i=0;i<p.length;i++)if(p[i].type===t)return p[i].value;return""};
var d=["sun","mon","tue","wed","thu","fri","sat"].indexOf(g("weekday").toLowerCase().slice(0,3));
if(d<0)d=0;
var m=+g("hour")*60+ +g("minute");
var w=H[d];
document.documentElement.dataset.heat=(m>=w[0]&&m<w[1])?"warm":"cold";
}catch(e){document.documentElement.dataset.heat="warm"}})();`;
