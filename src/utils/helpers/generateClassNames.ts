export function generateClassNames(...args: string[]): string {
    return args.filter(Boolean).join(' ');
}
