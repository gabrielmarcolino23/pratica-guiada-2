const {
  fetchData,
  filterData,
  calculateAverage,
  formatData,
} = require("./scripts");

// Mock da função fetch para simular uma resposta da API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: "Item A", value: 10 },
        { id: 2, name: "Item B", value: 20 },
        { id: 3, name: "Item A", value: 40 },
      ]),
  })
);

describe("fetchData", () => {
  it("deve retornar dados quando a requisição for bem-sucedida", async () => {
    const data = await fetchData("https://api.example.com/items");
    expect(data).toEqual([
      { id: 1, name: "Item A", value: 10 },
      { id: 2, name: "Item B", value: 20 },
      { id: 3, name: "Item A", value: 30 },
    ]);
  });

  it("deve retornar null e logar um erro quando a requisição falhar", async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    const data = await fetchData("https://api.example.com/items");
    expect(data).toBeNull();
  });
});

describe("filterData", () => {
  it("deve filtrar os dados corretamente com base na chave e valor", () => {
    const data = [
      { id: 1, name: "Item A", value: 10 },
      { id: 2, name: "Item B", value: 20 },
      { id: 3, name: "Item A", value: 30 },
    ];
    const result = filterData(data, "name", "Item A");
    expect(result).toEqual([
      { id: 1, name: "Item A", value: 10 },
      { id: 3, name: "Item A", value: 30 },
    ]);
  });
});

describe("calculateAverage", () => {
  it("deve calcular a média corretamente", () => {
    const data = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
    ];
    const average = calculateAverage(data, "value");
    expect(average).toBe(20);
  });

  it("deve retornar 0 se os dados estiverem vazios", () => {
    const data = [];
    const average = calculateAverage(data, "value");
    expect(average).toBe(0);
  });
});

describe("formatData", () => {
  it("deve formatar os dados corretamente", () => {
    const data = [
      { id: 1, name: "Item A" },
      { id: 2, name: "Item B" },
    ];
    const formatted = formatData(data, "name");
    expect(formatted).toBe("name: Item A, name: Item B");
  });
});
