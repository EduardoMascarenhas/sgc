interface Cliente {
  name: string;
  email: string;
  coordX: number;
  coordY: number;
}

//TSP (Travelling Salesman Problem) para resolver a questão da rota
export function solveTsp(clientes: Cliente[]): string[] {
  const n = clientes.length;

  // Criar um array para guardar os clientes visitados
  const visited: boolean[] = new Array(n).fill(false);

  // Inicializar a rota com o ponto de partida
  const route: any[] = [
    {
      name: clientes[0].name,
      email: clientes[0].email,
      coordX: clientes[0].coordX,
      coordY: clientes[0].coordY,
    },
  ];
  visited[0] = true;

  // Implementar o algoritimo 'Nearest Neighbor'
  for (let i = 0; i < n - 1; i++) {
    let nearestIndex = -1;
    let minDistance = Number.MAX_VALUE;

    // Encontrar o cliente mais próximo nao visitado
    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        const distance = calculateDistance(clientes[i], clientes[j]);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = j;
        }
      }
    }

    // Marcar o cliente mais proximo como visitado e adicionar à rota
    visited[nearestIndex] = true;
    route.push({
      name: clientes[nearestIndex].name,
      email: clientes[nearestIndex].email,
      coordX: clientes[nearestIndex].coordX,
      coordY: clientes[nearestIndex].coordY,
    });
  }

  // Retornar ao ponto de partida para completar o ciclo
  route.push({
    name: clientes[0].name,
    email: clientes[0].email,
    coordX: clientes[0].coordX,
    coordY: clientes[0].coordY,
  });

  return route;
}

//para calcular uma distancia entre 2 clientes
function calculateDistance(cliente1: Cliente, cliente2: Cliente): number {
  return Math.sqrt(
    (cliente1.coordX - cliente2.coordX) ** 2 +
      (cliente1.coordY - cliente2.coordY) ** 2,
  );
}
