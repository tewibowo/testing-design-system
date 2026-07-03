# Means & Methods

> General tips and techniques to apply to your daily work to achieve excellence in interface design and assembly.

_Source: interfacecraft.dev/library — collection: means-and-methods_

---

# Layout & Alignment

_URL: https://www.interfacecraft.dev/library/layout-and-alignment_

Do you ever see an interface and something about it feels just… off? You can’t quite put your finger on it, but it doesn’t feel fully resolved. Sort of like a chord on a piano where one note is wrong. When I get this feeling, more often than that the result is a subtlety in the layout of the interface or specifically the alignment of elements in it.

Like much of design, this is one of those things where there aren’t necessarily hard and fast rules, but there are a few guidelines that if you keep in mind and adhere too will serve you well. Let’s take a look at a few of them.

### Alignment Methods

Generally speaking, aligning content or controls on an interface will use one of these methods. Please note: these methods are focused purely on the visual perception of alignment, not semantic possibilities (like progress buttons being alight to the right to connote forward progress in RTL languages).

#### Edge

Aligning things to an often invisible edge. This is the most common, as interfaces typically mimic documents.

#### Axis

I often refer to this as spine alignment. It’s where the center of elements are aligned to a single spine (either horizontal or vertical). This is common when aligning controls or icons that have differing visual shapes and bounds.

#### Baseline

Aligning elements to the baseline, typically of a key label or text element.

#### Mathematical

Aligning objects using consistent values. Often used for aligning elements within a container (like a button or card), and often using ratios.

#### Optical

Aligning objects to feel optically balanced. This often involves creating inconsistencies in specific values, but creates a more harmonious result.

#### Principles

In general, I try to keep the following in mind:

- Optimize for reducing the number of invisible alignment rules (edges, axis, or baselines being used) in an interface
- Optimize for things feeling balanced vs being mathematically consistent
- Optimize for reducing the number of alignment methods in any one screen

### Common Scenarios

These are a few common patterns where alignment comes into play, and ones where I often see things that feel just a little bit off.

#### Navigation

This is one of the largest culprits. Often there are things like logos, section headers, page icons, or other controls that all intersect. Let’s look at a fairly complex example inspired by an exchange I had about a design tool on X a while back.

#### Buttons

Icons are most commonly implemented (both in design and in code) with a consistent bounding box that’s invisible. When you add them to buttons that are using mathematical spacing, it looks unbalanced. It’s useful to take the time to optically align them so that they feel balanced and intentional.

#### Containers

This is one where most people often just use equal padding on all sides. But most containers often begin with a title, which has a line height different from the visible form of characters that you see. This is, in effect, a larger version of the button problem, where optically things can look unbalanced because of invisible spacing. I like to trim the top padding on my containers as a result so that they optically feel balanced.

#### Content Lists

Typically, you’d want to use edge alignment for lists of content. But I often see lists like the below example that have an emphasized row. If you’re only using edge alignment, this immediately looks ‘off’ because the icon and text is no longer aligned to the major rule that the other items are establishing. To fix this, we can use a vertical spine for the icons, and left edge for the text.

Another scenario I see related to lists is about the alignment of accessories within a list item. In this example, which I saw in a popular social payment product, the status and disclosure indicator are aligned to the baseline of the item label. But because the items have variable content that’s one or two lines, this feels less balanced than just aligning everything within the item to a horizontal spine.

Finally, content lists often have differing types of content in them. From the same payments app, there is a view that shows you the points you have available at a local business, as well as the potential rewards you can use them for. The content is all generally aligned to the left edge, so the points content being axis aligned on the center jumps out, but doesn’t feel quite resolved.

I can think of two single ways to fix this: either add a stroke or background to the points area, or use a different component that respects edge alignment and removes the centering.

#### Forms

I sometimes see forms that look like this: the page header is aligned to the text inside the form controls, and the selectors are baseline aligned. To me, this looks slightly unbalanced (particularly due to the presence of the navigation icon). I would instead align all the major elements to a left edge, and align the form controls to a horizontal spine.

---

# Style Details

_URL: https://www.interfacecraft.dev/library/style-details_

The following are suggestions or guidelines that you can use to ensure your interfaces feel cohesive, consistent, and valuable. They’re not hard and fast rules, but more often than not you’ll want to follow them.

Beyond these specific details, the big idea is simply to use consistent styling throughout your app's interfaces. This is the biggest tell between something that's considered, or something that's quickly thrown together.

#### Borders

This is my oldest and most reshared design tip, but I still see it in the wild almost every day. It applies to graphic design as much as interfaces, but in software is particularly challenging as the environment in which your components appear is highly dynamic.

When you implement a border as a solid color, it looks great in some situations, but when you then add things like shadows or backgrounds, it more often than not looks muddy or blurry.

The fix for this is to implement borders as either transparent outlines or box-shadows so that the borders picks up whatever is behind it. This way, you ensure it always looks crisp and has appropriate contrast in all situations.

This also applies to images. If you’re not using pure white backgrounds, and you want a little more contrast between an image and the background, use an inset border with a subtle opacity to help define it in a nice, subtle way.

#### Iconography

This often has less to do with an icon set and more to do with the specific implementation. Something that immediately jumps out to me as careless is when an app or interface shows icons that mix things like fill style, corner radius, or stroke width. Easy fix: just pick a single style and stick to it.

#### Controls

Similarly controls are another category that I often see implemented inconsistently. In the example below, the controls on the right of the navigation bar use a visual bounding shape. That is a styling choice; it would work just as well without, but in this theme, it reads as inconsistent and a bug that the back control doesn’t have a shape.

It would look just as good if the visual language was that only primary actions receive a shape, but since the ••• button is bounded, we should bound the back icon as well.

#### Corner Radius

You are probably familiar with the memed-to-death ‘concentric border radius’ tip, but another area where this jumps out is in the overall roundedness of interface elements. Consider the below example.

The button is fully rounded, and the add variable control has generous rounding as well. Because of this, the rounding of the select states and the checkbox control feel inconsistent and out of place. The interface reads sloppy as a result.

Refining is simple: we use the same radius for the active state of rows as the add variable control, and fully rounded the checkbox elements.

#### Materiality

In this example, the dominant effects are using materiality and light on the controls (a quick liquid glass-type effect). But the share icon uses a flat style with no materiality, and very increased elevation. This again reads as inconsistent or a visual bug. It’s merging two entirely different aesthetics into a single toolbar. The flat button is nice, but doesn’t feel at home.

#### Fills

This form looks ok, but the secondary button treatment jumps out to me. Everything else is using a consistent filled styling. Similar to iconography, I think this interface would look better if it was consistent and used a filled style, even while remaining clearly secondary.

#### Strokes

Strokes are one of the things that make components feel ‘detailed’. Sometimes an interface feels very detailed because all of the controls have strokes or hairlines, but in this example, the toolbar shown is a very restrained flat style. The presence of a white stroke on the user’s avatar reads as inconsistent, again, or a bug. Removing it would make it feel harmonious with everything else.

---

# Color Details

_URL: https://www.interfacecraft.dev/library/color-and-blending-modes_

Color has a huge impact on the feeling of your product. Beyond the brand connotations, there are a bunch of small details that help something just feel really great compared to whatever a default framework or coding agent spits out. These tips will help you with that.

#### Tonality

Tone refers to the temperature of a color. You might also see this referred to as tinting. Imagine a bucket of white paint. If you add a drop of red, it’ll become a warm white color. Or if you add blue, it becomes a cool white. This works the same in interfaces, and is particularly important when it comes to your neutrals (like whites, grey, and blacks).

A mistake I often see (largely due to LLM’s sloppiness) is to mismatch tones. This can range from subtle to dramatic. In the below example, the dominant tones are warm, but a few elements (the body copy and the CTA background) are cool. This is a bit unsettling and feels slightly off.

The rule of thumb here is to pick a temperature and just use it everywhere in your app.

Here’s another example: this segmented control sits on a slightly cool background, but the fill is perfectly neutral (no tinting either way). It’s fine, but could be refined.

One tactic I often use for this opacity. Rather than declare another color, I just use my primary neutral color at a lower opacity, say 10%. That way, it picks up the tone of the color behind it in a subtle way that almost always looks good by default.

Libraries like Tailwind make this easier, as they come with color objects that are consistently tinted. So if I want a warm app, I might use the stone color family, and select just 3 neutral colors to use from that.

#### Perceived brightness

When you put colors next to each other, one of the things you immediately notice is how bright one appears compared to the other. This is called perceived brightness. Sometimes, this might be intentional. You want a key color to be super loud compared to others. But most often, you want all your colors to appear the same.

OKLCH is a color model designed to make it easier to work with this idea and get to a set of perceptually similar colors. Below, by default, the blue colors feel brighter, even though they have the same Lightness values (in HSL) as all the other ones.

To fix this, we can use OKLCH to keep the same hue but normalize them to the same Lightness. For a deeper dive on the technical aspects of this, I suggest checking out OKLCH.fyi by Jakub Krehel.

To make this concrete, let’s consider an example where we’re using different colors for tokenized objects in an app. If they appear in close proximity, we don’t want to unintentionally communicate important by having one color brighter than the other. Instead, we want them to all feel the same.

#### Shades

Sometimes when you’re building shades based on a starting color, you want to generate a scale or find a darker version of that color. Often, just turning down the lightness will get you something that works. But this also sometimes feels like it loses some color as well, resulting in a more muted result. That might be desirable in some cases, but other times I want a more vibrant result.

A trick I like to use here is to subtly tweak the hue and increase the chroma as the color darkens. This means that my darker colors feel more rich. Again, you might not always want that, but whenever you see a color palette that just feels very rich and saturated, that’s what is happening under the hood.

#### Gradients

Whenever you have a gradient, you can think of each stop on that gradient as a path on the colorspace between the start and end points. By default in CSS and most drawing tools, this path is linear. But that often results in muddy gradients, especially when your two colors sit far apart in terms of hue.

On the web, you can add in a simple fix, in oklch. This tells the gradient to travel through perceptual curve between the two end points. The result is a much richer and more dynamic gradient.

#### Easing gradients

Another decision gradients must make when traveling through color space is effectively how fast to do it. By default, gradients sample steps at an equal rate. In many cases though (especially with dark overlays), you can see a visible horizon line when the gradient stops. Even though the gradient is mathematically ‘correct’ and starts and ends where you want, it doesn’t feel right.

The trick is to use an easing curve when sampling the color points. Unfortunately, there’s no built in CSS property for this (yet), but it’s not too bad to roll your own. This specific function eases a gradient from near black at 100% opacity to 0% opacity.

```
const ease = (t) => t * t * (3 - 2 * t); // smoothstep

// Sample the curve into color stops: opacity from the curve, position from t.
const stops = Array.from({ length: 15 }, (_, i) => {
  const t = i / 14;
  return `rgb(24 23 28 / ${1 - ease(t)}) ${t * 100}%`;
});

const fade = `linear-gradient(to top, ${stops.join(", ")})`;
```

When you call this, it just resolves to a plain CSS background value you can drop on any element:

```
background: linear-gradient(
  to top,
  rgb(24 23 28 / 1)     0%,
  rgb(24 23 28 / 0.985) 7.1%,
  rgb(24 23 28 / 0.945) 14.3%,
  rgb(24 23 28 / 0.882) 21.4%,
  rgb(24 23 28 / 0.802) 28.6%,
  rgb(24 23 28 / 0.708) 35.7%,
  rgb(24 23 28 / 0.606) 42.9%,
  rgb(24 23 28 / 0.5)   50%,
  rgb(24 23 28 / 0.394) 57.1%,
  rgb(24 23 28 / 0.292) 64.3%,
  rgb(24 23 28 / 0.198) 71.4%,
  rgb(24 23 28 / 0.118) 78.6%,
  rgb(24 23 28 / 0.055) 85.7%,
  rgb(24 23 28 / 0.015) 92.9%,
  rgb(24 23 28 / 0)     100%
);
```

The place I always see this is overlays, like the above example. You can see where the black ‘stops’ just under the icon in this conceptual interface. By easing the gradient, that line dissolves.

Or if you’d rather not write it, Andreas Larsen’s easing-gradients tool generates the stops for you.

#### Blending modes

As we talked about above, using opacity is a great way to match the tone of a color. But many times, especially when wanting a more rich or vibrant result, blending modes offer a better approach.

I won’t go into full details on blending modes (Sketch has a great writeup on that: https://www.sketch.com/blog/blend-modes/), but here’s two I often use in specific cases.

Plus-Lighter

This is a great way to get a brighter, more saturated foreground color when you’re using color as a background. I use this for the library cards. In the example below, the foreground color on the card (the graphic and title) is white at 50%. When we turn on the plus-lighter mode, it feels much brighter and more vibrant. You can see how white just feels… flat, compared to using white with plus-lighter blending mode. This often looks great as is, or provides you a starting point to subtly tweak it manually (like adding even more saturation for example).

Plus-Darker

This is the inverse; rather than using black at a lower opacity, use plus darker. Note: for CSS, this only works (currently) in WebKit, not Chromium browsers. What I typically do for this is to use a drawing tool like Figma to find the implied color values and use those directly. In the example below, the before state shows each foreground color (the circle) as black at 50% opacity. Notice how the palette with a blending mode has more more vibrant foreground colors.

---

# Typography Details

_URL: https://www.interfacecraft.dev/library/typography-details_

For the most part, interface are in a way just text documents. As such, typography is one of the most important details to learn and refine. This is the longest article in Means & Methods, and should be treated as a reference rather than quick tips or specific rules. I’ve tried to explain both the basics and more advanced aspects of typography as it generally relates modern interfaces.

### Foundations

There are a few foundational concepts worth internalizing that apply almost any time any text is used. They are: how long lines are, how far apart lines sit, how sizes relate to each other, and the rhythm between text and other objects.

#### Measure

Measure, also commonly referred to as line length, is simply how many characters sit on one line of text. Generally speaking, if the measure is too long, it’s taxing on the eye to read because it has to travel a larger distance back to the start of the next line. And if it’s too short, then you’re constantly scanning to new lines. This is not a hard and fast rule, but generally it’s a best practice to have your line length as somewhere between 45 and 75 characters per line.

CSS has a handy property for this if you want to set it directly: max-width: 66ch).

Play with different measures to get a sense for how a paragraph of text feels.

A nuance to balance this rule of thumb is that optimal measure varies greatly depending on the overall length of text you’re trying to set. For small fragments or sentences, like are common on marketing websites, measure can be very short, because there’s not that much text to read.

#### Auto-assign issues

Use a triage responsibility schedule to automatically assign issues.

#### Leading

Leading (rhymes with sledding), commonly referred to as line height, the gap above and below the actual characters in a line of text. It controls the spacing between lines. It’s set as a multiple of the font size. So a line height of 1.5 for font at 16 would equate to 24.

For body copy, a comfortable line height generally is somewhere between 1.4 and 1.6. Again, view this as a rule of thumb.

Line height should also be adjusted with measure. The wider a column of text, the more height it wants to feel balanced. And shorter bits of text can have less line height and feel ok. Explore that relationship below.

Similarly, line height moves with scale as well. The larger the type, the less leading it needs. For titles or other larger headers, line height can be close to 1, since it’s read as a unit rather than many lines of text.

#### Type Scale

A type scale is a proportional set of sizes that feel harmonious together. Similar to scales in music, they are derived from a base value and a ratio. So if our base is 16px, and our ratio is 1.5, the next size up would be 16 × 1.5 = 24. And then 24 × 1.5 = 36, so on and so forth. Most interfaces only need a handful of fonts; I generally try to use no more than 5 as a default. Less is more. If I want the brand or product to feel a bit more dramatic or editorial, I’ll use a larger ratio. For something that’s more utilitarian, I’ll use a tighter scale.

One thing I like to do is refine the scale below my base value. As you might have noticed, at the smaller points on the scale, the type size gets very small. An easy way to tweak this is to have a slightly gentler ratio under your base rather than over it.

It’s worth noting that many modern frameworks, like Tailwind, have built in type scales. These often expose a wide range of sizes, but just because you have them doesn’t meant mean you have to use them. These are also all easily customizable to tune the default scale to something that feels more appropriate for whatever you are building. It’s also important to note that this is primarily from the perspective of interface design. Marketing websites often use their own scales, as they are most commonly in an entirely separate codebase or tool.

#### Vertical Rhythm

This refers to the spacing of elements as you scroll a page or interface. Ideally, elements are all alined on the same baseline grid. This is another one of those things that, like music, you can just feel is slight off or not.

The simple idea here is to pick a base spacing unit tied to your line-height, and then make all vertical spacing measures (like margin, padding, line height, or gaps), multiple of that unit. That way, you always ‘stay on the grid’. This is why you see things like the 8pt grid system everywhere. It’s a choice you can just make once and then know by using it, you’ll always have pleasing vertical rhythm.

Below you see a simplified example; in this system, we have just 2 font sizes, 2 line heights, and 2 spacing units. See the impact of aligning these spacing units to a baseline rather than random values.

### Rendering

#### Smoothing

Browsers render text using the operating system’s default smoothing, which on many setups is subpixel antialiasing. For UI text, smoothing often looks cleaner and a touch lighter.

By default, all text displayed on web browsers uses the operating system’s default smoothing. This is why we see smooth curves rather than pixels for every font. But CSS offers some additional properties to help text look even sharper: -webkit-font-smoothing: antialiased and -moz-osx-font-smoothing: grayscale.

#### Dark Mode

Lighter text on dark backgrounds tends to optically ‘bloom’, which makes it feel ever so slightly bolder than it actually is. The difference is subtle, but if you are using a variable weight font, it can be a nice detail to reduce the weights a touch on dark mode.

### Numbers

#### Tabular Figures

By default, figures are proportional in their width. A 1 takes up less width than an 8. CSS provides a property called tabular figures that makes numerical figures all take up the same width.

Proportional figures are what you want in body copy, and in some isolated instances when shown on their own, but whenever that number might change or animate, you want to use tabular figures to avoid layout shifts.

#### Old-Style Figures

Many fonts also include variants for numbers that are old-style; their ascenders and descenders work more like text rather than lining figures, which all sit at the same cap height. Depending on your context, these may be appropriate to use, particularly in editorial settings. Reach for them with font-feature-settings: "onum" or font-variant-numeric: oldstyle-nums.

#### Tables

Whenever numbers live in a column, you almost always are wanting to compare them. To facilitate this, right align them and set them in tabular figures so that every significant digit is in the same space on a vertical rule. This makes it very easy to scan and compare.

### Setting Type

#### Tracking

Tracking, also known as kerning or letter-spacing, is the space between individual letters. The rule of thumb here is that tracking scales inversely with size. Smaller type wants to be opened up (especially when it’s displayed in all caps like eyebrows). Larger type wants to be brought in so it doesn’t read as overly spacious.

#### Wrapping

Two newer CSS properties let us easily resolve things like orphans or unbalanced lines. Use text-wrap: balance for headlines to make them feel, well, more balanced.

For body, you can use text-wrap: pretty, which re-wraps the last line as needed to avoid an orphan.

#### Hanging Punctuation

When opening quote marks sit inside a text block, it makes the left edge look ragged against everything above it and makes the first character look unbalanced. Hanging punctuation is moving it into the margin, so that all of the letters line up. This makes everything feel more refined.

#### Proper Punctuation

Using the proper punctuation goes a long way in showing attention to detail. Curly quotes and proper apostrophes instead of straight typewriter ticks, en dashes for ranges and em dashes for breaks instead of hyphens, and a single unicode ellipsis character instead of three periods are the most common situations I see. These are small, but they’re the difference between text that looks typeset and text that looks typed. This is particularly apparent when using a serif font.

### Fitting Type

Type rarely gets to sit at one fixed size in a box built exactly for it. These are the details for when it has to flex with the viewport, outgrow its container, or center cleanly inside a control.

#### Fluid Type

Instead of jumping between sizes at a breakpoint, clamp() lets type  smoothly between a floor and a ceiling. In clamp(1.375rem, 6cqi, 2.75rem) the middle value does the work.cqi is one percent of the container’s width, so 6cqi grows and shrinks with it, while the floor (22px) and ceiling (44px) keep it from getting too small or too large.

Drag the width below to compare: stepped snaps at a single breakpoint, while fluid holds at 22px, glides between, and pins at 44px.

#### Truncation

When text outgrows its space, clip it deliberately. A single line takes text-overflow: ellipsis; a longer description clamps to a fixed number of lines with -webkit-line-clamp; and a filename is best truncated in the middle, so you can still read part of the name and the file extension. A result like Final_quarterly…reviewed.pdf reads far better than a tail that cuts off before the .pdf. Toggle below to apply all three.

#### Text-Box Trim

Every font ships its own line metrics, and some reserve far more room above and below the letters than a short label ever needs. The button below is set in Founders Grotesk, whose generous leading leaves the word floating off-center even though the box is nominally ‘centered’. The line box is holding space for ascenders and descenders that aren’t there.

text-box trims that slack down to the letterforms. It’s shorthand for two properties. text-box-trim picks which ends to cut (trim-start, trim-end, or trim-both), and text-box-edge picks where to cut to, pairing a top edge (cap at the capital height or ex at the x-height) with a bottom edge (alphabetic at the baseline). So trim-both cap alphabetic snaps the box to the cap-and-baseline rectangle, and the label settles onto its real shapes. Toggle to trim; the dashed outline is the text’s own box. (It needs a recent Chromium browser to collapse fully.)

### OpenType Features

#### What They Are

Most well-built fonts carry far more than the glyphs you see by default. OpenType features are instructions baked into the font for swapping in alternate forms like slashed zeros, true fractions, and stylistic variants, all of them opt-in per use. Inter, for example, ships dozens of them. You turn them on with the high-level font-variant-* properties where possible, or with font-feature-settings: "tag" 1 for anything that doesn’t have one. Most examples below use Inter; a couple use Signifier, the serif you’re reading. Toggle each one to see the feature swap in.

#### Slashed Zero

The zero feature swaps in a slashed zero. It’s invaluable anywhere a 0 and an O could be confused, like codes, IDs, serial numbers, or monospaced data.

#### Fractions

The frac feature turns a slash-separated pair of numbers into a properly composed fraction, with a diagonal bar and a correctly sized numerator and denominator. It’s far better than shrinking the text by hand.

#### Superscript & Subscript

The sups and subs features substitute the font’s purpose-drawn small figures for exponents and chemical formulae, like mc2 or H2O. They arrive at the right weight and position, rather than the spindly, lopsided result you get from shrinking and shifting a normal digit with CSS.

#### Small Caps

True small caps (smcp) are capitals drawn at roughly lowercase height, with proportions tuned to match the surrounding text. They’re ideal for acronyms in running prose, where full capitals would shout. The important part is that these are real glyphs from the font (Signifier here), not capitals scaled down, which come out spindly and too light. (Inter doesn’t include them.)

#### Case-Sensitive Forms

The case feature shifts punctuation like dashes, colons, and bullets upward, so it sits centered on capital letters rather than on lowercase. It’s a small thing that keeps all-caps strings from looking lopsided.

#### Character Variants

Character variants (cv01 through cv13 in Inter) let you swap individual letterforms. A common one is a lowercase l with a tail, which tells it apart from a capital I and the digit 1. That’s handy for dense, technical UI.

Another swaps Inter’s default two-storey a for a rounded single-storey form (cv11). It’s a small change to one letter, but it noticeably shifts the whole personality of the text.

#### Disambiguation

Inter gathers its most legibility-focused alternates into one stylistic set, ss02, giving you the slashed zero, tailed l, and an unambiguous 1 all at once. It’s the single switch to reach for whenever text has to carry codes, IDs, or anything where a misread character is costly.

#### Stylistic Sets

Stylistic sets (ss01 through ss08 in Inter) bundle related alternates under one switch. This one rounds the quotes and commas for a softer feel. It’s worth opening your font’s specimen and trying each set; they’re free, already in the file, and easy to miss.

---

# Interpolation & Map Range

_URL: https://www.interfacecraft.dev/library/interpolation-and-map-range_

When you think about the dynamic aspects of interfaces, a common thing you want to do is modulate one value based on some other value. For example, if you scroll on a page, you might want to make an element larger or smaller. To do this, you generally need to answer: by how much should some value change? That's where the principles behind interpolation come in.

You can think of interpolation as simply figuring out a value between two known points. If you are halfway between, say, 0 and 100, you are at 50. This is linear interpolation, which you'll often see as lerp, but you can interpolate with any method. Easing curves are a great example; they return a value between 0 and 1 based on some easing function.

When you want to change some value based on another value, that's known as modulation. Things like “make this brighter based on the mouse position” or “increase blur based on scroll.” You can use an extremely simple but powerful function to do it.

### Foundations

#### Map Range

This is one of my all-time favorite functions. I first learned it from Koen Bok, who used it as a part of the Utility classes for the original Framer.js. It's elegant, performant, and incredibly powerful. You pass in a value, and it maps it from one set of values to another.

```
const mapRange = (value, fromLow, fromHigh, toLow, toHigh) =>
  toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
```

#### Clamping

If you use existing libraries that have a map range function, most of them clamp by default, and they might look something like the code below. This essentially clamps the output value to the highest number on the range you have defined, no matter what the input value is. In the example below, the slider goes to 16, while the range we gave as an input only goes to 10. When clamping is enabled, the output value cannot exceed 500, even if the input value goes past 10.

Here's an example of where you'd want to use clamping with a larger input range. Imagine we have an app where you can purchase tickets for a group, but the cost becomes constant at a certain point, though you can still add more members to the group. With clamping, we can fix the price while still accommodating a few more guests.

#### Easing

Modulation doesn't have to be linear. You can use an easing function to change the shape of the curve. To do this, first ease your input value before passing that to your map range function.

An example of this is a magnifying effect on a dock. It feels better to have the scale eased in relation to where your cursor is, as opposed to a simple linear interpolation. Play with it below.

### Applications

#### Dynamic Headers

You see this all over iOS. By mapping the size of a header to the scroll position, you can present it larger by default, and then gracefully transition to a smaller state when the user scrolls. This is just a simple linear interpolation that maps scrollY to fontSize.

#### Rubber Banding

You could think of this as a form of clamping, but with resistance instead of a binary stop. The below example shows a sheet. You can drag it, and it scales up with your gesture, but there is resistance on it; you can't drag it to the top of the container, and it snaps back once you release. If you start your drag lower on the sheet, it'll move more, but never to the top.

The secret to this is creating an asymptote as the value you pass into a mapped range. The value here is arbitrary, but the bigger it is, the stiffer it'll feel. We then map that into a simple 0 to 1 value, and pass that into map range. With the max offset at 64, no matter how much or little we drag the sheet, it will never touch or go beyond that range.

#### Mapping values to colors

A range doesn't have to just be numbers to numbers. Another common technique is to go from a number to a color. Consider a situation where, based on utilization, we want to visually communicate status. Lower utilization might be better (green), and higher loads are bad (red).

We can use multi-stop mapping to have an even richer effect than just green to red. This code basically just says “From 0 to 50%, go from green to amber. And then from above 50%, go from amber to red.” You can use this same approach to go from a value to almost any other set of values too, not just colors.

#### Pointer Reactivity

Anytime you see something that reacts to your pointer as you move it around, it's almost surely using map range. In this case, we get a subtle 3D effect by mapping x and y positions to a range where the midpoint is 0. So if our cursor is exactly in the middle of the card, there is no rotation; but as soon as we move it in any direction, the card starts to respond to our movement. A powerful result that's surprisingly simple to achieve.

---

# Compositing

_URL: https://www.interfacecraft.dev/library/compositing_

Interfaces, no matter what platform you’re building for, are just a stack of layers. While it’s probably not necessary for everyone designing digital products to know the inner workings of how rendering engines work, it is useful to understand some basic ideas about compositing, as well as a few common scenarios and situations to be mindful of. Many subtle bugs or really clever details you see all come down to compositing.

#### Painting Order

Let’s consider a basic content card. By default, you might think there’s just a couple layers going on. But if you explode it, you’ll see that almost everything sits on its own conceptual layer in the paint order. Refining the details means paying attention to the ordering of things, and using appropriate techniques like  and appropriate  to achieve the result you want.

### Techniques

#### Isolation

Isolation is a way of drawing a boundary around a group of layers when they render. This is most important when you have an element inside something that uses a blend mode or other effect. By default, the browser will blend it with whatever has already been painted behind it. At times, that might include part of the page underneath. So a badge might pick up the background, or a button highlight might react with an image it’s over. Often you don’t want this.

You can stop this happening by adding isolation: isolate to your component. This tells the browser to first composite the component’s internal layers together, and then place that finished result onto the page. This lets you get the effect you want, only where you want it. Below, I expect the title to have a nice plus-lighter blending mode in the card. By default, it renders as solid white because it’s also picking up the background. Isolation fixes this.

#### Grouping & Opacity

I see visual bugs all the time that relate to this one. Whenever you have multiple elements that you want to fade out, you almost always want to either group them together, or put individual layers inside of a pseudo-element that you fade out. If you just fade out siblings on their own, you can see through them where they overlap. Sometimes you want this, but most of the time you probably don’t.

Consider this carousel example; the further away from the center objects are, the lower opacity they have. By default, the overlaps look sloppy. Wrapping each in a pseudo-element, and then lowering the opacity achieves the effect we want.

Or this example, where we have a group of avatars that we want to fade out. By default, they overlap in an unpleasant way. If we put them all in a group, and then fade the group, it looks as expected.

#### Overlapping Transparency

A common situation you want to be careful of is how borders (which are often transparent) overlap. If you have a bunch of cells or rows for example, ensure that only one edge has a border. That way, the overlapping borders don’t add their opacity and present as darker than you intend.

#### Image Cross-Fades

Whenever you’re cross-fading images, it’s useful to know that two images set at 50% opacity do not actually equal 100% (they equal 75%). This means that whatever is in the background is going to bleed through, and inadvertently wash out the transition. You can see this below (because my figure background is grey). The midpoint of the transition feels really bad.

To fix this, group both layers into a group, and set them to mix-blend-mode: plus-lighter. This will actually sum the layers, instead of just stacking them, so that the perceived result is always at 100% at every point. This gives you a true cross-fade effect that feels much more vibrant.

#### Backdrop Filters

When you want to use materiality in your visual language, it’s common to use blur as a backdrop filter to lift an element (like a toolbar) on top of the page. This mimics a lot of what Apple does on iOS. But Apple goes many steps further, and does a lot of complicated color math that results in a very rich and dynamic effect. While the default might feel ok, I find that often bumping up the saturation on the web results in a much better result.

#### Layered Shadows

In the real world, when objects have shadows they have two parts. The first is a tight, dark edge where the object contacts the surface it’s resting on. The second is the wider, ambient falloff from whatever light source is present. A single shadow can only produce one blur, so while it might look fine in some cases, it never looks quite as good as stacking shadows. These feel more realistic and detailed. Some libraries, like Tailwind, do this automatically with their shadow classes. If you’re not using one, it’s a good idea to define a few sizes of shadows using this technique.

#### Composing graphics vs images

In almost every case where you are creating graphics in your interface, it’s a better idea to try and compose them in code than using a collection of static images. Firstly, this means that they are equally maintainable by anyone on your team. Secondly, this means you have much more control over them and create more interesting user experiences. You’re not limited to just showing a static image. You can animate things, make them customizable. The Interface Craft library cards are the perfect example for this, but here’s a simpler one below.

If I was making a game app for example, and had badges, I’d definitely use composition to create the set of graphics rather than trying to maintain a library of images.

---

# Wave Functions

_URL: https://www.interfacecraft.dev/library/wave-functions-as-drivers_

Something I use fairly regularly that I often don't see discussed is using wave functions in designs. These are particularly useful when it comes to procedural graphics, but they can also be very nice for incorporating subtle, natural motion in your animations. I'll first try to lay the foundation with as little math as possible, and then we'll look at some applications for using them.

### Foundations

#### Waves

Waves occur everywhere in nature. Oceans, light, sounds; they make up everything around us in one way or another. You might also have a painful memory of them from Pre-Calculus in school. We'll keep it simple and just consider a sin wave. The equation is y = sin(2πt). If you plot this on a graph, using a range for t of −1 to 1, you get a curve that perfectly ends where it starts on the y axis. Think of this as one cycle; if you continue to increment t (past 1), the cycle perfectly loops forever.

#### Wave Properties

Beyond the concept of a cycle, waves have three properties you should know, as you'll often want to manipulate these. Frequency controls the length of a cycle (how fast it repeats), amplitude controls the height of the range (how much motion there is), and phase shifts where in the cycle a wave begins.

Play with the sliders below, and watch how our wave formulas and curve respond.

#### Wave Shapes

While a sine wave is probably the most common shape of wave, it's not the only one. You might want to use different shapes for various applications, so it's useful to just be aware of them. Drag t to see how a given input travels along a wave's path.

#### Combining Waves

Sometimes you might want a wave function that is a bit more dynamic or organic feeling. An easy way to accomplish this is to average multiple wave functions together to yield a single curve. Each new wave is an octave, and we can control persistence to basically control how much of the octaves are respected. Higher persistence yields a more dynamic shape; lower shows something more similar to the original wave.

### Applications

#### Mapping waves to properties

If you haven't yet read , I'd suggest reading that to familiarize yourself with the idea of mapping a range. Because a wave function gives us an output that's always between −1 and 1, we can use that as our from range and then map it to anything we want. See the impact of different properties on a single object below.

#### Waves across multiple elements

There are many times where you want to apply a wave function to many elements to create a certain effect. Think of a loader or key animation. You can do this with loops and a simple phase offset. Each item runs the exact same function, but staggered by a spread amount. I often like to use this rather than just a simple time delay because I find it results in a more natural, organic feeling, similar to breathing.

#### Driving Motion

Whenever motion is looping, I prefer to use a wave function rather than keyframes. This is because at the turnaround point, keyframes often have visible peaks or seams. A wave function by comparison is smooth at every point on the curve. Amplitude allows you to, in effect, dial in the easing. This is definitely not a rule, but I find the motion a little more naturally pleasing.

#### Cycling Color

Sometimes I want to have a color gracefully change, but not across the entire spectrum. Just within, say, a certain range of hue values. If you use a wave function to drive this, and then offset the phase across a row of swatches, you get a subtle gradient that loops across a harmonious set of colors in a perfect loop.

#### Building a generative graphic

Everything so far comes together here. Layer drivers, remap them onto different properties, and a single sin() call grows into a full generative graphic. This is a step-by-step progression — each stage adds another mapped wave until the simple curve becomes a living composition.

Ok, let's see how we can use wave functions to create a dynamic and engaging visualization. To start, let's create a single row, that is made up of bars where the width changes based on a wave function. Play with the various wave properties below.

Now, let's pass time into the wave function. This is just done with a simple counter that increments every frame. Remember, waves loop perfectly forever, so we don't need to worry about how it repeats or ever ending.

Let's duplicate the rows so that we get a wave field.

And finally, let's add a row offset so that we get a much more dynamic field. This is already pretty close to the final Means & Methods graphic. The only additional changes I made were tweaks to timing and row count, and ensuring that it was all evenly masked within a frame so the right edge wasn't jagged. As you can see, with a couple basic principles and extremely minimal code, we can create a very interesting graphic. You can apply these same principles to all sorts of graphics or visualizations.

---

# Masks

_URL: https://www.interfacecraft.dev/library/masks_

A mask lets you hide part of an element within another element, without actually cropping or modifying the element itself. You may be familiar with this concept from drawing tools like Figma, but it works just the same in code. It’s useful in many situations when thinking about digital products, and this overview should help get you started to work with them.

#### What masks are

A mask doesn’t delete anything, rather it selectively hides part of the element based on the shape or alpha channel of a second element. Toggle the mask below for a basic example.

#### Types of masks

On the web, there are two primary ways to mask something (and these are similar on platforms like iOS): using a path, or using an alpha channel. Paths use clip-path to define a geometry to use as a mask, like a rectangle, circle, or other shape. This gives you a crisp edge. mask-image uses an alpha channel of an image (often a gradient), so that the edge can be soft.

#### Masking edges

A common scenario is wanting to fade out the edges for a collection of something that scrolls or animates. Sometimes it’s ok if this is clipped to a hard edge like a container or the browser window, but sometimes you want it to become invisible. Using a gradient mask is the perfect way to achieve this.

#### Shape reveals

Sometimes you want to reveal something in a way that’s a bit fancier than the element just fading in. You can use clip-path to do this in a variety of ways, like a wipe or iris reveal.

#### Text masks

You can use a text object as mask as well. background-clip: text paints a background like a gradient, an image, or video, behind the letterforms of your text.

#### Masks vs Overlays

In many cases, it’s better to use a mask where you might otherwise use an overlay. Consider an example where you want a gradient overlaying text or some other part of an interface. This might work well in, say, light mode, but if you don’t account for dark mode, easy to forget, it can lead to unintentional scenarios.

#### Masks and compositing

You can create some wonderful effects by merging ideas in masking and compositing. In the onboarding flow you drag your card into a slot, and it really looks like it goes in. The trick is that as the card crosses the opening, its lower edge is clipped away with clip-path: inset() so the part that’s “inside” the slot simply disappears.

And then because of how the slot graphic is drawn, and the card behind rendered on top, it looks like it actually goes into the slot. The card overlaps the back edge in the graphic, but the front edge is ‘on top’ of the card due to the mask.

---

# Animations

_URL: https://www.interfacecraft.dev/library/animation-tips_  
_(Contains 1 embedded video demonstration)_

Whether a marketing website or mobile application, most modern interfaces contain animations. These can be used to convey information, add delight, and express unique attributes of your brand. These tips and techniques are applicable in a wide variety of situations, all with the intent to help your product feel well crafted and executed at a level beyond the typical industry standard.

#### Chain animations

When you’re animating multiple versions of the same element, it can often feel better to chain them together with a slight offset or stagger. This ends up feeling more natural and resolved rather than animating everything together as one group. Consider the below example with a radial menu.

#### Faster transitions

When you’re replacing an element with another, make sure the transition is fast. You generally want to animate them at the same time, rather than waiting for one to finish and then animating another in. There are many ways to accomplish this, but let’s consider using Motion, which has a handy AnimatePresence component.

By default, AnimatePresence uses sync mode to handle entering and exiting children. This means you see both. We want to use popLayout, which immediately pops the existing element out of the page layout so the reflow is immediate. This allows you to accomplish a much faster and more seamless transition. You can further fine-tune your transition by customizing the timing or easing of both elements.

#### Arc paths

This is one of those things that takes animations from good to great. In the real world, due to things like gravity and air resistance, when most objects travel they do so in an arc, rather than a straight line. This feels more natural and pleasing. I use this effect in the style quiz for Pica.

My friend Lochie Axon recently implemented arcs for Motion to make this easier on the web, but if you want to implement your own (or on another platform), the code is fairly simple.

Multiple properties

You can also animate multiple properties at the same time to add even more depth. For example, you can scale the object up as it reaches the peak of the arc, so it feels like it lifts off the page. Combine that with a dynamic shadow that grows as the object rises, and the sense of elevation becomes convincing.

Arc Shape

Motion ships a real arc helper for this, so you don’t have to roll your own. Drag the apex below to set how far the arc bulges and where it peaks, and watch the arc() call update in real time.

#### Dynamic animations

To make your motion feel more rich and refined, consider making it more dynamic. We can borrow from Disney’s twelve basic principles of animation. Let’s take a look at a slider component.

#### Semantic animations

As much as possible, use real world metaphors and intentional motion to convey meaning. Try to avoid animation for its own sake. One example of this is incrementing numbers. We can refine the slider component by ticking the numbers up as they move across the slider, referencing an odometer. This both feels a bit more refined, but also conveys meaning in a way that isn’t random.

#### Interruptible transitions

Animations, especially those used for various transitions, should be interruptible. A user should be able to cancel or “interrupt” a transition or their gesture, and have the interface immediately respond. Let’s consider the radial menu from earlier. The best implementation is one where a user can immediately tap it again to close, even if the options haven’t fully opened.

#### Animations.dev

Want to go deeper on animations? My friend Emil Kowalski has a wonderful course on animations.dev that I highly recommend.

---

# State Machines

_URL: https://www.interfacecraft.dev/library/state-machines_

A state machine is a way of visualizing all the potential states a component or interface can be in at any one time. That might sound formal, but it’s really a simple way of thinking: given a set of scenarios, what does this thing look like in each one?

#### A simple machine

Let’s consider a simple example: a button that does something asynchronously, where we want to block the interface while it’s processing. This button has four states: idle, submitting, success, and error. Different events move you between them. Clicking it fires off the request and moves it to submitting, a successful response lands on success, and a rejected one drops it into error.

One way to visualize this is to map out the button in all four of those states. What I like to do is build simple playgrounds that show all the states at once, whether as a diagram like this or, more often, just a set of switches and conditions. Play with the state machine below: click the different states, click the button itself, or flip the toggles to move between them.

This is really helpful for communicating with the rest of your team, and for helping you as a designer think through which states you actually need to handle. It’s easy to come up with the obvious one or two, but forcing yourself to map out all the potential realities leads to a better experience. It also gives you a place to start refining the details, like how you transition between states.

#### A gallery of states

I think this idea is most useful for complete interfaces, or parts of interfaces, that have a wide variety of states, and these aren’t necessarily linear. Let’s consider a fintech app with a payment card. You can have a balance on it: maybe it’s already paid, maybe it’s coming up, maybe it’s overdue. Maybe you’ve set up autopay, or maybe you’ve locked the card so you can’t do anything at all. It would be pretty hard to think about all of these individually, and if you tried, you’d quickly get into a state where you’re just duplicating a lot of work.

What I like to do instead is use the idea of a state machine to create a playground that helps me manage and visualize the state, and catch the things that are easy to miss in a static drawing tool. By naming all of the states and providing switches for the things that impact several of them at once, I can see the full range of possibilities in one simple interactive playground. Play with it below.

This also gets much closer to something that’s actually buildable, or that would ship, rather than a set of a dozen or more static graphics all representing the same thing.

---

# Perceived Performance

_URL: https://www.interfacecraft.dev/library/loading_  
_(Contains 1 embedded video demonstration)_

Unless your interface is entirely static content, every time your users take actions that must persist, from as big as onboarding to as small as marking something read, their experience will be impacted by the reality of how software works. Most people just default to whatever is easiest or fastest (and nowadays, whatever your agent wrote for you), but I think it’s important to consider these moments as well.

#### Mask the wait

The best loading state is one that you never see. Loading here can mean either waiting for network calls to resolve, or any sort of data processing that your app needs to do on the client.

Pica is a font management app I made for macOS. It has a lot of features, but one of them is that it attempts to auto-organize your fonts into major type styles. The first time a user opens the app, I search through their entire font library, load all the fonts, and sort through them. Depending on the size of a user’s collection, this can take anywhere from a few hundred milliseconds to several seconds, or more.

The default implementation would be to just throw a spinner on the app (like Apple’s own FontBook does) and just make the user wait. But I think that’s a bad experience.

So to mitigate that, I designed an onboarding that is not only a delightful and memorable experience, but more importantly buys me a few seconds while the animation is playing and the user is reading to process their fonts in the background. For 99% of users, this means that by the time they click to continue, all of their fonts have been loaded and sorted for them. The result is something that feels pretty magical.

*Pica’s onboarding: delightful, and quietly masking the font indexing happening behind it.*

Whenever you have unavoidable work to do, think long and hard about how you can either do it in the background, or give users something worth their attention while you need to do it.

#### Optimistic UI

Optimistic UI means not making the user wait on a server round trip when you don’t have to. You can apply it in two directions: to the writes you make when the user performs an action in your product, and to the state you read something from a database when a page loads.

Optimistic writes

Imagine an app where you can like a piece of content. When a user taps to like, you need to register that event, send it to the server so that when other users view that content in their app, they can see the appropriate quantity of likes. If you were to show a spinner until you received confirmation from the server on every interaction, the experience to the user would feel incredibly brittle and slow.

Instead, you should just assume success, immediately show the experience after liking the object, and then gracefully handle any failures that may happen in the background (e.g. by just reverting state, or showing a toast).

This scales up to flow as well. Rather than trap users on a screen waiting for a callback, you can allow them to proceed to the next step. If you then get a failure callback, you can show a toast that allows them to retry without losing their new place in the flow.

These require a little bit more work in managing the state, but like anything worth doing, result in a far more fluid and stable feeling user experience.

Optimistic reads

Personally, I really dislike when apps treat their interfaces as dumb, needing to read everything from a server before showing you the state. A much better approach is to use local caching so that you can display what a user saw the last time they were on a page. This both feels much faster, and also avoids jittery state changes in the interface.

I use this technique here in the Library; if you have marked something as read or bookmarked, when you refresh the page or load it in a new session it shows you the same state you left off. If I didn’t utilize caching, articles would show you their default state briefly, and then after pulling the state from the server there’d be a jump when the client flips the icon state.

Again, bit more work, but much better payoff.

---

