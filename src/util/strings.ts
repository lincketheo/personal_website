
export function removeTrailingAndLeadingSlashes(str: string): string {
    return str.replace(/^\/|\/$/g, '');
}
