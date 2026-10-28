"""Generate the app icons from a single, scalable drawing.

Run with Python and Pillow after changing the artwork below.
The artwork stays within the central 80% for maskable app icons.
"""

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public" / "icons"
SCALE = 4
SIZE = 512


def box(coords):
    return tuple(round(value * SCALE) for value in coords)


def line(draw, points, fill, width):
    points = [tuple(round(value * SCALE) for value in point) for point in points]
    draw.line(points, fill=fill, width=width * SCALE, joint="curve")
    radius = width * SCALE / 2
    for x, y in (points[0], points[-1]):
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=fill)


def main():
    canvas = Image.new("RGB", (SIZE * SCALE, SIZE * SCALE), "#286b59")
    draw = ImageDraw.Draw(canvas)

    # A checklist, echoing the mark in the site's header.
    draw.rounded_rectangle(box((132, 125, 380, 389)), radius=27 * SCALE, fill="#fffefa")
    draw.rounded_rectangle(box((205, 109, 307, 151)), radius=16 * SCALE, fill="#b9d9c4")
    draw.rounded_rectangle(box((216, 117, 296, 142)), radius=10 * SCALE, fill="#286b59")
    line(draw, [(169, 207), (187, 225), (219, 188)], "#286b59", 12)
    line(draw, [(242, 210), (332, 210)], "#a9cbb7", 11)
    line(draw, [(170, 270), (332, 270)], "#c9ddce", 11)
    line(draw, [(170, 319), (292, 319)], "#c9ddce", 11)

    OUTPUT.mkdir(parents=True, exist_ok=True)
    for size in (32, 180, 192, 512):
        icon = canvas.resize((size, size), Image.Resampling.LANCZOS)
        icon.save(OUTPUT / f"icon-{size}.png", optimize=True)


if __name__ == "__main__":
    main()
