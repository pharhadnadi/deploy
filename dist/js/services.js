// داشبورد مدیریتی صدف info@sadafdashboard.ir

var manageApp=angular.module("services",["ngMaterial","ngAnimate","ui.sortable","uibCollapseCat"]),ngApp=angular.module("services");ngApp.service("datasources",["$http","$mdMedia","$mdDialog",function(a,b,c){function d(){return h||(h=a.get(app.urlPrefix+"api/menus/get")),h}function e(){j={name:"همه",open:!0},k={name:"همه",open:!0}}function f(d,e){var f={type:["charts"],search:["content"],selectableDir:!1,justDir:!1,multipleChart:!0,multipleDatasource:!1};return e=angular.extend({},f,e),c.show({controller:["$scope","$mdDialog","$timeout",function(b,c,d){function f(c){return c?(b.searchProgressChart=!0,a.get(app.urlPrefix+"api/charts/getlist?q="+c).then(function(a){b.searchProgressChart=!1,n&&o?b.searchResultChart=a.data.list:n?b.searchResultChart=_.filter(a.data.list,{type:2}):b.searchResultChart=_.filter(a.data.list,{type:1})}),b.searchProgressDatasource=!0,void a.get(app.urlPrefix+"api/datasources/get?q="+c).then(function(a){b.searchProgressDatasource=!1,n&&o?b.searchResultDatasource=a.data.list:n?b.searchResultDatasource=_.filter(a.data.list,{type:2}):searchResultDatasource=_.filter(a.data.list,{type:1})})):(b.searchResultDatasource=null,void(b.searchResultChart=null))}function g(a,b){b(a),a.nodes&&(_.forEach(a.nodes,function(a){g(a,b)}),_.forEach(a.contents,function(a){g(a,b)}))}b.showCharts=-1!=e.type.indexOf("charts"),b.showDatasources=-1!=e.type.indexOf("datasources"),b.cancel=function(){c.cancel()},b.select=function(){var a,d;b.showCharts&&b.showDatasources?(a=0==b.selectedIndex?b.datasources:b.charts,d=0==b.selectedIndex?"datasources":"charts"):b.showDatasources?(a=b.datasources,d="datasources"):(a=b.charts,d="charts");var e=[];b.searchResultDatasource?(e=_.filter("charts"==d?b.searchResultChart:b.searchResultDatasource,{check:!0}),i.charts=e):(g(a,function(a){a.active&&e.push(a)}),i.charts=e),c.hide({selected:e,type:d})};var h=function(b){if(!b.nodes){var c=app.urlPrefix+"api/charts/getlist?packageId="+b.id;a.get(c).then(function(a){b.loaded=!0,b.nodes=_.filter(a.data.list,{type:1}),b.contents=_.filter(a.data.list,{type:2})})}},l=function(b){if(!b.nodes){var c=app.urlPrefix+"api/datasources/get?packageId="+b.id;a.get(c).then(function(a){b.loaded=!0,b.nodes=_.filter(a.data.list,{type:1}),b.contents=_.filter(a.data.list,{type:2})})}};b.optDatasource={urlPrefix:app.urlPrefix+"api/datasources/get?packageId=",multiple:e.multipleDatasource,selectableDir:e.selectableDir,url:l,justDir:e.justDir},b.optChart={urlPrefix:app.urlPrefix+"api/charts/getlist?packageId=",multiple:e.multipleChart,selectableDir:e.selectableDir,url:h,justDir:e.justDir},b.datasources=j,b.charts=k,g(b.datasources,function(a){a.active=!1}),g(b.charts,function(a){a.active=!1}),h(b.charts),l(b.datasources);var m;b.$watch("query",function(a,b){d.cancel(m),m=d(function(){f(a)},400)});var n=-1!=e.search.indexOf("content"),o=-1!=e.search.indexOf("dir")}],parent:angular.element(document.body),targetEvent:d,clickOutsideToClose:!0,fullscreen:b("sm")||b("xs"),template:'<md-dialog aria-label="{{\'choose\' | translate}}" >                                                                                                                                 <md-toolbar md-theme="default">                                                                                                                                                                              <div class ="md-toolbar-tools">                                                                                                                                                           <h2>{{\'choose\' | translate}}</h2>                                                                                                                                                   <span flex></span>                                                                                                                                                                    <input class ="toolbar-input" ng-model="query" placeholder="{{\'جستجو\' | translate}}" md-autofocus />                                                                                             <span class ="material-icons small" ng-click="query=null" ng-show="query" title="{{\'clear\' | translate}}">close</span>                                                              <span class ="material-icons">search</span>                                                                                                                                       </div>                                                                                                                                                                            </md-toolbar>                                                                                                                                                                         <md-dialog-content>                                                                                                                                                                       <div class ="xmd-dialog-content" flex>                                                                                                                                                    <md-tabs md-border-bottom md-dynamic-height md-selected="selectedIndex" >                                                                                                                 <md-tab label="{{ \'datasources\' | translate }}" ng-if="showDatasources">                                                                                                                                         <div layout="row" layout-align="center center" ng-show="searchProgressDatasource"style="padding:0 18px; font-size:0.8em">                                                                 <md-progress-circular  md-mode=\'indeterminate\' md-diameter="20" ></md-progress-circular>                                                                                              {{\'searching\' | translate}}                                                                                                                                                   </div>                                                                                                                                                                                <div class ="md-caption" layout-padding ng-show="searchResultDatasource && !searchResultDatasource.length">{{\'search_no_result\' | translate}}</div>                                 <tree ng-show="!searchResultDatasource" ng-model="datasources" option="optDatasource" class ="block"></tree>                                                                          <div ng-show="searchResultDatasource" layout-margin >                                                                                                                                     <div ng-repeat="i in searchResultDatasource">                                                                                                                                             <md-checkbox ng-model="i.check">{{i.name}}</md-checkbox>                                                                                                                          </div>                                                                                                                                                                            </div>                                                                                                                                                                                                                                                                                                                                                                  </md-tab>                                                                                                                                                                                                                                                                                                                                                                   <md-tab label="{{ \'charts\' | translate }}" ng-if="showCharts">                                                                                                                                                <div layout="row" layout-align="center center" ng-show="searchProgressChart"style="padding:0 18px; font-size:0.8em">                                                                      <md-progress-circular  md-mode=\'indeterminate\' md-diameter="20" ></md-progress-circular>                                                                                             {{\'searching\' | translate}}                                                                                                                                                    </div>                                                                                                                                                                                <div class ="md-caption" layout-padding ng-show="searchResultChart && !searchResultChart.length">{{\'search_no_result\' | translate}}</div>                                           <tree ng-show="!searchResultChart" ng-model="charts" option="optChart" class ="block"></tree>                                                                                         <div ng-show="searchResultChart" layout-margin >                                                                                                                                          <div ng-repeat="i in searchResultChart">                                                                                                                                                  <md-checkbox ng-model="i.check">{{i.name}}</md-checkbox>                                                                                                                          </div>                                                                                                                                                                            </div>                                                                                                                                                                            </md-tab>                                                                                                                                                                         </md-tabs>                                                                                                                                                                        </div>                                                                                                                                                                            </md-dialog-content>                                                                                                                                                                  <md-dialog-actions layout="row">                                                                                                                                                          <md-button ng-click="select()">                                                                                                                                                           {{\'choose\' | translate}}                                                                                                                                                        </md-button>                                                                                                                                                                          <md-button ng-click="cancel()">                                                                                                                                                           {{\'cancel\' | translate}}                                                                                                                                                        </md-button>                                                                                                                                                                      </md-dialog-actions>                                                                                                                                                          </md-dialog>'})}function g(b){var c=app.urlPrefix+"Moderation/OlapChartDesign/CubeInformation?DataSourceId="+b;return a.get(c).then(function(a){return a.data})}var h,i={},j={name:"همه",open:!0},k={name:"همه",open:!0};return{get:d,select:f,lastSelected:i,reset:e,getColumns:g}}]);
//# sourceMappingURL=services.js.map