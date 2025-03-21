import{s as x,c,h as l,a as o,m as u,B as D,R as F,i as z,j as H,k as j,l as X,p as G,q as Z,t as b,v as A,w as q,x as W,y as Y,z as Q,A as m,C as p,D as f,E as _,G as R,F as w,H as S,g as J,I as L,d as T,r as y,u as k,_ as P,J as tt,o as et,K as N}from"./index-DpyskjPE.js";var K={name:"ChevronDownIcon",extends:x};function nt(t,e,n,r,a,i){return l(),c("svg",u({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t.pti()),e[0]||(e[0]=[o("path",{d:"M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",fill:"currentColor"},null,-1)]),16)}K.render=nt;var U={name:"ChevronLeftIcon",extends:x};function it(t,e,n,r,a,i){return l(),c("svg",u({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t.pti()),e[0]||(e[0]=[o("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"},null,-1)]),16)}U.render=it;var O={name:"ChevronRightIcon",extends:x};function rt(t,e,n,r,a,i){return l(),c("svg",u({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t.pti()),e[0]||(e[0]=[o("path",{d:"M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",fill:"currentColor"},null,-1)]),16)}O.render=rt;var at=({dt:t})=>`
.p-carousel {
    display: flex;
    flex-direction: column;
}

.p-carousel-content-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.p-carousel-content {
    display: flex;
    flex-direction: row;
    gap: ${t("carousel.content.gap")};
}

.p-carousel-content:dir(rtl) {
    flex-direction: row-reverse;
}

.p-carousel-viewport {
    overflow: hidden;
    width: 100%;
}

.p-carousel-item-list {
    display: flex;
    flex-direction: row;
}

.p-carousel-item-list:dir(rtl) {
    flex-direction: row-reverse;
}

.p-carousel-prev-button,
.p-carousel-next-button {
    align-self: center;
    flex-shrink: 0;
}

.p-carousel-indicator-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: ${t("carousel.indicator.list.padding")};
    gap: ${t("carousel.indicator.list.gap")};
    margin: 0;
    list-style: none;
}

.p-carousel-indicator-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t("carousel.indicator.background")};
    width: ${t("carousel.indicator.width")};
    height: ${t("carousel.indicator.height")};
    border: 0 none;
    transition: background ${t("carousel.transition.duration")}, color ${t("carousel.transition.duration")}, outline-color ${t("carousel.transition.duration")}, box-shadow ${t("carousel.transition.duration")};
    outline-color: transparent;
    border-radius: ${t("carousel.indicator.border.radius")};
    padding: 0;
    margin: 0;
    user-select: none;
    cursor: pointer;
}

.p-carousel-indicator-button:focus-visible {
    box-shadow: ${t("carousel.indicator.focus.ring.shadow")};
    outline: ${t("carousel.indicator.focus.ring.width")} ${t("carousel.indicator.focus.ring.style")} ${t("carousel.indicator.focus.ring.color")};
    outline-offset: ${t("carousel.indicator.focus.ring.offset")};
}

.p-carousel-indicator-button:hover {
    background: ${t("carousel.indicator.hover.background")};
}

.p-carousel-indicator-active .p-carousel-indicator-button {
    background: ${t("carousel.indicator.active.background")};
}

.p-carousel-vertical .p-carousel-content {
    flex-direction: column;
}

.p-carousel-vertical .p-carousel-item-list {
    flex-direction: column;
    height: 100%;
}

.p-items-hidden .p-carousel-item {
    visibility: hidden;
}

.p-items-hidden .p-carousel-item.p-carousel-item-active {
    visibility: visible;
}
`,st={root:function(e){var n=e.instance;return["p-carousel p-component",{"p-carousel-vertical":n.isVertical(),"p-carousel-horizontal":!n.isVertical()}]},header:"p-carousel-header",contentContainer:"p-carousel-content-container",content:"p-carousel-content",pcPrevButton:function(e){var n=e.instance;return["p-carousel-prev-button",{"p-disabled":n.backwardIsDisabled}]},viewport:"p-carousel-viewport",itemList:"p-carousel-item-list",itemClone:function(e){var n=e.index,r=e.value,a=e.totalShiftedItems,i=e.d_numVisible;return["p-carousel-item p-carousel-item-clone",{"p-carousel-item-active":a*-1===r.length+i,"p-carousel-item-start":n===0,"p-carousel-item-end":r.slice(-1*i).length-1===n}]},item:function(e){var n=e.instance,r=e.index;return["p-carousel-item",{"p-carousel-item-active":n.firstIndex()<=r&&n.lastIndex()>=r,"p-carousel-item-start":n.firstIndex()===r,"p-carousel-item-end":n.lastIndex()===r}]},pcNextButton:function(e){var n=e.instance;return["p-carousel-next-button",{"p-disabled":n.forwardIsDisabled}]},indicatorList:"p-carousel-indicator-list",indicator:function(e){var n=e.instance,r=e.index;return["p-carousel-indicator",{"p-carousel-indicator-active":n.d_page===r}]},indicatorButton:"p-carousel-indicator-button",footer:"p-carousel-footer"},ot=D.extend({name:"carousel",style:at,classes:st}),lt={name:"BaseCarousel",extends:j,props:{value:null,page:{type:Number,default:0},numVisible:{type:Number,default:1},numScroll:{type:Number,default:1},responsiveOptions:Array,orientation:{type:String,default:"horizontal"},verticalViewPortHeight:{type:String,default:"300px"},contentClass:String,containerClass:String,indicatorsContentClass:String,circular:{type:Boolean,default:!1},autoplayInterval:{type:Number,default:0},showNavigators:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},prevButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},nextButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}}},style:ot,provide:function(){return{$pcCarousel:this,$parentInstance:this}}};function v(t){return ht(t)||dt(t)||ct(t)||ut()}function ut(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ct(t,e){if(t){if(typeof t=="string")return V(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?V(t,e):void 0}}function dt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ht(t){if(Array.isArray(t))return V(t)}function V(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var $={name:"Carousel",extends:lt,inheritAttrs:!1,emits:["update:page"],isRemainingItemsAdded:!1,data:function(){return{remainingItems:0,d_numVisible:this.numVisible,d_numScroll:this.numScroll,d_oldNumScroll:0,d_oldNumVisible:0,d_oldValue:null,d_page:this.page,totalShiftedItems:this.page*this.numScroll*-1,allowAutoplay:!!this.autoplayInterval,d_circular:this.circular||this.allowAutoplay,swipeThreshold:20}},watch:{page:function(e){e>this.d_page?this.navForward({},e):e<this.d_page&&this.navBackward({},e),this.d_page=e},circular:function(e){this.d_circular=e},numVisible:function(e,n){this.d_numVisible=e,this.d_oldNumVisible=n},numScroll:function(e,n){this.d_oldNumScroll=n,this.d_numScroll=e},value:function(e){this.d_oldValue=e}},mounted:function(){var e=!1;if(this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners(),this.isCircular()){var n=this.totalShiftedItems;this.d_page===0?n=-1*this.d_numVisible:n===0&&(n=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),n!==this.totalShiftedItems&&(this.totalShiftedItems=n,e=!0)}!e&&this.isAutoplay()&&this.startAutoplay()},updated:function(){if(!this.empty){var e=this.isCircular(),n=!1,r=this.totalShiftedItems;if(this.autoplayInterval&&this.stopAutoplay(),this.d_oldNumScroll!==this.d_numScroll||this.d_oldNumVisible!==this.d_numVisible||this.d_oldValue.length!==this.value.length){this.remainingItems=(this.value.length-this.d_numVisible)%this.d_numScroll;var a=this.d_page;this.totalIndicators!==0&&a>=this.totalIndicators&&(a=this.totalIndicators-1,this.$emit("update:page",a),this.d_page=a,n=!0),r=a*this.d_numScroll*-1,e&&(r-=this.d_numVisible),a===this.totalIndicators-1&&this.remainingItems>0?(r+=-1*this.remainingItems+this.d_numScroll,this.isRemainingItemsAdded=!0):this.isRemainingItemsAdded=!1,r!==this.totalShiftedItems&&(this.totalShiftedItems=r,n=!0),this.d_oldNumScroll=this.d_numScroll,this.d_oldNumVisible=this.d_numVisible,this.d_oldValue=this.value,this.$refs.itemsContainer.style.transform=this.isVertical()?"translate3d(0, ".concat(r*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(r*(100/this.d_numVisible),"%, 0, 0)")}e&&(this.d_page===0?r=-1*this.d_numVisible:r===0&&(r=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),r!==this.totalShiftedItems&&(this.totalShiftedItems=r,n=!0)),!n&&this.isAutoplay()&&this.startAutoplay()}},beforeUnmount:function(){this.responsiveOptions&&this.unbindDocumentListeners(),this.autoplayInterval&&this.stopAutoplay()},methods:{getIndicatorPTOptions:function(e,n){return this.ptm(e,{context:{highlighted:n===this.d_page}})},getItemPTOptions:function(e,n){return this.ptm(e,{context:{index:n,active:this.firstIndex()<=n&&this.lastIndex()>=n,start:this.firstIndex()===n,end:this.lastIndex()===n}})},step:function(e,n){var r=this.totalShiftedItems,a=this.isCircular();if(n!=null)r=this.d_numScroll*n*-1,a&&(r-=this.d_numVisible),this.isRemainingItemsAdded=!1;else{r+=this.d_numScroll*e,this.isRemainingItemsAdded&&(r+=this.remainingItems-this.d_numScroll*e,this.isRemainingItemsAdded=!1);var i=a?r+this.d_numVisible:r;n=Math.abs(Math.floor(i/this.d_numScroll))}a&&this.d_page===this.totalIndicators-1&&e===-1?(r=-1*(this.value.length+this.d_numVisible),n=0):a&&this.d_page===0&&e===1?(r=0,n=this.totalIndicators-1):n===this.totalIndicators-1&&this.remainingItems>0&&(r+=this.remainingItems*-1-this.d_numScroll*e,this.isRemainingItemsAdded=!0),this.$refs.itemsContainer&&(!this.isUnstyled&&Y(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transform=this.isVertical()?"translate3d(0, ".concat(r*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(r*(100/this.d_numVisible),"%, 0, 0)"),this.$refs.itemsContainer.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=r,this.$emit("update:page",n),this.d_page=n},calculatePosition:function(){if(this.$refs.itemsContainer&&this.responsiveOptions){for(var e=window.innerWidth,n={numVisible:this.numVisible,numScroll:this.numScroll},r=0;r<this.responsiveOptions.length;r++){var a=this.responsiveOptions[r];parseInt(a.breakpoint,10)>=e&&(n=a)}if(this.d_numScroll!==n.numScroll){var i=this.d_page;i=parseInt(i*this.d_numScroll/n.numScroll),this.totalShiftedItems=n.numScroll*i*-1,this.isCircular()&&(this.totalShiftedItems-=n.numVisible),this.d_numScroll=n.numScroll,this.$emit("update:page",i),this.d_page=i}this.d_numVisible!==n.numVisible&&(this.d_numVisible=n.numVisible)}},navBackward:function(e,n){(this.d_circular||this.d_page!==0)&&this.step(1,n),this.allowAutoplay=!1,e.cancelable&&e.preventDefault()},navForward:function(e,n){(this.d_circular||this.d_page<this.totalIndicators-1)&&this.step(-1,n),this.allowAutoplay=!1,e.cancelable&&e.preventDefault()},onIndicatorClick:function(e,n){var r=this.d_page;n>r?this.navForward(e,n):n<r&&this.navBackward(e,n)},onTransitionEnd:function(){this.$refs.itemsContainer&&(!this.isUnstyled&&W(this.$refs.itemsContainer,"p-items-hidden"),this.$refs.itemsContainer.style.transition="",(this.d_page===0||this.d_page===this.totalIndicators-1)&&this.isCircular()&&(this.$refs.itemsContainer.style.transform=this.isVertical()?"translate3d(0, ".concat(this.totalShiftedItems*(100/this.d_numVisible),"%, 0)"):"translate3d(".concat(this.totalShiftedItems*(100/this.d_numVisible),"%, 0, 0)")))},onTouchStart:function(e){var n=e.changedTouches[0];this.startPos={x:n.pageX,y:n.pageY}},onTouchMove:function(e){var n=e.changedTouches[0],r=this.isVertical()?n.pageY-this.startPos.y:n.pageX-this.startPos.x;Math.abs(r)>this.swipeThreshold&&e.cancelable&&e.preventDefault()},onTouchEnd:function(e){var n=e.changedTouches[0];this.isVertical()?this.changePageOnTouch(e,n.pageY-this.startPos.y):this.changePageOnTouch(e,n.pageX-this.startPos.x)},changePageOnTouch:function(e,n){Math.abs(n)>this.swipeThreshold&&(n<0?this.navForward(e):this.navBackward(e))},onIndicatorKeydown:function(e){switch(e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break;case"Home":this.onHomeKey(),e.preventDefault();break;case"End":this.onEndKey(),e.preventDefault();break;case"ArrowUp":case"ArrowDown":case"PageUp":case"PageDown":e.preventDefault();break;case"Tab":this.onTabKey();break}},onRightKey:function(){var e=v(b(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,n+1===e.length?e.length-1:n+1)},onLeftKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)},onHomeKey:function(){var e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)},onEndKey:function(){var e=v(b(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(n,e.length-1)},onTabKey:function(){var e=v(b(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=e.findIndex(function(i){return q(i,"data-p-active")===!0}),r=A(this.$refs.indicatorContent,'[data-pc-section="indicator"] > button[tabindex="0"]'),a=e.findIndex(function(i){return i===r.parentElement});e[a].children[0].tabIndex="-1",e[n].children[0].tabIndex="0"},findFocusedIndicatorIndex:function(){var e=v(b(this.$refs.indicatorContent,'[data-pc-section="indicator"]')),n=A(this.$refs.indicatorContent,'[data-pc-section="indicator"] > button[tabindex="0"]');return e.findIndex(function(r){return r===n.parentElement})},changedFocusedIndicator:function(e,n){var r=v(b(this.$refs.indicatorContent,'[data-pc-section="indicator"]'));r[e].children[0].tabIndex="-1",r[n].children[0].tabIndex="0",r[n].children[0].focus()},bindDocumentListeners:function(){var e=this;this.documentResizeListener||(this.documentResizeListener=function(n){e.calculatePosition(n)},window.addEventListener("resize",this.documentResizeListener))},unbindDocumentListeners:function(){this.documentResizeListener&&(window.removeEventListener("resize",this.documentResizeListener),this.documentResizeListener=null)},startAutoplay:function(){var e=this;this.interval=setInterval(function(){e.d_page===e.totalIndicators-1?e.step(-1,0):e.step(-1,e.d_page+1)},this.autoplayInterval)},stopAutoplay:function(){this.interval&&clearInterval(this.interval)},createStyle:function(){if(!this.carouselStyle){var e;this.carouselStyle=document.createElement("style"),this.carouselStyle.type="text/css",X(this.carouselStyle,"nonce",(e=this.$primevue)===null||e===void 0||(e=e.config)===null||e===void 0||(e=e.csp)===null||e===void 0?void 0:e.nonce),document.body.appendChild(this.carouselStyle)}var n=`
                .p-carousel[`.concat(this.$attrSelector,`] .p-carousel-item {
                    flex: 1 0 `).concat(100/this.d_numVisible,`%
                }
            `);if(this.responsiveOptions&&!this.isUnstyled){var r=v(this.responsiveOptions),a=G();r.sort(function(d,s){var C=d.breakpoint,g=s.breakpoint;return Z(C,g,-1,a)});for(var i=0;i<r.length;i++){var h=r[i];n+=`
                        @media screen and (max-width: `.concat(h.breakpoint,`) {
                            .p-carousel[`).concat(this.$attrSelector,`] .p-carousel-item {
                                flex: 1 0 `).concat(100/h.numVisible,`%
                            }
                        }
                    `)}}this.carouselStyle.innerHTML=n},isVertical:function(){return this.orientation==="vertical"},hasValidItemCount:function(){return this.value&&this.value.length>this.d_numVisible},isCircular:function(){return this.hasValidItemCount()&&this.d_circular},isAutoplay:function(){return this.hasValidItemCount()&&this.autoplayInterval&&this.allowAutoplay},firstIndex:function(){return this.isCircular()?-1*(this.totalShiftedItems+this.d_numVisible):this.totalShiftedItems*-1},lastIndex:function(){return this.firstIndex()+this.d_numVisible-1},ariaSlideNumber:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g,e):void 0},ariaPageLabel:function(e){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g,e):void 0}},computed:{totalIndicators:function(){return this.value?Math.max(Math.ceil((this.value.length-this.d_numVisible)/this.d_numScroll)+1,0):0},backwardIsDisabled:function(){return this.value&&(!this.circular||this.value.length<this.d_numVisible)&&this.d_page===0},forwardIsDisabled:function(){return this.value&&(!this.circular||this.value.length<this.d_numVisible)&&(this.d_page===this.totalIndicators-1||this.totalIndicators===0)},ariaSlideLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.slide:void 0},ariaPrevButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.prevPageLabel:void 0},ariaNextButtonLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.nextPageLabel:void 0},empty:function(){return!this.value||this.value.length===0},emptyMessageText:function(){var e;return((e=this.$primevue.config)===null||e===void 0||(e=e.locale)===null||e===void 0?void 0:e.emptyMessage)||""}},components:{Button:H,ChevronRightIcon:O,ChevronDownIcon:K,ChevronLeftIcon:U,ChevronUpIcon:z},directives:{ripple:F}},pt=["aria-live"],mt=["data-p-carousel-item-active","data-p-carousel-item-start","data-p-carousel-item-end"],ft=["aria-hidden","aria-label","aria-roledescription","data-p-carousel-item-active","data-p-carousel-item-start","data-p-carousel-item-end"],vt=["data-p-active"],gt=["tabindex","aria-label","aria-current","onClick"];function bt(t,e,n,r,a,i){var h=Q("Button");return l(),c("div",u({class:t.cx("root"),role:"region"},t.ptmi("root")),[t.$slots.header?(l(),c("div",u({key:0,class:t.cx("header")},t.ptm("header")),[p(t.$slots,"header")],16)):m("",!0),i.empty?p(t.$slots,"empty",{key:2},function(){return[J(L(i.emptyMessageText),1)]}):(l(),c("div",u({key:1,class:[t.cx("contentContainer"),t.containerClass]},t.ptm("contentContainer")),[o("div",u({class:[t.cx("content"),t.contentClass],"aria-live":a.allowAutoplay?"polite":"off"},t.ptm("content")),[t.showNavigators?(l(),f(h,u({key:0,class:t.cx("pcPrevButton"),disabled:i.backwardIsDisabled,"aria-label":i.ariaPrevButtonLabel,unstyled:t.unstyled,onClick:i.navBackward},t.prevButtonProps,{pt:t.ptm("pcPrevButton"),"data-pc-group-section":"navigator"}),{icon:_(function(d){return[p(t.$slots,"previcon",{},function(){return[(l(),f(R(i.isVertical()?"ChevronUpIcon":"ChevronLeftIcon"),u({class:d.icon},t.ptm("pcPrevButton").icon),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-label","unstyled","onClick","pt"])):m("",!0),o("div",u({class:t.cx("viewport"),style:[{height:i.isVertical()?t.verticalViewPortHeight:"auto"}],onTouchend:e[1]||(e[1]=function(){return i.onTouchEnd&&i.onTouchEnd.apply(i,arguments)}),onTouchstart:e[2]||(e[2]=function(){return i.onTouchStart&&i.onTouchStart.apply(i,arguments)}),onTouchmove:e[3]||(e[3]=function(){return i.onTouchMove&&i.onTouchMove.apply(i,arguments)})},t.ptm("viewport")),[o("div",u({ref:"itemsContainer",class:t.cx("itemList"),onTransitionend:e[0]||(e[0]=function(){return i.onTransitionEnd&&i.onTransitionEnd.apply(i,arguments)})},t.ptm("itemList")),[i.isCircular()?(l(!0),c(w,{key:0},S(t.value.slice(-1*a.d_numVisible),function(d,s){return l(),c("div",u({key:s+"_scloned",class:t.cx("itemClone",{index:s,value:t.value,totalShiftedItems:a.totalShiftedItems,d_numVisible:a.d_numVisible}),ref_for:!0},t.ptm("itemClone"),{"data-p-carousel-item-active":a.totalShiftedItems*-1===t.value.length+a.d_numVisible,"data-p-carousel-item-start":s===0,"data-p-carousel-item-end":t.value.slice(-1*a.d_numVisible).length-1===s}),[p(t.$slots,"item",{data:d,index:s})],16,mt)}),128)):m("",!0),(l(!0),c(w,null,S(t.value,function(d,s){return l(),c("div",u({key:s,class:t.cx("item",{index:s}),role:"group","aria-hidden":i.firstIndex()>s||i.lastIndex()<s?!0:void 0,"aria-label":i.ariaSlideNumber(s),"aria-roledescription":i.ariaSlideLabel,ref_for:!0},i.getItemPTOptions("item",s),{"data-p-carousel-item-active":i.firstIndex()<=s&&i.lastIndex()>=s,"data-p-carousel-item-start":i.firstIndex()===s,"data-p-carousel-item-end":i.lastIndex()===s}),[p(t.$slots,"item",{data:d,index:s})],16,ft)}),128)),i.isCircular()?(l(!0),c(w,{key:1},S(t.value.slice(0,a.d_numVisible),function(d,s){return l(),c("div",u({key:s+"_fcloned",class:t.cx("itemClone",{index:s,value:t.value,totalShiftedItems:a.totalShiftedItems,d_numVisible:a.d_numVisible}),ref_for:!0},t.ptm("itemClone")),[p(t.$slots,"item",{data:d,index:s})],16)}),128)):m("",!0)],16)],16),t.showNavigators?(l(),f(h,u({key:1,class:t.cx("pcNextButton"),disabled:i.forwardIsDisabled,"aria-label":i.ariaNextButtonLabel,unstyled:t.unstyled,onClick:i.navForward},t.nextButtonProps,{pt:t.ptm("pcNextButton"),"data-pc-group-section":"navigator"}),{icon:_(function(d){return[p(t.$slots,"nexticon",{},function(){return[(l(),f(R(i.isVertical()?"ChevronDownIcon":"ChevronRightIcon"),u({class:d.class},t.ptm("pcNextButton").icon),null,16,["class"]))]})]}),_:3},16,["class","disabled","aria-label","unstyled","onClick","pt"])):m("",!0)],16,pt),i.totalIndicators>=0&&t.showIndicators?(l(),c("ul",u({key:0,ref:"indicatorContent",class:[t.cx("indicatorList"),t.indicatorsContentClass],onKeydown:e[4]||(e[4]=function(){return i.onIndicatorKeydown&&i.onIndicatorKeydown.apply(i,arguments)})},t.ptm("indicatorList")),[(l(!0),c(w,null,S(i.totalIndicators,function(d,s){return l(),c("li",u({key:"p-carousel-indicator-"+s.toString(),class:t.cx("indicator",{index:s}),ref_for:!0},i.getIndicatorPTOptions("indicator",s),{"data-p-active":a.d_page===s}),[o("button",u({class:t.cx("indicatorButton"),type:"button",tabindex:a.d_page===s?"0":"-1","aria-label":i.ariaPageLabel(s+1),"aria-current":a.d_page===s?"page":void 0,onClick:function(g){return i.onIndicatorClick(g,s)},ref_for:!0},i.getIndicatorPTOptions("indicatorButton",s)),null,16,gt)],16,vt)}),128))],16)):m("",!0)],16)),t.$slots.footer?(l(),c("div",u({key:3,class:t.cx("footer")},t.ptm("footer")),[p(t.$slots,"footer")],16)):m("",!0)],16)}$.render=bt;const yt={class:"item"},It={class:"photo"},Ct=["src"],wt={class:"title"},St=T({__name:"CardGroup1",setup(t){const e=new URL("/assets/02-D5qumnKt.jpg",import.meta.url).href,n=new URL("/assets/03-DBtHPBxS.jpg",import.meta.url).href,r=new URL("/assets/04-DgW6SXo0.jpg",import.meta.url).href,a=y([{image:e,description:"原位於青永館前草皮的電機工程館。"},{image:n,description:"921夷平後樣貌。"},{image:r,description:"教學大樓在私校時代，每到夜間廊道欄牆上擺放一個又一個的大茶桶供夜間上課同學取用，是張明將軍與王國秀創辦人給夜間辛苦進修同學的關懷。"}]),i=y([{breakpoint:"1400px",numVisible:1,numScroll:1},{breakpoint:"1199px",numVisible:1,numScroll:1},{breakpoint:"767px",numVisible:1,numScroll:1},{breakpoint:"575px",numVisible:1,numScroll:1}]);return(h,d)=>(l(),f(k($),{value:a.value,numVisible:1,numScroll:1,responsiveOptions:i.value,autoplayInterval:4e3,circular:""},{item:_(s=>[o("div",yt,[o("div",It,[o("img",{src:s.data.image},null,8,Ct)]),o("div",wt,L(s.data.description),1)])]),_:1},8,["value","responsiveOptions"]))}}),_t=P(St,[["__scopeId","data-v-ab916c8a"]]),kt={class:"item"},Vt={class:"photo"},xt=["src"],Lt={class:"title"},Tt=T({__name:"CardGroup2",setup(t){const e=new URL("/assets/05-BVaeZrOs.jpg",import.meta.url).href,n=new URL("/assets/06-wh1RKt2T.jpg",import.meta.url).href,r=new URL("/assets/07-DjIZOS0T.jpg",import.meta.url).href,a=new URL("/assets/08-DrGMDQiK.jpg",import.meta.url).href,i=new URL("/assets/09-scsBlqsK.jpg",import.meta.url).href,h=new URL("/assets/10-UhbLjNeb.jpg",import.meta.url).href,d=new URL("/assets/11-DhrvwfEK.jpg",import.meta.url).href,s=new URL("/assets/12-jmAPs-6L.jpg",import.meta.url).href,C=new URL("/assets/13-DxQv1NSU.jpg",import.meta.url).href,g=y([{image:e,description:"施世昱老師解說建築物透視技法。"},{image:n,description:"同學以透視原理繪製文化休閒館。"},{image:r,description:"校園彩繪作品展覽與評圖。"},{image:a,description:"校園彩繪作品展覽與評圖。"},{image:i,description:"吳清川老師指導。"},{image:h,description:"呂金龍與吳清川老師討論同學作品。"},{image:d,description:"校園彩繪評圖合影。"},{image:s,description:"由｢展演概論」修課同學策劃〈勤益風華〉，展場遍佈文化休閒館、勤創基地與圖資大樓一樓、六樓。"},{image:C,description:"由｢展演概論」修課同學策劃〈勤益風華〉，展場遍佈文化休閒館、勤創基地與圖資大樓一樓、六樓。"}]),M=y([{breakpoint:"1400px",numVisible:1,numScroll:1},{breakpoint:"1199px",numVisible:1,numScroll:1},{breakpoint:"767px",numVisible:1,numScroll:1},{breakpoint:"575px",numVisible:1,numScroll:1}]);return(Ht,Xt)=>(l(),f(k($),{value:g.value,numVisible:1,numScroll:1,responsiveOptions:M.value,autoplayInterval:4e3,circular:""},{item:_(B=>[o("div",kt,[o("div",Vt,[o("img",{src:B.data.image},null,8,xt)]),o("div",Lt,L(B.data.description),1)])]),_:1},8,["value","responsiveOptions"]))}}),Pt=P(Tt,[["__scopeId","data-v-b4d4c836"]]);var $t=({dt:t})=>`
.p-skeleton {
    overflow: hidden;
    background: ${t("skeleton.background")};
    border-radius: ${t("skeleton.border.radius")};
}

.p-skeleton::after {
    content: "";
    animation: p-skeleton-animation 1.2s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), ${t("skeleton.animation.background")}, rgba(255, 255, 255, 0));
}

[dir='rtl'] .p-skeleton::after {
    animation-name: p-skeleton-animation-rtl;
}

.p-skeleton-circle {
    border-radius: 50%;
}

.p-skeleton-animation-none::after {
    animation: none;
}

@keyframes p-skeleton-animation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}

@keyframes p-skeleton-animation-rtl {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}
`,Bt={root:{position:"relative"}},At={root:function(e){var n=e.props;return["p-skeleton p-component",{"p-skeleton-circle":n.shape==="circle","p-skeleton-animation-none":n.animation==="none"}]}},Rt=D.extend({name:"skeleton",style:$t,classes:At,inlineStyles:Bt}),Nt={name:"BaseSkeleton",extends:j,props:{shape:{type:String,default:"rectangle"},size:{type:String,default:null},width:{type:String,default:"100%"},height:{type:String,default:"1rem"},borderRadius:{type:String,default:null},animation:{type:String,default:"wave"}},style:Rt,provide:function(){return{$pcSkeleton:this,$parentInstance:this}}};function I(t){"@babel/helpers - typeof";return I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(t)}function Dt(t,e,n){return(e=jt(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function jt(t){var e=Kt(t,"string");return I(e)=="symbol"?e:e+""}function Kt(t,e){if(I(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(I(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var E={name:"Skeleton",extends:Nt,inheritAttrs:!1,computed:{containerStyle:function(){return this.size?{width:this.size,height:this.size,borderRadius:this.borderRadius}:{width:this.width,height:this.height,borderRadius:this.borderRadius}},dataP:function(){return tt(Dt({},this.shape,this.shape))}}},Ut=["data-p"];function Ot(t,e,n,r,a,i){return l(),c("div",u({class:t.cx("root"),style:[t.sx("root"),i.containerStyle],"aria-hidden":"true"},t.ptmi("root"),{"data-p":i.dataP}),null,16,Ut)}E.render=Ot;const Et={class:"container"},Mt={class:"banner"},Ft=["src"],zt=T({__name:"CurationIntro",setup(t){const e=new URL("/assets/01-D3X1-Oah.jpg",import.meta.url).href,n=y(!1);return et(()=>{}),(r,a)=>(l(),c("section",null,[o("div",Et,[o("div",Mt,[o("img",{src:k(e),onLoad:a[0]||(a[0]=i=>n.value=!0)},null,40,Ft),n.value?m("",!0):(l(),f(k(E),{key:0,class:"banner-skeleton",width:"100%",height:"52vh",borderRadius:"0px"}))]),a[1]||(a[1]=o("div",{class:"text"},[o("p",null," 　　策劃這個線上展覽的意義在於：當勤益百年，我輩早已煙沒於歷史洪流！但，青山依舊在，明秀湖仍清麗相伴。 "),o("p",null," 　　2025除夕前後，陸陸續續發生或大或小的地震，驚恐的程度總讓人聯想到1999年的｢九二一大地震」。這場地變，勤益受創嚴重，當時的電機大樓直接夷平、教學大樓與學生宿舍就此消失……。幸運的是，仍有幾座老建築活了下來！ ")],-1)),N(_t),a[2]||(a[2]=o("div",{class:"text"},[o("p",null," 　　大學者，除了有大師，還應有老樹老屋，方足以印證傳承軌跡。但，面對大造化，我輩不得不謙卑。滄海能成桑田，何況一小小樓房？不得已，只能以紙筆描繪以留後人緬懷。 "),o("p",null," 　　這是一個始於2013終於2024的勤益校景十年彩繪計畫，最後將61幅作品移交｢張明王國秀基金會」永久典藏。此期間，等待了13年的｢勤益學舍」終於落成；再隔年，明秀湖雖小巧卻也能與青山應答。遺憾的是，就在2024，勤益大道核心的精神標的物小白宮/行政大樓被拆除了！慶幸的是：呂金龍和施世昱均不約而同以該建築為首要描寫對象，她以另一個姿態活了下來！ "),o("p",null," 　　這十年來，只要有機緣，便陸續央請呂金龍、吳清川、施世昱三人為勤益作畫，各以不同的觀察角度與空間氛圍為勤益留下千姿百態的記錄。雖然藝術家的創作觀點、媒材技法有異，但約好以｢具辨識性」作為最高原則，尤其以勤益人的共同記憶為題材。因此，從國秀樓、圖書館，至於各院系館的建築外觀，成為最主要的人文景觀描繪對象。但，整體校園空間的勾勒，並非空照圖，而是動態空間的尋蹤，既可以是大範圍的地圖式鳥瞰，也可以是羊腸小徑等較不大眾化的私密空間。此外，一些生活機能空間，如學生宿舍、青永館、運動場，甚至攸關同學生活費來源、位於舊校門前的第一銀行取款機亭，也在記錄之內。 "),o("p",null," 　　此外，除了典藏畫作由三位藝術家主導外，不斷地有許多孩子在施世昱老師的帶領下，加入情憶勤益、彩繪勤益、勤益風華等名稱不同，卻做同一件事情的計畫中，更衍伸出不少以校園為元素的設計品。可惜的是，基於作品所有權，也因為經費有限，我們無法典藏同學們的優秀作品，只能透過評圖照片紀念一二。特在此向楊絮安、林紀葳、呂維玲等人，以及文化創意事業系第十屆至第十四屆(2017-2021)參與課程的同學們致謝！ ")],-1)),N(Pt),a[3]||(a[3]=o("div",{class:"text"},[o("p",null," 　　最後，最重要的還是要再三再四向呂金龍、吳清川、施世昱三位好友致敬。筆者二十幾年來浸淫於藝術領域中，明知藝術市場的價值判斷模式，卻仍厚顏請託，當然是因為對彼此價值觀的認同與了解。面對世俗功業的虛幻性，大家更在意的是：在歷史洪流中能留下什麼？直到此刻，呂金龍還問我：可以重畫嗎？所謂：不惜以今我挑戰昨日之我，正是如此！ "),o("p",null," 　　是的，勤益一直在朝前邁進，而我輩以一生之力獻於校園終將一一遠離。我想的是：如何用畫筆產生如史筆般的功能，以供後來者追憶？ ")],-1))])]))}}),Zt=P(zt,[["__scopeId","data-v-0c508af7"]]);export{Zt as default};
