(function(){function ja(b,d,a,c,f,h){var e,g,j,l;e=d.series;var v=d.colors;a===0&&(ca=0);e[a]||(e[a]={data:[{toolText:!1,doNotSlice:!0,y:100,visible:!1,color:"rgba(255,255,255,0)"}]});e=e[a];(g=c-100+e.data[e.data.length-1].y)&&e.data.splice(e.data.length-1,0,{toolText:!1,doNotSlice:!0,y:g,visible:!1,color:"rgba(255,255,255,0)"});e.data[e.data.length-1].y=100-f;g=(f-c)/b.length;for(j=b.length-1;j>=0;j-=1)l=G(k(b[j].label,b[j].name)),e.data.splice(e.data.length-1,0,{displayValue:l,toolText:G(k(b[j].tooltext,
b[j].hovertext,l)),y:g,link:t(b[j].link),doNotSlice:!0,color:K(b[j].color||v[ca%v.length],b[j].alpha||h)}),ca+=1,b[j].category&&ja(b[j].category,d,a+1,c,j===0?f:c+g,h),c+=g}var p=FusionCharts(["private","modules.renderer.highcharts-powercharts"]);if(p!==void 0){var p=p.hcLib,B=p.BLANKSTRING,da=p.createTrendLine,k=p.pluck,t=p.getValidValue,g=p.pluckNumber,M=p.defaultPaletteOptions,ea=p.getFirstValue,H=p.FC_CONFIG_STRING,U=p.extend2,Z=p.getDashStyle,fa=p.graphics.getColumnColor,y=p.getFirstColor,pa=
p.getFirstAlpha,K=p.graphics.convertColor,ga=p.COLOR_TRANSPARENT,o=p.chartAPI,ha=p.titleSpaceManager,qa=p.axisMinMaxSetter,ra=p.placeHorizontalAxis,V=p.placeVerticalAxis,sa=p.stepYAxisNames,ta=p.configureAxis,ka=p.placeLegendBlockBottom,ua=p.adjustHorizontalCanvasMargin,va=p.adjustVerticalCanvasMargin,la=p.placeLegendBlockRight,aa=p.graphics.mapSymbolName,ma=o.singleseries,R=p.COMMASTRING,S=p.ZEROSTRING,ia=p.ONESTRING,na=p.getDefinedColor,G=p.parseUnsafeString,oa=p.POSITION_BOTTOM,ba=p.POSITION_RIGHT,
L=p.HUNDREDSTRING;o("spline",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"spline"},o.linebase);o("splinearea",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"areaspline",anchorAlpha:"100"},o.area2dbase);o("msspline",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"spline"},o.mslinebase);o("mssplinearea",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"areaspline",anchorAlpha:"100"},o.msareabase);o("msstepline",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"line",stepLine:!0},
o.mslinebase);o("inversemsline",{standaloneInit:!0,inversed:!0},o.mslinebase);o("inversemsarea",{standaloneInit:!0,inversed:!0},o.msareabase);o("inversemscolumn2d",{standaloneInit:!0,inversed:!0},o.mscolumn2dbase);var z=function(b,d){return b>0?Math.log(b)/Math.log(d||10):null},wa=function(b,d,a,c,f,g){var e,i,j=function(a){return a==null||a==void 0||a==""||isNaN(a)?!1:!0};j(a)&&Number(a)>=b?b=Number(a):(a=f>1?Math.ceil(Math.log(b)/Math.log(f)):Math.floor(Math.log(b)/Math.log(f)),b=Math.pow(f,a),
i=a);i||(i=f>1?Math.ceil(Math.log(b)/Math.log(f)):Math.floor(Math.log(b)/Math.log(f)));j(c)&&Number(c)<=d?d=Number(c):(a=f>1?Math.floor(Math.log(d)/Math.log(f)):Math.ceil(Math.log(d)/Math.log(f)),d=Math.pow(f,a),e=a);e||(e=f>1?Math.floor(Math.log(d)/Math.log(f)):Math.ceil(Math.log(d)/Math.log(f)));var c=0,l,k,j=[],a=Number(String(Math.log(f)/Math.log(10))),g=Number(g)||(Math.floor(a)==a?8:4);f>1?(l=i,k=e):f>0&&f<1&&(l=e,k=i);a=i;for(i=l;i>=k;--i)if(e=Math.pow(f,a),d<=e&&b>=e&&(j[c++]={value:e,ismajor:!0}),
i!=k){l=f>1?-1:1;for(var n=(Math.pow(f,a)-Math.pow(f,a+l))/(g+1),r=1;r<=g;++r)e=Math.pow(f,a+l)+n*r,d<=e&&b>=e&&(j[c++]={value:e,ismajor:!1});f>1?a--:a++}var m,q,w;for(w in j)for(var u in j[w])u=="value"&&(m||(m=j[w][u]==d),q||(q=j[w][u]==b));m||(j[c++]={value:d,ismajor:!1});q||(j[c]={value:b,ismajor:!1});return{Max:b,Min:d,divArr:j}},xa=function(b,d){return b.value-d.value};o("logmsline",{standaloneInit:!0,isValueAbs:!0,isLog:!0,configureAxis:function(b,d){var a=b[H],c=b.xAxis,f=d.chart,h,e,i,j;
i=b.series;j=i.length;var l,v,n,r=a.axisGridManager,m=g(f.base,10);m<=0&&(m=10);for(e=0;e<j;e+=1)if(l=i[e],l.data){v=0;for(n=l.data.length;v<n;v+=1)h=l.data[v],h.y=z(h.y,m)}c.title.text=G(f.xaxisname);c=b.yAxis[0];e=a[0];if(f.invertyaxis==="1")c.reversed=!0;e.isLog=!0;i=f.yaxismaxvalue;j=f.yaxisminvalue;c.title.text=G(f.yaxisname);i=wa(e.max||m,e.min||1,i,j,m,f.numminordivlines);c.max=z(i.Max,m);c.min=z(i.Min,m);delete e.max;delete e.min;if(c.reversed&&c.min>=0)b.plotOptions.series.threshold=c.max;
d.trendlines&&da(d.trendlines,[{max:i.Max,min:i.Min,plotLines:c.plotLines,plotBands:c.plotBands}],a);e=0;for(j=c.plotLines.length;e<j;e+=1){l=c.plotLines[e];if(l.value)l.value=z(l.value,m);if(l.from)l.from=z(l.from,m);if(l.to)l.to=z(l.to,m)}e=0;for(j=c.plotBands.length;e<j;e+=1){l=c.plotBands[e];if(l.from)l.from=z(l.from,m);if(l.to)l.to=z(l.to,m)}j=c.gridLineColor;l=g(f.divlinethickness,2);v=c.gridLineDashStyle;var q,w,a=a.numberFormatter;h=k(f.minordivlinealpha,M.divLineColor[b.chart.paletteIndex]);
e=g(f.minordivlinealpha,M.divLineAlpha[b.chart.paletteIndex]);n=g(f.minordivlinethickness,1);h=k(f.minordivlinecolor,h);e=g(f.minordivlinealpha,e/2);var u=K(h,e);e=0;for(h=i.divArr.length;e<h;e+=1)w=i.divArr[e],w.ismajor?(q=a.yAxis(w.value),w=z(w.value,m),r.addAxisGridLine(c,w,q,l,v,j,2)):(q=f.showminordivlinevalues==="1"?a.yAxis(w.value):B,w=z(w.value,m),r.addAxisGridLine(c,w,q,n,v,u,2));c.labels.enabled=!1;c.gridLineWidth=0;c.alternateGridColor=ga;c.plotLines.sort(xa)},pointValueWatcher:function(b,
d,a){if(d>0)b=b[H],a=g(a,0),b[a]||(b[a]={}),a=b[a],a.max=a.max>d?a.max:d,a.min=a.min<d?a.min:d},creditLabel:!1},o.mslinebase);o("logmscolumn2d",{standaloneInit:!0,isLog:!0,configureAxis:o.logmsline.configureAxis,pointValueWatcher:o.logmsline.pointValueWatcher,creditLabel:!1,isValueAbs:!0},o.mscolumn2dbase);o("errorbar2d",{standaloneInit:!0,creditLabel:!1,point:function(b,d,a,c,f,h,e){b=!1;if(a.data){var i,j,l,v,n,r,m,q,w,u,o,E,A,p,s,x,D,O=a.data,J=f[H];k(d.type,this.defaultSeriesType);var I=k(this.isValueAbs,
J.isValueAbs,!1),F=g(a.showvalues,J.showValues),P=g(d.yAxis,0),C=g(c.use3dlighting,1),$=f[H].numberFormatter,Q=f.chart.paletteIndex;d.name=t(a.seriesname);if(g(a.includeinlegend)===0||d.name===void 0)d.showInLegend=!1;d.errorBarWidthPercent=g(c.errorbarwidthpercent,70);d.halfErrorBar=g(c.halferrorbar,1);d.errorBarColor=K(y(k(a.errorbarcolor,c.errorbarcolor,"AAAAAA")),k(a.errorbaralpha,c.errorbaralpha,L));d.errorBarThickness=g(a.errorbarthickness,c.errorbarthickness,1);d.color=k(a.color,f.colors[e%
f.colors.length]).split(R)[0].replace(/^#?/g,"#");w=k(c.plotborderthickness,ia);u=f.chart.useRoundEdges;o=this.isBar;E=/3d$/.test(f.chart.defaultSeriesType);A=k(c.plotbordercolor,M.plotBorderColor[Q]).split(R)[0];p=c.showplotborder==S?S:k(c.plotborderalpha,L);p=E?c.showplotborder?p:S:p;A=E?k(c.plotbordercolor,"#FFFFFF"):A;for(l=0;l<h;l+=1)(r=O[l])?(i=$.getCleanValue(r.value,I),j=$.getCleanValue(r.errorvalue,I),i===null?d.data.push({y:null}):(b=!0,s=J.oriCatTmp[l],v=k(r.color,a.color,f.colors[e%f.colors.length])+
R+na(c.plotgradientcolor,M.plotGradientColor[Q]),n=k(r.alpha,a.alpha,c.plotfillalpha,L),m=k(r.ratio,a.ratio,c.plotfillratio),q=k(360-c.plotfillangle,90),i<0&&(q=360-q),x={opacity:n/100},D=Math.min(n,p)+B,v=fa(v,n,m,q,u,A,D,o,E),d.data.push(U(this.getPointStub(r,i,s,f,a,F,P),{y:i,shadow:x,errorValue:j,color:v[0],borderColor:v[1],borderWidth:w,use3DLighting:C})),this.pointValueWatcher(f,i,j))):d.data.push({y:null})}if(!b)d.showInLegend=!1;return d},pointValueWatcher:function(b,d,a){var c=b[H];if(d!==
null)a?(b=d+a,d-=a):b=d,c[0]||(c[0]={}),a=c[0],a.max=a.max>b?a.max:b,a.min=a.min<b?a.min:b,a.max=a.max>d?a.max:d,a.min=a.min<d?a.min:d}},o.mscolumn2dbase);o("errorline",{standaloneInit:!0,creditLabel:!1,point:function(b,d,a,c,f,h,e){b=!1;if(a.data){var i,j,l,v,n,r,m,q,w,u,p,E,A,N,s,x,D,O,J,I,F,P,C,$,Q,G,W,X,z=a.data,T=f[H];k(d.type,this.defaultSeriesType);var Y=k(this.isValueAbs,T.isValueAbs,!1),S=g(a.showvalues,T.showValues),R=g(d.yAxis,0),T=T.numberFormatter;d.name=t(a.seriesname);G=y(k(a.color,
c.linecolor,f.colors[e%f.colors.length]));Q=k(a.alpha,c.linealpha,L);e=g(a.linethickness,c.linethickness,2);n=Boolean(g(a.dashed,c.linedashed,0));r=g(a.linedashlen,c.linedashlen,5);m=g(a.linedashgap,c.linedashgap,4);d.color={FCcolor:{color:G,alpha:Q}};d.lineWidth=e;q=g(a.drawanchors,a.showanchors,c.drawanchors,c.showanchors);O=g(a.anchorsides,c.anchorsides,0);J=g(a.anchorradius,c.anchorradius,3);I=y(k(a.anchorbordercolor,c.anchorbordercolor,G));F=g(a.anchorborderthickness,c.anchorborderthickness,
1);P=y(k(a.anchorbgcolor,c.anchorbgcolor,M.anchorBgColor[f.chart.paletteIndex]));C=k(a.anchoralpha,c.anchoralpha,L);$=k(a.anchorbgalpha,c.anchorbgalpha,C);d.errorBarWidth=g(c.errorbarwidth,5);d.halfErrorBar=g(c.halferrorbar,1);d.errorBarColor=K(y(k(a.errorbarcolor,c.errorbarcolor,"AAAAAA")),k(a.errorbaralpha,c.errorbaralpha,L));d.errorBarThickness=Math.min(e,g(a.errorbarthickness,c.errorbarthickness,1));if(g(a.includeinlegend)===0||d.name===void 0||Q==0&&q!==1)d.showInLegend=!1;d.marker={fillColor:{FCcolor:{color:P,
alpha:$*C/100+B}},lineColor:{FCcolor:{color:I,alpha:C+B}},lineWidth:F,radius:J,symbol:aa(O)};for(j=0;j<h;j+=1)(x=z[j])?(c=T.getCleanValue(x.value,Y),i=T.getCleanValue(x.errorvalue,Y),c===null?d.data.push({y:null}):(b=!0,s=g(x.anchorsides,O),N=g(x.anchorradius,J),E=y(k(x.anchorbordercolor,I)),A=g(x.anchorborderthickness,F),p=y(k(x.anchorbgcolor,P)),w=k(x.anchoralpha,C),u=k(x.anchorbgalpha,$),l=y(k(x.color,G)),v=k(x.alpha,Q),X=g(x.dashed,n)?Z(r,m,e):void 0,D={opacity:v/100},W=q===void 0?v!=0:!!q,d.data.push(U(this.getPointStub(x,
c,void 0,f,a,S,R),{y:c,shadow:D,dashStyle:X,errorValue:i,color:{FCcolor:{color:l,alpha:v}},marker:{enabled:W,fillColor:{FCcolor:{color:p,alpha:u*w/100+B}},lineColor:{FCcolor:{color:E,alpha:w}},lineWidth:A,radius:N,symbol:aa(s)}})),o.errorbar2d.pointValueWatcher(f,c,i))):d.data.push({y:null})}if(!b)d.showInLegend=!1;return d}},o.mslinebase);o("errorscatter",{standaloneInit:!0,creditLabel:!1,point:function(b,d,a,c,f,h,e){if(a.data){var i,j,l,v,n,r,m,q,w,u,p,E,A,N,s,x,D,O=!1,J,I,F,P,b=o[b];l=g(a.drawline,
0);v=g(a.drawprogressioncurve,0);var C=f[H],h=a.data,G=h.length,Q=g(a.showvalues,C.showValues),C=C.numberFormatter,z=g(a.showregressionline,c.showregressionline,0);d.zIndex=1;d.name=t(a.seriesname);if(g(a.includeinlegend)===0||d.name===void 0)d.showInLegend=!1;var W,X,S,T;W=k(c.errorbarcolor,"AAAAAA");X=k(c.errorbaralpha,L);n=g(c.errorbarthickness,1);r=g(c.errorbarwidth,5);d.halfVerticalErrorBar=g(c.halfverticalerrorbar,1);d.verticalErrorBarColor=K(k(a.verticalerrorbarcolor,a.errorbarcolor,c.verticalerrorbarcolor,
W),k(a.verticalerrorbaralpha,a.errorbaralpha,c.verticalerrorbaralpha,X));d.verticalErrorBarThickness=g(a.verticalerrorbarthickness,a.errorbarthickness,c.verticalerrorbarthickness,n);d.verticalErrorBarWidth=g(a.verticalerrorbarwidth,a.errorbarwidth,c.verticalerrorbarwidth,r);d.halfHorizontalErrorBar=g(c.halfhorizontalerrorbar,1);d.horizontalErrorBarColor=K(k(a.horizontalerrorbarcolor,a.errorbarcolor,c.horizontalerborbarcolor,W),k(a.horizontalerrorbaralpha,a.errorbaralpha,c.horizontalerrorbaralpha,
X));d.horizontalErrorBarThickness=g(a.horizontalerrorbarthickness,a.errorbarthickness,c.horizontalerrorbarthickness,n);d.horizontalErrorBarWidth=g(a.horizontalerrorbarwidth,a.errorbarwidth,c.horizontalerrorbarwidth,r);W=g(a.usehorizontalerrorbar,c.usehorizontalerrorbar,0);X=g(a.useverticalerrorbar,c.useverticalerrorbar,1);if(l||v){if(v)d.type="spline";j=y(k(a.color,c.linecolor,f.colors[e%f.colors.length]));l=k(a.alpha,c.linealpha,L);v=g(a.linethickness,c.linethickness,2);n=Boolean(g(a.dashed,c.linedashed,
0));r=g(a.linedashlen,c.linedashlen,5);m=g(a.linedashgap,c.linedashgap,4);d.color={FCcolor:{color:j,alpha:l}};d.lineWidth=v;d.dashStyle=n?Z(r,m,v):void 0}l=Boolean(g(a.drawanchors,a.showanchors,c.drawanchors,c.showanchors,1));v=g(a.anchorsides,c.anchorsides,e+3);n=g(a.anchorradius,c.anchorradius,3);e=y(k(a.anchorbordercolor,a.color,c.anchorbordercolor,j,f.colors[e%f.colors.length]));j=g(a.anchorborderthickness,c.anchorborderthickness,1);r=y(k(a.anchorbgcolor,c.anchorbgcolor,M.anchorBgColor[f.chart.paletteIndex]));
m=k(a.anchoralpha,c.anchoralpha,L);w=k(a.anchorbgalpha,c.anchorbgalpha,m);d.marker={fillColor:this.getPointColor(r,L),lineColor:{FCcolor:{color:e,alpha:m+B}},lineWidth:j,radius:n,symbol:aa(v)};if(z){d.events={hide:this.hideRLine,show:this.showRLine};var Y={sumX:0,sumY:0,sumXY:0,sumXsqure:0,sumYsqure:0,xValues:[],yValues:[]},R=g(a.showyonx,c.showyonx,1),U=y(k(a.regressionlinecolor,c.regressionlinecolor,e)),V=g(a.regressionlinethickness,c.regressionlinethickness,j),c=pa(g(a.regressionlinealpha,c.regressionlinealpha,
m)),U=K(U,c)}for(i=0;i<G;i+=1)(q=h[i])?(c=C.getCleanValue(q.y),D=C.getCleanValue(q.x),J=C.getCleanValue(q.errorvalue),c===null?d.data.push({y:null,x:D}):(O=!0,P=b.getPointStub(q,c,C.xAxis(D),f,a,Q),u=g(q.anchorsides,v),p=g(q.anchorradius,n),E=y(k(q.anchorbordercolor,e)),A=g(q.anchorborderthickness,j),N=y(k(q.anchorbgcolor,r)),s=k(q.anchoralpha,m),x=k(q.anchorbgalpha,w),S=Boolean(g(q.usehorizontalerrorbar,W)),T=Boolean(g(q.useverticalerrorbar,X)),I=F=0,S&&(I=C.getCleanValue(k(q.horizontalerrorvalue,
J))),T&&(F=C.getCleanValue(k(q.verticalerrorvalue,J))),d.data.push({y:c,x:D,hErrorValue:I,vErrorValue:F,useHorizontalErrorBar:S,useVerticalErrorBar:T,displayValue:P.displayValue,toolText:P.toolText,link:P.link,marker:{enabled:l,fillColor:{FCcolor:{color:N,alpha:x*s/100+B}},lineColor:{FCcolor:{color:E,alpha:s}},lineWidth:A,radius:p,symbol:aa(u)}}),this.pointValueWatcher(f,c+F,D+I,z&&Y),d.halfHorizontalErrorBar==0&&this.pointValueWatcher(f,c,D-I,z&&Y),d.halfVerticalErrorBar==0&&this.pointValueWatcher(f,
c-F,D,z&&Y))):d.data.push({y:null});z&&(a=this.getRegressionLineSeries(Y,R,G),this.pointValueWatcher(f,a[0].y,a[0].x),this.pointValueWatcher(f,a[1].y,a[1].x),f={type:"line",color:U,showInLegend:!1,lineWidth:V,enableMouseTracking:!1,marker:{enabled:!1},data:a,zIndex:0},d=[d,f])}if(!O)d.showInLegend=!1;return d}},o.scatterbase);o("waterfall2d",{standaloneInit:!0,point:function(b,d,a,c,f){var h,e,i,j,l,v,n,r,m,q,b=k(c.connectorthickness,1),b={step:!0,type:"line",enableMouseTracking:!1,data:[],dataLabels:{enabled:!1},
marker:{enabled:!1},dashStyle:c.connectordashed==="1"?Z(g(c.connectordashlen,2),g(c.connectordashgap,2),b):void 0,drawVerticalJoins:!1,color:K(k(c.connectorcolor,"000000"),k(c.connectoralpha,100)),lineWidth:b},w=a.length,u=f[H],o=u.axisGridManager,p=f.xAxis;h=f.chart.paletteIndex;var u=u.x,A=f.colors,t=f.colors.length,s=/3d$/.test(f.chart.defaultSeriesType),x=this.isBar,D=k(c.showplotborder,s?S:ia)===ia?s?1:g(c.plotborderthickness,1):0,y=f.chart.useRoundEdges,J=g(c.plotborderalpha,c.plotfillalpha,
100)+B,I=k(c.plotbordercolor,M.plotBorderColor[h]).split(R)[0],F=0,P=Boolean(g(c.use3dlighting,1)),C=0,z=0,Q=na(c.plotgradientcolor,M.plotGradientColor[h]);NumberFormatter=f[H].numberFormatter;for(i=e=0;e<w;e+=1)r=a[e],r.vline?o.addVline(p,r,F,f):(h=NumberFormatter.getCleanValue(r.value),j=g(r.issum,0),q=g(r.cumulative,1),j?(h=q?C:C-z,z=C,b.data.push({y:null,x:e-0.5})):C+=h,j=g(r.showlabel,1),j=G(!j?B:ea(r.label,r.name)),o.addXaxisCat(p,F,F,j),F+=1,l=k(r.color,A[i%t])+R+Q,v=k(r.alpha,c.plotfillalpha,
L),n=k(r.ratio,c.plotfillratio),m=k(360-c.plotfillangle,90),h<0&&(m=360-m),q={opacity:v/100,inverted:x},l=fa(l,v,n,m,y,I,k(r.alpha,J),x,s),d.data.push(U(this.getPointStub(r,h,j,f),{y:h,_FCY:h<0?C-h:C,shadow:q,color:l[0],borderColor:l[1],borderWidth:D,use3DLighting:P})),b.data.push({y:C,x:e}),this.pointValueWatcher(f,C),i+=1);c.showsumatend!="0"&&(j=G(ea(c.sumlabel,"Total")),o.addXaxisCat(p,F,F,j),F+=1,l=A[i%t]+R+Q,v=k(c.plotfillalpha,L),m=k(360-c.plotfillangle,90),C<0&&(m=360-m),q={opacity:v/100,
inverted:x},l=fa(l,v,c.plotfillratio,m,y,I,J,x,s),d.data.push(U(this.getPointStub({},C,j,f),{y:C,shadow:q,color:l[0],borderColor:l[1],borderWidth:D,use3DLighting:P})));u.catCount=F;c.showconnectors!="0"&&(d=[b,d]);return d},defaultSeriesType:"floatedcolumn"},ma);var ca=0;o("multilevelpie",{standaloneInit:!0,defaultSeriesType:"pie",defaultPlotShadow:1,series:function(b,d){var a=b.chart,c=d.series,f;d.legend.enabled=!1;d.plotOptions.pie.allowPointSelect=!1;d.plotOptions.series.borderColor=K(k(a.plotbordercolor,
a.piebordercolor,"FFFFFF"),a.showplotborder!="0"?k(a.plotborderalpha,a.pieborderalpha,100):0);d.plotOptions.series.borderWidth=a.pieborderthickness||1;d.plotOptions.pie.startingAngle=0;d.plotOptions.pie.size="100%";d.chart.plotBorderColor=0;d.chart.plotBackgroundColor=null;d.chart.plotBorderWidth=0;b.category&&ja(b.category,d,0,0,100,k(a.plotfillalpha,a.piefillalpha,100));f=parseInt(a.pieradius);var g,a=0,e=!0;f?(g=2*f/c.length,e=!1):g=parseInt(100/c.length,10);d.plotOptions.series.dataLabels.distance=
0;d.plotOptions.series.dataLabels.placeInside=!0;for(f=0;f<c.length;f+=1)c[f].innerSize=a+(e?"%":""),c[f].size=(a+=g)+(e?"%":""),c[f].data[c[f].data.length-1].y===0&&c[f].data.pop()},spaceManager:function(b,d,a,c){var f=b[H];ha(b,d,a-(f.marginLeftExtraSpace+f.marginRightExtraSpace+b.chart.marginRight+b.chart.marginLeft),(c-(f.marginBottomExtraSpace+f.marginTopExtraSpace+b.chart.marginBottom+b.chart.marginTop))*0.4)},creditLabel:!1},ma);o("radar",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"radar",
spaceManager:function(b,d,a,c){b.chart.plotBorderWidth=0;b.chart.plotBackgroundColor=null;var f=b[H],h=f.x,e=b.xAxis,i=d.chart;a-=f.marginLeftExtraSpace+f.marginRightExtraSpace+b.chart.marginRight+b.chart.marginLeft;c-=f.marginBottomExtraSpace+f.marginTopExtraSpace+b.chart.marginBottom+b.chart.marginTop;c-=ha(b,d,a,c*0.4);e.min=g(h.min,0);e.max=g(h.max,h.catCount-1);e.gridLineColor=K(k(i.radarspikecolor,M.divLineColor[b.chart.paletteIndex]),g(i.radarspikealpha,i.radarinlinealpha,M.divLineAlpha[b.chart.paletteIndex]));
e.gridLineWidth=g(i.radarspikethickness,1);e.showRadarBorder=g(i.showradarborder,1);e.radarBorderThickness=g(i.radarborderthickness,2);e.radarBorderColor=K(k(i.radarbordercolor,M.divLineColor[b.chart.paletteIndex]),g(i.radarborderalpha,100));e.radarFillColor=K(k(i.radarfillcolor,M.altHGridColor[b.chart.paletteIndex]),g(i.radarfillalpha,M.altHGridAlpha[b.chart.paletteIndex]));b.legend.enabled&&(k(i.legendposition,oa).toLowerCase()!=ba?c-=ka(b,d,a,c/2):a-=la(b,d,a/3,c));d=g(i.radarradius,0);e=2*g(parseInt(e.labels.style.lineHeight,
10),12);e=Math.min(a-106,c-(e+6));e=d===0?e*0.5:d;e>0||(e=5);b.chart.axisRadius=e},anchorAlpha:"100",showValues:0,isRadar:!0},o.msareabase);o("dragnode",{standaloneInit:!0,postSeriesAddition:function(){return this.base.postSeriesAddition&&this.base.postSeriesAddition.apply(this,arguments)},point:function(b,d,a,c,f,h,e){if(a.data){var i,j,l,v,n=!1,r,b=o[b],m=f[H],q=(h=a.data)&&h.length,w=g(a.showvalues,m.showValues),m=m.numberFormatter;d.zIndex=1;d.name=t(a.seriesname);if(g(a.includeinlegend)===0||
d.name===void 0)d.showInLegend=!1;var u,p,E;u=k(c.plotfillalpha,L);j=g(c.showplotborder,1);p=y(k(c.plotbordercolor,"666666"));E=g(c.plotborderthickness,1);i=k(c.plotborderalpha,"95");var c=Boolean(g(c.use3dlighting,1)),A,N,s;A=k(a.id,e);e=y(k(a.color,f.colors[e%f.colors.length]));u=k(a.plotfillalpha,a.nodeFillAlpha,u);j=Boolean(g(a.showplotborder,j));p=y(k(a.plotbordercolor,a.nodebordercolor,p));E=g(a.plotborderthickness,a.nodeborderthickness,E);N=j?k(a.plotborderalpha,a.nodeborderalpha,i):S;s=Boolean(g(a.allowdrag,
"1"));d.marker={enabled:!0,fillColor:K(e,u),lineColor:{FCcolor:{color:p,alpha:N}},lineWidth:E,symbol:"diamond"};var x,D,O,J,I,F,G,C,z;for(j=0;j<q;j+=1)if(l=h[j])if(i=m.getCleanValue(l.y),v=m.getCleanValue(l.x),i===null)d.data.push({y:null,x:v});else{n=!0;r=b.getPointStub(l,i,m.xAxis(v),f,a,w);C=k(l.id,A+"_"+j);x=Boolean(t(l.allowdrag,s));D=t(l.shape,"rectangle").toLowerCase();O=t(l.height,10);J=t(l.width,10);I=t(l.radius,10);F=t(l.numsides,4);G=y(k(l.color,e));z=k(l.alpha,u);switch(D){case "circle":break;
case "polygon":D=aa(F);break;default:D="square"}F=c?this.getPointColor(G,z):K(G,z);d.data.push({y:i,x:v,id:C,displayValue:k(r.displayValue),toolText:r.toolText,link:r.link,imageNode:Boolean(t(l.imagenode)),imageURL:t(l.imageurl),imageAlign:t(l.imagealign,B).toLowerCase(),imageWidth:t(l.imagewidth),imageHeight:t(l.imageheight),labelAlign:void 0,allowDrag:x,marker:{enabled:!0,fillColor:F,lineColor:{FCcolor:{color:p,alpha:N}},lineWidth:E,radius:I,height:O,width:J,symbol:D}});this.pointValueWatcher(f,
i,v)}else d.data.push({y:null})}if(!n)d.showInLegend=!1;return d},getPointStub:function(b,d,a,c,f){var c=c[H],d=d===null?d:c.numberFormatter.dataLabels(d),g,e=t(G(b.tooltext)),i=c.tooltipSepChar;c.showTooltip?e!==void 0?f=e:t(b.name)!==void 0?f=G(t(b.name,B)):d===null?f=!1:(c.seriesNameInToolTip&&(g=ea(f&&f.seriesname)),f=g?g+i:B,f+=a?a+i:B,f+=d):f=!1;a=G(k(b.name,b.label));a=t(a)!==void 0&&!(b.imagenode==1&&t(b.imageurl)!=void 0)?a:B;b=k(b.link);return{displayValue:a,toolText:f,link:b}},connector:function(b,
d,a,c,f){var h,e,i,j,l,v,n,b=a.connector,r,c=b.length,m,q,w=f[H].smartLabel,f=g(a.stdthickness,1);h=y(k(a.color,"FF5904"));e=k(a.alpha,L);i=g(a.dashgap,5);j=g(a.dashlen,5);l=Boolean(g(a.dashed,0));v=Boolean(g(a.arrowatstart,1));n=Boolean(g(a.arrowatend,1));a=g(a.strength,1);q=d.connector;var u,p,o,A,N,s,x,D,z,J,I;for(r=0;r<c;r+=1)m=b[r],u=k(m.from,B),p=k(m.to,B),o=G(k(m.label,m.name)),A=k(m.alpha,e),A={FCcolor:{color:y(k(m.color,h)),alpha:A}},N=Boolean(g(m.dashed,l)),s=g(m.dashgap,i),x=g(m.dashlen,
j),D=Boolean(g(m.arrowatstart,v)),z=Boolean(g(m.arrowatend,n)),J=g(m.strength,a),m=t(m.link),I=w.getOriSize(o),N=N?Z(x,s,f):void 0,q.push({from:u,to:p,label:o,color:A,dashStyle:N,arrowAtStart:D,arrowAtEnd:z,conStrength:J,connectorLink:m,stdThickness:f,labelWidth:I.widht,labelHeight:I.height});return d},series:function(b,d,a){var c,f,h=d[H],e,i=[],j;c=d.xAxis;e=d.yAxis[0];d.legend.enabled=Boolean(g(b.chart.showlegend,1));if(b.dataset&&(j=b.dataset.length)>0){this.categoryAdder(b,d);h.x.requaredAutoNumeicLabels=
!1;c.gridLineWidth=e.gridLineWidth=0;c.alternateGridColor=e.alternateGridColor=ga;if(b.connectors&&(f=b.connectors.length))for(c=0;c<f;c+=1)e={connector:[]},i.push(this.connector(a,e,b.connectors[c],b.chart,d,h.oriCatTmp.length,c));for(c=0;c<j;c+=1)f={data:[]},f=this.point(a,f,b.dataset[c],b.chart,d,h.oriCatTmp.length,c),f instanceof Array?d.series=d.series.concat(f):d.series.push(f);d.connectors=i;this.configureAxis(d,b);b.trendlines&&da(b.trendlines,d.yAxis,h,!1,this.isBar)}},creditLabel:!1,showYAxisValues:0,
defaultSeriesType:"dragnode"},o.scatterbase);o("dragarea",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"area",anchorAlpha:"100"},o.msareabase);o("dragline",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"line"},o.mslinebase);o("dragcolumn2d",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"column"},o.mscolumn2dbase);o("selectscatter",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"scatter"},o.scatterbase);o("multiaxisline",{standaloneInit:!0,creditLabel:!1,defaultSeriesType:"line",
series:function(b,d,a){var c,f=d[H],h,e,i=b.chart,j=b.axis,l;d.legend.enabled=Boolean(g(b.chart.showlegend,1));if(j&&j.length>0){this.categoryAdder(b,d);var v=d.yAxis[0],n,r,m,q,p=0,o,t,E=g(i.yaxisvaluesstep,i.yaxisvaluestep,1);d.yAxis.splice(0,2);l=0;for(c=j.length;l<c;l+=1)if(n=j[l],e=k(n.color,d.colors[l%d.colors.length]),r=K(e,100),m=!g(n.axisonleft,1),q=g(n.divlinethickness,i.divlinethickness,1),o=g(n.tickwidth,2),t=g(n.axislinethickness,2),h=f[l]={},m||(p=l),d.yAxis.push({startOnTick:!1,endOnTick:!1,
title:{style:v.title.style,text:G(n.title)},labels:{x:0,style:v.labels.style},plotBands:[],plotLines:[],gridLineColor:K(k(n.divlinecolor,e),g(n.divlinealpha,i.divlinealpha,M.divLineAlpha[d.chart.paletteIndex],100)),gridLineWidth:q,gridLineDashStyle:g(n.divlineisdashed,i.divlineisdashed,0)?Z(g(n.divlinedashlen,i.divlinedashlen,4),g(n.divlinedashgap,i.divlinedashgap,2),q):void 0,alternateGridColor:ga,lineColor:r,lineWidth:t,tickLength:o,tickColor:r,tickWidth:t,opposite:m}),h.yAxisValuesStep=g(n.yaxisvaluesstep,
n.yaxisvaluestep,E),h.maxValue=n.maxvalue,h.tickWidth=o,h.minValue=n.minvalue,h.setadaptiveymin=g(n.setadaptiveymin,i.setadaptiveymin),h.numDivLines=g(n.numdivlines,i.numdivlines,4),h.adjustdiv=g(n.adjustdiv,i.adjustdiv),h.showYAxisValues=g(n.showyaxisvalues,n.showyaxisvalue,1),h.showLimits=g(n.showlimits,i.showlimits,i.showyaxisvalues,i.showyaxisvalue,h.showYAxisValues),h.showDivLineValues=g(n.showdivlinevalue,n.showdivlinevalues,h.showYAxisValues),n.dataset&&n.dataset.length>0){m=n.dataset.length;
for(r=0;r<m;r+=1)e=n.dataset[r],h={yAxis:l,data:[]},h=this.point(a,h,e,b.chart,d,f.oriCatTmp.length,l),h instanceof Array?d.series=d.series.concat(h):d.series.push(h)}l=0;for(c=d.yAxis.length;l<c;l+=1)if(l!=p)d.yAxis[l].gridLineWidth=0;this.configureAxis(d,b)}},configureAxis:function(b,d){var a=b[H],c=d.chart,f,h,e,i,j,l,k,n,r,m,q,p,o;b.xAxis.title.text=G(c.xaxisname);o=0;for(h=b.yAxis.length;o<h;o+=1)if(f=b.yAxis[o],e=a[o],p=g(e.yAxisValuesStep,1),p=p<1?1:p,i=e.maxValue,j=e.minValue,l=g(e.setadaptiveymin,
0),k=l=!l,n=e.numDivLines,r=e.adjustdiv!==S,m=e.showLimits,q=e.showDivLineValues,qa(f,e,i,j,l,k,n,r),ta(c,b,f,e,m,q,p,a.numberFormatter,!1),f.reversed&&f.min>=0)b.plotOptions.series.threshold=f.max},spaceManager:function(b,d,a,c){var f=b[H],h,e,i=d.chart,j,l=f.marginLeftExtraSpace,p=f.marginTopExtraSpace,n=f.marginBottomExtraSpace,r=f.marginRightExtraSpace;a-=l+r+b.chart.marginRight+b.chart.marginLeft;e=c-(n+b.chart.marginBottom+b.chart.marginTop);var m=a*0.3,c=e*0.3,q=a-m,a=e-c,o=k(i.legendposition,
oa).toLowerCase();b.legend.enabled&&o===ba&&(q-=la(b,d,q/2,e));var u=b.yAxis,t,E=u.length,A,y,s=0,x=0,D,B=0,z=q/E;for(A=E-1;A>=0;A-=1)y=u[A],h=f[A],t=y.opposite,D=(t?x:s)+8,j=h.tickWidth+D,h.verticalAxisNamePadding=10,h.verticalAxisValuesPadding=j,h.rotateVerticalAxisName=!0,h.verticalAxisNameWidth=50,y.offset=D,j=z+B-8,t?(h=V(y,h,b,d,e,j,t,0,0,x),x+=h):(h=V(y,h,b,d,e,j,t,0,0,s),s+=h),h=j-h,B+=h,q-=j-h+8;q-=ua(b,d,q);e=q+m;b.legend.enabled&&o!==ba&&(a-=ka(b,d,e,a/2));a-=ha(b,d,e,a/2);h=f.x;h.horizontalAxisNamePadding=
g(i.xaxisnamepadding,5);h.horizontalLabelPadding=g(i.labelpadding,2);h.labelDisplay=i.rotatelabels=="1"?"rotate":k(i.labeldisplay,"auto").toLowerCase();h.staggerLines=g(i.staggerlines,2);h.slantLabels=g(i.slantlabels,i.slantlabel,0);this.xAxisMinMaxSetter(b,d,e);a-=ra(b.xAxis,h,b,d,e,a,m);a-=va(b,d,a,b.xAxis);d=c+a;for(A=0;A<E;A+=1)sa(d,b,i,b.yAxis[A],f[A].lYLblIdx);if(b.legend.enabled&&o===ba){f=b.legend;i=c+a;if(f.height>i)f.height=i,f.scroll.enabled=!0,B=(f.scroll.scrollBarWidth=10)+(f.scroll.scrollBarPadding=
2),f.width+=B,b.chart.marginRight+=B;f.y=20}f=(b.chart.marginLeft-g(b.chart.spacingLeft,0)-(b.chart.marginRight-g(b.chart.spacingRight,0)))/2;i=b.chart.marginLeft-g(b.chart.spacingLeft,0);d=-(b.chart.marginRight-g(b.chart.spacingRight,0));switch(b.title.align){case "left":b.title.x=i;break;case "right":b.title.x=d;break;default:b.title.x=f}switch(b.subtitle.align){case "left":b.subtitle.x=i;break;case "right":b.subtitle.x=d;break;default:b.subtitle.x=f}b.chart.marginLeft+=l;b.chart.marginTop+=p;b.chart.marginBottom+=
n;b.chart.marginRight+=r}},o.mslinebase);o("candlestick",{standaloneInit:!0,creditLabel:!1,paletteIndex:3,defaultSeriesType:"candlestick",placeLegendBlockBottom:!1,series:function(b,d,a){var c,f,h=d[H],e,i,j,k,o;d.legend.enabled=Boolean(g(b.chart.showlegend,1));if(b.dataset&&b.dataset.length>0){this.categoryAdder(b,d);d.yAxis[0].opposite=!0;h.numdivlines=t(b.chart.numpdivlines);j=jQuery.extend(!0,{},d,{chart:{backgroundColor:"rgba(255,255,255,0)",borderColor:"rgba(255,255,255,0)",animation:!1},title:{text:null},
subtitle:{text:null},legend:{enabled:!1},credits:{enabled:!1},xAxis:{opposite:!0,labels:{enabled:!1}},yAxis:[{opposite:!0,title:{},plotBands:[],plotLines:[]},{opposite:!1,title:{text:b.chart.vyaxisname}}]});c=0;for(f=b.dataset.length;c<f;c+=1)if(e={data:[]},i=b.dataset[c],e=this.point(a,e,i,b.chart,d,h.oriCatTmp.length,c),e instanceof Array){if(g(b.chart.showvolumechart,1)){j.series.push({type:"column",data:e[1]});j.showVolume=!0;i=g(b.chart.volumeheightpercent,40);i=i<20?20:i>80?80:i;k=h.height-
(d.chart.marginBottom+d.chart.marginTop);o=k*i/100;j[H].marginTop=d.chart.marginBottom+o+40;j.yAxis[0].plotBands=[];j.yAxis[0].plotLines=[];j.exporting.enabled=!1;j.yAxis[0].title.text=G(t(b.chart.vyaxisname));j.yAxis[0].title.align="low";j.chart.height=o+20;j.chart.width=h.width;j.chart.top=k-o;j.chart.left=0;j.chart.volumeHeightPercent=i;if(!d.subCharts)d.subCharts=[];d.subCharts.push(j)}d.series.push(e[0])}else d.series.push(e);if(b.trendset&&b.trendset.length>0){c=0;for(f=b.trendset.length;c<
f;c+=1)e={type:"line",marker:{enabled:!1},connectNullData:1,data:[]},j=b.trendset[c],j.data&&j.data.length>0&&(e=this.getTrendsetPoint(a,e,j,b.chart,d,h.oriCatTmp.length,c),d.series.push(e))}b.chart.showdivlinesecondaryvalue=0;b.chart.showsecondarylimits=0;this.configureAxis(d,b);d.yAxis[1].opposite=!1;d.yAxis[1].min=d.yAxis[0].min;d.yAxis[1].max=d.yAxis[0].max;d.yAxis[1].title.text=d.yAxis[0].title.text;d.yAxis[0].title.text=B;if((a=b.trendlines&&b.trendlines[0]&&b.trendlines[0].line)&&a.length){for(c=
0;c<a.length;c+=1)a[c].parentyaxis="s",a[c].valueonleft="1";da(b.trendlines,d.yAxis,h,!0,this.isBar)}}},getTrendsetPoint:function(b,d,a,c,f){if(a.data){var b=a.data,h=b.length,e=0,i,j,l,o,n,r=f[H],f=r.numberFormatter,r=r.toolTextStore,h=y(k(a.color,c.trendsetcolor,"666666")),e=k(a.alpha,c.trendsetalpha,L);i=g(a.thickness,c.trendsetthickness,2);j=Boolean(g(a.dashed,c.trendsetdashed,0));l=g(a.dashlen,c.trendsetdashlen,4);o=g(a.dashgap,c.trendsetdashgap,4);n=k(a.includeinlegend,1);d.color=K(h,e);d.lineWidth=
i;d.dashStyle=j?Z(l,o):void 0;d.includeInLegend=n;d.name=t(a.name);if(g(a.includeinlegend)===0||d.name===void 0)d.showInLegend=!1;d.tooltip={enabled:!1};e=c.interactivelegend=0;for(h=b.length;e<h;e+=1)if((c=b[e])&&!c.vline)a=f.getCleanValue(c.value),c=f.getCleanValue(c.x),c=c!==null?c:e+1,i=r&&r[c],d.data.push({x:c,y:a,toolText:i})}return d},point:function(b,d,a,c,f){if(a.data){var h,e,b=o[b],i=f[H],j=a.data,l=j&&j.length;g(a.showvalues,i.showValues);var p=i.numberFormatter,n=[],r=[];h=f.chart.paletteIndex;
var m={};d.name=t(a.seriesname);d.showInLegend=!1;d.marker={enabled:!0};a=t(c.plotpriceas,B).toLowerCase();d.plotType=a=="line"||a=="bar"?a:"candlestick";var q,w,u,z,E,A,N,s,x,D,O,J,I=!1,F,P,C,R,Q,U,W,X,V,T,Y;Y=g(d.yAxis,0);F=y(k(c.bearbordercolor,"B90000"));P=y(k(c.bearfillcolor,"B90000"));C=y(k(c.bullbordercolor,M.canvasBorderColor[h]));R=y(k(c.bullfillcolor,"FFFFFF"));Q=g(c.plotlinethickness,a=="line"||a=="bar"?2:1);U=k(c.plotlinealpha,L);W=g(c.plotlinedashlen,5);X=g(c.plotlinedashgap,4);V=Boolean(g(c.showvplotborder,
1));T=g(c.vplotborderthickness,1);V=k(c.vplotborderalpha,V==!0?L:S);y(k(c.rolloverbandcolor,M.altHGridColor[h]));k(c.rolloverbandalpha,M.altHGridAlpha[h]);for(h=0;h<l;h+=1)if((e=j[h])&&!e.vline)q=p.getCleanValue(e.open),w=p.getCleanValue(e.close),u=p.getCleanValue(e.high),z=p.getCleanValue(e.low),E=p.getCleanValue(e.volume,!0),s=p.getCleanValue(e.x),E!==null&&(I=!0),A=Math.min(q,w,u,z),N=Math.max(q,w,u,z),G(t(e.valuetext,B)),D=y(k(e.bordercolor,w<q?F:C)),O=k(e.alpha,L),x=K(y(k(e.color,w<q?P:R)),O),
J=Boolean(g(e.dashed))?Z(W,X):void 0,e=b.getPointStub(f,c,e,q,w,u,z,E,a),s=s?s:h+1,m[s]=e.toolText,d.data.push({high:Math.max(q,w,u,z),low:Math.min(q,w,u,z),color:K(x,O),borderColor:K(D,U),dashStyle:J,borderWidth:Q,x:s,y:w,MY:q,toolText:e.toolText,link:e.link}),r.push({y:E,color:K(x,O),toolText:e.toolText,borderWidth:T,borderColor:K(D,V),dashStyle:J,x:s}),this.pointValueWatchers(f,s,A,N,E,Y);i.toolTextStore=m;(d.drawVolume=I)?n.push(d,r):n=d}return n},getPointStub:function(b,d,a,c,f,g,e,i,j){d=B;
d=b[H];b=d.numberFormatter;j=j=="line";d.showTooltip?(d=t(a.tooltext),typeof d=="undefined"&&(d=c!==null&&!j?"<b>Open:</b> "+b.dataLabels(c)+"<br/>":B,d+=f!==null?"<b>Close:</b> "+b.dataLabels(f)+"<br/>":B,d+=g!==null&&!j?"<b>High:</b> "+b.dataLabels(g)+"<br/>":B,d+=e!==null&&!j?"<b>Low:</b> "+b.dataLabels(e)+"<br/>":B,d+=i!==null?"<b>Volume:</b> "+b.dataLabels(i):B)):d=B;return{toolText:d}},pointValueWatchers:function(b,d,a,c,f,h){var e=b[H],h=g(h,0);if(f!==null){b=e.volume;if(!b)b=e.volume={};b.max=
b.max>f?b.max:f;b.min=b.min<f?b.min:f}if(a!==null)b=e[h],b.max=b.max>a?b.max:a,b.min=b.min<a?b.min:a;if(c!==null)b=e[h],b.max=b.max>a?b.max:a,b.min=b.min<a?b.min:a;if(d!==null)a=e.x,a.max=a.max>d?a.max:d,a.min=a.min<d?a.min:d},spaceManager:function(b,d,a,c){var f=b[H],h,e,i,j=f.smartLabel;i=a-(f.marginLeftExtraSpace+f.marginRightExtraSpace+b.chart.marginRight+b.chart.marginLeft);var k=c-(f.marginBottomExtraSpace+0+b.chart.marginTop),o=i-i*0.3,n=b.yAxis,p,m=n.length,q,w=0,u=0,t=8,y,A=0,z=o/m;this.base.spaceManager.apply(this,
arguments);if(b.subCharts){var s=b.subCharts[0],x=c-(b.chart.marginTop+b.chart.marginBottom),n=s.chart.volumeHeightPercent;i=g(d.chart.rotateyaxisname,1);x=x*n/100;b.chart.marginBottom+=x+30;t=U({},b.xAxis);n=0;for(w=b.xAxis.plotBands.length;n<w;n+=1)if((u=b.xAxis.plotBands[n])&&u.label&&u.label.text)u.label.text=B;n=0;for(w=t.plotLines.length;n<w;n+=1)if((u=t.plotLines[n])&&u.label&&u.label.text)u.label.text=B;if(s.yAxis&&s.yAxis[0]&&s.yAxis[0].title&&s.yAxis[0].title.text)s.yAxis[0].title.text=
B;s.xAxis=t;j=j.getSmartText(s.yAxis[1].title.text,i==0?b.chart.marginLeft-10:x,void 0,!0).text;n=s.yAxis;m=n.length;u=w=0;t=8;A=0;z=o/m;for(m-=1;m>=0;m-=1)q=n[m],h=f[m],p=q.opposite,y=(p?u:w)+t,e=g(h.tickWidth,2)+y,h.verticalAxisNamePadding=10,h.verticalAxisValuesPadding=e,h.rotateVerticalAxisName=i,q.offset=y,e=z+A-t,p?(h=V(q,h,s,d,k,e,p,0,0,u),u+=h):(h=V(q,h,s,d,k,e,p,0,0,w),w+=h),h=e-h,A+=h,o-=e-h+t;s.yAxis[1].title=jQuery.extend(!0,{},b.yAxis[1].title);s.yAxis[1].title.text=j;s.chart.left=0;
s.chart.width=a;s.chart.top=c-b.chart.marginBottom+30;s.chart.height=x+30;s.chart.marginLeft=b.chart.marginLeft;s.chart.marginRight=b.chart.marginRight;s.chart.marginTop=5;s.chart.marginBottom=30}},isDual:!0,numVDivLines:0,setAdaptiveYMin:!0,divLineIsDashed:1,isCandleStick:!0,defaultPlotShadow:1,requaredAutoNumeicLabels:0},o.scatterbase)}})();