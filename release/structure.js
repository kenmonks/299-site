var Structure,slice=[].slice,indexOf=[].indexOf||function(t){for(var n=0,i=this.length;n<i;n++)if(n in this&&this[n]===t)return n;return-1},hasProp={}.hasOwnProperty;Structure=function(){function t(){var t,n,i,e;for(n=1<=arguments.length?slice.call(arguments,0):[],this.attributes={},this.parentNode=null,this.childList=[],i=0,e=n.length;i<e;i++)t=n[i],this.insertChild(t,this.childList.length);this.dirty=!1}var n,i;return t.prototype.isDirty=function(){return this.dirty},t.prototype.subclasses={},t.addSubclass=function(n,i){return t.prototype.subclasses[n]=i,n},t.prototype.className=t.addSubclass("Structure",t),t.prototype.toJSON=function(t){var n,i;return null==t&&(t=!0),t||null==this.id()?n=this.attributes:delete(n=JSON.parse(JSON.stringify(this.attributes))).id,{className:this.className,attributes:n,children:function(){var n,e,r,s;for(s=[],n=0,e=(r=this.childList).length;n<e;n++)i=r[n],s.push(i.toJSON(t));return s}.call(this)}},t.fromJSON=function(n){var i,e,r,s;return r=t.prototype.subclasses[n.className],e=function(){var e,r,s,o;for(o=[],e=0,r=(s=n.children).length;e<r;e++)i=s[e],o.push(t.fromJSON(i));return o}(),s=function(t,n,i){i.prototype=t.prototype;var e=new i,r=t.apply(e,n);return Object(r)===r?r:e}(r,e,function(){}),s.attributes=JSON.parse(JSON.stringify(n.attributes)),s},t.prototype.parent=function(){return this.parentNode},t.prototype.children=function(){return this.childList.slice(0)},t.prototype.indexInParent=function(){var t,n;return null!=(t=this.parentNode)&&null!=(n=t.childList)?n.indexOf(this):void 0},t.prototype.previousSibling=function(){var t;if(null!=(t=this.indexInParent()))return this.parentNode.childList[t-1]},t.prototype.nextSibling=function(){var t;if(null!=(t=this.indexInParent()))return this.parentNode.childList[t+1]},t.prototype.copy=function(){var n,i,e,r,s;for((i=new t).attributes=JSON.parse(JSON.stringify(this.attributes)),i.childList=function(){var t,i,e,r;for(r=[],t=0,i=(e=this.childList).length;t<i;t++)n=e[t],r.push(n.copy());return r}.call(this),e=0,r=(s=i.childList).length;e<r;e++)s[e].parentNode=i;return i},t.prototype.isEarlierThan=function(n){var i,e,r,s,o,l,u,h;if(n instanceof t){if(n===this)return!1;for(i=[n];null!=(s=i[0].parent());)i.unshift(s);for(h=this,u=null;null!=h&&indexOf.call(i,h)<0;)u=h,h=h.parent();if(null!=h)return h===this||h!==n&&(e=i.indexOf(h),l=i[e+1],r=u.indexInParent(),o=l.indexInParent(),r<o)}},t.prototype.removeFromParent=function(){var t,n;if(null!=(n=this.parentNode))return"function"==typeof this.willBeRemoved&&this.willBeRemoved(),t=this.indexInParent(),this.parentNode.childList.splice(t,1),this.parentNode=null,"function"==typeof this.wasRemoved?this.wasRemoved(n,t):void 0},t.prototype.removeChild=function(t){var n;return null!=(n=this.childList[t])?n.removeFromParent():void 0},t.prototype.insertChild=function(n,i){var e;if(null==i&&(i=0),n instanceof t&&n!==this&&0<=i&&i<=this.childList.length){for(e=this;null!=(e=e.parent());)if(e===n){this.removeFromParent();break}return n.removeFromParent(),"function"==typeof n.willBeInserted&&n.willBeInserted(this,i),this.childList.splice(i,0,n),n.parentNode=this,"function"==typeof n.wasInserted?n.wasInserted():void 0}},t.prototype.replaceWith=function(t){var n,i;if(null!=(i=this.parentNode))return n=this.indexInParent(),this.removeFromParent(),i.insertChild(t,n)},t.prototype.getAttribute=function(t){return this.attributes[t]},t.prototype.setAttribute=function(t,n){if(this.attributes[t]!==n)return"function"==typeof this.willBeChanged&&this.willBeChanged(t),this.attributes[t]=n,"function"==typeof this.wasChanged?this.wasChanged(t):void 0},t.prototype.clearAttributes=function(){var t,n,i,e,r;for(0===(i=1<=arguments.length?slice.call(arguments,0):[]).length&&(i=Object.keys(this.attributes)),r=[],t=0,e=i.length;t<e;t++)(n=i[t])in this.attributes?("function"==typeof this.willBeChanged&&this.willBeChanged(n),delete this.attributes[n],r.push("function"==typeof this.wasChanged?this.wasChanged(n):void 0)):r.push(void 0);return r},t.prototype.attr=function(t){var n,i;for(n in t)hasProp.call(t,n)&&(i=t[n],this.setAttribute(n,i));return this},t.prototype.setup=function(){var t,n,i;return i={},(n=function(t){var e,r,s,o,l,u;for(null!=(r=t.getAttribute("id"))&&(i[r]=t),u=[],s=0,o=(l=t.children()).length;s<o;s++)e=l[s],u.push(n(e));return u})(this),(t=function(n){var e,r,s,o,l,u,h,c,a,p,f;for(s=0,l=(h=["label","premise","reason"]).length;s<l;s++)e=h[s],null!=(f=n.getAttribute(e+" for"))&&(null!=(p="previous"===f?n.previousSibling():"next"===f?n.nextSibling():i.hasOwnProperty(f)?i[f]:null)&&n.connectTo(p,e),n.clearAttributes(e+" for"));for(a=[],o=0,u=(c=n.children()).length;o<u;o++)r=c[o],a.push(t(r));return a})(this),this.fillOutConnections(),this},t.prototype.IDs={},t.instanceWithID=function(n){return t.prototype.IDs[n]},t.prototype.id=function(){return this.getAttribute("id")},t.prototype.trackIDs=function(n){var i,e,r,s,o;if(null==n&&(n=!0),null!=this.id()&&(t.prototype.IDs[this.id()]=this),n){for(o=[],e=0,r=(s=this.children()).length;e<r;e++)i=s[e],o.push(i.trackIDs());return o}},t.prototype.untrackIDs=function(n){var i,e,r,s,o;if(null==n&&(n=!0),null!=this.id()&&delete t.prototype.IDs[this.id()],n){for(o=[],e=0,r=(s=this.children()).length;e<r;e++)i=s[e],o.push(i.untrackIDs());return o}},t.prototype.clearIDs=function(t){var n,i,e,r,s;if(null==t&&(t=!0),this.clearAttributes("id"),t){for(s=[],i=0,e=(r=this.children()).length;i<e;i++)n=r[i],s.push(n.clearIDs());return s}},t.prototype.fillOutConnections=function(){var n,i,e,r,s,o,l,u,h,c,a,p,f,d,b,g,y,v,O,I,A,S,x,m,N;for(o=0,l=(f=this.childList).length;o<l;o++)f[o].fillOutConnections();if(null!=this.id()){a=function(t){var n,i,e,r,s,o;r=[];for(s in t)if(hasProp.call(t,s)){i=t[s];for(o in i)if(hasProp.call(i,o))for(n=1,e=i[o];1<=e?n<=e:n>=e;1<=e?++n:--n)r.push([s,o])}return r},p=(e=function(t){var n,i,e,r,s,o,l;for(s={},e=0,r=t.length;e<r;e++)o=(i=t[e])[0],l=i[1],null==s[o]&&(s[o]={}),null==(n=s[o])[l]&&(n[l]=0),s[o][l]++;return s})(null!=(d=this.getAttribute("connectionsOut"))?d:[]);for(x in p)if(hasProp.call(p,x)&&(u=p[x],null!=(i=t.instanceWithID(x)))){null==(m=e(null!=(b=i.getAttribute("connectionsIn"))?b:[]))[h=this.id()]&&(m[h]={});for(N in u)hasProp.call(u,N)&&(r=u[N],u[N]=m[this.id()][N]=Math.max(r,null!=(g=m[this.id()][N])?g:0));i.setAttribute("connectionsIn",a(m))}s=e(null!=(y=this.getAttribute("connectionsIn"))?y:[]),I=[];for(A in s)if(hasProp.call(s,A)&&(u=s[A],null!=(n=t.instanceWithID(A)))){null==(S=e(null!=(v=n.getAttribute("connectionsOut"))?v:[]))[c=this.id()]&&(S[c]={});for(N in u)hasProp.call(u,N)&&(r=u[N],u[N]=S[this.id()][N]=Math.max(r,null!=(O=S[this.id()][N])?O:0));I.push(n.setAttribute("connectionsOut",a(S)))}return I}},t.prototype.connectTo=function(n,i){var e,r,s,o;return null==i&&(i=""),null!=this.id()&&n instanceof t&&null!=n.id()&&(r=null!=(s=this.getAttribute("connectionsOut"))?s:[],e=null!=(o=n.getAttribute("connectionsIn"))?o:[],r.push([n.id(),i]),e.push([this.id(),i]),this.setAttribute("connectionsOut",r),n.setAttribute("connectionsIn",e),!0)},t.prototype.disconnectFrom=function(n,i){var e,r,s,o,l,u;if(null==i&&(i=""),!(null!=this.id()&&n instanceof t&&null!=n.id()))return!1;for(o=null!=(l=this.getAttribute("connectionsOut"))?l:[],r=null!=(u=n.getAttribute("connectionsIn"))?u:[],s=e=0;s<o.length&&(o[s][0]!==n.id()||o[s][1]!==i);)s++;if(s===o.length)return!1;for(;e<r.length&&(r[e][0]!==this.id()||r[e][1]!==i);)e++;return e!==r.length&&(o.splice(s,1),r.splice(e,1),this.setAttribute("connectionsOut",o),n.setAttribute("connectionsIn",r),!0)},t.prototype.allConnectionsOut=function(t){var n,i,e,r,s,o;if(r=null!=(s=this.getAttribute("connectionsOut"))?s:[],null==t)return r;for(o=[],i=0,e=r.length;i<e;i++)(n=r[i])[1]===t&&o.push(n[0]);return o},t.prototype.allConnectionsIn=function(t){var n,i,e,r,s,o;if(i=null!=(s=this.getAttribute("connectionsIn"))?s:[],null==t)return i;for(o=[],e=0,r=i.length;e<r;e++)(n=i[e])[1]===t&&o.push(n[0]);return o},t.prototype.allConnectionsTo=function(n){var i,e,r,s,o,l;if(!(n instanceof t&&null!=n.id()))return null;for(l=[],e=0,r=(s=null!=(o=this.getAttribute("connectionsOut"))?o:[]).length;e<r;e++)(i=s[e])[0]===n.id()&&l.push(i[1]);return l},t.prototype.isAccessibleTo=function(n){return n instanceof t&&(null!=n.parent()&&(this.parent()===n.parent()?this.indexInParent()<n.indexInParent():this.isAccessibleTo(n.parent())))},t.prototype.isInTheScopeOf=function(t){return t.isAccessibleTo(this)},t.prototype.iteratorOverAccessibles=function(){return{ancestor:this,sibling:this,next:function(){return null==this.ancestor?null:null!=(this.sibling=this.sibling.previousSibling())?this.sibling:(this.sibling=this.ancestor=this.ancestor.parent(),this.next())}}},t.prototype.iteratorOverScope=function(){return{chain:[this],next:function(){var t,n;if(0===this.chain.length)return null;if(t=this.chain.pop(),null!=(n=t.nextSibling())){for(this.chain.push(n);null!=(n=n.children()[0]);)this.chain.push(n);return this.chain[this.chain.length-1]}return this.chain.length>0?this.chain[this.chain.length-1]:null}}},i=function(t,n){var i;for(null==n&&(n=function(){return!0});null!=(i=t.next());)if(n(i))return i},n=function(t,n){var i,e;for(null==n&&(n=function(){return!0}),e=[];null!=(i=t.next());)n(i)&&e.push(i);return e},t.prototype.firstAccessible=function(t){return null==t&&(t=function(){return!0}),i(this.iteratorOverAccessibles(),t)},t.prototype.allAccessibles=function(t){return null==t&&(t=function(){return!0}),n(this.iteratorOverAccessibles(),t)},t.prototype.firstInScope=function(t){return null==t&&(t=function(){return!0}),i(this.iteratorOverScope(),t)},t.prototype.allInScope=function(t){return null==t&&(t=function(){return!0}),n(this.iteratorOverScope(),t)},t}(),"undefined"!=typeof exports&&null!==exports&&(exports.Structure=Structure);
//# sourceMappingURL=structure.js.map
