const NEXT_PUBLIC_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export function getTimeFormat(time) {

    if (!time) {
        return 'Invalid time format';
    }

    if (!time.toLowerCase().includes('hour')) {
        time += ' Hour';
    }

    return time;
}

export function getRawTimeFormat(time) {

    if (!time) {
        return null;
    }

    if (time.toLowerCase().includes('hour')) {
        time = time.replace(/\s?Hour$/, '');
    }

    return time;
}

export function getImageUrl(image, folder) {
    if (!image) return "";

    return `${NEXT_PUBLIC_IMAGE_BASE_URL}/${folder}/${image}`;
}

export function capitalizeFirstLetter(string) {
    return string?.charAt?.(0)?.toUpperCase() + string?.slice(1);
}