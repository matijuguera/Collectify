export class PhotoManager {
  private key: string;

  constructor(key: string = "photo") {
    this.key = key;
  }

  addPhotoBase64ToObject(object: unknown) {
    if (typeof object !== "object" || object === null) {
      throw new Error("Input must be an object");
    }

    const typedObject = object as Record<string, unknown>;

    if (!typedObject[this.key]) {
      throw new Error(`Key ${this.key} does not exist in object`);
    }

    if (!(typedObject[this.key] instanceof Uint8Array)) {
      throw new Error(`Object[${this.key}] is not a Uint8Array`);
    }

    return {
      ...typedObject,
      photoBase64: Buffer.from(typedObject[this.key] as Uint8Array).toString(
        "base64"
      ),
    };
  }

  addPhotoBase64ToObjects(objects: unknown[]) {
    return objects.map((object) => this.addPhotoBase64ToObject(object));
  }

  setKey(key: string) {
    this.key = key;
  }
}
