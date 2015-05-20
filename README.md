# sleek.scss
A new twist on the grid system. Who needs columns?? No one! With this, you just tell your containing element how many children should fit next to each other at a given breakpoint.

No columns in sight.

Fundamentally, all this grid system does is set widths and float: left. You are responsible for gutters and other adjustments. Since the grid system is kept very simple on purpose, just tweak the numbers until you have something you like.

All units are supported for widths and breakpoints. The default base-width is set at 940px, which seems a popular choice, but you are free to set any percentage as well. If you use em's, be sure to assign both the breakpoints and the max-width in em's.

## How to use

Sleek uses only Sass mixins. There's no grid classes in sight! In fact, feel free to use any class names you want for your elements. There will never be class names in Sleek.

As far as mixins go, there's actually only two of them. The main one is called `sleek-grid` and it takes three arguments, of which only one is required: a Sass list and two booleans. Let's see an example:

```
.container {
	@include sleek-grid(1 2 4, true, true);
}
```

The first argument, the Sass list, defines how many children should fit side-by-side inside this element at different breakpoints. Breakpoints are also defined in a list, from smallest to largest (mobile-first!). The Sass list you provide here maps 1:1 to the breakpoint list.

The second argument, which is `true` in this example, indicates if this element is the *outer container*. If it's true, Sleek sets your `$max-width` as the max width of the element, and in breakpoints **larger** than your max-width, it sets the `width` of the element to your `max-width`. The second argument is `false` by default.

The third and final argument is for centering (horizontally). It simply sets the `margin-right` and `margin-left` of your element to `auto`, centering it in the viewport. The `.container` element in the example above is the outer-most element in this imaginary design, so both the second and the third argument is `true`. The third argument is also `false` by default.

The second and last mixin included in Sleek is `child`. It is for enabling some children to occupy a larger area than the default "one child unit". It takes two arguments; the same