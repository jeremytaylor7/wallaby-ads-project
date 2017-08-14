function random() {
    let int = Math.random() * 10000;
    return Math.floor(int);
}

random();

module.exports = random;