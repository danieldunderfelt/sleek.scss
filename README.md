# sleek.scss
A new twist on the grid system. Who needs columns?? No one! With this, you just tell your containing element how many children should fit next to each other at a given breakpoint.

No columns in sight.

Fundamentally, all this grid system does is set widths and float: left. You are responsible for gutters and other adjustments. Since the grid system is kept very simple on purpose, just tweak the numbers until you have something you like.

All units are supported for widths and breakpoints. The default base-width is set at 940px, which seems a popular choice, but you are free to set a percentage width as well. If you use em's, be sure to assign both the breakpoints and the max-width in em's.

## How to use

Sleek uses only Sass mixins. There's no grid .classes in sight! In fact, feel free to use any class names you want for your elements. There will never be class names in Sleek.

### Configuration

There are only two configuration values for Sleek, both of which have some sensible default. They are `$breakpoints` and `$default-width`. `$breakpoints` is a Sass list of lists, specifying the breakpoints you want to use starting from smallest up to the largest. Here they are in all their glory (with the defaults):

```

$breakpoints: "mobile" 0px, "tablet" 768px, "desktop" 1024px, "wide" 1280px !default;
$default-width: 940px !default;

```

For the breakpoints, supply a name and a value. It doesn't have to be a pixel value, but that's the most common. The value for `mobile` isn't actually used, so you may set it to whatever. It is only there so the list can be iterated over in a simple way. Specifying the breakpoint itself is important, though!

`$default-width` is just that - a default, global grid width. If you do not supply a width for the `sleek-outer` mixin, this one is used instead. Feel free to use any unit.

### The headliner

Sleek does it's thing with three mixins: `sleek`, `sleek-outer` and `sleek-child`. The main, and most often used, one is `sleek`. It works like this:

```

@include sleek(".selector", 1 2 4 4);

```

That's right! You don't use the mixin inside a selector block, you supply the selector you want the grid to apply to to the mixin! Soviet Russia etc. And yes, you can supply any kind of selector. It'll get interpolated straight into a selector block.

The second argument is a Sass-list of how many children should fit side-by-side inside the element on each breakpoint. It goes from mobile to wide. This order is important, and the order you specify the breakpoints is equally as important, as this is a 1:1 map. So on mobile, each child is 100% wide. During the tablet breakpoint, the children are 50% wide and two fit side-by-side and so on.

Be aware that you may skip all but one breakpoint rule in the list. If you supply a lesser amount of breakpoint rules than there are breakpoints, the last item in the list is applied to all following breakpoints. For example, if you supply `1 2`, then the children are 100% wide in mobile and 50% from there on. If you want, for example, two children to fit side-by-side no matter the viewport size, just supply a `2` to the `sleek` mixin.

### Weighing children

So you want to be a rebel and make one child larger than the others? No problem, you can just use the `sleek-child` mixin! it has the same signature as the `sleek` mixin but the list of numbers mean something different. Let's have a look:

```

@include sleek(".selector", 1 2 4 4) {
	@include sleek-child(".child-selector", 1 2 2 2);
}

```
Nesting! Yep. The `sleek` mixin creates a grid context into which you can put the two sub-mixins. All your grid setup in one convenient block! As is the norm with Sleek, the `sleek-child` mixin also takes a selector first and a list of values after. Keep in mind that the `.child-selector` will get nested into the `.selector` in the resulting CSS, so they should have the same relationship in the markup as well.

And again we map a list of values to a list of breakpoints. But this time, we are specifying how many "child spaces" a child should occupy. As you've probably noticed, here we're saying that in breakpoints tablet to wide, this child should occupy double the space. So in mobile the child behaves normally, but once we get to tablet sizes and beyond, the child takes the space of two children!

You won't have to apply the child mixin everywhere, only when you want a specific child to be larger. Oh, and feel free to supply fractional values! They're no problem.

### The container

To make the outer container for your grid, use the `sleek-outer` mixin. The only thing it does is set the width of the element you supplied it to to be a maximum width. You may also center it. Here's an example:

```

@include sleek(".outer-container", 1 2 4 4) {
	@include sleek-outer(true, 940px);
}

````

The first argument is a boolean indicating whether you want to center the element. The default is "YES PLEASE!", ie `true`. The second argument specifies the max width you want to set on the outer container. Both are optional. If you omit the width, your default width is used.

### Other features

Sleek is simple, and the above is pretty much it. Sleek does accommodate for features from other grids, like pusing or pulling:

```
@include sleek('.selector', 1 2 2 4) {
	// Pushing:
	position: relative;
	left: 50%;

	// Pulling:
	left: -50%;
}

```

Ha!

Jokes aside, I might add a function for calculating widths in the future, to make your positioning line up with the grid. The math is super simple though so feel free to roll one yourself.

## !important

One thing to keep in mind: the `sleek` mixin creates a grid **context**. Due to the limited ways you can use variables in Sass (or maybe the limit of my understanding of Sass...), a global variable is updated when you use the `sleek` mixin. That global value contains the list of breakpoint child spaces you gave to `sleek` as the second argument. When you use the `sleek-child` mixin, that value is needed for the calculations.

The long and short of it is that when you use the `sleek-child` mixin, it uses the values from the previous call to `sleek`. The upside is that it fits perfectly within CSS logic! Remember what `C` in `CSS` stands for?

Example:

```

@include sleek(".selector", 1 2 2 2); // Sleek call 1

*/ ... */

@include sleek(".another-selector", 1 2 3 4) { // Sleek call 2
	@include sleek-child(".child-selector", 1 2 2 2); // Bases math on 1 2 3 4 from Sleek call number 2
}

```

As you can see it's pretty much a non-issue and I do not think anyone will run into trouble. But keep it in mind.


## Yeah, that's basically it.

That's what Sleek does and it is the only things Sleek do. Gutters and other stuff is your responsibility.

I hope Sleek enables you to build something new quickly! Please report bugs in the repo issue tracker. Pull requests also welcome.