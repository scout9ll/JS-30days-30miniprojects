class HexagonCube {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static cubeAdd(center, offset) {
    const x = center.x + offset.x;
    const y = center.y + offset.y;
    const z = center.z + offset.z;
    return new HexagonCube(x, y, z);
  }
  static cubeScale(direction, radius) {
    const x = radius * direction.x;
    const y = radius * direction.y;
    const z = radius * direction.z;
    return new HexagonCube(x, y, z);
  }
  static cubeNeighbor(cube, direction) {
    return HexagonCube.cubeAdd(cube, this.CUBE_DIRECTION[direction]);
  }
  static cubeRing(center, radius, startDirection) {
    const results = [];
    const offset = HexagonCube.cubeScale(
      this.CUBE_DIRECTION[startDirection],
      radius
    );
    let cubeHeader = HexagonCube.cubeAdd(center, offset);
    this.CUBE_DIRECTION.forEach((direction) => {
      for (let i = 0; i < radius; i++) {
        results.push(cubeHeader);
        cubeHeader = HexagonCube.cubeAdd(cubeHeader, direction);
      }
    });
    return results;
  }
  static cubeSpiral(center, radius, startDirection) {
    const results = [center];
    for (let i = 0; i < radius; i++) {
      const cubeRings = HexagonCube.cubeRing(center, i, startDirection);
      results.push(...cubeRings);
    }
    return results;
  }
  static doubleheightToPixel(hex, size) {
    let x = ((size * 3) / 2) * hex.x;
    let y = size * ((Math.sqrt(3) / 2) * hex.x + Math.sqrt(3) * hex.z);
    return [x, y];
  }
  static sizeToPlace(size) {
    return {
      width: 2 * size,
      height: Math.sqrt(3) * size,
    };
  }
}
HexagonCube.CUBE_DIRECTION = [
  new HexagonCube(+1, -1, 0),
  new HexagonCube(+1, 0, -1),
  new HexagonCube(0, +1, -1),
  new HexagonCube(-1, +1, 0),
  new HexagonCube(-1, 0, +1),
  new HexagonCube(0, -1, +1),
];
