import os
import math
from PIL import Image, ImageDraw, ImageFilter

WIDTH = 1280
HEIGHT = 720

def create_gradient(draw, top_color, bottom_color, height=HEIGHT, width=WIDTH):
    for y in range(height):
        ratio = y / height
        r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_traveller(draw, x, y, scale=1.0, walking_phase=0.0, action='walk'):
    # Weathered dark cloak & travel clothes
    cloak_color = (32, 28, 25)
    hood_color = (42, 36, 32)
    boot_color = (20, 18, 16)
    pack_color = (55, 45, 36)
    
    # Scale dimensions
    h = int(140 * scale)
    w = int(45 * scale)
    
    # Legs / Boots
    leg_offset = math.sin(walking_phase) * 16 * scale if action == 'walk' else 0
    # Left leg
    draw.polygon([
        (x - 8*scale, y),
        (x - 14*scale - leg_offset, y + 60*scale),
        (x - 6*scale - leg_offset, y + 60*scale),
        (x - 2*scale, y)
    ], fill=cloak_color)
    # Right leg
    draw.polygon([
        (x + 2*scale, y),
        (x + 6*scale + leg_offset, y + 60*scale),
        (x + 14*scale + leg_offset, y + 60*scale),
        (x + 8*scale, y)
    ], fill=cloak_color)
    
    # Torso & Cloak
    draw.polygon([
        (x - 18*scale, y - 50*scale),
        (x + 18*scale, y - 50*scale),
        (x + 22*scale, y + 10*scale),
        (x - 22*scale, y + 10*scale)
    ], fill=cloak_color)
    
    # Expedition Backpack
    draw.rounded_rectangle([
        x - 15*scale, y - 48*scale,
        x + 15*scale, y - 10*scale
    ], radius=int(6*scale), fill=pack_color)
    
    # Bedroll on top
    draw.rounded_rectangle([
        x - 18*scale, y - 56*scale,
        x + 18*scale, y - 46*scale
    ], radius=int(4*scale), fill=(65, 52, 40))
    
    # Hooded Head
    draw.ellipse([
        x - 12*scale, y - 72*scale,
        x + 12*scale, y - 48*scale
    ], fill=hood_color)

# Generate Scene 1: Desert Sequence
print("Generating Scene 1: Desert...")
os.makedirs("public/cinematic/seq-desert", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Sky: Warm golden sandstorm sky
    create_gradient(d, (200, 145, 90), (235, 185, 130), int(HEIGHT * 0.65))
    
    # Distant dunes
    d.polygon([(0, 420), (350, 360), (800, 440), (1280, 380), (1280, 720), (0, 720)], fill=(185, 125, 75))
    # Midground dunes
    d.polygon([(0, 490), (500, 440), (950, 520), (1280, 470), (1280, 720), (0, 720)], fill=(165, 105, 60))
    
    # Ancient Carved Stone Node.js Monument (approaching as p increases)
    mon_w = int(140 + p * 120)
    mon_h = int(220 + p * 160)
    mon_x = int(WIDTH * 0.5)
    mon_y = int(HEIGHT * 0.52 - p * 20)
    
    # Monolith shadow
    d.ellipse([mon_x - mon_w, mon_y + mon_h - 20, mon_x + mon_w, mon_y + mon_h + 30], fill=(110, 70, 40))
    
    # Weathered basalt hexagonal monolith
    d.polygon([
        (mon_x - mon_w//2, mon_y),
        (mon_x + mon_w//2, mon_y),
        (mon_x + mon_w//2 + 30, mon_y + mon_h),
        (mon_x - mon_w//2 - 30, mon_y + mon_h)
    ], fill=(68, 56, 46))
    
    # Embedded Node.js green hexagon relief glyph
    hex_r = int(35 + p * 28)
    h_cy = mon_y + mon_h // 2
    points = []
    for k in range(6):
        angle = math.pi / 3 * k + math.pi/6
        px = mon_x + int(hex_r * math.cos(angle))
        py = h_cy + int(hex_r * math.sin(angle))
        points.append((px, py))
    d.polygon(points, fill=(45, 95, 40), outline=(85, 165, 70), width=int(3 + p*2))
    
    # Foreground dune
    d.polygon([(0, 560), (600, 520), (1280, 580), (1280, 720), (0, 720)], fill=(145, 88, 48))
    
    # Footprints in sand
    for fp in range(8):
        fpy = 560 + fp * 18
        fpx = WIDTH * 0.5 + math.sin(fp) * 20
        d.ellipse([fpx - 6, fpy - 2, fpx + 6, fpy + 2], fill=(115, 65, 35))
        
    # Lone Traveller moving towards monument
    traveller_scale = 0.55 + p * 0.35
    traveller_y = int(580 + p * 40)
    draw_traveller(d, WIDTH * 0.5, traveller_y, scale=traveller_scale, walking_phase=i * 1.2)
    
    img.save(f"public/cinematic/seq-desert/frame_{i:02d}.jpg", quality=88)

print("Scene 1 completed.")
