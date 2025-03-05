import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

(async () => {
  const kuroshiro = new Kuroshiro.default(); // <-- Adicione .default()
  await kuroshiro.init(new KuromojiAnalyzer({ dicPath: "https://unpkg.com/kuromoji@0.1.2/dict" }));
  console.log("Kuroshiro inicializado!");
})();
