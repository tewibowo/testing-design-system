# Working Knowledge

> A collection of principles and frameworks to help guide design decisions, iterate with intention, and consistently raise the bar for quality in your work.

_Source: interfacecraft.dev/library — collection: working-knowledge_

---

# Noticing

_URL: https://www.interfacecraft.dev/library/noticing_  
_(Contains 1 embedded video demonstration)_

One of the most important skills you can develop is your ability to notice. It's one thing to feel that something looks nice, or that it's not quite right. But it's another thing entirely to recognize why.

### Learning to notice

There's a well known fable on observation about Louis Agassiz, the 19th century naturalist who taught at Harvard.

He gave one of his students a sunfish, and told him to write down everything he noticed. The student looked intently, writing down everything he saw for an hour until he felt confident he had accurately captured it all.

Agassiz would listen as he reported back, and said simply "keep looking." This went on for days, exhausting the student. But as they spent more time noticing, more subtleties in the structure of the scales, the fins, and the teeth emerged. Things that they previously had just ignored or overlooked.

Finally, after a week of this, the student had prepared a detailed report that astonished Agassiz.

This lesson obviously isn't about fish. It's that our first reaction when we see something is almost always shallow. We see the obvious, and move on. But noticing is a practice of truly considering, and learning to stay with it just a little bit longer.

### Reactions as data

When you notice something, it's a chance to build your intuition and taste. What you see is valuable information. That's why it's important to try a lot of things, whether creating or consuming, and notice your reactions to them.

Chef William Bradley, founder of Addison, a 3 Star Michelin restaurant in San Diego, gave me one great example of noticing at the highest level of craft in fine dining.

For his signature dish, Eggs & Rice, he tried plating it on dozens of pieces until finally finding the vessel that felt just right. This dish is incredibly comforting, light, and warm. The plates or bowls they were trying didn't have enough contrast to ground it. They finally discovered this stone piece, somewhere between a bowl and a plate. It's very heavy—weighing almost 10lbs—yet feels soft to the touch with fully rounded over curves.

The perfect complement to the dish.

![Eggs & Rice dish at Addison in its carefully chosen vessel](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fnoticing%2F469489554_18371902429115308_5866430472389359442_n.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Nicolás, founding designer of Vercel, noticed that the corner radius was off on the Mail app window in Apple's latest WWDC.

![Mail app window showing misaligned corner radius](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fnoticing%2FGtBYDqta0AAE0Fc.png&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Joseph Alessio noticed that the gradient on Apple Card is semantically dynamic in relation to your spending categories:

![Apple Card showing dynamic gradient based on viewing angle](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fnoticing%2Fapplecard.png&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

I noticed that something was just a little off in the animation origin of Vercel's analytics page:

### What to notice

- Moments of hesitation — What caused it? Uncertainty about consequences? Lack of trust? Something else?
- Expectation gaps — Where did your mental model break? What did you assume would happen, and why? What would have met your expectation?
- Emotional shifts — Why are you suddenly annoyed at this product? What was the moment of the shift? What triggered it? Why did you smile?
- When something's missing — What were you looking for? What's missing? Does it matter?
- What's being assumed — What is this interface assuming? What's being hidden, and what's being surfaced? Why those choices?
- How it looks to you — Does this look cheap, or crafted? Does the typography feel just right, or a little hard to read? Are the colors working together or fighting? Is there a clear hierarchy, or does everything compete for attention?
- How it makes you feel — Does this feel fast or sluggish? Does it respond the way you expect, or is there a subtle disconnect? Does this feel durable, or are you worried about breaking it?

### Building the habit

Noticing is a muscle. It may be weak at first, but the more you practice it the stronger it gets. Eventually, you'll realize you're noticing things you never would have seen before.

So here's your exercise: find something you use regularly, like an app, a website, or a physical product, and spend ten minutes using it and just noticing. Write down what you find. Be specific. Don't just say "it feels nice" or "the design is clean." Actually write down why.

Head over to the walkthroughs in the Practical Demonstrations collection to see the types of things I notice.

---

# Conceptual Range

_URL: https://www.interfacecraft.dev/library/conceptual-range_

When working on any idea or problem, it's likely that you have an initial instinct as to the solution. Something that feels obvious, or a place to start. This is very often a helpful instinct, but I have found that in most cases, it's useful to consider a wide range of solutions as well. This is known as conceptual range.

### Dangers of early commitment

Imagine that you're designing an interface to allow users to back up photos on their phone. My first idea would probably be something along the lines of "Let's make it easy for them to quickly select photos to backup... maybe we give them a modality to tap and select photos… we could probably make that better by letting them drag over multiple photos to select them, or even group photos by time and let them tap to select all the photos for a given day or week..."

That thought process immediately starts going down the path of optimizing a single idea based on an assumption: we need users to manually select photos they want to backup.

And while I might be able to design the best interface in the world for that, a simple question reveals the obvious flaw in that path: why do we need users to do anything at all?

A wildly different solution is much better: we should let users automatically backup all of their photos. No interface needed.

### What breadth actually looks like

It can be tempting to think that any variant of an idea is providing you with a viable alternative to evaluate. But it's important to try things that fundamentally alter the core concept.

Here's an example: these interfaces represent different inputs to enter a tip amount. But they're all just variations of the same idea: a numpad. They show some conceptual depth, but not range.

By contrast, here are three directions that are structurally different.

They are answers to questions like "What if we had preset options?", "What if we made it a slider?", and "What if we gamified tipping?"

You probably have some visceral reactions to one or more of these ideas. Or this spawns other ideas. These are wildly different, and each have different pros and cons we could evaluate, but it gives us some true breadth to consider.

### How to push past the obvious

You'll often find that the first idea or two come easily. They're often things you've made or seen before. And that's fine, but in many instances the best solution isn't the obvious one. These are some ways to broaden your range.

- Remove (or add!) a constraint. What if this didn't need to be a screen? What if it happened automatically? Temporarily ignoring real constraints helps you find ideas you can then adapt back to reality.
- Blend from other domains. How would this work if it was a game? What if this was a real product? What would this look like if Muji made it?
- Invert the problem. Instead of helping users find what they want, what if you helped them eliminate what they don't want? Flipping the problem often reveals a whole new solution space.
- Set an arbitrary range. Sometimes forcing yourself to come up with 5 or 12 or 20 ideas is a great way to quickly expand the range of possibility.
- Optimizing for facets. Use the facets of quality to guide concepts. What if this was 10/10 on durable? Or on differentiation? Or on desirability?

A great example of really pushing on range is from Devin Jacoviello and Pablo Delcan and their work on the cover for Stewart Brand's Maintenance of Everything. They show an exceptional amount of breadth in initial conceptual directions that the cover might take. I spotted 15 in total. They then  to refine the chosen direction.

![Rulers & Measurement](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F01_Rulers_Measurement.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Rulers & Measurement

![Kintsugi, Pure](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F02_Kintsugi_Pure.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Kintsugi, Pure

![Kintsugi, Single Object](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F03_Kintsugi_Single_Object.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Kintsugi, Single Object

![WD-40](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F04_WD40.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

WD-40

![Icon Grid](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F05_Icon_Grid.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Icon Grid

![Passport, Minimal](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F06_Passport_Minimal.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Passport, Minimal

![Manifesto Text](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F07_Manifesto_Text.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Manifesto Text

![Yellow Watermark](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F08_Yellow_Watermark.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Yellow Watermark

![Table of Contents](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F09_Table_of_Contents.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Table of Contents

![Vintage Catalog](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F10_Vintage_Catalog.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Vintage Catalog

![Pop Art](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F11_Pop_Art.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Pop Art

![Photo Stickers](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F12_Photo_Stickers.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Photo Stickers

![Snap-Off Model Kit](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F13_Snap_Off_Model_Kit.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Snap-Off Model Kit

![Kintsugi, Photo Collage](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F14_Kintsugi_Photo_Collage.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Kintsugi, Photo Collage

![Kintsugi, Drawings](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2F15_Kintsugi_Drawings.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Kintsugi, Drawings

### Breadth as a hedge against taste

A less obvious reason to continually practice expanding your conceptual range is that your taste is limited by what you've seen. When you go straight to depth on an idea you're familiar with, or confident would be a good solution, you rob yourself of the chance to explore things you wouldn't ordinarily try.

Heston Blumenthal, chef of The Fat Duck, has a famous dessert, 'Scrambled Egg and Bacon Ice Cream'. Those are not typical pairings you'd think of to close a fine dining meal, but by exploring an extremely broad range of concepts, he was able to create a landmark dish.

![Heston Blumenthal's Scrambled Egg and Bacon Ice Cream](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-range%2Fbacon-ice-cream.jpg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

---

# Conceptual Depth

_URL: https://www.interfacecraft.dev/library/conceptual-depth_

You've explored the range of possibilities, and you've landed on a direction. Now it's time to refine. And this is where I often see people stall. They pick a concept, do one or two passes, and call it done and move on.

But the difference between fine work and great work is rarely the initial idea. It's how far that idea gets pushed and refined.

Conceptual depth is the practice of taking an idea and relentlessly iterating through progressive levels of quality to see how great you can make it.

### The spectrum

I like to think of any idea or concept as existing on an imaginary spectrum from 1 to 10. This is of course an arbitrary range, but it's useful as a starting point. Level 1 might be the default, or the absolute minimum. Something that exists, technically works, but represents a first draft. Level 10 would be the best version you can possibly imagine.

At the scope of an entire feature area or product, it might be actually impossible to hit. But it's the version where absolutely everything has been considered, tried, edited, and improved until it couldn't possibly be any better. If your goal is to create something truly great, that should be your bar.

This is a simple demo (play with it!) for a single component. It shows what I might do as the first few levels to try and push past a default industry standard.

Most work tends to ship somewhere between levels 1-3. Not because that's all that was possible, but because it's easy to stop pushing. You have to care and put in the effort to go beyond the first couple steps.

### The nature of the journey

Moving deeper along the spectrum requires a different kind of mindset at different stages.

The early levels are about fixing the obvious problems, addressing any gaps or parts that don't work yet. You're resolving edge cases and what's in front of you.

The later levels are about discovery and invention. You're no longer fixing, and it's no longer always clear what might make it better. But you're pushing to see what's possible. Breakthroughs here can be unexpected, or sometimes come out of nowhere. Other times it's just maniacally forcing yourself to refine, reduce, and hack away at the unessential. You're trying to either make the very best version of a thing, or find the limit and know you should reevaluate your options.

The cover for Maintenance: Of Everything is yet again a great example. After choosing the final conceptual direction, Devin and Pablo iterated more than 70 times until arriving at the final cover, a truly world-class example of refinement.

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-035.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-036.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-040.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-041.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-044.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-045.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-056.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-057.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-058.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-059.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-060.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-061.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-062.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-063.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-064.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-065.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-066.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-067.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-068.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-069.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-070.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-071.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-072.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-075.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-076.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-077.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-078.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-079.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-080.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-081.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-082.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-083.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-084.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-085.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-086.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-087.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-088.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-089.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-090.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-091.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-092.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-093.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-094.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-095.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-096.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-097.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-098.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-099.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-100.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-101.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-102.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-103.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-104.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-105.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-106.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-107.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-108.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-109.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-110.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-111.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-112.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-113.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-114.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-115.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-116.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-117.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-118.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-119.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

![image](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fframe-120.jpg&w=640&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Another great example is Andy Allen, who designed the world's most satisfying checkbox. His writeup on the process is worth a read.

![Andy Allen's 'most satisfying checkbox' - a beautifully crafted checkbox interaction](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Fconceptual-depth%2Fcheckbox.png&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

### Tactical steps

Here are some ways to push further when you're not sure what better looks like:

- Zoom in. Pick one thing and give it all your attention. What would it look like if this was world class? If this was the only thing?
- Remove something. Take away what's not working. Did you actually need it?
- Name what isn't working. Even if you don't know how to fix it, try to articulate the problem. Rubber duck it.
- Reference the best. Find exceptional, world class examples. Notice them. Let them reveal gaps.
- Generate more. Sometimes you'll find that there is no easier way to improve than to simply create more. Now you have more information and can select.
- Critique. Critique it yourself, or get a teammate, friend, or internet stranger. Consider your facets of quality.

### Takeaway

A practice of exploring conceptual depth is recognizing that most work stops far before it realizes its potential. The simple mental model of a spectrum is a useful tool to keep in mind to ask yourself: how far can I take this? What would the next level look like? And the discipline of this practice is simple: pick a direction, an idea, a thing, and push it as far as it can go. Spend more time than you think necessary, then marvel at the results.

---

# Live Tuning

_URL: https://www.interfacecraft.dev/library/live-tuning_  
_(Contains 2 embedded video demonstrations)_

This is an idea that I hope changes the way you design interfaces and products forever. It's simple, but endlessly powerful.

You're probably used to designing by tweaking values in a drawing tool, or maybe in code. When you need to make a small change, you save it, look at it, fiddle around some more, and then refresh and change it again. And if you're doing this in a tool like Figma, you're doing it absent from reality.

It's slow, and more importantly and you lose the direct connection to what you're actually trying to feel.

### The big idea

Live tuning, which I also sometimes refer to as parametric visualization, means exposing the value of key parameters so you can adjust them in real time and feel the difference instantly.

Duration, easing, spacing, shadows, blurs, position, scale; whatever you're trying to dial in, make it adjustable on the fly.

### Taking it further

Feeling the difference between values instantly helps you build intuition faster and know when something is in a good spot. But you can also leverage this idea to instantly find combinations you never would have landed on by guessing or iterating one by one.

In this example, I had dialed in a specific permutation of a generative graphic for a collection card. But I wanted to see a bunch of alternatives to expand the depth of my explorations. So in my graphic playground I gave Claude a simple prompt:

### Get started

To get started, try using this simple prompt and have v0 or Claude create a customization panel for you.

### DialKit

I use this idea constantly, so I created a simple library called  that gives you an instantly beautiful, useful, and powerful parameter tuning panel for anything. I show some ways I use it in the Collaborating with AI Collection.

---

# Uncommon Care

_URL: https://www.interfacecraft.dev/library/uncommon-care_  
_(Contains 3 embedded video demonstrations)_

The difference between good work and great work often just comes down to one question: how much did the creator care about this? Talent and time are of course important, but the willingness to go further than expected, to spend more time than most might feel is reasonable; that's what I call uncommon care. I think it's one of the most important ideas to internalize.

### People notice

It's easy to consider the obvious places to devote care: the core feature of a product, the marketing website for a new brand, the central bar of a restaurant concept. But I think that true care shows up in the places most people overlook.

The edge cases. The error states. The conditions only a few customers might ever see. Of course you should devote care to the obvious, but often what people really feel, what they remember and tell all of their friends about, are the moments when someone just went further than they had to.

In the 1970s, the Porsche 928 had a clutch pedal that spelled out '928' in the tread pattern. People remember this detail, the clever fun it represents, and the fact that today, that level of intention just seems rare.

![Porsche 928 clutch pedal with '928' tread pattern](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Funcommon-care%2Fporschepedal.jpeg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

Here's another example: Daniel Kuntz is building a fun hardware toy, Little Guy. The screws that hold it together? Custom made, with the screw head holes forming the company logo. A brilliant little detail.

![Little Guy hardware toy showing custom screws](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Funcommon-care%2Flilguy1.jpeg&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

These kinds of choices aren't found in a PRD. They're not always features per se. But I think of them as breadcrumbs, evidence that lets you know you're using a product that was made by someone who deeply cared.

### Leaning into humanity

I believe that AI is one of those rare opportunities where a new technology gives us immense leverage over the work we do. It results in, often, being able to accomplish something in less time than it previously would have.

And so we must ask: do we simply fill it with even more pedestrian work? Or do we take that time to pour more of ourselves into what we create?

Before I launched Interface Craft, I knew I wanted to make the purchase experience special (in part because no content was available yet!).

I'm fairly happy with what I created, but what I am most proud of was the opportunity to make it truly special for past colleagues, mentors, and friends who might sign up.

I wrote 100 personalized notes they would see before selecting their library card. Most of them probably never saw it. Maybe a couple dozen did. But it brought me joy to write them, and I wanted them to feel seen, known, and appreciated if they happened to sign up.

A minor challenge with this was how to deliver the right note to the right person. I was hesitant to fuzzy match based on name in case for example two Jason Frieds signed up. So I matched it to the email I had for them.

Dave noticed this on X and remarked 'the most thoughtful and respectful thing he's ever seen.' Now I don't think it's quite deserving of that, but that's exactly the idea.

This is what we can do with the time our tools and leverage afford us: lean into authenticity, and the parts of an experience that can't be generated.

### Why it matters now

Anyone can now generate something quickly. As AI improves, and makes it trivial to produce passable work, the bar for 'good enough' is collapsing. But I have never been interested in making something that's good enough, and I hope you haven't either.

The way to stand out is to go beyond good enough. To create something that makes people feel something, to go "Oh my word, how did they do that?!"

That is the work that requires time, effort, and care. It can't be automated.

### Going above and beyond

Demonstrating that you care—really, deeply care—isn't always about adding bells and whistles. It's often just taking the extra time to do the right thing, or redo it when you notice it's not good enough.

Immediately on release, some members of Interface Craft emailed requesting invoices for tax purposes. I absolutely could have just gone to Stripe and made some PDFs to send them, but that felt like a bad experience for both parties. They'd have to ask for it, and I'd have to do it.

So I took an hour instead and built a self-serve experience. After signup, you were able to download an invoice if you want, and add the information needed.

I soon added Purchasing Power Parity to make membership more accessible everywhere. I didn't get a chance to do this for launch, and a few dozen folks had already purchased from countries that were PPP eligible.

It would have been easy to just say "Sorry, that's how it goes." Instead, I found all those users and automatically refunded them all.

Because I have an entire collection on Collaborating with AI, it was important to me that everyone could actually use the latest AI tools, not just those who can afford a Claude Max plan or v0 Pro indefinitely. That's why I reached out to folks I knew at Vercel and Anthropic to work with them and guarantee that every single founding member received at least one month of pro.

That has nothing to do with an interface. But it has everything to do with the experience of my customers, and using this entire process as a way to try and show the principles I aim to teach.

And that's where I think care lives most of all: in the places you could have simply skipped, the problems that are probably fine if you ignore, and the effort that no one would have blamed you for not making.

If there is a single thing you take away from this, I hope it's internalizing the importance and ability to practice uncommon care, as much as you can, in all that you do.

### Prompts

- Where are you stopping at good enough? What would it look like to push beyond?
- What's the skeleton in the closet of what you're working on? The thing everyone knows is broken but haven't fixed yet?
- Where are you limiting yourself because it feels uncomfortable to lean in?

---

# Separation of Concerns

_URL: https://www.interfacecraft.dev/library/separation-of-concerns_  
_(Contains 1 embedded video demonstration)_

It's tempting, especially with AI tools, to try and work on everything at once. Just write a single prompt, and boom: high fidelity fully interactive prototype.

Sometimes that can be the way to go, but more often than not I've found that trying to solve everything simultaneously leads to slower progress, myopic rabbit holes, and a compounding frustration due to rework.

Slow is smooth, and smooth is fast. I have found it often better to take just a little bit of time to plan, think, and then act with intention.

### The design process

Jenny Wen recently gave a fantastic talk on how the design process that many came to accept as the norm, especially in the last decade or so, no longer serves us and needs to change. It's what I like to call a "medium spicy take", and I largely agree with her conclusion. Go watch the first 3 minutes, and then come back (and make sure to find some time to watch the whole thing).

Even as our tools and process changes, I still find value in applying a level of intention to what I'm working on, and specifically to continually be evaluating and separating areas of concern.

And sometimes, that might even look dangerously close to 'a wireframe'.

### In practice

Let's say I'm trying to just build confidence in an interaction, like what's on the homepage for Interface Craft.

Do I need to fully design each of the cards, and have the complete generative artwork done and animated? Definitely not. In a lot of ways, it's a complete waste of time to do that. I often start things out fast and loose, with a key question or two on my mind.

In this case, I just wanted to know: is this direction worth pursuing? Will it feel as good as I am imagining? Or, should I expand my range and explore another approach? To answer that, all I need is a breakable toy.

I did choose this direction, and obviously then spent a great deal of time in dialing in the details and refining the visual design of the cards, the interaction further, and the graphics themselves. But I only did that once I knew it was necessary.

Use this prompt to create the prototype above.

### A note on fidelity and collaboration

When you are working with others, it's critical to work at a layer of fidelity that's conducive to that audience and the decision at hand.

You need to show artifacts that are appropriate and enable everyone to see and feel what you are seeing and feeling. Sometimes that simply can be whiteboard sketches, but other times yes, it requires going all the way and producing something at a shippable level of fidelity.

The point isn't always to be working roughly at first, it's simply to be intentional about what you're trying to resolve, and modulate the output appropriately.

### Intentionality

A useful way to think about this is: before you dive in, mentally remind yourself what concern you're trying to resolve or question you're trying to answer. Then, use the right tool or format, and go as far as needed to do that. The example in  shows exactly what I mean.

Practicing this orientation—being mindful about what you're actually trying to achieve in any moment—will help you cover more of the right ground. Everything you have seen in this Library (at launch), from the website, purchase experience, to the content and tools themselves, was created in the span of just over 4 weeks from mid January to early February, 2026. Exclusively on nights and weekends.

While I've been thinking about design and teaching for years, and practicing it nearly my entire life, I was able to explore, create, and refine so much because I was applying maximum effort along with continual intentionality.

While more time would certainly bring improvements, you can achieve a remarkable level of quality and impact by just being rigorously thoughtful in everything you do.

Working in this way will let you build confidence quickly. You'll be able to explore a broad range and deep depth because you're not wasting your time and energy. Ultimately, it's how you get further, faster.

---

# Facets of Quality

_URL: https://www.interfacecraft.dev/library/facets-of-quality_

How do you know what you're designing is good? Like, actually good.

Not just functionally complete, or you like the way it looks or feels to you, but good in the way that you want it to be perceived by others? And perhaps more importantly, how do you actually manage that over time? How do you know when some area needs more attention than others? How do you do this when collaborating with a broader team? How do you handle these tradeoffs?

I find these questions to be both extremely important and also impossible to answer without some kind of framework.

### Defining your facets

One way of answering these kinds of questions is to consider the specific attributes, or facets, of quality that matter most for whatever you are making. These aren't general things that all products should have, like "usefulness" or "intuitiveness" or "reliability", but specifics that are situationally dependent.

They should be the external characteristics you want your users perceive; that is, what they see, experience, feel when they use your product.

For Interface Craft, I defined and worked against these facets:

- Crafted. I want this to feel like it is a well-made product by someone who has spent their life honing their trade. Not just visually polished or with nice interactions, but considered and created with care.
- Fidgetable. I want this to feel fun, interactive, and playful. Almost physical, something you can mess around with.
- Authentic. I want this to feel like both a true expression of me, and representative of a genuine care for design and humanity. It should feel made with love.
- Expansive. I want this to feel substantial, and like a living body of work that will accumulate in breadth, depth, and value over time.
- Inventive. I want this to feel novel. Something different. Something you have never seen before, in a way that inspires.

If you sit down and consider what you want your users to perceive, it's likely a very different list. Maybe there's some overlap, but it probably varies widely. Coming to a point of view on these is the first step towards developing a framework you can use.

### Putting them to use

Once you have your facets, you can visualize them in a simple radar chart. The scale is arbitrary. Typically, I find 1-5 easiest. 1 is the absolute minimum you can live with, and 5 is the absolute best you can imagine. I've seen people use 1-10 just as well. What's important is you know what the ends are, and you have a framework you or your team can point at and agree on when evaluating.

Now we have something concrete. Here's my evaluation for the initial release (Feb 10th, 2026):

This evaluation might surprise you. Maybe you agree with it, or maybe you'd rate things differently. What matters though is that to me, as the designer of this, I now have a guide for the next release. I know exactly what I need and want to work on.

You can push this framework further by stack ranking them. For example, if I thought "Expansive" was the most important, I would not release it if my current evaluation was a 1.5.

This works whether or not you are on a team or working solo. It helps get everyone aligned on what quality means for you, and creates a shared language you can use to talk about it.

### Structure for critique and planning

Facets also give you a more precise way of giving feedback. They don't fully capture every concern you have when designing (e.g. again, things like 'consistent' 'well built' are constants), but instead of saying "Hmm, this doesn't feel quite right. It needs more work" you can say "This is nice, but it doesn't feel inventive enough. If we think we're already at a 4, this feels like we're going backwards."

Measuring your facets over time is also a useful planning tool. When I think of how I want to update the Library next, it's largely going to be about increasing the range and depth of resources so I can move my rating on Expansiveness up.

Here's what I'd like my evaluation to look like then:

### Takeaway

Good software, or good anything really, doesn't just happen by accident. It comes from being intentional about what you're optimizing for and then deliberately working toward that end. Facets of quality are just another tool to help you do exactly that.

Define what matters, evaluate them rigorously, and improve them with relentless iteration.

---

# Less, but Better

_URL: https://www.interfacecraft.dev/library/less-but-better_  
_(Contains 1 embedded video demonstration)_

This is one of many great principles from Dieter Rams. It's a reminder to continually fight the tendency to add more. More features, more scope, more flourish. It's far easier to simply design less, then refine and iterate until it's great.

> "It is not daily increase but daily decrease, hack away the unessential."— Bruce Lee

The scope for the Interface Craft pre-launch website is a good example. It's a single page, with two typefaces, three sizes, two neutral colors, and one button. The hero graphic is a set of cards, each with an animated graphic, and a simple background and foreground color. And one simple, key interaction.

That's it. I chose to do as little as possible, but execute it to an incredibly high bar to test the waters for demand. And it turned out to be incredibly effective. Had I added more, or tried to rush in examples of content or other supporting materials, I'm confident it wouldn't have had half the impact it did.

---

# Recreate Everything

_URL: https://www.interfacecraft.dev/library/recreate-everything_  
_(Contains 4 embedded video demonstrations)_

There are no shortcuts to learning. And I think the best way to learn anything is to just do it.

You can read as many books or articles as you want, watch as many videos, look at references and inspiration, but if you actually want to learn, you simply have to make a bunch of stuff. Try, fail, learn, and repeat. That's it.

I follow a simple rule toward this end: anything I see that inspires me, or makes me ask myself "Hmm, I wonder how they did that?", I try to recreate it. Ideally as soon as possible, while I still have that spark of curiosity.

### The Weight of Paper

Marijana Pavlinić has a beautiful project on her site called The Weight of Paper. It's an homage to her grandfather and his stamp collection, and it's just lovely. You should check it out.

But what caught my attention was a tiny little interaction when you click Give Feedback. This beautiful postcard appears that you can write your message on, but more importantly, it appears and disappears with a nice little genie-like transition, reminiscent of macOS.

But I hadn't seen it on the web before. I realized I had no idea how to do that. So I immediately spun up a little playground, thought about it, and started prompting.

### Demonstration

This is where having some general awareness of technologies is useful. Three.JS is a popular 3D and animation library. My instinct is that we could use some part of this here, but I have no idea what exactly. Other than that though, there's no special knowledge here, just observation. Here are the raw prompts I gave Claude Code.

My first was simple:

Alright, exactly as expected. Now let's have it shrink a bit.

Nice, getting a lot closer. But it doesn't feel organic, with nice curves as if the bottom is getting sucked in. Let's try and fix.

And there we go. I had scratched my itch and felt like I knew enough to stop there. Where I ended up is super rough. It's not polished, and looks nowhere near as good as Marijana's. But that's ok. I was being conscious of what I wanted to learn (see ), and accomplished that in just a few minutes. And now I have a new tool in my toolbelt.

### Bias towards doing

This mindset has served me well my entire career. Throughout this Library, you're going to encounter interactions that catch your eye. Things you maybe don't know how to do or create.

But I want you to try. Don't just be inspired, actually try and make it. Share it. People will love to see it and then themselves be inspired.

That's the best way to learn. I hope you start doing it continually.

---

# Industry Standards

_URL: https://www.interfacecraft.dev/library/industry-standards_  
_(Contains 1 embedded video demonstration)_

The apps we all use everyday form our expectations for what the standard for 'good' is for the majority of users. Instagram, Notion, TikTok, iOS, Linear, Figma, YouTube, Telegram, and all the other apps being used daily by millions of all contribute to the broad mental model for what software should look like, feel like, and work like. The average of this becomes an invisible bar that I often refer to as the industry standard.

### Hard truths

No one really tells you this, but if your product or website or service doesn't meet the bar, people will immediately discount it. They'll assume it's poorly designed, probably poorly made, and they won't give you the time of day and won't tell you why, either.

This applies everywhere. If you're a designer showing portfolio work, recruiters and hiring managers are screening it, at minimum, against that bar. If you're presenting a prototype to stakeholders, they're implicitly comparing it to everything they use. If you just shipped an MVP and wonder why your sales demos aren't converting, this is often the answer.

It's not that the idea or core of the product is necessarily bad, but it's that the execution doesn't meet the baseline standard that people have come to expect from internalizing years of using well-designed software.

### Platform standards

Thankfully, platforms like iOS have formalized what they consider to be well designed and built apps. They provide the Human Interface Guidelines, standardized APIs, system components, and more, all with the goal of helping developers create apps that look good, feel great, and seem like they belong on the platform.

The web is a bit messier; there is no centralized operator that is managing the walled garden, but the standard still exists, set by popular websites and tools everyone uses daily.

### So where's the bar?

Below are 6 interfaces from different financial iOS apps. They all show essentially the same thing: a detail view of an asset.

Drag to arrange them from worst to best, and put the bar where you feel it should be. Don't worry, there's no right or wrong order.

![A](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Findustry-standards%2Fapp-1.png&w=1080&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

The point isn't that your ranking or mine is correct, but it's to consider that everyone has some notion of where the bar is, and to start to develop an awareness of where that might be, generally.

I want to be clear here: when I am referring to this bar or industry standard, I am not saying that is the goal that you should aspire to. I am saying that is the floor that users expect, and ideally you are going well beyond it. But in order to do that, you need to know where it is.

### Default, then innovate

One of the simplest pieces of advice I often give is: start with how iOS would design it. And then improve. (The same could be true for the web, consider what the default shadcn app with tailwind would be, then improve). Avoid starting entirely from scratch or a blank page; it's much harder to do.

Family is, to me, the best example of this. If you see it and use it, it looks almost like an app that Apple might make. It feels incredibly good to use. It's just wonderful. Benji, the designer and founder, has written at length about Family Values. It's worth a deep read.

To me, what makes Family great is that they took iOS defaults, things like tableviews or view transitions, clearly showed a great respect for platform standards and familiarity, but went beyond and innovated on every single aspect. It's the platonic ideal of what a fintech app on iOS should be.

Raycast is another example. It's a Mac app that feels completely native, like it belongs. But everything about it ranges from a little bit to a lot better than Spotlight, Apple's native version of the same tool. They respected the platform, and exceeded it.

![Raycast app interface](https://www.interfacecraft.dev/_next/image?url=%2Flibrary%2Findustry-standards%2Fraycast.png&w=3840&q=75&dpl=dpl_43AnEUFh3BWtSZYyM4CgxXsrUPVh)

### Takeaway

So that's as close to a shortcut as you'll find in design: start with the defaults. Understand the standards, and then try to innovate or improve. Don't just start from scratch and then end up far below what everyone expects. You'll be left wondering why no one thinks what you made is any good.

---

