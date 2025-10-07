import{_ as q}from"../chunks/PPVm8Dsz.js";import"../chunks/DsnmJJEf.js";import"../chunks/CAzTZCNQ.js";import{p as B,k as w,o as r,s as e,v as i,t as S,b as v,e as k,w as b,m as f,n as I,l as U,g as s,C as z,D as F,E as J,H as N,ai as K,I as G,ah as H,ak as Q,a0 as X}from"../chunks/BoJKyFaJ.js";import{e as j,i as D,I as Y,B as L,M as Z}from"../chunks/C72zkkd_.js";import{i as C}from"../chunks/DZkaK-Cv.js";import{p as T,i as tt,s as et,r as at}from"../chunks/BI9ISzSW.js";import{s as rt,a as O}from"../chunks/DswKKJTA.js";import{g as st}from"../chunks/xcnXm4WN.js";const ot="prnvtripathi",dt="no-time",it="reports",M=`https://raw.githubusercontent.com/${ot}/${dt}/${it}`;var nt=w('<div> </div> <div class="text-xs"> </div>',1),lt=w('<div class="text-sm text-muted-foreground">no data</div>'),ct=w('<div class="card p-3 border rounded bg-card text-card-foreground shadow-sm transition-colors"><div class="flex items-center justify-between"><div><a target="_blank" rel="noreferrer"><h3 class="text-lg font-semibold"> </h3></a> <div class="text-sm text-muted-foreground"> </div></div> <div class="text-right"><!></div></div></div>');function vt(_,o){B(o,!1);let d=T(o,"site",8),a=T(o,"log",8);C();var n=ct(),u=r(n),t=r(u),l=r(t),h=r(l),A=r(h,!0);e(h),e(l);var m=i(l,2),R=r(m,!0);e(m),e(t);var y=i(t,2),x=r(y);{var p=c=>{var $=nt(),P=U($),W=r(P,!0);e(P);var E=i(P,2),V=r(E);e(E),S(()=>{O(P,1,(k(a()),v(()=>"font-bold "+(a().status==="UP"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400")))),b(W,(k(a()),v(()=>a().status))),b(V,`${k(a()),v(()=>a().code??"")??""} · ${k(a()),v(()=>a().rtt??"-")??""}ms`)}),f(c,$)},g=c=>{var $=lt();f(c,$)};tt(x,c=>{a()?c(p):c(g,!1)})}e(y),e(u),e(n),S(()=>{rt(l,"href",(k(d()),v(()=>d().url))),b(A,(k(d()),v(()=>d().name))),b(R,(k(d()),v(()=>d().url)))}),f(_,n),I()}var ut=w('<tr class="hover:bg-muted/30 transition-colors"><td class="py-2 px-3"> </td><td> </td><td class="py-2 px-3 tabular-nums"> </td><td class="py-2 px-3 tabular-nums"> </td><td class="py-2 px-3 whitespace-nowrap"> </td></tr>'),mt=w('<table class="min-w-full mt-4 text-sm border border-border rounded-md overflow-hidden bg-card text-card-foreground"><thead><tr class="text-left bg-muted/40"><th class="py-2 px-3 font-medium">Site</th><th class="py-2 px-3 font-medium">Status</th><th class="py-2 px-3 font-medium">Code</th><th class="py-2 px-3 font-medium">RTT (ms)</th><th class="py-2 px-3 font-medium">Checked</th></tr></thead><tbody class="divide-y divide-border"></tbody></table>');function pt(_,o){B(o,!1);let d=T(o,"logs",24,()=>[]);C();var a=mt(),n=i(r(a));j(n,5,d,D,(u,t)=>{var l=ut(),h=r(l),A=r(h,!0);e(h);var m=i(h),R=r(m,!0);e(m);var y=i(m),x=r(y,!0);e(y);var p=i(y),g=r(p,!0);e(p);var c=i(p),$=r(c,!0);e(c),e(l),S(P=>{b(A,(s(t),v(()=>s(t).name))),O(m,1,(s(t),v(()=>"py-2 px-3 font-medium "+(s(t).status==="UP"?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400")))),b(R,(s(t),v(()=>s(t).status))),b(x,(s(t),v(()=>s(t).code))),b(g,(s(t),v(()=>s(t).rtt))),b($,P)},[()=>(s(t),v(()=>new Date(s(t).checkedAt).toLocaleString()))]),f(u,l)}),e(n),e(a),f(_,a),I()}function ft(_,o){B(o,!0);/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */let d=at(o,["$$slots","$$events","$$legacy"]);const a=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{d:"M9 18c-4.51 2-5-2-7-2"}]];Y(_,et({name:"github"},()=>d,{get iconNode(){return a},children:(n,u)=>{var t=z(),l=U(t);F(l,()=>o.children??J),f(n,t)},$$slots:{default:!0}})),I()}var _t=w("<!> Star us on GitHub",1),ht=w('<a href="https://github.com/prnvtripathi/no-time" target="_blank" rel="noopener" class="p-0"><!></a>');function xt(_){var o=ht(),d=r(o);L(d,{variant:"outline",class:"py-0.5",children:(a,n)=>{var u=_t(),t=U(u);ft(t,{class:"siae-8"}),N(),f(a,u)},$$slots:{default:!0}}),e(o),f(_,o)}var gt=w('<main class="p-8 min-h-screen bg-background text-foreground transition-colors"><header class="flex justify-between items-center mb-6"><div><h1 class="text-3xl font-bold">🌐 No Time</h1> <p class="text-muted-foreground">Monitor and Report Website Uptime</p></div> <div class="flex items-center gap-1"><!> <!> <!></div></header> <section class="grid grid-cols-1 md:grid-cols-2 gap-6"></section> <section class="mt-10"><h2 class="text-xl font-semibold mb-3">Recent Uptime Logs</h2> <!></section></main>');function It(_,o){B(o,!1);let d=H([]),a=H([]);K(async()=>{const x=await(await q(async()=>{const{default:$}=await import("../chunks/CDerewhm.js");return{default:$}},[],import.meta.url)).default,p=await fetch(`${M}/data/sites.yaml`),g=x.load(await p.text());G(d,g.sites);const c=await fetch(`${M}/logs/latest.json`);G(a,await c.json())}),C();var n=gt(),u=r(n),t=i(r(u),2),l=r(t);L(l,{variant:"default",onclick:()=>st("/sites/add"),class:"m-0",children:(x,p)=>{N();var g=Q("Add New Site");f(x,g)},$$slots:{default:!0}});var h=i(l,2);xt(h);var A=i(h,2);Z(A),e(t),e(u);var m=i(u,2);j(m,5,()=>s(d),D,(x,p)=>{{let g=X(()=>s(a).find(c=>c.url===s(p).url));vt(x,{get site(){return s(p)},get log(){return s(g)}})}}),e(m);var R=i(m,2),y=i(r(R),2);pt(y,{get logs(){return s(a)}}),e(R),e(n),f(_,n),I()}export{It as component};
