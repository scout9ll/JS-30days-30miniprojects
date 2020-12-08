// hexagon algorithm spired by https://www.redblobgames.com/grids/hexagons/
class HexagonCube {
  x: number;
  y: number;
  z: number;
  private static CUBE_DIRECTION: HexagonCube[] = [
    new HexagonCube(+1, -1, 0),
    new HexagonCube(+1, 0, -1),
    new HexagonCube(0, +1, -1),
    new HexagonCube(-1, +1, 0),
    new HexagonCube(-1, 0, +1),
    new HexagonCube(0, -1, +1),
  ];
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static cubeAdd(center: HexagonCube, offset: HexagonCube) {
    const x = center.x + offset.x;
    const y = center.y + offset.y;
    const z = center.z + offset.z;
    return new HexagonCube(x, y, z);
  }
  static cubeScale(direction: HexagonCube, radius: number) {
    const x = radius * direction.x;
    const y = radius * direction.y;
    const z = radius * direction.z;
    return new HexagonCube(x, y, z);
  }
  static cubeNeighbor(cube: HexagonCube, direction: number) {
    return HexagonCube.cubeAdd(cube, this.CUBE_DIRECTION[direction]);
  }
  static cubeRing(
    center: HexagonCube,
    radius: number,
    startDirection: number
  ): HexagonCube[] {
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
  static cubeSpiral(
    center: HexagonCube,
    radius: number,
    startDirection: number
  ) {
    const results = [center];
    for (let i = 0; i < radius; i++) {
      const cubeRings = HexagonCube.cubeRing(center, i, startDirection);
      results.push(...cubeRings);
    }
  }
  static doubleheightToPixel(hex: HexagonCube, size: number): [number, number] {
    let x = ((size * 3) / 2) * hex.x;
    let y = ((size * Math.sqrt(3)) / 2) * hex.z;
    return [x, y];
  }
}
