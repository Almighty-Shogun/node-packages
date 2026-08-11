export default function (request: Request, name: string): string[] {
    const { searchParams } = new URL(request.url);

    return searchParams.getAll(name)
        .flatMap((value) => value.split(','))
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
}
