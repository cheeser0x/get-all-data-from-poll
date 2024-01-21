export default function randomDataGenerator(lastId) {
    const newId = lastId + 1;

    const names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
    const domains = ["example.com", "demo.com", "sample.com", "test.com"];
    const name = names[Math.floor(Math.random() * names.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${name.toLowerCase()}@${domain}`;
    const age = Math.floor(Math.random() * 50) + 20; // Age between 20 and 70

    return {
        id: newId,
        name: name,
        email: email,
        age: age
    };
}
