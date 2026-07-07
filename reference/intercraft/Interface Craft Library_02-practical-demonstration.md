# Practical Demonstration

> Worked examples applying the principles to real interfaces — critiques, redesigns, and component builds.

_Source: interfacecraft.dev/library — collection: practical-demonstration_

---

# Refining Today

_URL: https://www.interfacecraft.dev/library/refining-today_

←

## Refining Today

This is the home interface for an earlier iteration of Today, a daily planner created by my friend Adam.He's since updated it, but I thought this was a great example of an interface that is already in a pretty good spot. To me, it's at or even slightly above industry standard, but there are a few small details I think could be refined to push it even further.

### Critique

Inconsistent Icon Styles

The plus icon in the Create button uses a filled style, while all other icons use an outline style.

Too Many Vertical Rules

There are four different implicit visual rules being established here:

- The containers for the Tasks and Weeks table and the toolbar.
- The table titles and the todo icons, which the list under tasks tries to align to.
- The Schedule and Reflect labels.
- The task titles.

Toolbar Complexity

The toolbar has a bounded visual appearance, but for no functional gain. It's adding unnecessary weight and noise. The bigger issue though is the order of items feels non-standard on iOS. Typically, the primary action would be on the right, emphasized in some way, with additional actions on the left.

Inconsistent Visual Style

The toolbar also has a fine outline, but no other elements in the interface or visual language use this treatment.

Divider Inconsistency

Task items have visible dividers, but the secondary list below does not. We should standardize on one treatment.

Text Styling

The category label here reads as both too small and too bright for its purpose. We should also consider tokenizing this to differentiate it from the user text of the task titles.

### Refinement

Toolbar

We can simplify the toolbar by removing the visual container, and use more standard floating buttons instead. We can emphasize the primary action visually, and move it to the right side of the screen.Finally, we can update the icon style used to be consistent with the others in this interface.

Alignment

We can simplify to just two visually dominant vertical rules here. The section header, task content, and secondary list items share a consistent left edge, creating a cleaner visual hierarchy.

We can also tighten up the padding here to make things more balanced.

Dividers

Let's add a divider to our secondary table view to be consistent.

Category Tokens

We can style the category labels as tokens, to clearly differentiate them from other user entered text.

We can also refine the styling so they read more clearly as secondary data.

Dividers, again

After looking at this, I think it might be simpler without visual dividers, so let's remove them to see what that looks like.

Iconography

I'm noticing our stroke widths are different across this interface, and also the colors. We have too much color variance going on, so let's align all of it. Let's align the widths and the colors to simplify.

Alignment, again

Now let's tighten up the padding to make the task list feel more optically balanced.

### Summary

While each of these refinements may seem small, and some might feel preferential, overall they work together to reduce the visual weight of the interface, unify the visual language, and make it feel more at home on iOS.

Before

After

Continue Reading

---

# Refining Presscut

_URL: https://www.interfacecraft.dev/library/refining-presscut_

←

## Refining Presscut

Built by my friend Josh Pigford, Presscut is a newsletter publishing platform. To me, it's in that awkward spot that looks at first pass ok, but once you look more it feels below an industry standard bar. Let's critique the current design and get it there through some progressive refinements.

### Critique

Page Title

This subtitle is unnecessary and redundant with the page title.

Scoreboard Layout

There's too much vertical padding at the top of each card, making it unbalanced. The three-line structure (label, metric, value) wastes vertical space and could be simplified.

Card Complexity

Visually containing content within cards is a fine visual language, but separating these four creates unnecessary visual noise. They're effectively all siblings, and don't need to be separate.

Chart Noise

The chart is visually heavy. The dashed vertical grid lines compete with the data, and there are far too many x-axis labels. We can simplify.

Section Headers

“Edition Performance” is verbose. We can simplify.

Table Overload

I see this all the time. This page is a summary view, that allows users to click into details. And yet we are stuffing this table with every data point under the sun. If I want to know all of the details for the performance of a specific edition, I'll just click the row to see everything. At this altitude, we should be progressively disclosing key information so it doesn't feel so overwhelming.

Iconography Consistency

The scoreboard uses icons to visually categorize each metric, but that visual language isn't carried through to the tables. We could take advantage of the icons being established to simplify these table headers.

Link Information Density

Each link shows both the full title and the domain on separate lines. We could make this more visual—perhaps with favicons—or simplify by showing just the title with the domain integrated more subtly.

Unnecessary Edition Column

The “Edition” column implies each link belongs to one edition, but links can be shared across multiple editions. This column adds clutter without providing clear value at the overview level.

Progress Indicator

The click progress bars are so compressed that they barely communicate relative performance. The small size makes the visual feel scrunched and somewhat distracting rather than informative.

Card Strokes

The border strokes on the cards feel heavier than necessary. Lighter borders would reduce visual weight and let the content breathe.

Display Type Usage

The italic serif typeface works beautifully as the page title, but using it for every section header dilutes its impact. Section headers in a SaaS dashboard typically work better in a clean sans-serif at a smaller size.

### Refinement

Removing Redundancy

Let's start by removing the page subtitle.

Tightening the Scoreboard

We can merge the four cards into a single scoreboard, which visually simplifies them. We can fix the padding issue to make things balanced, reduce the visual weight of the icons, and move the supporting value inline with the metric. Now this all reads much better.

Integrating Chart & Metrics

We can take it a step further by integrating the scoreboard as the chart header. We can remove the chart title as it's now obvious what the chart is displaying, and allows us to make this overview more useful by allowing you to quickly see different metrics over time without finnicky filters.

Simplifying the Chart

Let's remove the vertical dashed lines; we can allow for a single vertical line on hover to show a specific date on interaction, but otherwise simplify the default visual state. We can also reduce the x-axis labels to five key dates across a month (so four weeks). We can also align the color of the chart with the overall visual language we have instead of an arbitrary blue.

Simplifying Section Headers

The decorative serif typeface works beautifully as the page title, but using it for every section header dilutes its impact. Let's switch to our body font for “Performance” and “Top Links”.

Simplified Table Data

We can simplify the header here to just “Performance.” Our simple column labels can become icons that mirror the scoreboard. This creates semantic meaning and value in the icons, and further simplifies the interface.

Balancing the Layout

The performance table's padding was a little too tight, creating some visual imbalance. It would also look simpler and better if it was the same height as our other table on the page.

Simplifying Links Table

- We can apply the same iconographic treatment to the header for consistency.
- We can replace the separate domain line with favicons to provide visual interest and make sources more recognizable.
- Let's remove the edition column altogether.
- Rather than using inline progress bars that will always be narrow, we can use the row background to indicate relative performance of each link. This creates a more visually interesting and balanced design while maintaining the same level of information clarity.

Final Touches

The gap between the chart and the other two tables was a little too big. We can make it the same distance as the gap between the two tables to balance it all out.

### Summary

These changes may all seem small on their own, but through deliberate choices to remove redundancy, simplify visual choices, and allow the data to speak for itself, the dashboard becomes much easier to both look at and use.

Before

After

Continue Reading

---

# Redesigning a Mobile Web App, Part 1

_URL: https://www.interfacecraft.dev/library/redesigning-mobile-web-app_

←

## Redesigning a Mobile Web App, Part 1

This is an app that helps people navigate the complex, multi-step process of getting a divorce. The subject matter is sensitive. This is a difficult, emotional experience that can take weeks or months to complete. The experience needs to both inspire trust and a sense of calm confidence.Let's examine where the current design falls well short of the industry standard. This part will focus on structured critique, and in Part 2 we'll start to fix it.

### Visual Design

Distracting color usage

There's a lot of color being used as background elements, but not intentionally. Sometimes things are highlighted when completed, sometimes when it's a system action, and sometimes it's just the AI responding. Everything has a background color, making the interface visually unbalanced and slightly childish and uncanny.

Muddy shadows

There are many different card styles, and many of them have shadows that feel muddy and blurry against the background.

Default purple AI

The help button uses a generic purple that feels like default AI-generated styling. This betrays the fact that we're using a generated interface and doesn't engender trust. It makes me want to run away.

Inconsistent headline usage

Headlines are styled inconsistently, sometimes using colors, sometimes not.

Lack of visual focus in CTAs

Primary buttons don't look like primary buttons. There's no clear visual hierarchy drawing attention to the most important actions.

Overly prominent strokes

Stroke treatments are too heavy, adding visual noise and competing with the content. In this chat view, these references are arguably the least important thing, yet they're visually emphasized.

Lack of typographic scale

There's no clear typographic hierarchy or consistent scale across the interface. We just have a lot going on.

### Interface Design

No focusing mechanism

Looking at this task list, it's not clear what my current job is at any given moment. Every task demands equal attention. There's no sense of "this is what you should do next" or "this is where you left off." The user is left to figure out their own path through a complex legal process.

Completed tasks still dominate

Completed steps are visually emphasized, rather than diminished. They take up significant space and their visual treatment actually draws more focus than the remaining work. This makes the interface feel daunting rather than encouraging.

Missing progressive disclosure

Everything is presented at once with equal weight. There's no progressive disclosure, no sense that complexity will be revealed gradually as needed. The interface forces me to see the full scope of this entire long journey immediately, which amplifies the feeling of being overwhelmed.

Overwhelming progress indication

Progress here is both shown persistently and as a flat "10 / 47 tasks complete." This is demoralizing. Forty-seven tasks feels almost insurmountable, and showing a raw count does nothing to make it feel manageable.

By showing all of the tasks as equal, we're missing an opportunity for chunking: breaking the process into a few phases that feel achievable. What's more, not all of these tasks or even phases are things that the user can independently just check off. It's the wrong metaphor for progress.

No expectation setting

For individual tasks, the interface provides no sense of how long things might take or when they might be done. There's no assurance, no framing of expectations. It's just "here's your list, get to work."

This is a process that is likely to take weeks or months, and certainly won't be completed in one sitting, but acts as if it can.

### Chat Interface

Poor visual hierarchy

The chat interface has significant hierarchy problems. It's difficult to quickly disambiguate between user messages, AI responses, and structured legal information pulled from law libraries. Everything blends together into an undifferentiated wall of text.

Lack of order and organization

When the AI surfaces an answer, it's lost under a wall of legal research that goes far too deep into the specific statutes. We should consider progressively disclosing that rather than making it front and center. Our users aren't lawyers, and we shouldn't give them information like they are.

Disconnected status indicators

The status and proof-of-work elements feel visually separate from the chat results. There's no clear connection between what the AI did and the outcome it produced.

### The Opportunity

The core functionality here seems genuinely useful and helpful to people in a time of need. I've had family members unfortunately go through this, and wish that they had more assistance than Googling or speaking with expensive lawyers.

But the current design execution undermines itself and does more harm than good.

Currently it feels like it takes no stance on how users should feel while using it. It's a rote task manager that treats divorce paperwork like any other to-do list. But this isn't a shopping list; it's one of the most stressful experiences in a person's life. The interface should actively work to reduce anxiety, not ignore it.

In Part 2, we'll work through resolving these issues to arrive at something that brings it up to industry standard, and much more likely to be trusted and used.

Continue Reading

---

# Redesigning a Mobile Web App, Part 2

_URL: https://www.interfacecraft.dev/library/redesigning-mobile-web-app-part-2_

←

## Redesigning a Mobile Web App, Part 2

In Part 1, we identified several issues with the app's current design. Let's redesign the core interfaces to bring it up to industry standard. I want to start by zooming out and deciding on an appropriate interface architecture, before then establishing a simple visual language, and finally design the interfaces themselves. Let's jump in.

### Interface Architecture

Start with defaults

A useful exercise when exploring interface architecture is to start mobile-first and ask: what would default iOS give us? This establishes a foundation, and typically gives you the most conventional, familiar solution that we can start to optimize.

For this app, iOS conventions would suggest a tab bar with three destinations: your filing tasks, the AI chat thread, and your settings.

We can put all of our tasks into a simple table view.

Group tasks by phase

Obviously, a flat list of 40+ tasks is overwhelming, especially given the context of this product. Users lose track of where they are and what's coming next. We can start to reduce this cognitive load by grouping our table of tasks into phases.

Phases as navigation

Let's take it further. Instead of showing all tasks at once, let's just show all the phases as the root navigation. Users tap into a phase to see just those tasks.

This is a super clear mental model. Users can see their overall progress at a glance, then drill down when they're ready to work. This is as basic as it gets, and many of Apple's own apps utilize this architecture.

Starting to optimize

A tab bar is a great starting point, but evaluating it for our specific product, I don't think it's appropriate. Chat and Profile aren't features that are peers to the core filing flow. They simply support it.

Profile we can move to the header, as it's rarely used. We can surface chat as a text input directly on this view.

Tapping on the input can yield chat as a modality, represented here conceptually by a sheet, that would be a more fluid experience that users could access in context of whatever task they're on.

Optimizing further

Something I don't like about a default main list of phases, with detail lists of tasks is that it requires you to tap in to get to your actionable content. Sometimes that's fine, but given the linear nature of this process I think we can improve upon this.

I'm asking myself "Are there ways we can preserve the benefit of grouping by phase without overwhelming the user?". Here are a couple explorations. Both allow for the core organizing unit to remain a phase, but by default show you only tasks in the one you're currently on.

Choosing simplicity

Of these options, I prefer the conceptual accordion. Vertical scrolling is the most natural and easy of all interactions, and it still allows users to tap in to see what's coming up if they want while not overwhelming them with our default choice.

A refinement we can also make is to automatically expand and scroll to the user's current phase based on their progress, and minimize the ones they have complete in some manner. This way, the interface is assistive and adapts to them.

Completing the architecture

To round things out, I want to optimize the iOS default of pushing to a new view for a task details. Instead, let's use another sheet modality. Because our tasks are often not long, and only have simple explanations or actions for users to do before manually marking them as complete, this will help the interface feel more anchored and fluid.

When they mark a task complete, the sheet dismisses and they immediately see the result for a tighter feedback loop.

Summary

I have a good sense now for this app overall, and know the key components that we can use to establish a visual language. Hopefully you see how these choices manifest the intent of simplifying the experience, and turning something that by default feels overwhelming for a user into something that is calm, focused, and supportive, only disclosing what they need at the right point in time.

### Visual Language

Guiding attributes

With our interaction model established, let's develop a visual language. First, I'm going to start by defining the attributes I want it to convey:

- Trust. Obvious, but critical given the importance of what we're helping users with.
- Calm. In an otherwise emotional or volatile situation I want using this app to feel like a grounding experience
- Expertise. I want users to know that they'll get the right answers from us

Setting the table

One way I often approach quickly sketching out visual languages is to just play around with different components. Currently, these are basically just raw components with very little styling applied, but it provides a starting point to help us create a simple workspace to try out different attributes of a visual language before applying it to our interfaces.

Choosing a body font

For the body font, I'm going to use the system standard—SF Pro on Mac, Segoe UI on Windows. This will feel familiar and in some ways "undesigned" in a good way: we're not forcing our brand on you for the more detailed work you need to do.

Choosing a display font

I do want to use a custom display font, and I'm immediately drawn to serifs. Here's Georgia, the system default, as a baseline. A serif headline might feel overplayed, but it goes a long way in making this feel established and mature. Georgia isn't right though. Its numbers are a bit odd, and it feels like an "undesigned" option in a negative way. We can put more thought into it.

EB Garamond

EB Garamond is a sincere, old-style typeface with beautiful proportions. However, it feels a bit too rustic and austere for our use case. I want something that feels a bit more modern while still carrying that sense of authority.

Libre Baskerville

Libre Baskerville is another classic option; bolder than Garamond with strong number forms. It's closer, but it still feels traditional and perhaps too ornate. I'm looking for something that bridges old-world authority with modern digital clarity.

Source Serif

Source Serif is a great compromise. It feels stable and structured, conveying competence and sincerity, but it's distinctly modern compared to the classic alternatives. The subtle slab-serif characteristics give it a grounded, trustworthy quality that aligns well with our attributes.

Corners

On a spectrum from technical to friendly, I want to lean just slightly toward friendly—not all the way, but enough to feel approachable. One simple way to express this is through corner radius. Icon buttons and the continue button get fully rounded. The color palette gets a subtle 12-pixel radius. Chat bubbles and the composer feel more conversational with rounded edges.

Icons

In contrast to our friendly shapes, I want to use strong, bold icons that don't have corner radius. These sharp, square-capped strokes create a sense of precision and authority that balances the soft, rounded containers.

Color

For color, I'm choosing a warm neutral palette that feels calm and serene. Heavy use of off-whites allows us to reserve pure white for focused content areas. And I want one bright accent color used sparingly—a warm, sun-like gold that adds a touch of positive vibrancy and hope to an otherwise understated design.

Containers

Instead of using things like strokes to denote containers, I want a slightly softer feel. So instead of any strokes or shadows, I'm just going to use subtle layer blurring and cards to organize information.

### Interface Design

Home

With our interaction model and visual language roughed out, we can create a full interface design. Here's the home page—a clean vertical scroll of phases with the current one expanded.

Refining the List

Let's add a little bit more contrast in size between our page header and our phase headers, tighten up the letter spacing, and adjust the overall proportions of the elements.

Refining the Active Phase

When a user taps on a phase, we expand it to reveal the tasks within. This gives them a focused view of what needs to be done in this stage of their journey.

Creating Visual Hierarchy

To make the active phase stand out more clearly, let's wrap it in a card. This creates a stronger visual separation between where the user is now and the phases they've completed or have yet to reach.

Refining Our Language

The phase titles and task names we've been using are clear and objective, but they're also cold. Phrases like "Form Preparation" and "Generate Summons (JD-FM-3)" feel clinical, almost intimidating. For someone already going through an emotional process, this language creates distance rather than support.

Let's warm things up. Instead of "Form Preparation," we'll say "Your Paperwork." Instead of "Generate Summons (JD-FM-3)," simply "Create your summons document." I want this to feel approachable and human, like a helpful guide rather than a government form at the DMV.

Simplify

The chevrons and dividers are adding visual noise without much benefit. Let's remove them to create a cleaner, calmer interface.

Collapsing Completed Work

Once phases are complete, they don't need to take up valuable screen space. Let's collapse them out of view while hinting at their presence with a subtle card stack effect behind the current phase. This keeps the focus on what's next while acknowledging the progress already made.

Emphasizing the Current Phase

When a user taps into a phase to work on it, let's make it feel like they're entering a focused workspace. The card widens, the phase badge and title grow larger and reposition, and we introduce helpful context like a time estimate and a brief explanation of what this phase is about. For other phases, this provides space to let users know what they might need in order to complete the tasks.

The tasks shift to a left-aligned layout that feels more like a focused to-do list. These transformations help users understand not just what to do, but why they're doing it.

### Summary

What We Built

We transformed a dense, form-like interface into a focused, supportive experience. Our journey phases now feel like chapters in a story rather than bureaucratic checkboxes.

Key changes: warmer language that guides rather than instructs, visual hierarchy that emphasizes current work while acknowledging progress, and a card-based layout that creates focus without losing context.

The result is an interface that respects the emotional weight of what users are going through while still helping them accomplish what they need to do.

In Part 3, we’ll tackle the detail views for tasks, and the AI assisted chat interfaces.

Continue Reading

---

# Redesigning a Mobile Web App, Part 3

_URL: https://www.interfacecraft.dev/library/redesigning-mobile-web-app-part-3_

←

## Redesigning a Mobile Web App, Part 3

In Part 1, we critiqued the app’s existing design. In Part 2, we redesigned the core interfaces to establish an interaction model and visual language. Now let’s design the task detail views that appear when a user taps into a specific task.

### Task Detail View

Sub tasks

Let’s pick up where we left off. We have an expanded phase card with a task list, stacked completed phases behind it, future phases below, and a bottom composer for chat.

Now, let’s design what happens when a user taps on a task.

Tapping a task

As we designed previously, tapping a task brings up a sheet from the bottom. This keeps the user anchored in their phase context, and allows for quickly completing simpler tasks while being extensible for more complex ones.

Adding task information

We can really improve on what exists by providing context for the task. Let’s add a clear description and a “What you’ll need” checklist so users can understand if they’ll need something specific.

I think by showing this info we can reduce anxiety and make it more clear what they’re getting into before they jump in.

Setting expectations

Just like the overall phase, I think we can show a small time estimate to tell users roughly how long the task will take.

Refining the actions

The current buttons don’t have any real hierarchy, so let’s fix that.

Each task should have a primary action button that’s clearly the focus. A useful principle here to also instill is that every step should only have a single action. That continues make things easier for users, and avoids the need for a more complex UI. We do need a manual way though for users to complete a task, so we can treat that as secondary.

### Summary

What We Built

While seemingly basic, we’ve now designed a flexible system that can accommodate simple tasks, or larger ones that require more context upfront. All of this within a very simple interface pattern.

Continue Reading

---

# Creating a Slider Component

_URL: https://www.interfacecraft.dev/library/creating-slider-component_

←

## Creating a Slider Component

This demonstration will be different. I'm going to walk through trying to create a single interface component, in this case a slider, and make it as great as it can be. Nothing is ever perfect, but I want to show what it looks like to try and push way beyond the industry standard. Go ahead and play with the slider at every step. It's fully interactive for this whole demonstration.

### Direction

The Starting Point

Most sliders start here: a label on top, a styled range track below, and a numeric value you can click to edit. Each element lives separately. It works just fine.

But I see a number of problems with it:

- It takes up a lot of vertical height.
- There's a lot of visual noise: three distinct elements all competing for attention.
- The interactive part feels small relative to what it needs to do, requiring precision to target. It feels, for lack of a better word, very web-like.

Consolidation

Collapsing everything into a single row immediately tightens things up. We now have one row instead of two for the same information and controls.

Full-Bleed Track

We can go further and just make the track itself the visual container for the control. This means we no longer need a precise drag handle, the entire surface is the drag target. The label and value float as overlays within the slider.

### Refinement

Typography & Proportion

We need to increase the size of the labels now to feel proportional to the control. I also want to switch the value to a monospace font so that the digits don't jump around as they change. You could also use tabular-nums property for this, but I like how the value (which is mutable) is visually distinct from the system text label.

The Handle

While the drag handle isn't needed functionally, I do still appreciate some small affordance of interaction, implying specificity, on hover or active state, so let's add a much more subtle drag handle on hover.

Refining the Handle

The handle works, but sitting right at the fill's edge feels harsh. Insetting it slightly makes the boundary less abrupt. And instead of a simple opacity fade, the handle scales in on its x-axis. This is a silly little detail that I think makes this feel more crafted and therefore more trustworthy.

Track Interaction

The control should respond to your presence. On hover or while dragging, let's increase the brightness just enough to acknowledge the interaction and help focus you without disrupting the resting aesthetic.

Value Dodge

I don't want the handle to obscure labels or value, so when it's over them let's make it fade and scale down, avoiding a visual collision while still hinting at its position. Once it clears the text, it springs back to its default state. You could probably read the labels just fine, but this again communicates we're thinking about your experience as a user.

Handle Clamping

At zero the handle is vanishing off the left edge. Instead, let's make it clamp to a minimum position just inside the track. As you drag, it holds there until the fill is wide enough for the inset to take over naturally for a smooth transition.

Hash Marks

Sometimes you want to know roughly where you are in a range. We have the value telling us the precise value, but it's still useful to give users an idea of where they are, proportionally. So let's add eight evenly spaced ticks (this splits the track into 10 even segments). They only need to appear on hover, and are visually subtle. Just enough to give you spatial awareness.

Snap to Deciles

While dragging gives you continuous control over every value, I think we can make this more usable by doing work for you and reducing the precision you need to get what you want. If I click in the middle of the track, I probably want 50%. By default, if I'm a couple pixels off, I might land on 51% or 49%.

So let's add generous targets, only for clicks, that assist you and set the value to the nearest decile that you probably wanted. This means we're accounting for a lack of precision and making it easier to use. If you do want a very specific value for some reason, you can always drag and slide. Toggle the overlay below to see the snap zones, and try out clicking near a tick or in between them.

Spring Animation

I don't like the instant snapping though; it doesn't feel graceful. Let's add a spring animation so on click we transition the value so it doesn't jump. Dragging is still instant, giving you more instant feedback when you want it.

Editable Value

Dragging is great for rough adjustments, but sometimes you do know and want a precise number. This is the biggest upside of the original slider that we've lost.

But we can give you the best of both worlds. Let's make the value editable on a slight 800ms delay. We can turn it into an input only when we know you want to edit it. Otherwise, you can click under the labels like you might expect, but also get what you want if you tried to see if it was an input.

Rubber Banding

Now to really make this excellent, let's add rubber banding. This is a technique that is common on iOS. It's a way for interface components to recognize and give you visual feedback that you are interacting with them even if they can no longer scale or move or grow.

Drag the slider all the way to 0 or 1, then keep dragging past the edge. The card stretches in the overflow direction with diminishing returns, telling you you've hit the boundary.

I don't want this to happen every time you drag past; I often just drag obtusely when trying to get to 0 or 100% of a slider, so I want to provide a dead zone where it doesn't yet expand. This is a small detail, and mostly just because we can, but I think it again communicates craft and care.

The Ultimate Slider

And there we have it. We started with a perfectly functional slider, and by being extremely intentional and detail oriented, created something that I think is pretty great. It might not be perfect; there are things I definitely would want to add in terms of accessibility and keyboard shortcuts, but it's a step above any other slider I've seen on the web.

Continue Reading

---

# Designing a v0 Gift Card

_URL: https://www.interfacecraft.dev/library/creating-v0-gift-card_

←

## Designing a v0 Gift Card

When I got word that I'd be able to offer every Founding Member of Interface Craft more than one month's worth of v0 credits, thanks to my friends at Vercel, I knew I had to go all out for the experience. Here's how I created what I hope was a very memorable unveiling.

### Building the Surface

The Card

I started with a card-shaped rectangle with a really subtle diagonal gradient. This lives inside of a perspective wrapper and a Framer Motion transform div with preserve-3d enabled. This is scaffolding for what I already know is going to come in terms of interactions, but it provides a basic starting point.

Card Content

Next I added the v0 logo on the top left—thankfully they have this easily accessible on their website—and then the user's name on the top right.

I also wanted to add something that felt technical, unique, and fit the overall vibe of v0, which is this really futuristic, kind of technical hacker aesthetic. So I came up with some essentially fake data that references things like Interface Craft, context tokens, the technology I'm using such as TypeScript, and also uses the current date timestamp whenever a user loads the page. What you're seeing should be the timestamp for when you refreshed this page. Just small details to add some visual mass that feel thoughtful and considered.

Brushed Metal

I knew that instead of just displaying the value on the card or having a simpler flip animation, I wanted a scratch-off sticker. I have not seen this done before with a gift card on the web. I've seen plenty of flips or transitions, but I thought it would be really cool if the card had this metal texture that you could erase. So the first step is adding this base linear gradient that simulates brushed metal, filling the inner sticker region that we're going to erase, and creating a basic shape for the holographic image that we're going to composite over it.

Grain Texture

Next I wanted to add some visual interest in the form of noise, so I added an SVG noise overlay with an feTurbulence filter. This is actually two layers composited together: there's a coarse one that's lower in the stack and a fine-grained one towards the top. These are both blended to create a subtle metallic shimmer.

Halftone Pattern

To really dial things up I wanted to create a halftone pattern inspired by Vercel's logo, which of course is a triangle. I render a grid as an inline SVG where the triangle rows are staggered and scale from smaller at the top to larger at the bottom in a classic halftone offset progression. There's a subtle white fill with opacity, and this creates more visual interest than if all of the triangles were the same size.

Holographic Parallax

To take it up even further, I wanted to create a feeling of a holographic pattern inspired by some real-world foils I've seen. If you move your cursor over this layer, it shifts the pattern offset by 4 pixels in response to your mouse to create a realistic holographic parallax effect.

Perspective Tilt

No holographic card would be complete without some perspective tilt, so I enabled mouse tracking smoothed with a spring-based 3D rotation that follows your cursor. The card also scales up on hover, lifting gently off the surface with a shadow behind it.

Color Wash

I wanted to add some more branding elements that alluded to Vercel. They have a really nice usage of color on their website, so to mirror that I added a four-stop HSLA gradient—red, gold, cyan, and magenta—set to color-dodge on top of our foil card. It's masked so it only appears on the parts of the card simulating metal for a more realistic feel. The angle, rotation, and scale all respond to your cursor, and it's set to a minimum opacity to ensure some of the texture is always showing through. This makes it feel really alive and interactive—but in its current state, it's fairly unrealistic.

Radial Glare

I added a small radial gradient ellipse that follows your cursor directly, simulating a specular highlight. There are actually two layers here: one that affects the texture within the sticker container, and a subtler one on the outer card body for a gentle light response on the parts of the card that are not meant to be metal. Move your cursor close to the edge to see that.

Shimmer Band

To make it even more intense, I added a sweeping highlight band that slides left or right based on your cursor position. Blending it with overlay and rotating it slightly makes the whole card feel like light is responding more naturally to it, while focusing most of the reflections within the metal foil texture.

Spotlight Mask

The color was still pretty intense, so I added a simple mask-image made up of a radial gradient that constrains the composite of all the holographic effects to a spotlight region that follows your cursor. Now when you move the cursor around, it's as if you're tilting the card and catching just a reflection from a light source rather than the whole card glowing from within. This feels like the right combination of pseudo-realistic and visually interesting and fun.

### Adding Interaction

The Scratch

I used a hidden canvas to generate a CSS mask for the sticker. This is the fully composited layer with everything in it—everything that I want to be able to be scratched off. Now when you drag, you effectively punch a transparent circle into the white mask, which reveals what's already on the card underneath. Go ahead and try that now.

Custom Brushes

That's already pretty cool, but I really want to keep dialing this up and making it as best I can. So I decided to try out some custom brushes. These are simple SVG paths that I use as the brush shape to punch out the mask. They're scaled and rotated based on your X position to recreate a natural coin-scratch feel.

I went through a few different brush types, selecting one and trying it out on the right. Some felt a little too finicky, some a little too cartoonish. I settled on the second one—the right combination of something that felt more realistic than just a circle but not overly cartoonish.

Scratch Hint

Because this isn't something that's commonly done and because our foil visual is already kind of a lot, rather than adding text I wanted to add a simple animated hand icon with a looping animation that mirrors a scratch gesture. This tells you what to do and then exits as soon as you hover the card so that your real interaction can take over.

Spiral Reset

For my own purposes while testing, instead of just a quick instant reset, I wanted to have a spiral reset that acts as if the sticker is almost healing itself when you reset it to start over.

Adding Sound

To get it to what I might consider level 10, I of course wanted to add some sound. I worked with my friend Josh Dunsterville, who created some wonderful sounds for me. At first I was using just one, playing it as the user drags. I wanted to debounce it, so I track how many pixels have been dragged and fire the sound about once every 40 pixels. That helps it feel really tactile, but it also makes it feel somewhat static and unrealistic because it's just a single sound repeating.

Dynamic Sounds

Rather than one monotonous sound, we use three different scratch variations that cycle in round-robin order. Each has a slightly different timbre and pitch, so the audio feels much more organic as you scratch back and forth across the card. This is where I decided to stop and was pretty happy with the result. Hopefully, if you got to experience it, it brought a smile to your face. I had a lot of fun making it.

Continue Reading

---

# Creating the Library Card Designer

_URL: https://www.interfacecraft.dev/library/designing-library-cards_

←

## Creating the Library Card Designer

A behind-the-scenes look at various iterations I tried for the library card designer portion of Interface Craft's onboarding.

### Choosing Your Color

When I announced Interface Craft, users could reserve their membership by selecting a card. There were 16 different color combinations to choose from in an infinite grid, and users could sign their card. When I launched the Library a month later, I knew I wanted to create a more personalized way of designing your library card. One of those attributes was more expressiveness with color.

The Grid

I started with the most obvious approach: a simple grid of color swatches. Pretty efficient, but pretty boring. It's also very limited, and means I have to pick all the colors.

Full Color Picker

So what about a full color picker? This gives a lot more freedom, but it's almost too much. A user could easily select a color that just looks bad. I'm doing some basic color math to show a dark or light foreground color on the card contents, but it still provides a lot of room to make an ugly card. So that doesn't work.

Hue Slider

Next I thought about a more limited range selector, just hue. But saturation and lightness are fixed, so every color has the same intensity. Some hues look washed out.

Hue + Saturation

So then I added a saturation slider to allow for a little more fine tuning. But it's still both limiting and also lets you pick colors that just don't work.

At this point, I realized this path wasn't working. It's like trying to give someone an actual color picker, not just a nice and simple way to customize a color.

Card Carousel

I'd already selected a palette of foreground and background colors I liked. Something that worked well in the original onboarding was being able to see the colors on the cards themselves. So a carousel felt natural to try next.

CoverFlow

The carousel was working well, but it would feel better with a little 3D rotation — inspired by Apple's classic CoverFlow. That gives the carousel depth and makes the center card feel like the hero.

But when the rotated cards are spaced too closely, their edges intersect in 3D space. Drag the carousel slowly to see what I mean.

Dynamic Spacing

The fix is fairly simple: we need to increase the center gap so rotated cards never overlap in depth, and have the background cards use a more compressed spacing value. Now, even if you slowly drag and try to overlap the cards, they never quite touch.

Brilliance

This is now a pretty nice way to choose a color, but I still wanted to let users customize them further. I've chosen the major colors, but I wanted to give users fine-grained control in a way that always looks good.

Rather than reopening HSL, I created a single “brilliance” slider that shifts hue, saturation, and lightness along specific values.

The end result is you can make it feel darker or lighter, and I handle some subtle things to try and always make it feel good. So now you have a super simple control to choose from a lot of potential color values.

### Choosing Your Graphic

Another thing I wanted to let users customize was the graphic. Originally, I only had one, but I wanted to add another three generative figures to provide more expressiveness.

Graphic Previews

The first approach I tried was showing miniature previews of each graphic type as a control. This gives a clear picture of what you're choosing, but the thumbnails are too small to appreciate the detail and don't look great.

Shape Primitives

Next I tried more iconographic shape primitives. This feels much better and matches the overall visual language I'd already established.

### Customizing Your Pattern

Each graphic is generated by a set of parameters, and I wanted to let users customize those too. They use a wave function as the primary driver, so I wanted to let users change frequency, phase, and amplitude. Similar to color, I wanted to expose enough control to get interesting results without it being too overwhelming.

One Parameter

I started with just an amplitude slider. It's simple, but doesn't provide a diverse enough range of results.

Two Parameters

Next I added frequency to create more variety. It's more expressive, but now there are two independent sliders to coordinate.

Three Parameters

By adding phase offset, the graphics get super expressive, but the UI is now way, way too complicated. I wanted to do a similar thing with brilliance and try to consolidate all of these into a single control.

### The Lissajous Curve

What we need is a single slider that controls multiple values at once. Enter the Lissajous curve.

Curve Anatomy

A Lissajous curve is a figure-8-like path that folds back on itself. This means that even in a small area, the path expresses a huge variety of points and combinations if you take a value on its curve as the input into these two example functions. So if a control looks more like this, it provides a lot more variance than a linear slider.

Three Functions, One Slider

The challenge though is that I wanted to allow users to change values for three functions, not two. Allowing users to control frequency, phase offset, and amplitude would provide much more dynamic card visualizations. So I need a way of getting even more range out of the slider.

The Third Dimension

We can do that by projecting the curve into space. The 2D figure-8 is really a flattened version of a 3D shape. Pulling that third axis apart gives us another dimension to sample — exactly the room we need to pull all three values out at once with a large amount of range when we start to drive our three functions.

The Lissajous Curve

So with a little styling, here's what it looks like: a 2D figure-8 slider that effectively maps a point on the curve into 3D space behind the scenes. What I also love about this is that the control looks like the infinity symbol, hinting at the broad range of permutations available. It's fun to fidget with too, which was a key attribute I was going for in the onboarding.

The Mobile Problem

The Lissajous controller works beautifully on desktop, but on a phone screen it's cramped and doesn't leave room for the toolbar to advance in onboarding.

The Linear Mapping

So on mobile, I do the reverse: map a point on the 2D curve to a linear slider, so it still provides dynamic range, just in a simpler control. Less fun, but just as functional.

### The Complete Designer

Putting It All Together

So once we put it all together, we get the best of all worlds: a simple carousel to choose your major color, a single slider to fine-tune that, and then controls that provide a super dynamic range of graphic customization. But I think we can still simplify it further.

Compact Toolbar

By making the shape and color selectors inline, and moving the Lissajous curve to the top, the layout feels simpler overall. This is the version I ended up shipping.

### Looking Back

I hope this was an interesting look at all of the decisions and optimizations along the way of trying to provide a broad range of options to a user, presented in the simplest possible control set.

As a designer, you're always balancing competing constraints. In this case, it was a balance between providing powerful controls and keeping the interaction simple and fun.

I think it ended up in a pretty good place overall, and it was a fun excuse to invent a new kind of control that I've never seen before. Sometimes all you need is a little math and a little effort to make something great.

Continue Reading

---

