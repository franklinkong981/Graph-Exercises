class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let adjacent_vertex in vertex.adjacent) {
      adjacent_vertex.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let nodesToVisit = [start];
    let nodesVisited = new Set(nodesToVisit);
    let dfsNodes = [];

    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.pop();
      dfsNodes.push(currentNode.value);
      for (let neighbor of currentNode.adjacent) {
        if (!nodesVisited.has(neighbor)) {
          nodesToVisit.push(neighbor);
          nodesVisited.add(neighbor);
        }
      }
    }

    return dfsNodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let nodesToVisit = [start];
    let nodesVisited = new Set(nodesToVisit);
    let bfsNodes = [];

    while (nodesToVisit.length) {
      let currentNode = nodesToVisit.shift();
      bfsNodes.push(currentNode.value);
      for (let neighbor of currentNode.adjacent) {
        if (!nodesVisited.has(neighbor)) {
          nodesToVisit.push(neighbor);
          nodesVisited.add(neighbor);
        }
      }
    }

    return bfsNodes;
  }
}

module.exports = {Graph, Node}