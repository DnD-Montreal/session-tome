export const objectArrayFormatter = (objects: any[]) =>
    objects.map((object: any) => object.name).join(', ')
