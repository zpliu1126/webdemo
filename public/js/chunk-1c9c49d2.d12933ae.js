(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c9c49d2"],{"4b1f":function(e,t,l){},c858:function(e,t,l){"use strict";var a=l("4b1f"),n=l.n(a);n.a},f45e:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"show-blast_result"}},e._l(e.ValidateReponse,(function(t){return l("div",{key:e.ValidateReponse.indexOf(t)},[l("h1",[e._v("query: "+e._s(t.queryName))]),t.summaryTable.length>0?l("div",{staticClass:"showResult"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t["summaryTable"],stripe:""}},[l("el-table-column",{attrs:{prop:"id",label:"number"}}),l("el-table-column",{attrs:{label:"subject name"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-link",{attrs:{href:"#"+t.row.id,type:"primary"}},[e._v(e._s(t.row.subjectName))])]}}],null,!0)}),l("el-table-column",{attrs:{prop:"score",label:"score"}}),l("el-table-column",{attrs:{prop:"evalue",label:"E-value"}}),l("el-table-column",{attrs:{prop:"identities",label:"identities"}}),l("el-table-column",{attrs:{prop:"length",label:"Length"}})],1),e._l(t["singleTable"],(function(t){return l("div",{key:t[0].id},[l("el-collapse",[l("el-collapse-item",[l("template",{slot:"title"},[l("h6",{attrs:{id:t[0].id}},[e._v(e._s(t[0].subjectName))])]),l("div",{staticClass:"single-align"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t,stripe:""}},[l("el-table-column",{attrs:{prop:"id",label:"number"}}),l("el-table-column",{attrs:{prop:"subjectName",label:"subject name"}}),l("el-table-column",{attrs:{prop:"score",label:"score"}}),l("el-table-column",{attrs:{prop:"evalue",label:"E-value"}}),l("el-table-column",{attrs:{prop:"identities",label:"identities"}}),l("el-table-column",{attrs:{prop:"length",label:"Length"}})],1),l("p",{staticClass:"pairSequence"},[e._v(e._s(t[0].pairSequence))])],1)],2)],1)],1)}))],2):e._e(),t.summaryTable.length>0?e._e():l("div",{staticClass:"Noresut"},[l("h1",[e._v("No Hit result")])])])})),0)},n=[],s=(l("4160"),l("159b"),{name:"BlastShow",props:{reponseData:{default:function(){return[{query:"CYP78A7",queryLength:"559",alignments:[]}]}}},data:function(){return{}},mounted:function(){},computed:{ValidateReponse:function(){var e=[];return this.reponseData.forEach((function(t){var l=t.query,a=t.queryLength,n=[],s=[],r="";t.alignments.length>0?(r=!0,t.alignments.forEach((function(e,t){n.push({id:t+1,subjectName:e.subjectName,score:e.score,evalue:e.eValue,length:e.subjectLength,identities:e.identities,pairSequence:e.pairSequence}),s.push([{id:t+1,subjectName:e.subjectName,score:e.score,evalue:e.eValue,length:e.subjectLength,identities:e.identities,pairSequence:e.pairSequence}])}))):r=!1,e.push({queryName:l,queryLength:a,summaryTable:n,AlignmentIf:r,singleTable:s})})),e}}}),r=s,i=(l("c858"),l("2877")),u=Object(i["a"])(r,a,n,!1,null,"108b2734",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-1c9c49d2.d12933ae.js.map