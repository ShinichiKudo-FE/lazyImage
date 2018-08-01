# lazy-observer-load
## 使用interSectionObserver API异步加载图片

## 当前懒加载图片的方法 

要想知道当前是否需要加载一张图片，我们需要坚持当前页面可见范围内这张图片是否可见。如果是，则加载。
检查方法：我们可以通过事件和事件处理器来监测页面滚动位置、offset值、元素高度、视窗高度并计算出这张图片是否在可见视窗内。

>但是，这样做也有几点副作用：
由于所有的计算将在JS的主线程进行，因此可能会带来性能问题；
每次执行滚动时，以上计算都会执行一遍，如果我们的图片在最底部的，无形间浪费了很多资源；
如果页面中有很多图片，这些计算将会十分占用资源。

## 一个更加现代化的解决方案

[Intersection observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API#Browser_compatibility)提供了一种方法，可以异步观察目标元素与祖先元素或顶层文件的交集变化。
通过Intersection Observer API实现的懒加载主要包括以下几个步骤：

创建一个intersection observer实例；
通过这个实例可以观测到我们希望懒加载的元素的可见情况；
当元素出现在视窗中，加载元素； 一旦元素加载完成，则停止对他的观测；
