import os
import math
from PIL import Image, ImageDraw

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
    cloak_color = (32, 28, 25)
    hood_color = (42, 36, 32)
    pack_color = (55, 45, 36)
    
    if action == 'sit_drink':
        # Sitting traveller drinking coffee
        # Bent legs
        draw.polygon([(x - 20*scale, y), (x - 45*scale, y + 25*scale), (x - 10*scale, y + 25*scale)], fill=cloak_color)
        draw.polygon([(x + 5*scale, y), (x + 35*scale, y + 25*scale), (x + 15*scale, y + 25*scale)], fill=cloak_color)
        # Torso
        draw.polygon([(x - 16*scale, y - 40*scale), (x + 16*scale, y - 40*scale), (x + 18*scale, y + 5*scale), (x - 18*scale, y + 5*scale)], fill=cloak_color)
        # Hood
        draw.ellipse([x - 12*scale, y - 62*scale, x + 12*scale, y - 38*scale], fill=hood_color)
        # Arm raising glass of coffee to lips
        draw.line([(x + 12*scale, y - 28*scale), (x + 24*scale, y - 36*scale)], fill=cloak_color, width=int(8*scale))
        # Transparent glass with coffee & steam
        gx, gy = x + 26*scale, y - 40*scale
        draw.rounded_rectangle([gx - 6*scale, gy - 12*scale, gx + 6*scale, gy + 4*scale], radius=int(2*scale), outline=(220, 220, 240), width=1)
        draw.rounded_rectangle([gx - 5*scale, gy - 6*scale, gx + 5*scale, gy + 3*scale], radius=int(2*scale), fill=(60, 25, 10))
        # Java red logo indicator
        draw.ellipse([gx - 2*scale, gy - 4*scale, gx + 2*scale, gy], fill=(230, 45, 45))
        # Steam wisps
        draw.arc([gx - 4*scale, gy - 24*scale, gx + 4*scale, gy - 12*scale], start=0, end=180, fill=(240, 230, 220), width=1)
        return

    # Regular walking traveller
    leg_offset = math.sin(walking_phase) * 16 * scale if action == 'walk' else 0
    draw.polygon([(x - 8*scale, y), (x - 14*scale - leg_offset, y + 60*scale), (x - 6*scale - leg_offset, y + 60*scale), (x - 2*scale, y)], fill=cloak_color)
    draw.polygon([(x + 2*scale, y), (x + 6*scale + leg_offset, y + 60*scale), (x + 14*scale + leg_offset, y + 60*scale), (x + 8*scale, y)], fill=cloak_color)
    draw.polygon([(x - 18*scale, y - 50*scale), (x + 18*scale, y - 50*scale), (x + 22*scale, y + 10*scale), (x - 22*scale, y + 10*scale)], fill=cloak_color)
    draw.rounded_rectangle([x - 15*scale, y - 48*scale, x + 15*scale, y - 10*scale], radius=int(6*scale), fill=pack_color)
    draw.ellipse([x - 12*scale, y - 72*scale, x + 12*scale, y - 48*scale], fill=hood_color)

# ==========================================
# SCENE 2: BEACH & JAVA COFFEE (16 frames)
# ==========================================
print("Generating Scene 2: Beach & Java...")
os.makedirs("public/cinematic/seq-beach", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Sunset sky gradient
    create_gradient(d, (230, 110, 60), (250, 190, 120), int(HEIGHT * 0.55))
    # Sun setting on horizon
    d.ellipse([780, 280, 920, 420], fill=(255, 240, 180))
    # Distant ocean horizon
    d.rectangle([0, 360, WIDTH, 500], fill=(45, 95, 115))
    # Waves washing shore
    for w_idx in range(6):
        wy = 440 + w_idx * 16 + math.sin(i * 0.6 + w_idx) * 6
        d.line([(0, wy), (WIDTH, wy)], fill=(120, 180, 200), width=3)
        d.line([(0, wy + 2), (WIDTH, wy + 2)], fill=(240, 250, 255), width=2)
    # Pale wet coastal sand
    d.polygon([(0, 520), (WIDTH, 480), (WIDTH, HEIGHT), (0, HEIGHT)], fill=(190, 160, 130))
    
    # Weathered timber rock
    d.polygon([(680, 530), (840, 510), (880, 610), (660, 630)], fill=(55, 45, 38))
    
    if p < 0.4:
        # Walking towards the shore rock
        draw_traveller(d, 520 + p * 400, 540, scale=0.75, walking_phase=i * 1.5, action='walk')
    else:
        # Seated on timber rock drinking coffee with Java logo
        draw_traveller(d, 740, 525, scale=0.85, action='sit_drink')
        
    img.save(f"public/cinematic/seq-beach/frame_{i:02d}.jpg", quality=88)

# ==========================================
# SCENE 3: FURIOUS OCEAN & DSA DRAGONS (16 frames)
# ==========================================
print("Generating Scene 3: Ocean & DSA Dragons...")
os.makedirs("public/cinematic/seq-ocean", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Violent storm sky with dark navy clouds
    create_gradient(d, (12, 20, 28), (28, 48, 62), int(HEIGHT * 0.5))
    # Lightning flash in distance on certain frames
    if i in [3, 4, 11, 12]:
        d.line([(400, 0), (440, 140), (420, 180), (480, 260)], fill=(220, 240, 255), width=3)
        
    # Massive raging ocean swells
    for y_swell in range(320, HEIGHT, 8):
        wave_shift = math.sin(y_swell * 0.05 + i * 0.8) * 45
        d.line([(0, y_swell), (WIDTH, y_swell)], fill=(15, 35 + int(y_swell*0.05), 50 + int(y_swell*0.08)))
        # Spray foam
        if y_swell % 32 == 0:
            d.line([(0, y_swell + wave_shift*0.2), (WIDTH, y_swell + wave_shift*0.2)], fill=(180, 215, 230), width=2)
            
    # Mythical DSA Dragon emerging from violent deep
    dragon_x = int(750 - p * 80)
    dragon_y = int(380 + math.sin(i * 0.5) * 20)
    # Segmented armored dragon plates
    for seg in range(7):
        sx = dragon_x - seg * 38
        sy = dragon_y + int(math.sin(seg * 0.8 + i * 0.4) * 35)
        d.ellipse([sx - 26, sy - 36, sx + 26, sy + 36], fill=(25, 60, 52), outline=(50, 120, 95), width=2)
    # Dragon horned head
    d.polygon([
        (dragon_x + 30, dragon_y - 20),
        (dragon_x + 90, dragon_y),
        (dragon_x + 20, dragon_y + 40)
    ], fill=(20, 50, 42))
    # Dragon glowing eye
    d.ellipse([dragon_x + 55, dragon_y - 5, dragon_x + 65, dragon_y + 5], fill=(255, 180, 40))
    
    # Wooden sailing ship fighting the waves
    ship_x, ship_y = 380, 460 + int(math.sin(i * 0.9) * 15)
    # Hull
    d.polygon([(ship_x - 140, ship_y - 30), (ship_x + 160, ship_y - 10), (ship_x + 110, ship_y + 60), (ship_x - 100, ship_y + 60)], fill=(45, 30, 20))
    # Mast & Rigging
    d.line([(ship_x, ship_y - 220), (ship_x, ship_y)], fill=(35, 24, 16), width=7)
    # Billowing canvas sail
    d.polygon([(ship_x + 5, ship_y - 200), (ship_x + 110, ship_y - 180), (ship_x + 95, ship_y - 70), (ship_x + 5, ship_y - 80)], fill=(185, 175, 160))
    
    # Traveller on ship deck
    draw_traveller(d, ship_x - 30, ship_y - 35, scale=0.45, action='stand')
    
    img.save(f"public/cinematic/seq-ocean/frame_{i:02d}.jpg", quality=88)

# ==========================================
# SCENE 4: KUBERNETES STEERING HELM (16 frames)
# ==========================================
print("Generating Scene 4: Kubernetes Helm...")
os.makedirs("public/cinematic/seq-helm", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    rot = i * (math.pi / 8) # Wheel rotating smoothly
    
    # Ocean storm background blurred
    create_gradient(d, (10, 18, 26), (22, 40, 54), HEIGHT)
    # Distant crashing waves
    for wy in range(250, 480, 20):
        d.line([(0, wy), (WIDTH, wy)], fill=(30, 60, 75), width=4)
        
    # Quarterdeck wood texture
    d.rectangle([0, 520, WIDTH, HEIGHT], fill=(42, 30, 20))
    
    # Helm Center
    hx, hy = WIDTH // 2, 400
    
    # Traveller holding the wheel from behind
    draw_traveller(d, hx, 560, scale=1.35, action='stand')
    
    # Pedestal
    d.polygon([(hx - 35, hy + 30), (hx + 35, hy + 30), (hx + 45, 620), (hx - 45, 620)], fill=(35, 24, 16))
    
    # Outer Timber Wheel Rim
    d.ellipse([hx - 180, hy - 180, hx + 180, hy + 180], outline=(75, 52, 34), width=18)
    # Inner Rim
    d.ellipse([hx - 150, hy - 150, hx + 150, hy + 150], outline=(55, 38, 25), width=8)
    
    # 7 Kubernetes Spokes
    for s in range(7):
        ang = rot + (2 * math.pi / 7) * s
        sx1 = hx + int(45 * math.cos(ang))
        sy1 = hy + int(45 * math.sin(ang))
        sx2 = hx + int(210 * math.cos(ang))
        sy2 = hy + int(210 * math.sin(ang))
        d.line([(sx1, sy1), (sx2, sy2)], fill=(95, 68, 45), width=8)
        # Handle peg
        d.ellipse([sx2 - 10, sy2 - 10, sx2 + 10, sy2 + 10], fill=(60, 40, 25))
        
    # Official Central Kubernetes Blue Medallion
    d.ellipse([hx - 45, hy - 45, hx + 45, hy + 45], fill=(50, 108, 229), outline=(220, 235, 255), width=3)
    # White 7-point helm heptagon inside
    k_pts = []
    for kp in range(7):
        kang = rot + (2 * math.pi / 7) * kp
        kx = hx + int(26 * math.cos(kang))
        ky = hy + int(26 * math.sin(kang))
        k_pts.append((kx, ky))
    d.polygon(k_pts, outline=(255, 255, 255), width=3)
    
    img.save(f"public/cinematic/seq-helm/frame_{i:02d}.jpg", quality=88)

# ==========================================
# SCENE 5: DOCKER WHALE & GO MASCOT (16 frames)
# ==========================================
print("Generating Scene 5: Docker Whale...")
os.makedirs("public/cinematic/seq-whale", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Calm twilight ocean
    create_gradient(d, (18, 32, 48), (35, 65, 88), int(HEIGHT * 0.6))
    for wy in range(380, HEIGHT, 12):
        d.line([(0, wy), (WIDTH, wy)], fill=(12, 35, 52 + int(wy*0.04)), width=2)
        
    # Ship on left side
    d.polygon([(60, 420), (280, 440), (250, 520), (80, 520)], fill=(45, 30, 20))
    d.line([(170, 240), (170, 430)], fill=(35, 24, 16), width=6)
    draw_traveller(d, 190, 430, scale=0.55, action='stand')
    
    # Titanic Docker Whale breaching peacefully
    whale_x = int(600 + p * 120)
    whale_y = int(480 - math.sin(p * math.pi) * 80)
    
    # Whale oceanic body
    d.ellipse([whale_x - 280, whale_y - 120, whale_x + 280, whale_y + 120], fill=(28, 72, 105))
    # Whale Tail Flukes
    d.polygon([
        (whale_x - 340, whale_y - 20),
        (whale_x - 260, whale_y + 20),
        (whale_x - 360, whale_y + 70)
    ], fill=(22, 58, 85))
    # Water breach splash
    d.arc([whale_x - 260, whale_y - 10, whale_x + 260, whale_y + 90], start=0, end=180, fill=(180, 220, 245), width=4)
    
    # Authentic Docker container blocks on whale back
    box_w, box_h = 32, 22
    for r in range(2):
        for c in range(4):
            bx = whale_x - 70 + c * (box_w + 5)
            by = whale_y - 145 + r * (box_h + 3)
            d.rectangle([bx, by, bx + box_w, by + box_h], fill=(36, 150, 237), outline=(20, 90, 150), width=2)
    # Top center container
    d.rectangle([whale_x - 15, whale_y - 170, whale_x + 25, whale_y - 148], fill=(36, 150, 237), outline=(20, 90, 150), width=2)
    
    # Authentic Go Gopher Mascot on top
    g_x, g_y = whale_x + 5, whale_y - 188
    # Cyan body
    d.ellipse([g_x - 14, g_y - 20, g_x + 14, g_y + 8], fill=(0, 173, 216))
    # Big round white eyes with black pupils
    d.ellipse([g_x - 10, g_y - 18, g_x - 2, g_y - 8], fill=(255, 255, 255))
    d.ellipse([g_x - 7, g_y - 15, g_x - 4, g_y - 11], fill=(0, 0, 0))
    d.ellipse([g_x + 2, g_y - 18, g_x + 10, g_y - 8], fill=(255, 255, 255))
    d.ellipse([g_x + 5, g_y - 15, g_x + 8, g_y - 11], fill=(0, 0, 0))
    # Snout
    d.ellipse([g_x - 4, g_y - 8, g_x + 4, g_y - 2], fill=(245, 215, 170))
    
    img.save(f"public/cinematic/seq-whale/frame_{i:02d}.jpg", quality=88)

# ==========================================
# SCENE 6: PYTHON FOREST & SERPENTS (16 frames)
# ==========================================
print("Generating Scene 6: Python Forest...")
os.makedirs("public/cinematic/seq-forest", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Dense atmospheric canopy green & mist
    create_gradient(d, (14, 26, 18), (32, 54, 38), int(HEIGHT * 0.6))
    # Sunbeams filtering down
    for sb in range(5):
        s_start = 200 + sb * 220
        d.polygon([(s_start, 0), (s_start + 60, 0), (s_start + 140, HEIGHT), (s_start + 20, HEIGHT)], fill=(210, 245, 200))
        
    # Towering redwoods & foliage
    tree_x_list = [100, 240, 480, 820, 1050, 1180]
    for tx in tree_x_list:
        d.rectangle([tx - 25, 0, tx + 25, HEIGHT], fill=(38, 26, 18))
        d.polygon([(tx - 120, 0), (tx + 120, 0), (tx, 340)], fill=(22, 42, 28))
        
    # Wet mossy ground
    d.polygon([(0, 540), (WIDTH, 520), (WIDTH, HEIGHT), (0, HEIGHT)], fill=(26, 38, 25))
    
    # Ancient Stone Monolith with Authentic Python Logo
    mon_x = WIDTH // 2
    d.polygon([(mon_x - 90, 360), (mon_x + 90, 360), (mon_x + 110, 560), (mon_x - 110, 560)], fill=(45, 48, 44))
    # Blue serpent shape (top)
    d.rounded_rectangle([mon_x - 35, 410, mon_x + 20, 450], radius=8, fill=(55, 118, 171))
    d.ellipse([mon_x - 22, 416, mon_x - 14, 424], fill=(255, 255, 255))
    # Yellow serpent shape (bottom)
    d.rounded_rectangle([mon_x - 20, 445, mon_x + 35, 485], radius=8, fill=(255, 212, 59))
    d.ellipse([mon_x + 14, 470, mon_x + 22, 478], fill=(0, 0, 0))
    
    # Real slithering serpents winding through trees
    for s_idx in range(2):
        s_y = 570 + s_idx * 40
        for seg in range(12):
            seg_x = 220 + seg * 24 + math.sin(i * 0.8 + seg * 0.5) * 16
            seg_col = (55, 118, 171) if s_idx == 0 else (210, 175, 45)
            d.ellipse([seg_x - 8, s_y - 8, seg_x + 8, s_y + 8], fill=seg_col)
            
    # Traveller walking deeper into the forest mist
    t_y = int(550 + p * 40)
    draw_traveller(d, WIDTH // 2 - 40, t_y, scale=0.75 + p*0.2, walking_phase=i * 1.4, action='walk')
    
    img.save(f"public/cinematic/seq-forest/frame_{i:02d}.jpg", quality=88)

# ==========================================
# SCENE 7: REACT DESTINATION (16 frames)
# ==========================================
print("Generating Scene 7: React Destination...")
os.makedirs("public/cinematic/seq-react", exist_ok=True)
for i in range(16):
    img = Image.new("RGB", (WIDTH, HEIGHT))
    d = ImageDraw.Draw(img)
    p = i / 15.0
    
    # Atmospheric twilight clearing sky
    create_gradient(d, (20, 24, 32), (38, 48, 62), int(HEIGHT * 0.55))
    
    # Distant ancient stone colonnade
    for px in range(120, WIDTH, 160):
        d.rectangle([px - 15, 260, px + 15, 520], fill=(42, 48, 56))
        
    # Stone Sanctuary Platform
    d.polygon([(0, 520), (WIDTH, 520), (WIDTH, HEIGHT), (0, HEIGHT)], fill=(32, 36, 42))
    
    # Monumental Stone Altar
    altar_x = WIDTH // 2
    d.polygon([(altar_x - 180, 440), (altar_x + 180, 440), (altar_x + 220, 560), (altar_x - 220, 560)], fill=(24, 28, 34))
    
    # Glowing React Atom Sculpture with rotating elliptical orbitals
    core_y = 330
    # Core sphere
    d.ellipse([altar_x - 24, core_y - 24, altar_x + 24, core_y + 24], fill=(97, 218, 251))
    
    # 3 Rotating Ellipses
    for ring_i in range(3):
        rot_ang = (i * 0.2) + (math.pi / 3) * ring_i
        # Approximate rotated ellipses
        for a_step in range(36):
            th = (2 * math.pi / 36) * a_step
            # Unrotated ellipse: rx=130, ry=48
            ux = 130 * math.cos(th)
            uy = 48 * math.sin(th)
            rx = altar_x + int(ux * math.cos(rot_ang) - uy * math.sin(rot_ang))
            ry = core_y + int(ux * math.sin(rot_ang) + uy * math.cos(rot_ang))
            d.ellipse([rx - 2, ry - 2, rx + 2, ry + 2], fill=(97, 218, 251))
            
    # Traveller approaching the React altar
    draw_traveller(d, altar_x, 580 - int(p * 50), scale=0.75 + p*0.15, walking_phase=i * 1.2, action='walk')
    
    img.save(f"public/cinematic/seq-react/frame_{i:02d}.jpg", quality=88)

print("All cinematic sequences generated successfully!")
