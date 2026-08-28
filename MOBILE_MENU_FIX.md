# Mobile Menu Fix

The mobile menu was rebuilt to remove two fragile behaviours from the previous version:

1. The full-screen fixed menu was nested inside a sticky element using backdrop filtering. Fixed descendants can behave unexpectedly when an ancestor creates a containing block.
2. The hidden menu remained mounted with `inert` and opacity/pointer-event toggles.

The new implementation:
- renders the menu as a sibling of the sticky header
- mounts it only while open
- locks body scrolling while open
- focuses the close button on open
- supports Escape to close
- traps keyboard focus inside the dialog
- returns focus to the previous control after close
- uses `min-h-dvh` and safe-area padding for mobile browsers
- closes on every internal navigation link

Test at 320px, 360px, 390px, 430px, tablet portrait and tablet landscape before launch.
