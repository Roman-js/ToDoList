(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,a){t.exports=a(17)},15:function(t,e,a){},16:function(t,e,a){},17:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(6),o=a.n(i),c=(a(15),a(8)),s=a(9),l=a(1),u=a(3),p=a(2),h=a(4),f=(a(16),a(7)),d=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).newTaskTitleRef=r.a.createRef(),a.onAddTaskClick=function(){var t=a.newTaskTitleRef.current.value;a.props.addTask(t)},a}return Object(h.a)(e,t),Object(f.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{className:"todoList-header"},r.a.createElement("h3",{className:"todoList-header__title"},"What to Learn"),r.a.createElement("div",{className:"todoList-newTaskForm"},r.a.createElement("input",{ref:this.newTaskTitleRef,type:"text",placeholder:"New task name"}),r.a.createElement("button",{onClick:this.onAddTaskClick},"Add")))}}]),e}(r.a.Component),m=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).onIsDoneChanged=function(t){a.props.changeStatus(a.props.task,t.currentTarget.checked)},a.render=function(){return r.a.createElement("div",{className:"todoList-tasks"},r.a.createElement("div",{className:"todoList-task"},r.a.createElement("input",{type:"checkbox",checked:a.props.task.isDone,onChange:a.onIsDoneChanged}),r.a.createElement("span",null,a.props.title," ",a.props.priority)))},a}return Object(h.a)(e,t),e}(r.a.Component),k=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).render=function(){var t=a.props.tasks.map(function(t){return r.a.createElement(m,{task:t,title:t.title,isDone:t.isDone,priority:t.priority,changeStatus:a.props.changeStatus})});return r.a.createElement("div",{className:"todoList-tasks"},t)},a}return Object(h.a)(e,t),e}(r.a.Component),v=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).render=function(){return r.a.createElement("button",{onClick:a.props.onClickFn,className:a.props.btnClass},a.props.title)},a}return Object(h.a)(e,t),e}(r.a.Component),b=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).render=function(){var t="All"===a.props.filterValue?"filter-active":"",e="Completed"===a.props.filterValue?"filter-active":"",n="Active"===a.props.filterValue?"filter-active":"";return r.a.createElement("div",{className:"todoList-footer"},r.a.createElement(v,{title:"All",btnClass:t,onClickFn:function(){a.props.changeFilter("All")}}),r.a.createElement(v,{title:"Completed",btnClass:e,onClickFn:function(){a.props.changeFilter("Completed")}}),r.a.createElement(v,{title:"Active",btnClass:n,onClickFn:function(){a.props.changeFilter("Active")}}))},a}return Object(h.a)(e,t),e}(r.a.Component),g=function(t){function e(){var t,a;Object(l.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(u.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).state={tasks:[{title:"CSS",isDone:!0,priority:"high"},{title:"JS",isDone:!0,priority:"low"},{title:"HTML",isDone:!1,priority:"high"},{title:"React",isDone:!1,priority:"low"},{title:"Angular",isDone:!0,priority:"high"}],filterValue:"All"},a.changeStatus=function(t,e){var n=a.state.tasks.map(function(a){return a!=t?a:Object(s.a)({},a,{isDone:e})});a.setState({tasks:n})},a.changeFilter=function(t){a.setState({filterValue:t})},a.addTask=function(t){var e={title:t,isDone:!1,priority:"low"},n=[].concat(Object(c.a)(a.state.tasks),[e]);a.setState({tasks:n})},a.render=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"todoList"},r.a.createElement(d,{addTask:a.addTask}),r.a.createElement(k,{changeStatus:a.changeStatus,tasks:a.state.tasks.filter(function(t){return"All"===a.state.filterValue||("Active"===a.state.filterValue?!1===t.isDone:"Completed"===a.state.filterValue?!0===t.isDone:void 0)})}),r.a.createElement(b,{filterValue:a.state.filterValue,changeFilter:a.changeFilter})))},a}return Object(h.a)(e,t),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.b89ab782.chunk.js.map