import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

/**

vue/spa的理解
vdom， diff
update在哪个阶段

双向绑定
组件通信
vue给对象添加一个新的属性界面不刷新
key的作用

跨域

闭包
作用域
执行上下文（栈）
bind/call/apply
原型链
new
this/ =>
事件循环（浏览器/nodejs）

防抖、节流


css
  盒模型
  重排、重绘制
  哪些操作dom会导致重排
  性能优化指标 （fp ,fcp...)
  css画三角形

*/