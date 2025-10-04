import"../chunks/DsnmJJEf.js";import{x as O,y as v,z as R,b as T,i as U,A as V,B as W,p as M,n as P,C as F,l as C,D as J,m as j,E as L,k as G,t as K,F as Q,g as i,G as x,o as c,v as d,H as E,s as f,I as w}from"../chunks/BoJKyFaJ.js";import{r as k}from"../chunks/DswKKJTA.js";import{i as X}from"../chunks/CGM3BTyM.js";import{I as Y,B as Z,M as ee}from"../chunks/C72zkkd_.js";import{s as re,r as ae}from"../chunks/BI9ISzSW.js";function $(e,r,n=r){var o=new WeakSet;O(e,"input",async a=>{var s=a?e.defaultValue:e.value;if(s=S(e)?N(s):s,n(s),v!==null&&o.add(v),await R(),s!==(s=r())){var l=e.selectionStart,u=e.selectionEnd;e.value=s??"",u!==null&&(e.selectionStart=l,e.selectionEnd=Math.min(u,e.value.length))}}),(V&&e.defaultValue!==e.value||T(r)==null&&e.value)&&(n(S(e)?N(e.value):e.value),v!==null&&o.add(v)),U(()=>{var a=r();if(e===document.activeElement){var s=W??v;if(o.has(s))return}S(e)&&a===N(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function S(e){var r=e.type;return r==="number"||r==="range"}function N(e){return e===""?null:+e}function se(e,r){M(r,!0);/**
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
 */let n=ae(r,["$$slots","$$events","$$legacy"]);const o=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];Y(e,re({name:"arrow-left"},()=>n,{get iconNode(){return o},children:(a,s)=>{var l=F(),u=C(l);J(u,()=>r.children??L),j(a,l)},$$slots:{default:!0}})),P()}var te=G('<!> <span class="sr-only">Go Back</span>',1),oe=G('<main class="p-8 min-h-screen bg-background text-foreground transition-colors space-y-6"><div class="flex justify-between items-center"><div class="flex items-center gap-2 space-x-2"><!> <h1 class="text-2xl font-bold">Add a New Website</h1></div> <!></div> <form class="max-w-lg bg-card text-card-foreground p-6 rounded-xl border shadow space-y-4"><div class="space-y-1"><label for="site-name" class="block text-sm font-medium">Name</label> <input id="site-name" class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background" required/></div> <div class="space-y-1"><label for="site-url" class="block text-sm font-medium">URL</label> <input id="site-url" type="url" class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background" required/></div> <div class="space-y-1"><label for="site-owner" class="block text-sm font-medium">GitHub Username</label> <input id="site-owner" class="w-full bg-background border border-input rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background" required/></div> <button type="submit" class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full font-semibold disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors">Create Pull Request</button></form></main>');function fe(e,r){M(r,!0);let n=x(""),o=x(""),a=x("");async function s(t){t.preventDefault();const h=await fetch("/api/create-site-pr",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i(n),url:i(o),owner:i(a)})}),m=await h.json();alert(m.message),h.ok&&await X()}var l=oe(),u=c(l),b=c(u),H=c(b);Z(H,{href:"/",variant:"outline",size:"icon",children:(t,h)=>{var m=te(),D=C(m);se(D,{class:"h-4 w-4"}),E(2),j(t,m)},$$slots:{default:!0}}),E(2),f(b);var I=d(b,2);ee(I),f(u);var g=d(u,2),p=c(g),q=d(c(p),2);k(q),f(p);var _=d(p,2),A=d(c(_),2);k(A),f(_);var y=d(_,2),B=d(c(y),2);k(B),f(y);var z=d(y,2);f(g),f(l),K(t=>z.disabled=t,[()=>!i(n).trim()||!i(o).trim()||!i(a).trim()]),Q("submit",g,s),$(q,()=>i(n),t=>w(n,t)),$(A,()=>i(o),t=>w(o,t)),$(B,()=>i(a),t=>w(a,t)),j(e,l),P()}export{fe as component};
