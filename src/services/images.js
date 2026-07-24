export const COVER_MAX = { w: 1080, h: 400 };
export const AVATAR_MAX = { w: 320, h: 320 };

export function resizeImage(file, max, quality = 0.82) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('That file is not an image.'));
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(url);

            const targetAspect = max.w / max.h;
            const srcAspect = img.width / img.height;
            let sw = img.width;
            let sh = img.height;
            if (srcAspect > targetAspect) sw = img.height * targetAspect;
            else sh = img.width / targetAspect;
            const sx = (img.width - sw) / 2;
            const sy = (img.height - sh) / 2;

            const w = Math.max(1, Math.round(Math.min(max.w, sw)));
            const h = Math.max(1, Math.round(w / targetAspect));

            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#151c26';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);

            try {
                resolve(canvas.toDataURL('image/jpeg', quality));
            } catch {
                reject(new Error('Could not process that image.'));
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not read that image.'));
        };

        img.src = url;
    });
}

export function approxKB(dataUrl) {
    if (!dataUrl) return 0;
    return Math.round((dataUrl.length * 0.75) / 1024);
}