define("bui-tree/1.1.0/index",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index"],function(e,t,n){var i=e("bui-common/1.1.0/common"),d=i.namespace("Tree");i.mix(d,{TreeList:e("bui-tree/1.1.0/src/treelist"),Mixin:e("bui-tree/1.1.0/src/treemixin"),TreeMenu:e("bui-tree/1.1.0/src/treemenu")}),n.exports=d}),define("bui-tree/1.1.0/src/treelist",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index"],function(e,t,n){var i=e("bui-common/1.1.0/common"),d=e("bui-list/1.1.0/index"),o=e("bui-tree/1.1.0/src/treemixin"),a=e("bui-tree/1.1.0/src/selection"),s=d.SimpleList.extend([o,a],{},{ATTRS:{itemCls:{value:i.prefix+"tree-item"},itemTpl:{value:"<li>{text}</li>"},idField:{value:"id"}}},{xclass:"tree-list"});n.exports=s}),define("bui-tree/1.1.0/src/treemixin",["jquery","bui-common/1.1.0/common","bui-data/1.1.0/index"],function(e,t,n){function i(e,t){return o.isString(t)&&(t=e.findNode(t)),t}var d=e("jquery"),o=e("bui-common/1.1.0/common"),a=e("bui-data/1.1.0/index"),s="expanded",c="loading",l="checked",r="partial-checked",u={NONE:"none",ALL:"all",CUSTOM:"custom",ONLY_LEAF:"onlyLeaf"},h="x-tree-icon",f="x-tree-elbow",m="x-tree-show-line",p=f+"-",v=h+"-wraper",g=p+"line",_=p+"end",C=p+"empty",k=p+"expander",x=h+"-checkbox",N=h+"-radio",I=k+"-end",b=function(){};b.ATTRS={store:{getter:function(e){if(!e){var t=this,n=new a.TreeStore({root:t.get("root"),data:t.get("nodes")});return t.setInternal("store",n),n}return e}},root:{},nodes:{sync:!1},iconContainer:{},iconWraperTpl:{value:'<span class="'+v+'">{icons}</span>'},showLine:{value:!1},showIcons:{value:!0},iconTpl:{value:'<span class="x-tree-icon {cls}"></span>'},leafCls:{value:p+"leaf"},dirCls:{value:p+"dir"},checkType:{value:"custom"},cascadeCheckd:{value:!0},accordion:{value:!1},multipleCheck:{value:!0},checkedField:{valueFn:function(){return this.getStatusField("checked")}},checkableField:{value:"checkable"},itemStatusFields:{value:{expanded:"expanded",disabled:"disabled",checked:"checked"}},dirSelectable:{value:!0},showRoot:{value:!1},events:{value:{expanded:!1,collapsed:!1,checkedchange:!1}},expandEvent:{value:"itemdblclick"},expandAnimate:{value:!1},collapseEvent:{value:"itemdblclick"},startLevel:{value:1}},o.augment(b,{collapseAll:function(){var e=this,t=e.get("view").getAllElements();o.each(t,function(t){var n=e.getItemByElement(t);n&&e._collapseNode(n,t,!0)})},collapseNode:function(e){var t,n=this;o.isString(e)&&(e=n.findNode(e)),e&&(t=n.findElement(e),n._collapseNode(e,t))},expandAll:function(){var e=this,t=e.get("view").getAllElements();o.each(t,function(t){var n=e.getItemByElement(t);e._expandNode(n,t,!0)})},expandNode:function(e,t){var n,i=this;o.isString(e)&&(e=i.findNode(e)),e&&(e.parent&&!i.isExpanded(e.parent)&&i.expandNode(e.parent),n=i.findElement(e),i._expandNode(e,n,t))},expandPath:function(e,t,n){if(e){n=n||0;var i,d,o,a,s=this,c=s.get("store"),l=e.split(",");for(i=s.findNode(l[n]),o=n+1;o<l.length;o++)if(a=l[o],d=s.findNode(a,i),i&&d)s.expandNode(i),i=d;else if(i&&t){c.load({id:i.id},function(){d=s.findNode(a,i),d&&s.expandPath(e,t,o)});break}}},findNode:function(e,t){return this.get("store").findNode(e,t)},getCheckedLeaf:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return e.leaf&&t.isChecked(e)},e)},getCheckedNodes:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return t.isChecked(e)},e)},isItemSelectable:function(e){var t=this,n=t.get("dirSelectable"),i=e;return!i||n||i.leaf?!0:!1},isExpanded:function(e){if(!e||e.leaf)return!1;var t,n=this;return n._isRoot(e)&&!n.get("showRoot")?!0:(o.isString(e)&&(item=n.getItem(e)),t=n.findElement(e),this._isExpanded(e,t))},isChecked:function(e){return e?!!e[this.get("checkedField")]:!1},toggleExpand:function(e){var t,n=this;o.isString(e)&&(item=n.getItem(e)),t=n.findElement(e),n._toggleExpand(e,t)},setNodeChecked:function(e,t,n){if(n=null==n?!0:n,e){var d,a,s=this,c=s.get("multipleCheck"),r=s.get("cascadeCheckd");if(e=i(this,e),e&&(d=e.parent,s.isCheckable(e))){if(s.isChecked(e)!==t||s.hasStatus(e,"checked")!==t){if(a=s.findElement(e),r?(a?(s.setItemStatus(e,l,t,a),c?s._resetPatialChecked(e,t,t,a):t&&d&&s.isChecked(d)!=t&&s.setNodeChecked(d,t,!1)):s.isItemDisabled(e)||s.setStatusValue(e,l,t),d&&(s.isChecked(d)!=t?s._resetParentChecked(d):c&&s._resetPatialChecked(d,null,null,null,!0))):s.isItemDisabled(e)||(a?s.setItemStatus(e,l,t,a):s.setStatusValue(e,l,t)),t&&!c&&(s.isChecked(d)||d==s.get("root")||!r)){var u=d.children;o.each(u,function(t){t!==e&&s.isChecked(t)&&s.setNodeChecked(t,!1)})}s.fire("checkedchange",{node:e,element:a,checked:t})}!e.leaf&&n&&r&&o.each(e.children,function(e,i){(c||!t||!c&&0==i)&&s.setNodeChecked(e,t,n)})}}},setChecked:function(e){this.setNodeChecked(e,!0)},clearAllChecked:function(){var e=this,t=e.getCheckedNodes();o.each(t,function(t){e.setNodeChecked(t,!1)})},_initRoot:function(){var e,t,n=this,i=n.get("store"),d=n.get("showRoot");i&&(e=i.get("root"),n.setInternal("root",e),t=d?[e]:e.children,o.each(t,function(e){n._initChecked(e,!0)}),n.clearItems(),n.addItems(t))},_initChecked:function(e,t){var n,i=this,d=i.get("checkType"),a=i.get("checkedField"),s=i.get("multipleCheck"),c=i.get("checkableField"),l=i.get("cascadeCheckd");return d===u.NONE?(e[c]=!1,void(e[a]=!1)):d===u.ONLY_LEAF?void(e.leaf?e[c]=!0:(e[c]=!1,e[a]=!1,t&&o.each(e.children,function(e){i._initChecked(e,t)}))):(d===u.CUSTOM&&null==e[c]&&(e[c]=null!=e[a]),d===u.ALL&&(e[c]=!0),void(e&&i.isCheckable(e)&&(n=e.parent,!i.isChecked(e)&&l&&(n&&i.isChecked(n)&&(s||!i._hasChildChecked(n))&&i.setStatusValue(e,"checked",!0),(e.children&&e.children.length&&i._isAllChildrenChecked(e)||!s&&i._hasChildChecked(e))&&i.setStatusValue(e,"checked",!0)),t&&o.each(e.children,function(e){i._initChecked(e,t)}))))},_resetPatialChecked:function(e,t,n,i,d){if(!e||e.leaf)return!0;var n,o=this;return(t=null==t?o.isChecked(e):t)?void o.setItemStatus(e,r,!1,i):(n=null==n?o._hasChildChecked(e):n,o.setItemStatus(e,r,n,i),void(d&&e.parent&&o._resetPatialChecked(e.parent,!1,n?n:null,null,d)))},_resetParentChecked:function(e){if(this.isCheckable(e)){var t=this,n=t.get("multipleCheck"),i=n?t._isAllChildrenChecked(e):t._hasChildChecked(e);t.setStatusValue(e,"checked",i),t.setNodeChecked(e,i,!1),n&&t._resetPatialChecked(e,i,null,null,!0)}},__bindUI:function(){var e=this,t=(e.get("el"),e.get("multipleCheck"));e.on("itemclick",function(t){var n=d(t.domTarget),i=t.element,o=t.item;if(n.hasClass(k))return e._toggleExpand(o,i),!1;if(n.hasClass(x)){var a=e.isChecked(o);e.setNodeChecked(o,!a)}else n.hasClass(N)&&e.setNodeChecked(o,!0)}),e.on("itemrendered",function(n){var i=n.item,d=n.domTarget;e._resetIcons(i,d),e.isCheckable(i)&&t&&e.get("cascadeCheckd")&&e._resetPatialChecked(i,null,null,d),e._isExpanded(i,d)&&e._showChildren(i)}),e._initExpandEvent()},_initExpandEvent:function(){function e(e){return function(n){var i=d(n.domTarget),o=n.element,a=n.item;i.hasClass(k)||t[e](a,o)}}var t=this,n=(t.get("el"),t.get("expandEvent")),i=t.get("collapseEvent");n==i?t.on(n,e("_toggleExpand")):(n&&t.on(n,e("_expandNode")),i&&t.on(i,e("_collapseNode")))},_isForceChecked:function(){var e=this,t=e.get("multipleCheck");return t?e._isAllChildrenChecked():_isForceChecked()},_isAllChildrenChecked:function(e){if(!e||e.leaf)return!1;var t=this,n=e.children,i=!0;return o.each(n,function(e){return i=i&&t.isChecked(e),i?void 0:!1}),i},_hasChildChecked:function(e){if(!e||e.leaf)return!1;var t=this;return 0!=t.getCheckedNodes(e).length},_isRoot:function(e){var t=this,n=t.get("store");return n&&n.get("root")==e?!0:!1},_setLoadStatus:function(e,t,n){var i=this;i.setItemStatus(e,c,n,t)},_beforeLoadNode:function(e){var t,n=this;o.isString(e)&&(e=n.findNode(e)),t=n.findElement(e),t?(n._collapseNode(e,t),n._setLoadStatus(e,t,!0)):e&&o.each(e.children,function(e){n._removeNode(e)})},onBeforeLoad:function(e){var t=this,n=e.params,i=n.id,d=t.findNode(i)||t.get("root");t._beforeLoadNode(d)},_addNode:function(e,t){var n,i,d,o=this,a=e.parent;o._initChecked(e,!0),a?(o.isExpanded(a)&&(n=a.children.length,d=o._getInsetIndex(e),o.addItemAt(e,d),t==n-1&&t>0&&(i=a.children[t-1],o._updateIcons(i))),o._updateIcons(a)):(d=o._getInsetIndex(e),o.addItemAt(e,d),i=o.get("nodes")[t-1],o._updateIcons(i))},_getInsetIndex:function(e){var t,n=this;return t=n._getNextItem(e),t?n.indexOfItem(t):n.getItemCount()},_getNextItem:function(e){var t,n,i=this,d=e.parent,a=null;return d?(t=d.children,n=o.Array.indexOf(e,t),a=t[n+1],a||i._getNextItem(d)):null},onAdd:function(e){var t=this,n=e.node,i=e.index;t._addNode(n,i)},_updateNode:function(e){var t=this;t.updateItem(e),t._updateIcons(e)},onUpdate:function(e){var t=this,n=e.node;t._updateNode(n)},_removeNode:function(e,t){var n,i,d=this,o=e.parent;d.collapseNode(e),o&&(d.removeItem(e),d.isExpanded(o)&&(n=o.children.length,n==t&&0!==t&&(i=o.children[t-1],d._updateIcons(i))),d._updateIcons(o),d._resetParentChecked(o))},onRemove:function(e){var t=this,n=e.node,i=e.index;t._removeNode(n,i)},_loadNode:function(e){var t=this;t._initChecked(e,!0),t.expandNode(e),t._updateIcons(e),t.setItemStatus(e,c,!1)},__syncUI:function(){var e=this,t=e.get("store"),n=e.get("showRoot");n&&!t.hasData()&&e._initRoot()},onLoad:function(e){var t=this,n=t.get("store"),i=n.get("root");e&&e.node!=i||t._initRoot(),e&&e.node&&t._loadNode(e.node)},_isExpanded:function(e,t){return this.hasStatus(e,s,t)},_getIconsTpl:function(e){var t,n=this,i=e.level,d=n.get("startLevel"),a=n.get("iconWraperTpl"),s=[];for(t=d;i>t;t+=1)s.push(n._getLevelIcon(e,t));return s.push(n._getExpandIcon(e)),s.push(n._getCheckedIcon(e)),s.push(n._getNodeTypeIcon(e)),o.substitute(a,{icons:s.join("")})},_getCheckedIcon:function(e){var t,n=this,i=n.isCheckable(e);return i?(t=n.get("multipleCheck")?x:N,n._getIcon(t)):""},isCheckable:function(e){return e[this.get("checkableField")]},_getExpandIcon:function(e){var t=this,n=k;return e.leaf?t._getLevelIcon(e):(t._isLastNode(e)&&(n=n+" "+I),t._getIcon(n))},_getNodeTypeIcon:function(e){var t=this,n=e.cls?e.cls:t.get(e.leaf?"leafCls":"dirCls");return t._getIcon(n)},_getLevelIcon:function(e,t){var n,i=this,d=i.get("showLine"),o=C;return d&&(e.level===t||null==t?o=i._isLastNode(e)?_:f:(n=i._getParentNode(e,t),o=i._isLastNode(n)?C:g)),i._getIcon(o)},_getParentNode:function(e,t){var n=e.level,i=e.parent,d=n-1;if(t>=n)return null;for(;d>t;)i=i.parent,d-=1;return i},_getIcon:function(e){var t=this,n=t.get("iconTpl");return o.substitute(n,{cls:e})},_isLastNode:function(e){if(!e)return!1;if(e==this.get("root"))return!0;var t,n=this,i=e.parent,d=i?i.children:n.get("nodes");return t=d.length,d[t-1]===e},_initNodes:function(e,t,n){var i=this;o.each(e,function(e){e.level=t,null==e.leaf&&(e.leaf=e.children?!1:!0),n&&!e.parent&&(e.parent=n),i._initChecked(e),e.children&&i._initNodes(e.children,t+1,e)})},_collapseNode:function(e,t,n){var i=this;e.leaf||i.hasStatus(e,s,t)&&(i.setItemStatus(e,s,!1,t),n?(i._collapseChildren(e,n),i.removeItems(e.children)):i._hideChildrenNodes(e),i.fire("collapsed",{node:e,element:t}))},_hideChildrenNodes:function(e){var t=this,n=e.children,i=[];o.each(n,function(e){var n=t.findElement(e);n&&(i.push(n),t._hideChildrenNodes(e))}),t.get("expandAnimate")?(i=d(i),i.animate({height:0},function(){t.removeItems(n)})):t.removeItems(n)},_collapseChildren:function(e,t){var n=this,i=e.children;o.each(i,function(e){n.collapseNode(e,t)})},_expandNode:function(e,t,n){var i=this,d=i.get("accordion"),a=i.get("store");if(!e.leaf){if(!i.hasStatus(e,s,t)){if(d&&e.parent){var c=e.parent.children;o.each(c,function(t){t!=e&&i.collapseNode(t)})}a&&!a.isLoaded(e)?i._isLoading(e,t)||a.loadNode(e):t&&(i.setItemStatus(e,s,!0,t),i._showChildren(e),i.fire("expanded",{node:e,element:t}))}o.each(e.children,function(e){(n||i.isExpanded(e))&&i.expandNode(e,n)})}},_showChildren:function(e){if(e&&e.children){var t,n=this,i=n.indexOfItem(e),d=e.children.length,o=d-1;for(o=d-1;o>=0;o--)t=e.children[o],n.getItem(t)||(n.get("expandAnimate")?(el=n._addNodeAt(t,i+1),el.hide(),el.slideDown()):n.addItemAt(t,i+1))}},_addNodeAt:function(e,t){var n=this,i=n.get("items");return void 0===t&&(t=i.length),i.splice(t,0,e),n.addItemToView(e,t)},_isLoading:function(e,t){var n=this;return n.hasStatus(e,c,t)},_resetIcons:function(e,t){if(this.get("showIcons")){var n,i=this,o=i.get("iconContainer"),a=i._getIconsTpl(e);d(t).find("."+v).remove(),n=d(t).find(o).first(),o&&n.length?d(a).prependTo(n):d(t).prepend(d(a))}},_toggleExpand:function(e,t){var n=this;n._isExpanded(e,t)?n._collapseNode(e,t):n._expandNode(e,t)},_updateIcons:function(e){var t=this,n=t.findElement(e);n&&(t._resetIcons(e,n),t._isExpanded(e,n)&&!e.leaf&&o.each(e.children,function(e){t._updateIcons(e)}))},_uiSetShowRoot:function(){var e=this,t=this.get("showRoot")?0:1;e.set("startLevel",t)},_uiSetNodes:function(e){var t=this,n=t.get("store");n.setResult(e)},_uiSetShowLine:function(e){var t=this,n=t.get("el");e?n.addClass(m):n.removeClass(m)}}),n.exports=b}),define("bui-tree/1.1.0/src/selection",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index"],function(e,t,n){var i=e("bui-common/1.1.0/common"),d=e("bui-list/1.1.0/index").SimpleList,o=function(){};o.ATTRS={},i.augment(o,{getSelection:function(){var e,t=this,n=t.getStatusField("selected");return n?(e=t.get("store"),e.findNodesBy(function(e){return e[n]})):d.prototype.getSelection.call(this)},getSelected:function(){var e,t=this,n=t.getStatusField("selected");return n?(e=t.get("store"),e.findNodeBy(function(e){return e[n]})):d.prototype.getSelected.call(this)}}),n.exports=o}),define("bui-tree/1.1.0/src/treemenu",["bui-common/1.1.0/common","jquery","bui-list/1.1.0/index","bui-data/1.1.0/index"],function(e,t,n){var i=e("bui-common/1.1.0/common"),d=e("bui-list/1.1.0/index"),o=e("bui-tree/1.1.0/src/treemixin"),a=e("bui-tree/1.1.0/src/selection"),s=d.SimpleList.View.extend({getItemTpl:function(e,t){var n=this,d=n.get("itemTplRender"),o=n.get(e.leaf?"leafTpl":"dirTpl");return d?d(e,t):i.substitute(o,e)}},{xclass:"tree-menu-view"}),c=d.SimpleList.extend([o,a],{},{ATTRS:{itemCls:{value:i.prefix+"tree-item"},dirSelectable:{value:!1},expandEvent:{value:"itemclick"},itemStatusFields:{value:{selected:"selected"}},collapseEvent:{value:"itemclick"},xview:{value:s},dirTpl:{view:!0,value:'<li class="{cls}"><a href="#">{text}</a></li>'},leafTpl:{view:!0,value:'<li class="{cls}"><a href="{href}">{text}</a></li>'},idField:{value:"id"}}},{xclass:"tree-menu"});c.View=s,n.exports=c});