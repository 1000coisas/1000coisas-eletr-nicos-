from PIL import Image
import os

os.makedirs('images_opt', exist_ok=True)

files = ['foto1.jpeg','foto2.jpeg','foto3.jpeg']
for f in files:
    src = f
    if not os.path.exists(src):
        print('missing', src)
        continue
    img = Image.open(src)
    # resize if wider than 1200
    maxw = 1200
    w,h = img.size
    if w > maxw:
        newh = int(h * (maxw / w))
        img = img.resize((maxw, newh), Image.LANCZOS)
    out = os.path.join('images_opt', os.path.splitext(f)[0] + '_opt.jpg')
    img.convert('RGB').save(out, 'JPEG', quality=78, optimize=True)
    print('wrote', out)
