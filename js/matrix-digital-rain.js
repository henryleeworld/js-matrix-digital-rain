const langs = [
    "但是，請你一定要記住！能導致這世界滅亡的並不是他，而是人類，是人類自己！",
    "人間五十年，看世事夢幻似水，與天相比，不過渺小一物，精彩的人生。",
    "如果有活下去的機會，一定要牢牢抓住，不要放手。",
    "唯一的選擇就是戰鬥、唯一的盟友是敵人！",
    "希望能使我們變強，也是我們能走到這裡的原因，更是當我們一無所有的時候戰鬥下去的理由。",
    "你所珍惜愛戀的一切，全將被浪潮沖刷進遙遠的回憶之海。生命的殘酷本質，我從不曾懷疑。",
    "為了榮譽我已竭盡全力，沒有任何遺憾，就像你為了你所堅持的真理而活，我也是為了我的信念而生。",
    "人終將一死，這是避免不了的～～也逃避不了，我跟你說，不要浪費這難得的安寧時光。",
    "如果我變成惡魔，不再是個人類，你還會和我一起嗎？？",
    "尼祿，你就是你，這就是你所期望的樣子，我不知道還有誰比你更像個人類。",
    "擁抱夢想，任何時候都不能放棄特種兵的榮耀。",
    "法律是沒有界限的，使用法律的人決定了法律的界限。",
    "我以前和你一樣也是個冒險家，直到我的膝蓋中了一箭。",
    "即使透過人類的雙眼，我也能讓你看到未來。",
    "敵羞，吾去脫他衣！",
    "力量只有在守護自己想要守護的東西時才能超越界限的。",
    "你已經失去了愛。",
    "人生不如意，十之八九！",
    "如果您不嘗試挽救一條生命，你就保護不了任何東西。",
    "顫抖吧，凡人！",
    "你和我如同硬幣的兩面，當我們彼此面對時，就會看到真實的自己。或許有相同之處，但我們永遠不可能面向著同一方。",
    "這個世界已經不再需要我這個守護者了，大地的創傷，會由它自己慢慢的回覆，而各個生存在這裡的種族的未來，就只有靠他們自己的努力了。",
    "皮卡丘，接下來就看你的了！",
    "無須恐懼，因為等待著你的只有死亡一途。",
    "對於那些已經不在的人們，就算只是偶爾也好，請想起他們的事。",
    "時間不是你的敵人，永恆才是。",
    "每次看到月亮時就會想起我！",
    "如果法律錯了，首先要做的就是將法律修正過來。",
    "世界上根本無所謂正義與邪惡，那只不過是兩種不同觀點罷了。",
    "說好了，要永遠在一起！誰都不許先離開…",
    "如果不能信守，那就不要給女孩承諾。",
    "既不回頭，何必不忘。若是無緣，何須誓言。今日種種，似水無痕。明夕何夕，君已陌路。",
    "不好意思，喬不在我們的約定當中。",
];

let charSize = 20;
let fallRate = charSize / 2;
let streams;

class Char {
    constructor(value, x, y, speed) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    draw() {
        const flick = random(100);
        // 10 percent chance of flickering a number instead
        if (flick < 10) {
            fill(120, 30, 100);
            text(round(random(9)), this.x, this.y);
        } else {
            text(this.value, this.x, this.y);
        }

        // fall down
        this.y = this.y > height ? 0 : this.y + this.speed;
    }
}

class Stream {
    constructor(text, x) {
        const y = random(text.length);
        const speed = random(2, 10);
        this.chars = [];

        for (let i = text.length; i >= 0; i--) {
            this.chars.push(
                new Char(text[i], x, (y + text.length - i) * charSize, speed)
            );
        }
    }

    draw() {
        fill(120, 100, 100);
        this.chars.forEach((c, i) => {
            // 30 percent chance of lit tail
            const lit = random(100);
            if (lit < 30) {
                if (i === this.chars.length - 1) {
                    fill(120, 30, 100);
                } else {
                    fill(120, 100, 90);
                }
            }

            c.draw();
        });
    }
}

function createStreams() {
    // create random streams from langs that span the width
    for (let i = 0; i < width; i += charSize) {
        streams.push(new Stream(random(langs), i));
    }
}

function reset() {
    streams = [];
    createStreams();
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    reset();
    frameRate(20);
    colorMode(HSB);
    noStroke();
    textSize(charSize);
    textFont("monospace");
    background(0);
}

function draw() {
    background(0, 0.4);
    streams.forEach((s) => s.draw());
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
    background(0);
    reset();
}