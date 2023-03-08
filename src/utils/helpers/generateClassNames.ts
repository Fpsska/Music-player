export function generateClassNames(...args: any[]): string {
    return args.filter(Boolean).join(' ');
}
