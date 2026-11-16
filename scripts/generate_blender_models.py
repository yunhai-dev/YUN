"""
Generate realistic 3D sculpture models (.glb) for YunHai (云云亦海) using Blender 5.2+ headless Python API.
Run via:
  /Applications/Blender.app/Contents/MacOS/Blender --background --python scripts/generate_blender_models.py
"""

import math
import os
import bpy
import bmesh
from mathutils import Vector, Matrix

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "models"))
os.makedirs(OUTPUT_DIR, exist_ok=True)


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def export_glb(filename: str):
    filepath = os.path.join(OUTPUT_DIR, filename)
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_materials="NONE",
    )
    print(f"[Exported] {filepath}")


def add_subsurf(obj, levels=2):
    mod = obj.modifiers.new(name="Subsurf", type="SUBSURF")
    mod.levels = levels
    mod.render_levels = levels


def add_bevel(obj, width=0.015, segments=2):
    mod = obj.modifiers.new(name="Bevel", type="BEVEL")
    mod.width = width
    mod.segments = segments


# ---------------------------------------------------------------------------
# 1. YunHai Whale (Humpback-inspired realistic organic sculpture)
# ---------------------------------------------------------------------------
def build_whale_model():
    clear_scene()

    # Main body lofted along a graceful swimming S-curve
    bm = bmesh.new()
    slices = 28
    ring_verts = 20
    rings = []

    for i in range(slices):
        t = i / (slices - 1)  # 0 (nose) -> 1 (tail)
        # Longitudinal X from +2.3 (nose) to -2.5 (tail)
        x = 2.3 - t * 4.8
        # Swimming arch in Z
        z_center = math.sin(t * math.pi * 1.35) * 0.28 - t * 0.15

        # Realistic humpback profile: blunt rounded head, thick chest, tapering peduncle
        if t < 0.15:
            u = t / 0.15
            rx = 0.12 + math.sin(u * math.pi * 0.5) * 0.48
            rz = 0.10 + math.sin(u * math.pi * 0.5) * 0.42
        elif t < 0.45:
            u = (t - 0.15) / 0.30
            rx = 0.60 + math.sin(u * math.pi * 0.5) * 0.12
            rz = 0.52 + math.sin(u * math.pi * 0.5) * 0.14
        else:
            u = (t - 0.45) / 0.55
            rx = 0.72 * math.pow(1.0 - u * 0.88, 1.35)
            rz = 0.66 * math.pow(1.0 - u * 0.85, 1.25)

        ring = []
        for j in range(ring_verts):
            ang = (j / ring_verts) * math.PI * 2 if hasattr(math, "PI") else (j / ring_verts) * math.pi * 2
            y = math.cos(ang) * rx
            z = z_center + math.sin(ang) * rz
            # Slight flattening on dorsal back & ventral grooves
            if math.sin(ang) < 0 and 0.1 < t < 0.5:
                z += math.sin(j * 4.0) * 0.015
            ring.append(bm.verts.new((x, y, z)))
        rings.append(ring)

    for i in range(slices - 1):
        for j in range(ring_verts):
            jn = (j + 1) % ring_verts
            bm.faces.new((rings[i][j], rings[i][jn], rings[i + 1][jn], rings[i + 1][j]))

    # Cap nose and tail
    bm.faces.new(rings[0][::-1])
    bm.faces.new(rings[-1])

    mesh = bpy.data.meshes.new("WhaleBodyMesh")
    bm.to_mesh(mesh)
    bm.free()

    body = bpy.data.objects.new("WhaleBody", mesh)
    bpy.context.collection.objects.link(body)
    add_subsurf(body, levels=2)

    # Pectoral Fins (long graceful humpback flippers)
    for side in (1, -1):
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.55, side * 0.55, -0.1))
        fin = bpy.context.active_object
        fin.name = f"PectoralFin_{side}"
        fin.scale = (0.36, 1.35, 0.06)
        fin.rotation_euler = (side * 0.18, 0.15, side * -0.45)
        bpy.ops.object.transform_apply(scale=True)
        # Taper fin tip
        bm_f = bmesh.new()
        bm_f.from_mesh(fin.data)
        for v in bm_f.verts:
            if v.co.y * side > 0.2:
                v.co.x *= 0.45
                v.co.z *= 0.4
                v.co.x -= 0.25
        bm_f.to_mesh(fin.data)
        bm_f.free()
        add_subsurf(fin, levels=2)

    # Tail Flukes
    for side in (1, -1):
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-2.48, side * 0.42, -0.18))
        fluke = bpy.context.active_object
        fluke.name = f"TailFluke_{side}"
        fluke.scale = (0.45, 0.85, 0.045)
        fluke.rotation_euler = (side * 0.08, 0.1, side * -0.42)
        bpy.ops.object.transform_apply(scale=True)
        add_subsurf(fluke, levels=2)

    # Dorsal Fin
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.22, depth=0.42, location=(-0.55, 0.0, 0.55))
    dorsal = bpy.context.active_object
    dorsal.scale = (1.3, 0.25, 1.0)
    dorsal.rotation_euler = (0, -0.45, 0)
    add_subsurf(dorsal, levels=1)

    # Rotate slightly for hero framing (facing forward-right, slightly pitched up)
    bpy.ops.object.select_all(action="SELECT")
    for obj in bpy.context.selected_objects:
        obj.rotation_euler[1] -= 0.12
        obj.rotation_euler[2] += 0.35

    export_glb("yunhai_whale.glb")


# ---------------------------------------------------------------------------
# 2. Agent Harness Cybernetic Core & 4 Articulated Tool Arms
# ---------------------------------------------------------------------------
def build_agent_model():
    clear_scene()

    # Central Armored Reactor Sphere
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=3, radius=0.72, location=(0, 0, 0))
    core = bpy.context.active_object
    core.name = "AgentCore"

    # Precision Beveled Outer Equatorial Frame Rings
    for idx, (rad, tilt_x, tilt_y) in enumerate([
        (1.18, 0.35, 0.2),
        (1.42, -0.55, 0.4),
        (1.66, 0.15, -0.65),
    ]):
        bpy.ops.mesh.primitive_torus_add(
            major_radius=rad,
            minor_radius=0.045,
            major_segments=48,
            minor_segments=12,
            location=(0, 0, 0),
        )
        ring = bpy.context.active_object
        ring.name = f"GyroRing_{idx}"
        ring.rotation_euler = (tilt_x, tilt_y, 0)

        # Add 6 precision sensor nodes along each ring
        for k in range(6):
            ang = (k / 6) * math.pi * 2
            nx = math.cos(ang) * rad
            ny = math.sin(ang) * rad
            bpy.ops.mesh.primitive_cube_add(size=0.14, location=(nx, ny, 0))
            node = bpy.context.active_object
            node.parent = ring
            add_bevel(node, width=0.02, segments=2)

    # 4 Articulated Mechanical Tool Arms radiating outward
    arm_angles = [0.65, 2.35, 3.85, 5.45]
    for idx, ang in enumerate(arm_angles):
        z_off = 0.55 if idx % 2 == 0 else -0.55
        # Shoulder joint
        sx, sy = math.cos(ang) * 1.15, math.sin(ang) * 1.15
        bpy.ops.mesh.primitive_cylinder_add(radius=0.14, depth=0.28, location=(sx, sy, z_off * 0.4))
        shoulder = bpy.context.active_object
        shoulder.rotation_euler = (math.pi / 2, 0, ang)
        add_bevel(shoulder, width=0.02, segments=2)

        # Upper arm strut
        mx, my = math.cos(ang) * 1.65, math.sin(ang) * 1.65
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(mx, my, z_off * 0.7))
        strut = bpy.context.active_object
        strut.scale = (0.95, 0.12, 0.12)
        strut.rotation_euler = (0, -z_off * 0.35, ang)
        add_bevel(strut, width=0.02, segments=2)

        # Tool End-Effector Housing (Precision Claw / Sensor Head)
        ex, ey = math.cos(ang) * 2.15, math.sin(ang) * 2.15
        bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=0.22, depth=0.35, location=(ex, ey, z_off))
        head = bpy.context.active_object
        head.rotation_euler = (0, math.pi / 2, ang)
        add_bevel(head, width=0.025, segments=2)

    export_glb("agent_core.glb")


# ---------------------------------------------------------------------------
# 3. Precision Mechanical Watch / Gear Movement (Open Source & Tooling)
# ---------------------------------------------------------------------------
def create_gear(name: str, teeth: int, radius: float, thickness: float, loc=(0, 0, 0), rot=(0, 0, 0)):
    bm = bmesh.new()
    outer_r = radius
    inner_r = radius * 0.84
    bore_r = radius * 0.24
    segs = teeth * 4

    top_outer = []
    bot_outer = []
    top_inner = []
    bot_inner = []

    for i in range(segs):
        ang = (i / segs) * math.pi * 2
        phase = i % 4
        r = outer_r if phase in (1, 2) else inner_r
        x = math.cos(ang) * r
        y = math.sin(ang) * r
        top_outer.append(bm.verts.new((x, y, thickness / 2)))
        bot_outer.append(bm.verts.new((x, y, -thickness / 2)))

        ix = math.cos(ang) * bore_r
        iy = math.sin(ang) * bore_r
        top_inner.append(bm.verts.new((ix, iy, thickness / 2)))
        bot_inner.append(bm.verts.new((ix, iy, -thickness / 2)))

    for i in range(segs):
        inext = (i + 1) % segs
        # Outer rim
        bm.faces.new((bot_outer[i], bot_outer[inext], top_outer[inext], top_outer[i]))
        # Inner bore
        bm.faces.new((top_inner[i], top_inner[inext], bot_inner[inext], bot_inner[i]))
        # Top face
        bm.faces.new((top_inner[i], top_outer[i], top_outer[inext], top_inner[inext]))
        # Bottom face
        bm.faces.new((bot_outer[i], bot_inner[i], bot_inner[inext], bot_outer[inext]))

    mesh = bpy.data.meshes.new(name + "_Mesh")
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new(name, mesh)
    obj.location = loc
    obj.rotation_euler = rot
    bpy.context.collection.objects.link(obj)
    add_bevel(obj, width=0.012, segments=2)
    return obj


def build_tooling_model():
    clear_scene()

    # Interlocking 3D Mechanical Watch Movement
    create_gear("MainGear", teeth=24, radius=1.35, thickness=0.22, loc=(-0.4, 0, 0), rot=(0.3, 0.2, 0))
    create_gear("DriveGear", teeth=14, radius=0.82, thickness=0.26, loc=(1.65, 0.55, -0.3), rot=(0.3, 0.2, 0.15))
    create_gear("EscapementGear", teeth=18, radius=0.98, thickness=0.18, loc=(-1.35, -1.25, 0.4), rot=(-0.4, 0.5, 0))

    # Central Axle Shaft & Bearing Collar
    bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=2.1, location=(-0.4, 0, 0))
    axle = bpy.context.active_object
    axle.rotation_euler = (0.3, 0.2, 0)
    add_bevel(axle, width=0.02, segments=2)

    # Precision Bridge Plate framing the gears
    bpy.ops.mesh.primitive_torus_add(major_radius=2.15, minor_radius=0.06, major_segments=64, minor_segments=12, location=(0, -0.1, 0))
    frame = bpy.context.active_object
    frame.rotation_euler = (0.3, 0.2, 0)

    export_glb("tooling_gears.glb")


# ---------------------------------------------------------------------------
# 4. Open Hardcover Book & Classic Fountain Pen (Writing & Reflection)
# ---------------------------------------------------------------------------
def build_writing_model():
    clear_scene()

    # Open curved book pages (left & right)
    bm = bmesh.new()
    u_steps = 22
    v_steps = 18

    for side in (-1, 1):
        grid = []
        for iu in range(u_steps):
            u = iu / (u_steps - 1)  # 0 (spine) -> 1 (outer edge)
            row = []
            for iv in range(v_steps):
                v = (iv / (v_steps - 1) - 0.5) * 2.0  # -1 -> 1
                x = side * (0.06 + u * 1.95)
                y = v * 1.45
                z = math.sin(u * math.pi * 0.85) * 0.48 - 0.35
                row.append(bm.verts.new((x, y, z)))
            grid.append(row)

        for iu in range(u_steps - 1):
            for iv in range(v_steps - 1):
                if side == 1:
                    bm.faces.new((grid[iu][iv], grid[iu + 1][iv], grid[iu + 1][iv + 1], grid[iu][iv + 1]))
                else:
                    bm.faces.new((grid[iu][iv], grid[iu][iv + 1], grid[iu + 1][iv + 1], grid[iu + 1][iv]))

    book_mesh = bpy.data.meshes.new("BookPagesMesh")
    bm.to_mesh(book_mesh)
    bm.free()

    pages = bpy.data.objects.new("BookPages", book_mesh)
    bpy.context.collection.objects.link(pages)
    solid = pages.modifiers.new(name="Solidify", type="SOLIDIFY")
    solid.thickness = 0.14
    add_subsurf(pages, levels=1)

    # Hardcover Spine & Covers underneath
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, -0.52))
    cover = bpy.context.active_object
    cover.scale = (4.25, 3.1, 0.08)
    add_bevel(cover, width=0.02, segments=2)

    # Floating Classic Fountain Pen poised above the right page
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.11, depth=2.1, location=(0.85, 0.25, 0.72))
    barrel = bpy.context.active_object
    barrel.rotation_euler = (0.55, -0.45, 0.35)
    add_subsurf(barrel, levels=1)

    # Tapered Fountain Pen Nib
    bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=0.10, depth=0.48, location=(0.32, -0.22, -0.02))
    nib = bpy.context.active_object
    nib.rotation_euler = (0.55 + math.pi, -0.45, 0.35)
    add_subsurf(nib, levels=1)

    export_glb("writing_book_pen.glb")


if __name__ == "__main__":
    build_whale_model()
    build_agent_model()
    build_tooling_model()
    build_writing_model()
    print("All Blender models generated successfully.")
