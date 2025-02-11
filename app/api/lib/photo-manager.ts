export class PhotoManager {
  // KeyToConvert is the key of the object that contains the photo
  static addPhotoBase64ToObject(object: unknown, keyToConvert: string) {
    if (typeof object !== "object" || object === null) {
      throw new Error("Input must be an object");
    }

    const typedObject = object as Record<string, unknown>;

    if (!typedObject[keyToConvert]) {
      throw new Error(`Key ${keyToConvert} does not exist in object`);
    }

    if (!(typedObject[keyToConvert] instanceof Uint8Array)) {
      throw new Error(`Object[${keyToConvert}] is not a Uint8Array`);
    }

    return {
      ...typedObject,
      photoBase64: Buffer.from(typedObject[keyToConvert]).toString("base64"),
    };
  }

  static addPhotoBase64ToObjects(objects: unknown[], keyToConvert: string) {
    return objects.map((object) =>
      this.addPhotoBase64ToObject(object, keyToConvert)
    );
  }
}
