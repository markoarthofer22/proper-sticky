# Proper stickyBar

Sticky is a jQuery plugin that gives you the ability to make any element on your page always stay visible.

Lightweight and easy to use. No need for external dependencies (beside jQuery). Pure vanilla js in work.

## From beginning

### Why do this?
    I have tried a lot of plugins and all of them had something that we didn't need/like.
    This is pure lib that does just that. Sticks element to the top.

### How it works? 
    - Plugin is pretty simple. It uses window native scroll event that detects if elements has exited window scroll
    - If element has exited it will get `position:fixed`

## Usage
    1. Include jQuery lib
    2. Include Sticky lib
    3. Call Sticky

### Important => Initialize properStickyBar only after all elements are rendered 

```
<script src="jquery.js"></script>
<script src="properStickyBar.js"></script>
<script>
  $(document).ready(function(){
    var stickyInstance = new stickySideBar(elements, options);
</script>
```

Options is an object with additional options. It is not required. More on that bellow. 

## Methods
**init()** => called by default when instance is created

**updateSticky()** => call when you want to update your instance

#### How to update stickyBar

Usually you will do this on resize event. Pretty straightforward. Only you need to check if you instance exist


```
$(window).on("resize", function () {
    stickyInstance?.updateSticky?.();
});
```

**destroy()** => destroy an instace, removes classes and events

`stickyInstance?.destroy?.();`

## Options

All options are optional.

- `parentElementClass`: (default: first parent of element). Specify this for scroll borders. Your element will scroll to it's height
- `wrappClass`: (default: "sticked"). Default wrapping class for element
- `activeStickyClass`: (default: "is-sticked"). Default class that becomes active when element becomes sticked
- `activeBottomClass`: (default: "is-bottom"). Default class that becomes acitve when sticky has touched the bottom of parent
- `top`: (default: 0). Offset from top of window
- `width`: (default: element-width). Specify this only if you want to override element width
- `disableOnMobile`: (default: true). Disable sticky on mobile. default is true = 992px. If you don't want to disable it on mobile select false, or if you want different breakpoint define it (number in pixels)
