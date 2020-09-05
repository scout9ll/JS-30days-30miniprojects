class HexagonCube {
  x: number;
  y: number;
  z: number;
  private CUBE_DIRECTION = [
    new HexagonCube(+1, -1, 0),
    new HexagonCube(+1, 0, -1),
    new HexagonCube(+1, 0, -1),
    new HexagonCube(+1, -1, 0),
    new HexagonCube(+1, 0, -1),
    new HexagonCube(+1, 0, -1),
  ];
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static cubeAdd(center: HexagonCube, offset) {
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
  static cubeNeighbor(cube: HexagonCube, direction: HexagonCube) {
    return this.cubeAdd(cube, direction);
  }
}

// cube_spiral(center, radius):
// var results = [center]
// for each 1 ≤ k ≤ radius:
//     results = results + cube_ring(center, k)
// return results

// const
// cube_ring(center, radius){

//   var results = []
// //   # this code doesn't work for radius == 0; can you see why?
//   var cube = cube_add(center,
//                       cube_scale(cube_direction(4), radius))
//   for each 0 ≤ i < 6:
//       for each 0 ≤ j < radius:
//           results.append(cube)
//           cube = cube_neighbor(cube, i)
//   return results
// }
// function cube_neighbor(cube, direction):
// return cube_add(cube, cube_direction(direction))

// }
